import { Feature } from "@/types";
import { MdAssignmentInd, MdFeedback, MdOutlineInsights } from "react-icons/md";
import {CgCommunity} from "react-icons/cg"
import {BiSolidHardHat} from "react-icons/bi"
import {TbHierarchy3} from "react-icons/tb"
import { motion } from "framer-motion"


const iconClass = " text-3xl"
type IconMap = {
  [key: string]: () => JSX.Element;
};
const iconMap: IconMap = {
  "Data Insights": () => (
    <MdOutlineInsights className={iconClass} />
  ),
  "Centralized Communication": () => (
    <CgCommunity className={iconClass} />
  ),
  "Efficiency": () => (
    <BiSolidHardHat className={iconClass} />
  ),
  "Ticket Assignment": () => (
    <MdAssignmentInd className={iconClass} />
  ),
  "Service Level Agreements": () => (
    <TbHierarchy3 className={iconClass} />
  ),
  "Customer Feedback": () => (
    <MdFeedback className={iconClass} />
  ),
};

function SingleProfessionalFeature({ feature }: { feature: Feature }) {


  return (
    <motion.div
    
      className="w-full p-2 flex flex-col justify-between   text-gray-500 border-b "
     
    >
      <div className="w-full flex justify-start space-x-2 items-center rounded-md p-2  ">
      {iconMap[feature.title as keyof IconMap]()}
      <h4 className="p-2 font-medium ">{feature.title} </h4>
      </div>
      <p className="text-sm p-4  ">{feature.description}</p>
    </motion.div>
  );
}

export default SingleProfessionalFeature;
