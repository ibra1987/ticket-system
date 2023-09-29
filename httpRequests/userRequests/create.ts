import axios from "axios";
import { NewUser } from "@/types";
const USERS_URL = process.env.USERS_URL!;

//Create a new User

export default async function createAccount(newUser: NewUser) {
  const response = await axios.post(USERS_URL, newUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
