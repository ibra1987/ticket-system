"use client";
import { professionalFeatures } from "@/dataHelpers/ProfessionalFeatures";
import { Feature } from "@/types";
import SingleProfessionalFeature from "./SingleProfessionalFeature";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";


function ProfessionalFeaturesComponent() {
 


  return (
    <div className="w-full lg:w-4/5 mx-auto bg-blue-100  flex flex-col justify-start items-center py-4 rounded p-10 overflow-hidden ">

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 grid-flow-row-dense ">
       { professionalFeatures.map((feature:Feature,index:number)=>(
       <SingleProfessionalFeature 
       
       key={`${index}-${feature.title}`} 
       feature={feature}
       
       />
       
       ))}

        </div>
        
    </div>
  );
}

export default ProfessionalFeaturesComponent;
