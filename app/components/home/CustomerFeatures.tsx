import { Feature } from "@/types"
import { customerFeatures } from "@/dataHelpers/customerFeatures"
import SingleCustomerFeature from "./SingleCustomerFeature"
function CustomerFeatures() {
  return (
   <div className="w-full lg:w-4/5  flex flex-col  ">
    {
      customerFeatures.map((feature:Feature)=><SingleCustomerFeature key={feature.title} feature={feature} />)
    }
   </div>
  )
}

export default CustomerFeatures