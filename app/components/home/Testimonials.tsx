import { testimonials } from "@/dataHelpers/Testimonials"
import { Testimonial } from "@/types"
import SingleTestimonial from "./SingleTestimonial"

function Testimonials() {
  return (
    <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t:Testimonial)=><SingleTestimonial key={t.name} testimonial={t}/>)}
    </div>
  )
}

export default Testimonials