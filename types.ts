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