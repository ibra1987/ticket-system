"use client";

import AccountRem from "./components/AccountRem";
import SignUpDForm from "./components/SignUpDForm";

function SignUp() {
  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <SignUpDForm />
      <AccountRem />
    </div>
  );
}

export default SignUp;
