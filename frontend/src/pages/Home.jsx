import { useEffect } from "react"
import TodoDetails from "../components/TodoDetails"
import { useTodoContext } from "../hooks/useTodoContext"
import TodoForm from '../components/TodoForm'
export default function Home() {
const {todos, dispatch} = useTodoContext()


useEffect(() => {
  const fetchWorkouts = async () => {
    try{
      const res = await fetch('/api/todos')
      const json = await res.json()
      console.log(json);
      dispatch({type: 'SET_TODOS', payload: json})
    }catch(err){
      console.log(err);
    }
  }

  fetchWorkouts()
}, [dispatch])
  return (
    <div className="flex max-w-[1200px] mx-auto gap-[5%] mb-[50px]">
      <div className="flex flex-col gap-[10px] w-[55%]">
        {
          todos && todos.map(todo => (
            <TodoDetails key={todo._id} todo={todo}/>
          ))
        }
      </div>
      <div className="w-[40%]">
        <TodoForm/>
      </div>
    </div>
  )
}