import { professionalFeatures } from "@/dataHelpers/ProfessionalFeatures"
import { Feature } from "@/types"
import SingleProfessionalFeature from "./SingleProfessionalFeature"

function ProfessionalFeaturesComponent() {
  return (
    <div>
        {
            professionalFeatures.map((feature:Feature)=><SingleProfessionalFeature feature={feature}/>)
        }

    </div>
  )
}

export default ProfessionalFeaturesComponent