import Identity from "./Identity"
import Navbar from "./Navbar"

function Header() {
  return (
    <header className="w-full lg:w-11/12 p-4 flex justify-between items-center">
        <Identity/>
        <Navbar/>
    </header>
  )
}

export default Header