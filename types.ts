
export type NavLink = {
    name:string,
    path:string
}

export type ButtonProps = {
    text:string,
    handler:()=>void,
    type:"submit" | "button",
    cssClass:string
}

export type Feature = {
    title:string,
    description:string
}
export type Testimonial={
    name:string,
    title:string,
    photo:string,
    body:string,
    source: 'PRO' | 'Client'
}
export enum AccountType  {
    customer,
    Professional

}

export interface User {
    id?:string,
    name:string,
    email:string,
    password:string,
    type:AccountType,
    
}



type Permissions = "All" | "Edit" | "Delete" | "Respond" | "Read"


export interface AccountField {
    value: string;
    type: string;
    placeholder?: string;
  }
  
  // Now, define your NewProfessionalAccountFields and NewCustomerAccountFields types
  export interface NewProfessionalAccountFields {
    name: AccountField;
    email: AccountField;
    password: AccountField;
    passwordConfirmation: AccountField;
    Organization: AccountField;
    Category: AccountField;
  }
  
  export interface NewCustomerAccountFields {
    name: AccountField;
    email: AccountField;
    password: AccountField;
    passwordConfirmation: AccountField;
  }

  export 
  type FormErrorType = {
    errorMessages: string[];
    path: string;
  };