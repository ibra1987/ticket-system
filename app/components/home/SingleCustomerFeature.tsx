"use client"
import { Feature } from '@/types'
import { motion, useScroll } from "framer-motion"

function SingleCustomerFeature({feature,index}:{feature:Feature,index:number}) {
  const { scrollYProgress } = useScroll();
  return (
   <motion.div 
   className="p-4 border-b border-b-blue-50  text-gray-500  m-2  rounded"
   initial={{ opacity: 0 }}
   whileInView={{ opacity: 1 }}
   transition={{delay:.1*(index)}}
  
   viewport={{ once: true }}
   >
        <h4 className=" m-1 font-extrabold  ">{feature.title} </h4>
        <p className="text-sm">{feature.description} </p>
   </motion.div>
  )
}

export default SingleCustomerFeature