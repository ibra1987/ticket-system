import Link from "next/link";

function AccountRem() {
  return (
    <div className="w-full lg:w-1/3 flex justify-between items-center text-sm p-2">
      <span>
        Already have an account?{" "}
        <Link
          className="text-blue-400 transition duration-200 hover:text-blue-500"
          href={"/users/login?ref=reg"}
        >
          Sign in here!
        </Link>
      </span>
    </div>
  );
}

export default AccountRem;
