import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  const toggle = () => {
    setShow(!show)
  }
  return (
    <form className="max-w-[460px] px-[30px] mx-auto" onSubmit={handleSubmit}>
      <h3 className="mb-[20px]">Sign Up</h3>
      
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

      <button disabled={isLoading}>{isLoading ? "Please wait..." : "Sign Up"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup