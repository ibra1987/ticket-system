"use client"

import { AccountType } from "@/types"
import { useState } from "react"

function SignUpDForm() {
    const  [accountType,setAccountType]=useState<AccountType>(AccountType.customer)
  return (
    <form>
        {NewCutomerAccountFields}
        
    </form>
  )
}

export default SignUpDForm