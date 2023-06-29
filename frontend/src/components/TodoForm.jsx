import { useState } from "react"

import {useTodoContext} from '../hooks/useTodoContext'
import { useAuthContext } from "../hooks/useAuthContext";
import { TODOS } from "../utils/api";
export default function TodoForm() {
  const { dispatch } = useTodoContext()
  const {user} = useAuthContext()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const todo = {title, description, startDate, dueDate, completed:false}
    
    const response = await fetch(TODOS, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setDescription('')
      setStartDate('')
      setDueDate('')
      dispatch({type: 'CREATE_TODO', payload:json})
      setIsLoading(false)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
    <h3>Add a New Todo</h3>

    <label>Todo Title:</label>
    <input 
      type="text" 
      onChange={(e) => setTitle(e.target.value)} 
      value={title}
      className={emptyFields.includes('title') ? 'error' : ''}
    />

    <label>Description:</label>
    <textarea 
      type="text" 
      onChange={(e) => setDescription(e.target.value)} 
      value={description}
      className={emptyFields.includes('description') ? 'error' : ''}
    />

    <label>Start Date</label>
    <input 
      type="date" 
      onChange={(e) => setStartDate(e.target.value)} 
      value={startDate}
      className={emptyFields.includes('startDate') ? 'error' : ''}
    />

    <label>Due Date</label>
    <input 
      type="date" 
      onChange={(e) => setDueDate(e.target.value)} 
      value={dueDate}
      className={emptyFields.includes('dueDate') ? 'error' : ''}
    />

    <button disabled={isLoading}>{isLoading ? "Adding..." : "Add Workout"}</button>
    {error && <div className="error">{error}</div>}
  </form>
  )
}