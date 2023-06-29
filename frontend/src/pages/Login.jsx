import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }
  const toggle = () => {
    setShow(!show)
  }
  return (
    <form className="max-w-[460px] mx-auto px-[30px]" onSubmit={handleSubmit}>
      <h3 className="mb-[20px]">Login</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <div className="relative">
        <input 
          type={show ? "text" : "password"} 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
        <span className='absolute top-[10px] right-[10px] cursor-pointer material-symbols-outlined cursor-pointer' onClick={toggle}>{show ? "Visibility" : "Visibility_off"}</span>
      </div>

      <button disabled={isLoading}>{isLoading ? "Please wait..." : "Login"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login