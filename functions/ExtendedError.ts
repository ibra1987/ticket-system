import { FormErrorType } from "@/types";

class ExtendedError extends Error {
  errors: FormErrorType[];
  constructor(errors: any) {
    super("There are errors in your request!");
    this.errors = errors;
  }
}

export default ExtendedError;
