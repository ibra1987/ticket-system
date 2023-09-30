import { User } from "@/types";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
/*  validate j a jwt token server side
 this checks if the actual token is valid ion temrs of expire time
 but also checks if the payload actually matches a record in the database
*/
export default async function validateToken(token: string) {
  let client;
  try {
    const result = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof result === "string") {
      return false;
    }
    client = new PrismaClient();

    const user: User = await client.user.update({
      where: {
        id: result.id,
      },
      data: {
        isVerified: true,
      },
    });

    if (user.isVerified) {
      return true;
    }
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await client!.$disconnect();
  }
}
