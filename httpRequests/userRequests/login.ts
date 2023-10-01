import axios from "axios";
import { NewUser, UserToLogin } from "@/types";
const USERS_URL = process.env.USERS_URL!;

//Create a new User

export default async function loginAccount(newUser: UserToLogin) {
  const response = await axios.post(USERS_URL + "/login", newUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
