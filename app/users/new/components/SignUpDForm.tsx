"use client";

import Button from "@/app/components/Button";
import ErrorContainer from "@/app/components/ErrorContainer";
import Input from "@/app/components/Input";
import vaildateFormFields from "@/functions/vaildateFormFields";
import { FormErrorType } from "@/types";
import { AccountType } from "@/types";
import { FormEvent, useState } from "react";

function SignUpDForm() {
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.customer
  );
  const [validationErrors, setValidationErrors] = useState<
    FormErrorType[] | undefined
  >([]);
  const [newProfessional, setNewProfessional] =
    useState<NewProfessionalAccountFields>({
      name: {
        value: "",
        type: "text",
        placeholder: "Your full name",
      },
      email: {
        value: "",
        type: "email",
        placeholder: "Your email",
      },
      password: {
        value: "",
        type: "password",
        placeholder: " choose a password of 8 characaters min",
      },

      passwordConfirmation: {
        value: "",
        type: "password",
        placeholder: "Confirm password",
      },
      Organization: {
        value: "",
        type: "text",
        placeholder: "Organization name",
      },
      Category: {
        value: "",
        type: "text",
        placeholder: "Domain of activity",
      },
    });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors([]);
    const fieldName = e.target.name;
    switch (accountType) {
      case AccountType.customer:
        setNewCustomer((prev) => ({
          ...prev,
          [fieldName as keyof NewCustomerAccountFields]: {
            ...prev[fieldName as keyof NewCustomerAccountFields],
            value: e.target.value,
          },
        }));
        break;
      case AccountType.Professional:
        setNewProfessional((prev) => ({
          ...prev,
          [fieldName as keyof NewProfessionalAccountFields]: {
            ...prev[fieldName as keyof NewProfessionalAccountFields],
            value: e.target.value,
          },
        }));
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newUser =
      accountType === AccountType.customer
        ? (newCustomer as NewCustomerAccountFields)
        : (newProfessional as NewProfessionalAccountFields);
    const { success, errors } = await vaildateFormFields(newUser);

    if (!success) {
      setValidationErrors(errors!);
    }

    const response = await CreateAccount(newUser, accountType);
  };

  const getErrorMessages = (path: string) => {
    const errorMessages = validationErrors?.find(
      (error: FormErrorType) => error.path === path
    )?.errorMessages;

    return errorMessages;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col justify-start items-center md:w-1/2   py-10"
    >
      <h1 className="w-full text-2xl text-center m-4 font-extrabold text-gray-600">
        Create a free account
      </h1>
      <div className="w-full flex justify-between items-center">
        <Input
          inputType="radio"
          checked={accountType === AccountType.Professional}
          class="m-3  p-2"
          value={accountType.toString()}
          containerClass="w-full "
          placeholder=""
          label={{ text: "I am a professional", class: "ml-3  p-2" }}
          onChange={() => {
            setAccountType(AccountType.Professional);
            setValidationErrors([]);
          }}
        />
        <Input
          inputType="radio"
          checked={accountType === AccountType.customer}
          onChange={() => {
            setAccountType(AccountType.customer);
            setValidationErrors([]);
          }}
          class="m-3  p-2"
          value={accountType.toString()}
          containerClass="w-full "
          placeholder=""
          label={{ text: "I am a customer", class: "ml-3  p-2" }}
        />
      </div>

      {accountType === AccountType.customer &&
        Object.keys(newCustomer).map((field: string, index: number) => (
          <div className="w-full" key={`${field}-${index}`}>
            <Input
              inputType={
                newCustomer[field as keyof NewCustomerAccountFields].type
              }
              class={
                getErrorMessages(field) && getErrorMessages(field)!.length
                  ? " p-2 w-full   outline-none focus:border-2 focus:border-blue-300 rounded border-2 border-red-500"
                  : " p-2 w-full border-2  outline-none focus:border-2 focus:border-blue-300 rounded "
              }
              value={newCustomer[field as keyof NewCustomerAccountFields].value}
              placeholder={
                newCustomer[field as keyof NewCustomerAccountFields]
                  .placeholder || ""
              }
              name={field}
              onChange={onChange}
              containerClass="w-full my-2 "
            />

            {/*display error messages */}
            {validationErrors && validationErrors?.length > 0 && (
              <ErrorContainer errorMessages={getErrorMessages(field)!} />
            )}
          </div>
        ))}
      {accountType === AccountType.Professional && (
        <>
          {Object.keys(newProfessional).map((field: string, index) => (
            <div key={`${field}-${index}`} className="w-full">
              <Input
                inputType={
                  newProfessional[field as keyof NewProfessionalAccountFields]
                    .type
                }
                name={field}
                class={
                  getErrorMessages(field) && getErrorMessages(field)!.length
                    ? "m-2 p-2 w-full   outline-none focus:border-2 focus:border-blue-300 rounded border-2 border-red-500"
                    : "m-2 p-2 w-full border-2  outline-none focus:border-2 focus:border-blue-300 rounded "
                }
                value={
                  newProfessional[field as keyof NewProfessionalAccountFields]
                    .value
                }
                placeholder={
                  newProfessional[field as keyof NewProfessionalAccountFields]
                    .placeholder || ""
                }
                onChange={onChange}
                containerClass="w-full "
              />
              {/*display error messages */}
              {validationErrors && validationErrors?.length > 0 && (
                <ErrorContainer errorMessages={getErrorMessages(field)!} />
              )}
            </div>
          ))}
        </>
      )}
      <div className="w-full flex justify-center my-2 ">
        <Button
          text="Create Account"
          cssClass="w-full bg-blue-500 text-gray-100 tracking-wider text-lg font-extrabold p-2 hover:bg-blue-600 transition duration-100"
          handler={() => ""}
          type="submit"
        />
      </div>
    </form>
  );
}

export default SignUpDForm;
