"use client"
import { clear } from "console"

import {useEffect,useLayoutEffect,useState} from "react"
import Button from "../Button"

type CallBackArguments = {
    intro:(text:string,i:number)=>void,
    heading:(text:string,i:number)=>void,
    subHeading:(text:string,i:number)=>void


}
function Hero() {
    const customerHeader ="You said Customer Support?"
    const headerResText = "We Got You Covered. "
    const heroSection = "Whether you're a customer seeking prompt support or a professional managing service requests, our platform is your comprehensive solution. Experience the convenience of efficient ticket submission and resolution. Join our network today to streamline your support processes, enhance customer satisfaction, and ensure your service needs are met seamlessly."
    const CustomerIntro ="Experience hassle-free service at your fingertips. Our platform connects you with trusted service providers ready to fulfill your needs. Whether it's home repairs, expert advice, or any service you require, we've got you covered. Submit your request today and discover the ease of finding reliable professionals who prioritize your satisfaction."
    const ProviderIntro = " Unlock a world of opportunities for your professional journey. Join our network of skilled service providers and access a steady stream of clients looking for your expertise. With our platform, you can streamline your business, grow your reputation, and take your career to new heights. Join us today and let us help you thrive in your industry."
    const [intro,setIntro]=useState<string |undefined>()
    const [heading,setHeading]=useState<string | undefined>()
    const [subHeading,setSubHeading]=useState<string | undefined>()
    const [proffessionalText,setprofessionalText] = useState()


    const callBack:CallBackArguments = {
        "intro":(text:string,i:number)=>setIntro(prevState=>prevState !== undefined ? prevState+text[i] : ""+text[i]),
        "heading":(text:string,i:number)=>setHeading(prevState=>prevState ? prevState+text[i] : ""+text[i]),
        "subHeading":(text:string,i:number)=>setSubHeading(prevState=>prevState ? prevState+text[i] : ""+text[i]),

    }
    
useEffect(()=>{
//   renderTextWithDelay(CustomerIntro,0,"customerText")
if(!heading){
    renderTextWithDelay(customerHeader,0,"heading")

   setIntro(heroSection)
   renderTextWithDelay(headerResText,0,"subHeading")

}





},[heading?.length])

 function renderTextWithDelay(text:string,i:number=0,target:string){
    
    if(intro && intro.length>0) return;
      callBack[target as keyof CallBackArguments](text,i)
    if(i=== text.length-1){
        return;
    }
   setTimeout(()=>{renderTextWithDelay(text,i+1,target)},50)


}
  return (
    <div className="w-full lg:w-4/5 flex flex-col justify-start items-center  ">
        {
            heading && <>
            <h2 className=" inline-block text-blue-400 font-extrabold text-5xl p-4">{heading} </h2>     
            <h3 className="inline-block  text-black font-extrabold text-5xl p-4">{subHeading} </h3>

           <p className="w-full lg:w-3/4 text-gray-500">{intro} </p>
       <div>
         <Button cssClass="w-48 text-center p-2 hover:bg-gray-200  transition duration-100 ease-in-out  bg-white border m-2" text="For Customers" handler={()=>null} type="button"/>
         <Button cssClass="w-48 text-center p-2 bg-black hover:bg-gray-900 transition duration-100 text-white border m-2" text="For Professionals" handler={()=>null} type="button"/>
 
       </div>
            </>
       }
    </div>
  )
}

export default Hero