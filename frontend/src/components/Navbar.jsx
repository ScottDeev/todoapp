import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full fixed bg-[#000000]">
      <nav className="flex py-[20px] px-[30px]">
        <Link className="text-[30px] text-white font-[700]" to='/'>TodoTracker</Link>
      </nav>
    </header>
  )
}