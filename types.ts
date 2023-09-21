
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

interface Account {

    email:string,
    password:string,
    type:AccountType,
    isPremium : boolean ,

}

export interface CustomerAccountFields extends Account {

    name:string,
    type:AccountType.customer,
    tickets:Ticket[]
    
}

export type Ticket = {
    
}