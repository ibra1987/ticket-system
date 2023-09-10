"use client"

import {useEffect,useState} from "react"
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

   
   renderTextWithDelay(headerResText,0,"subHeading")

}





},[])

 function renderTextWithDelay(text:string,i:number=0,target:string){
    
    if(intro && intro.length>0) return;
      callBack[target as keyof CallBackArguments](text,i)
    if(i=== text.length-1){
        return;
    }
   setTimeout(()=>{renderTextWithDelay(text,i+1,target)},80)


}

  return (
    <div
     className= {`w-full lg:w-4/5 flex flex-col justify-start items-center`}
    
     >
         <>
            <h2 className=" inline-block  w-full text-blue-400 text-center font-extrabold text-3xl lg:text-5xl p-4">{heading} </h2>     
            <h3 className="inline-block  text-black font-extrabold text-3xl lg:text-5xl p-4">{subHeading} </h3>

          
            <p className="w-full lg:w-3/4 text-gray-500">{heroSection} </p>
       <div className="w-full flex justify-center">
         <Button cssClass=" text-center p-3 bg-yellow-400 w-1/2 text-white  hover:bg-gray-200  transition duration-100 ease-in-out  bg-white border m-2" text="Learn more" handler={()=>null} type="button"/>
 
       </div>
          
            </>
       
    </div>
  )
}

export default Hero