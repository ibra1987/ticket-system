"use client";

import Button from "@/app/components/Button";
import ErrorContainer from "@/app/components/ErrorContainer";
import Input from "@/app/components/Input";
import { emptyUserFields } from "@/dataHelpers/emptyUserFields";
import vaildateFormFields from "@/functions/vaildateFormFields";
import { FormErrorType, NewUser } from "@/types";
import { FormEvent, useState } from "react";
import userRequests from "@/httpRequests/userRequests";

function SignUpDForm() {
  const [validationErrors, setValidationErrors] = useState<
    FormErrorType[] | undefined
  >([]);
  const [newUser, setNewUser] = useState<NewUser>(emptyUserFields);
  const [loading, setLoadingState] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;

    const _validationErrors = validationErrors?.filter(
      (err: FormErrorType) => err.path !== fieldName
    ) as FormErrorType[];

    setValidationErrors(_validationErrors);

    setNewUser((prev) => ({
      ...prev,
      [fieldName as keyof NewUser]: {
        ...prev[fieldName as keyof NewUser],
        value: e.target.value,
      },
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingState(true);
    setValidationErrors([]);

    // check for errors client side validation of the form
    const { success, errors } = await vaildateFormFields(newUser);

    if (!success) {
      setValidationErrors(errors!);
      setLoadingState(false);
      return;
    }
    try {
      const response = await userRequests.createAccount(newUser);
      if (response.data.success) {
      }
    } catch (error: any) {
      const errMessage =
        error.response.data.customError || "Oops! something went wrong!";
      setValidationErrors([{ errorMessages: [errMessage], path: "general" }]);
    } finally {
      setLoadingState(false);
    }
  };

  // return the error message for a specific field refered as path
  const getErrorMessages = (path: string) => {
    const errorMessages = validationErrors?.find(
      (error: FormErrorType) => error.path === path
    )?.errorMessages;

    return errorMessages;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col justify-start items-center md:w-1/3   py-4"
    >
      <h1 className="w-full text-2xl text-center m-4 font-extrabold text-gray-600">
        Create a free account
      </h1>
      {/* non field specific errors  */}
      {getErrorMessages("general") && (
        <div className="bg-red-50 border border-red-100 text-red-400 w-full text-left p-2 relative ">
          <button
            onClick={() => setValidationErrors([])}
            className="p-2 border border-red-300 w-2 h-2 flex justify-center items-center  rounded-full text-red-500 absolute hover:border-red-400 top-2 right-2 transition duration-200"
          >
            X
          </button>
          {getErrorMessages("general")}
        </div>
      )}

      {Object.keys(newUser).map((field: string, index: number) => (
        <div className="w-full" key={`${field}-${index}`}>
          <Input
            inputType={newUser[field as keyof NewUser].type}
            class={
              getErrorMessages(field) && getErrorMessages(field)!.length
                ? " p-2 w-full   outline-none focus:border-2 focus:border-blue-300 rounded border-2 border-red-500"
                : " p-2 w-full border-2  outline-none focus:border-2 focus:border-blue-300 rounded "
            }
            value={newUser[field as keyof NewUser].value}
            placeholder={newUser[field as keyof NewUser].placeholder || ""}
            name={field}
            onChange={onChange}
            containerClass="w-full my-2 "
          />

          {/*display field specific error messages */}
          {validationErrors && validationErrors?.length > 0 && (
            <ErrorContainer errorMessages={getErrorMessages(field)!} />
          )}
        </div>
      ))}

      <div className="w-full flex justify-center my-2 ">
        <Button
          disabled={loading}
          text={loading ? "Please wait ..." : "Create Account"}
          cssClass="w-full bg-blue-500 text-gray-100 tracking-wider text-lg font-extrabold p-2 hover:bg-blue-600 transition duration-100"
          handler={() => ""}
          type="submit"
        />
      </div>
    </form>
  );
}

export default SignUpDForm;
