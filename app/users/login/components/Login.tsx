"use client";
import Button from "@/app/components/Button";
import ErrorContainer from "@/app/components/ErrorContainer";
import Input from "@/app/components/Input";
import getFormValidationError from "@/functions/getFormValidationError";
import vaildateFormFields from "@/functions/vaildateFormFields";
import userRequests from "@/httpRequests/userRequests";
import { FormErrorType, FormInputAttr, User } from "@/types";
import { useState } from "react";

type UserToLogin = {
  email: FormInputAttr;
  password: FormInputAttr;
};
function Login() {
  const [validationErrors, setValidationErrors] = useState<FormErrorType[]>([]);
  const [loadingState, setLoadingState] = useState(false);
  const [user, setUser] = useState<UserToLogin>({
    email: {
      value: "",
      placeholder: "Your email address",
      type: "email",
    },
    password: {
      value: "",
      placeholder: "password",
      type: "password",
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;

    const _validationErrors = validationErrors?.filter(
      (err: FormErrorType) => err.path !== fieldName
    ) as FormErrorType[];

    setValidationErrors(_validationErrors);

    setUser((prev) => ({
      ...prev,
      [fieldName as keyof UserToLogin]: {
        ...prev[fieldName as keyof UserToLogin],
        value: e.target.value,
      },
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);
    setValidationErrors([]);

    // check for errors client side validation of the form
    const { success, errors } = await vaildateFormFields(user);

    if (!success) {
      setValidationErrors(errors!);
      setLoadingState(false);
      return;
    }
    try {
      const response = await userRequests.loginAccount(user);
      if (response.data.success) {
        setUser({
          email: {
            value: "",
            placeholder: "Your email address",
            type: "email",
          },
          password: {
            value: "",
            placeholder: "password",
            type: "password",
          },
        });
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.customError || "Oops! something went wrong!";
      setValidationErrors([{ errorMessages: [errMessage], path: "general" }]);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col justify-start items-center md:w-1/3   py-4"
    >
      {getFormValidationError("general", validationErrors) && (
        <div className="bg-red-50 border border-red-100 text-red-400 w-full text-left p-2 relative ">
          <button
            onClick={() => setValidationErrors([])}
            className="p-2 border border-red-300 w-2 h-2 flex justify-center items-center  rounded-full text-red-500 absolute hover:border-red-400 top-2 right-2 transition duration-200"
          >
            X
          </button>
          {getFormValidationError("general", validationErrors)}
        </div>
      )}
      {Object.keys(user).map((key: string, index: number) => {
        return (
          <div className="w-full" key={`${key}-${index}`}>
            <Input
              inputType={user[key as keyof UserToLogin].type}
              class={
                getFormValidationError(key, validationErrors) &&
                getFormValidationError(key, validationErrors)!.length
                  ? " p-2 w-full   outline-none focus:border-2 focus:border-blue-300 rounded border-2 border-red-500"
                  : " p-2 w-full border-2  outline-none focus:border-2 focus:border-blue-300 rounded "
              }
              value={user[key as keyof UserToLogin].value}
              placeholder={user[key as keyof UserToLogin].placeholder || ""}
              name={key}
              onChange={onChange}
              containerClass="w-full my-2"
            />
            {/*display field specific error messages */}
            {validationErrors && validationErrors?.length > 0 && (
              <ErrorContainer
                errorMessages={getFormValidationError(key, validationErrors)!}
              />
            )}
          </div>
        );
      })}

      <div className="w-full flex justify-center my-2 ">
        <Button
          disabled={loadingState}
          text={loadingState ? "Please wait ..." : "Log in"}
          cssClass="w-full bg-blue-500 text-gray-100 tracking-wider text-lg font-extrabold p-2 hover:bg-blue-600 transition duration-100"
          handler={() => ""}
          type="submit"
        />
      </div>
    </form>
  );
}

export default Login;
