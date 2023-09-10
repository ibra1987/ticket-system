"use client"
import { Feature } from "@/types"
import { customerFeatures } from "@/dataHelpers/customerFeatures"
import SingleCustomerFeature from "./SingleCustomerFeature"

function CustomerFeatures() {
 
  return (
   <div className={"w-full rounded m-1 bg-yello-100 lg:w-4/5 grid grid-cols-1  lg:flex lg:flex-col"}>
    
    {
      customerFeatures.map((feature:Feature,index:number)=><SingleCustomerFeature index={index}  key={feature.title} feature={feature} />)
    }
   </div>
  )
}

export default CustomerFeatures