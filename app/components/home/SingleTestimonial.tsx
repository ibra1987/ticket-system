import { Testimonial } from "@/types";
import Image from "next/image";

function SingleTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col justify-start items-center bg-gray-50 text-gray-400 border border-blue-100 shadow-md rounded p-4 py-6">
      <div className="w-full flex justify-start items-center border-b p-2">
        <div className="border-blue-200 border-2 rounded-full  ">
          <div className="rounded-full  w-16 h-16 relative">
            <Image
              alt={testimonial.name}
              src={testimonial.photo}
              fill={true}
              className="rounded-full border "
            />
          </div>
        </div>

        <div className="flex flex-col justify-start items-start m-2 text-sm">
          <span className="font-bold  text-blue-500 ">{testimonial.name} </span>
          <span className="text-gray-400">{testimonial.title} </span>
        </div>
      </div>

      <p className="p-4 indent-3 leading-5 text-sm">{testimonial.body}</p>
    </div>
  );
}

export default SingleTestimonial;
