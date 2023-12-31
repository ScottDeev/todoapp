import {format} from 'date-fns'
import {useTodoContext} from '../hooks/useTodoContext'
import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { TODOS } from '../utils/api'
import DeletePopup from './DeletePopup'
export default function TodoDetails({todo}) {
  const [showDelPop, setShowDelPop] = useState(false)
  const {dispatch} = useTodoContext()
  const {user} = useAuthContext()
  const handleCheckboxChange = async () => {
    const res = await fetch(TODOS + todo._id, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todo.completed }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await res.json()

    if(res.ok){
      dispatch({type:'UPDATE_TODO', payload: json})
    }
  };
const toggle = () => {
  setShowDelPop(!showDelPop)
}
  return (
    <div className="relative box rounded-[20px] p-[30px] flex flex-col gap-[20px] bg-black text-white">
      <div className="flex items-start gap-[10px]">
        <h2 className='uppercase font-[700] text-[20px]'>{todo.title}</h2>
      </div>
      <p>{todo.description}</p>
      <div className="flex gap-[20px]">
        <div>
        <span>Start Date</span>
        <p>{format(new Date(todo.startDate ), 'EEEE, do MMMM, yyyy')}</p>
        </div>
        <div>
        <span>Due Date</span>
        <p>{format(new Date(todo.dueDate), 'EEEE, do MMMM, yyyy')}</p>
        </div>
      </div>
      <div className='flex gap-[10px]'>
        <span>Completed</span>
        <input type="checkbox" className="h-[20px] w-[20px] mt-[-1px] cursor-pointer" name="" id="" checked={todo.completed} onChange={handleCheckboxChange} />
      </div>
      <span className='absolute top-[20px] right-[20px] cursor-pointer material-symbols-outlined cursor-pointer' onClick={toggle}>delete</span>
      {showDelPop && <DeletePopup todo={todo} toggle={toggle}/>}
    </div>
  )
}