"use client";
import { Feature } from "@/types";
import { motion, useScroll } from "framer-motion";

function SingleCustomerFeature({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="p-2 border-b border-b-blue-50  text-gray-500  m-1  rounded"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 * index }}
      viewport={{ once: true }}
    >
      <h4 className=" mx-1 font-bold bg-yellow-300 p-2 text-gray-500">
        {feature.title}{" "}
      </h4>
      <p className="text-sm px-2 py-1 mx-1  indent-3 ">
        {feature.description}{" "}
      </p>
    </motion.div>
  );
}

export default SingleCustomerFeature;
