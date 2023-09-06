import Image from "next/image";
import Hero from "./components/home/Hero";
import CustomerFeatures from "./components/home/CustomerFeatures";
import ProfessionalFeaturesComponent from "./components/home/professionalFeatures";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between ">
      <section className="w-full bg-gradient-to-b from-gray-50 to-white flex justify-center items-center p-20">
      <Hero/>
      </section>
      <section className="w-full flex flex-col items-center justify-center ">
        <h2 className="w-full text-5xl text-center font-extrabold p-10 mb-6 text-gray-800">
          Benefits as a customer
        </h2>
       <div className="flex w-4/5 justify-center items-center bg-white p-6 mb-10">
       <div className="w-1/2 p-2 border rounded ">
       <Image alt="happy_customer" src={"/images/happy_customer.jpg" } width={1920} height={2880} className="rounded "/>
       </div>
      <CustomerFeatures/>
       </div>
       </section>
       <section className="w-full p-4 bg-white h-96 ">
         <h2 className="w-full text-5xl text-center font-extrabold p-10 mb-6 text-gray-800 ">
         Your Professional Needs, Covered!
        </h2>
        <ProfessionalFeaturesComponent/>
       </section>

    </main>
  )
}
