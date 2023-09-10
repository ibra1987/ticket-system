import Image from "next/image";
import Hero from "./components/home/Hero";
import CustomerFeatures from "./components/home/CustomerFeatures";
import ProfessionalFeaturesComponent from "./components/home/ProfessionalFeatures";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between ">
      <section className="w-full bg-white flex justify-center items-center lg:p-20">
      <Hero/>
      </section>
     
       <section className="w-full p-4  flex flex-col justify-center items-center bg-blue-50  ">
         <h2 className="w-full text-5xl text-center font-extrabold p-10 mb-6 text-gray-600 ">
         Your Professional Needs, Covered!
        </h2>
        <ProfessionalFeaturesComponent/>
       </section>
       <section className="w-full flex flex-col items-center justify-center bg-white ">
        <h2 className="w-full text-5xl text-center font-extrabold p-10 mb-6 text-gray-800">
          Benefits as a customer
        </h2>
       <div className="flex flex-col lg:flex-row w-full  lg:w-4/5 justify-center items-center   p-6 mb-10">
       <div className="lg:w-full w-1/2 p-2 border rounded bg-white ">
       <Image alt="happy_customer" src={"/images/happy_customer.jpg" } width={1920} height={2880} className="rounded hidden lg:block "/>
       </div>
      <CustomerFeatures/>
       </div>
       </section>
       <section className="w-full flex flex-col justify-start items-center  bg-gradient-to-l from-cyan-300 via-pink-200 to gray-200 p-10">
          <h2 className="w-full text-5xl text-center font-extrabold p-10 mb-6 text-gray-800">
              Testimonials
          </h2>
          <Testimonials/>
       </section>

    </main>
  )
}
