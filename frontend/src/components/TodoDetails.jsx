import {format} from 'date-fns'
import {useTodoContext} from '../hooks/useTodoContext'
import { useState } from "react"

export default function TodoDetails({todo}) {
  const {dispatch} = useTodoContext()
  const handleCheckboxChange = async () => {
    const res = await fetch('/api/todos/' + todo._id, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todo.completed }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()

    if(res.ok){
      dispatch({type:'UPDATE_TODO', payload: json})
    }
  };
  const handleClick = async () => {
    const res = await fetch('/api/todos/' + todo._id, {
      method: 'DELETE'
    })
    const json = await res.json()

    if(res.ok){
      dispatch({type:'DELETE_TODO', payload: json})
    }
  }
  return (
    <div className="relative box rounded-[20px] p-[30px] flex flex-col gap-[5px] bg-black text-white">
      <div className="flex items-start gap-[10px]">
        <h2 className='uppercase font-[700] text-[20px]'>{todo.title}</h2>
        <input type="checkbox" className="h-[20px] w-[20px] mt-[-1px]" name="" id="" checked={todo.completed} onChange={handleCheckboxChange} />
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
      <span className='absolute top-[20px] right-[20px] cursor-pointer material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}