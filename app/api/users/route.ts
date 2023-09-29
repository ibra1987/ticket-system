import vaildateFormFields from "@/functions/vaildateFormFields";
import { NewUser, User } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
let client: PrismaClient;
const saltRounds = 10;
export async function POST(request: Request) {
  const newUser: NewUser = await request.json();
  let response;

  // check if a new user informations have been sent
  if (!newUser) {
    response = NextResponse.json({
      success: false,
      errors: [
        {
          errorMessages: ["Please fill in all the fields"],
          path: "General",
        },
      ],
    });
  }

  try {
    // validate user fields

    const { success, errors } = await vaildateFormFields(newUser);
    if (!success) {
      response = NextResponse.json({
        success: false,
        errors,
      });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(
      newUser.password.value,
      saltRounds
    );

    // register a new user and send verification email

    client = new PrismaClient();

    // check if user already exists
    const userExists = await client.user.findFirst({
      where: {
        email: newUser.email.value,
      },
    });

    if (userExists) {
      throw new Error("This email is already in use!");
    }

    // create the actual record
    const addedUser = await client.user.create({
      data: {
        name: newUser.name.value,
        email: newUser.email.value,
        password: hashedPassword,
        isVerified: false,
      },
    });
    response = NextResponse.json(
      {
        success: true,
        addedUser,
      },
      {
        status: 201,
      }
    );

    //send verification email using sendgrid api

    //TODO

    return response;
  } catch (error: any) {
    response = NextResponse.json(
      {
        success: false,

        customError: error?.message,
      },
      {
        status: 500,
      }
    );

    return response;
  } finally {
    await client.$disconnect();
  }
}
