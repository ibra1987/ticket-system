import Identity from "./Identity"
import Navbar from "./Navbar"

function Header() {
  return (
    <header className="w-full  p-4 flex justify-center bg-white border border-b">
        <div className="w-full lg:w-11/12 flex justify-between items-center">
        <Identity/>
        <Navbar/>
        </div>
    </header>
  )
}

export default Header