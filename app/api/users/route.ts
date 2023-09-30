import vaildateFormFields from "@/functions/vaildateFormFields";
import { EmailOptions, NewUser, User } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import generateToken from "@/functions/generateToken";
import sendEmail from "@/functions/sendEmail";

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

    //create the actual record
    const addedUser = await client.user.create({
      data: {
        name: newUser.name.value,
        email: newUser.email.value,
        password: hashedPassword,
        isVerified: false,
      },
    });
    const { password, ...returnedUser } = addedUser;

    //create  a token

    const token = await generateToken(returnedUser.id, "1m");
    if (!token) {
      throw new Error("Could  not generate a token for email verificattion ");
    }

    const emailink = process.env.BASE_URL + "/users/verify/" + token;

    //send verification email using sendgrid api

    const emailOptions: EmailOptions = {
      from: {
        email: "no-reply@imagebgremover.io",
        name: "Ticketify Team",
      },
      to: [
        {
          email: returnedUser.email,
          name: returnedUser.name,
        },
      ],
      subject: "Ticketify- Account Activation ",
      html: `<p>Hello, ${returnedUser.name}, please activate your account <a href='${emailink}'
       target='_blank'> from here </a>  to start using our services</p>`,
    };

    await sendEmail(emailOptions);

    response = NextResponse.json({
      success: true,
      addedUser: returnedUser,
    });

    return response;
  } catch (error: any) {
    response = NextResponse.json(
      {
        success: false,
        customError:
          error?.body?.message || error.response?.data.error || error?.message,
      },
      {
        status: error?.status || error.body?.statusCode || 500,
      }
    );

    return response;
  } finally {
    await client.$disconnect();
  }
}
