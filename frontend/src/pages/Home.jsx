import { useEffect } from "react"
import TodoDetails from "../components/TodoDetails"
import { useTodoContext } from "../hooks/useTodoContext"
import TodoForm from '../components/TodoForm'
import { useAuthContext } from "../hooks/useAuthContext"
import { TODOS } from "../utils/api"

export default function Home() {
const {todos, dispatch} = useTodoContext()
const {user} = useAuthContext()

useEffect(() => {
  const fetchWorkouts = async () => {
    try{
      const res = await fetch(TODOS, {
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await res.json()
      if(res.ok){
        dispatch({type: 'SET_TODOS', payload: json})
      }
    }catch(err){
      console.log(err);
    }
  }
  fetchWorkouts()
}, [dispatch])
  return (
    <div className="flex flex-col-reverse md:flex-row md:max-w-[1200px] md:px-0 px-[30px] mx-auto md:gap-[5%] gap-[30px] mb-[50px]">
      <div className="flex flex-col gap-[10px] md:w-[55%]">
        {
          todos && todos.map(todo => (
            <TodoDetails key={todo._id} todo={todo}/>
          ))
        }
      </div>
      <div className="md:w-[40%]">
        <TodoForm/>
      </div>
    </div>
  )
}