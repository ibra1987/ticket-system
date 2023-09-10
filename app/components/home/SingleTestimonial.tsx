import { Testimonial } from "@/types"
import Image from "next/image"

function SingleTestimonial({testimonial}:{testimonial:Testimonial}) {
  return (
    <div className="flex flex-col justify-start items-center bg-gray-50 text-gray-400 border shadow-md rounded p-4 py-6">
        <div className="w-full flex justify-start items-center">
        <div className="rounded-full p-4 border-2 w-24 h-24 relative">
            <Image alt={testimonial.name} src={testimonial.photo}  fill={true} className="rounded-full"/>

        </div>
    
            <div className="flex flex-col justify-start items-start m-2 text-sm text-emerald-400">
            <span className="font-bold">{testimonial.name} </span>
            <span className="text-gray-400">{testimonial.title} </span>
            </div>
        </div>
        
        <p className="p-4 indent-3 leading-5 text-sm">
            {testimonial.body}
        </p>
    </div>
  )
}

export default SingleTestimonial