"use client"

import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import { NewCustomerAccountFields } from "@/dataHelpers/NewCustomerAccountFields"
import { NewProfessionalAccountFields } from "@/dataHelpers/NewProfessionalAccountFields"
import { AccountType } from "@/types"
import { useState } from "react"

function SignUpDForm() {
    const  [accountType,setAccountType]=useState<AccountType>(AccountType.customer)
    const [newProfessional,setNewProfessional]=useState<NewProfessionalAccountFields>({
      Organization:{
          value:"",
          type:"text",
          placeholder:"Organization name",
  
      },
      Category:{
          value:"",
          type:"text",
          placeholder:"Domain of activity"
      }
  })
    const [newCustomer,setNewCustomer] = useState<NewCustomerAccountFields>({
      name:{
          value:"",
          type:"text",
          placeholder:"Your full name",
  
      },
      email:{
          value:"",
          type:"email",
          placeholder:"Your email"
      },
      password:{
          value:"",
          type:"password",
          placeholder:" choose a password of 8 characaters min"
      },
  
      passwordConfirmation:{
          value:"",
          type:"password",
          placeholder:"Confirm password"
      }
  })
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    
      switch(accountType){

        case AccountType.customer:
          setNewCustomer(prev=>({
            ...prev,
            [e.target.name]:{
              ...[e.target.name],
              value:e.target.value
            }
          }))
          break;
        case AccountType.Professional:
          setNewProfessional(prev=>({
            ...prev,
            [e.target.name]:{
              ...[e.target.name],
              value:e.target.value
            }
          }))
          break;
        default:
          break;
      }
    }


  return (
    <form className="w-full flex flex-col justify-start items-center md:w-1/2  p-10">
      <h1 className="w-full text-2xl text-center m-4 font-extrabold text-gray-600">
        Create a free account
      </h1>
      <div className="w-full flex justify-between items-center">
      <Input
        type="radio"
        checked={accountType === AccountType.Professional}
        class="m-3  p-2"
        value={accountType.toString()}
       
        containerClass="w-full "
        placeholder=""
        label={{text:"I am a professional", class:"ml-3  p-2"}}
        onChange={()=>setAccountType(AccountType.Professional)}


        />
        <Input
        type="radio"
        checked={accountType === AccountType.customer}
        onChange={()=>setAccountType(AccountType.customer)}
        class="m-3  p-2"
        value={accountType.toString()}
        containerClass="w-full "
        placeholder=""
        
        label={{text:"I am a customer", class:"ml-3  p-2"}}


        />
      </div>
        
        
        {Object.keys(newCustomer).map((field:string,index:number)=>(
          <Input 
          key={`${field}-${index}`}
          class="m-2 p-2 w-full border-2 outline-none focus:border-2 focus:border-blue-300 rounded "
          value={newCustomer[field as keyof NewCustomerAccountFields].value}
          placeholder={newCustomer[field as keyof NewCustomerAccountFields].placeholder}
          name={field}
          onChange={onChange}
          containerClass="w-full "
          type={newCustomer[field as keyof NewCustomerAccountFields].type}
         
          />
        ))}
        {
          accountType === AccountType.Professional && (<>
           
                {Object.keys(newProfessional).map((field:string,index)=>(
                   <Input 
                   key={`${field}-${index}`}
                   class="m-2 p-2 w-full border-2 outline-none focus:border-2 focus:border-blue-300 rounded "
                   value={newProfessional[field as keyof NewProfessionalAccountFields].value}
                   placeholder={newProfessional[field as keyof NewProfessionalAccountFields].placeholder}
                   onChange={onChange}
                   containerClass="w-full "
                   type={newProfessional[field as keyof NewProfessionalAccountFields].type}
 
                   />

                 

                ))}
          </>)
        }
        <div className="w-full p-4">
        <Button
        text="Create Account"
        cssClass="w-full bg-blue-500 text-gray-200"
        handler={()=>""}
        type="submit"

        />
        </div>
       
    </form>
  )
}

export default SignUpDForm