import { Feature } from "@/types"

function SingleProfessionalFeature({feature}:{feature:Feature}) {
  return (
    <div>
       <h4>{feature.title} </h4>
       <p>{feature.description}</p>
    </div>
  )
}

export default SingleProfessionalFeature