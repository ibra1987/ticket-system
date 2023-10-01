import vaildateFormFields from "@/functions/vaildateFormFields";
import { UserToLogin } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import generateToken from "@/functions/generateToken";
import ExtendedError from "@/functions/ExtendedError";
/*
post request to login user 
*/
export async function POST(request: Request) {
  const user = (await request.json()) as unknown as UserToLogin;
  let response;
  try {
    // check if user credentials are sent in the request
    if (!user)
      throw new ExtendedError(["Please fill in your credentials to login"]);

    //validate user fields (basic validation)
    const { success, errors } = await vaildateFormFields(user);

    if (!success) {
      throw new ExtendedError(errors);
    }

    // check if a user exist

    const client = new PrismaClient();

    const existingUser = await client.user.findFirst({
      where: {
        email: user.email.value,
      },
    });
    //if user does not exist

    if (!existingUser) {
      throw new ExtendedError(["Please check your credentials and try again"]);
    }
    // check password

    const passwordMatch = await bcrypt.compare(
      user.password.value,
      existingUser.password
    );
    if (!passwordMatch) {
      throw new ExtendedError(["Please check your credentials and try again"]);
    }

    //check if account is activated
    if (!existingUser.isVerified) {
      throw new ExtendedError([
        "Please check your email and activate your account before trying to login",
      ]);
    }

    //create  login token and send as a cookie it along with user id and success state
    const token = await generateToken(existingUser.id, "1h");
    cookies().set({
      name: "sessId",
      value: token,
      httpOnly: true,
    });

    response = NextResponse.json({
      success: true,
      id: existingUser.id,
    });

    return response;
  } catch (error: any) {
    const errors = error.errors?.length
      ? error.errors
      : ["There was an error, please try again"];
    response = NextResponse.json(
      {
        success: false,
        errors,
      },
      {
        status: error.errors?.length ? 400 : 500,
      }
    );
  }

  return response;
}
