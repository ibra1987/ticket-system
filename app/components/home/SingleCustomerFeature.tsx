import { Feature } from '@/types'

function SingleCustomerFeature({feature}:{feature:Feature}) {
  return (
    <div className="p-2 shadow-sm m-2 flex flex-col justify-start items-start">
        <h4 className=" m-1 font-bold text-gray-700 ">{feature.title} </h4>
        <p className='text-gray-800 text-sm'>{feature.description} </p>
    </div>
  )
}

export default SingleCustomerFeature