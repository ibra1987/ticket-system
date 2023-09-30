"use client";

import Button from "@/app/components/Button";
import ErrorContainer from "@/app/components/ErrorContainer";
import Input from "@/app/components/Input";
import { emptyUserFields } from "@/dataHelpers/emptyUserFields";
import vaildateFormFields from "@/functions/vaildateFormFields";
import { FormErrorType, NewUser } from "@/types";
import { FormEvent, useState } from "react";
import userRequests from "@/httpRequests/userRequests";
import Link from "next/link";
import getFormValidationError from "@/functions/getFormValidationError";

function SignUpDForm() {
  const [successMessage, setSuccessMessage] = useState({
    value: false,
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    FormErrorType[] | undefined
  >([]);
  const [newUser, setNewUser] = useState<NewUser>(emptyUserFields);
  const [loading, setLoadingState] = useState<boolean>(false);

  // on Input change
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

  // on form submission
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
        setNewUser(emptyUserFields);
        setSuccessMessage({
          value: true,
          message: `Account created successfuly, Please check your email to activate it.`,
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

  // return the error message for a specific field refered as path

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col justify-start items-center md:w-1/3   py-4"
    >
      <h1 className="w-full text-2xl text-center m-4 font-extrabold text-gray-600">
        Create a free account
      </h1>
      {/* Succes Message  */}
      {successMessage.value && (
        <div className="bg-green-100  border border-green-200 text-sm text-green-600 w-full text-left p-2 relative ">
          <button
            onClick={() =>
              setSuccessMessage({
                value: false,
                message: "",
              })
            }
            className="p-2 border border-green-300 w-2 h-2 flex justify-center items-center  rounded-full text-green-500 absolute hover:border-red-400 top-2 right-2 transition duration-200"
          >
            X
          </button>
          {successMessage.message}
        </div>
      )}
      {/* non field specific errors  */}
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

      {Object.keys(newUser).map((field: string, index: number) => (
        <div className="w-full" key={`${field}-${index}`}>
          <Input
            inputType={newUser[field as keyof NewUser].type}
            class={
              getFormValidationError(field, validationErrors) &&
              getFormValidationError(field, validationErrors)!.length
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
            <ErrorContainer
              errorMessages={getFormValidationError(field, validationErrors)!}
            />
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
