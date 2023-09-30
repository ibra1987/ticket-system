import validateToken from "@/functions/validateToken";
import Link from "next/link";

export default async function Page({ params }: { params: { token: string } }) {
  const isValidToken = await validateToken(params.token || "");

  return (
    <section className="py-20 flex justify-center items-center">
      {isValidToken ? (
        <div>
          {" "}
          Account activated. You can now{" "}
          <Link className="text-blue-400 underline" href={"/users/login"}>
            log in
          </Link>
        </div>
      ) : (
        <div>
          Expired Link,{" "}
          <Link
            className="underline text-blue-500"
            href={"/users/new-activation-link"}
          >
            Resend verification lin
          </Link>
        </div>
      )}
    </section>
  );
}
