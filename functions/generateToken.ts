import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export default async function generateToken(
  userId: string,
  time: string
): Promise<string> {
  // generate a token
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: time }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token!);
      }
    });
  });
}
