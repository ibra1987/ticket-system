import {
    NewProfessionalAccountFields,
    NewCustomerAccountFields,
    FormErrorType,
  } from "@/types";
  
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  
  export default async function (
    newUser: NewCustomerAccountFields | NewProfessionalAccountFields
  ) {
    let success = true;
    let errors: FormErrorType[] = [];
  
    // Loop through the object and check if it is not blank and valid
    for (const prop in newUser) {
      let errorMessages: string[] = [];
  
      // Check if the field is blank
      if (
        prop !== "passwordConfirmation" && prop!== "password" && ( newUser[prop as keyof typeof newUser].value.length === 0 ||
        !newUser[prop as keyof typeof newUser].value )
      ) {
        errorMessages.push(`${prop.split(/(?=[A-Z])/).join(' ').toLowerCase()} can not be blank!`);
      }
  
      // Check email field
      if (prop === "email" && !newUser["email"].value.toLowerCase().match(emailRegex)) {
        errorMessages.push(`Please provide a valid email`);
      }
  
      // Check if the password is more than 8 characters
      if (prop === "password" && newUser["password"].value.length < 8) {
        errorMessages.push(`Password must be at least 8 characters`);
        
      }
  
      // Check if passwords match
      if (prop === "passwordConfirmation" && newUser["password"] !== newUser["passwordConfirmation"]) {
        errorMessages.push(`Passwords do not match`);
      }
  
      // If there are error messages for this property, add them to the errors array
      if (errorMessages.length > 0) {
        errors.push({
          errorMessages,
          path: prop,
        });
      }
    }
  
    // If there are errors, return them
    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }
  
    // If no errors, return success = true and null for errors
    return {
      success,
      errors: null,
    };
  }
  