import axios from "axios";

const USERS_URL = process.env.USERS_URL!


//Create a new User

import { AccountType, NewCustomerAccountFields, NewProfessionalAccountFields } from "@/types";

async function createAccount(newUser: NewCustomerAccountFields | NewProfessionalAccountFields, accounType:AccountType) {

    const response = await axios.post(USERS_URL,newUser,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    
}