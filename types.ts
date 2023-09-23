
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
    permissions:Permissions
}

export interface Professional extends User {
  
    organization:string,
    isAdmin:boolean,
    collaborateurs?:Collaborateur[]

}

export type Collaborateur = {
    id?:string,
    organizationId:string,
    name:string,
    contributions:string[]
    permissions:Permissions
}

export interface Customer extends User {
  
    tickets:Ticket[]

}

export type Ticket ={
  
    id?:string,
    number:string,
    customerId:string,
    organizationId:string,
    status: "Open" | "In progress" | "Closed",
    messages:TicketMessage[]


}

export type TicketMessage = {
    id?:string,
    ticketId:string,
    text:string,
    
}

type Permissions = "All" | "Edit" | "Delete" | "Respond" | "Read"
