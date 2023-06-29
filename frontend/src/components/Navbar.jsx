import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from "../hooks/useLogout";
export default function Navbar() {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const handleClick = () =>{
    logout()
  }
  return (
    <header className="w-full fixed bg-[#000000] z-10">
      <nav className="flex flex-col sm:flex-row py-[20px] px-[30px] justify-between">
        <Link className="md:text-[30px] text-[25px] text-white font-[700]" to='/'>TodoTracker</Link>
        <div className="text-white flex items-center gap-[20px]">
        {user && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-[20px]">
              <span>{user.email}</span>
              <button  onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className="flex items-center gap-[20px]">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}