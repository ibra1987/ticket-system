import { FormErrorType } from "@/types";

export default function (path: string, source: FormErrorType[] | undefined) {
  if (!source) return;

  const errorMessages = source?.find(
    (error: FormErrorType) => error.path === path
  )?.errorMessages;

  return errorMessages;
}
