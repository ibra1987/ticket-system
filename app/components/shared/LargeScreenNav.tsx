"use client";
import Link from "next/link"
import { navLinks } from "@/dataHelpers/NavLinks"
import { NavLink } from "@/types"
import { usePathname } from 'next/navigation'

const linkClass = "font-medium p-2 border-b border-white hover:border-gray-300"
const activeClass = " font-medium p-2  border-b border-gray-200"
const featuredLink = "px-6 py-2 bg-blue-400 text-white rounded"
function LargeScreenNav() {
    const pathname = usePathname()
    console.log(pathname)

  return (
           <nav className="hidden lg:flex justify-center items-center space-x-6    ">

            {navLinks.map((navLink:NavLink,index:number)=>( 
            <Link className={pathname === `${navLink.path}` ? activeClass
            : navLink.name === "Sign Up" ? featuredLink : linkClass}
            key={`${navLink.name}-${index}`} 
            href={navLink.path}>
                {navLink.name} 
                </Link>))}
            
            </nav>
              )
}

export default LargeScreenNav