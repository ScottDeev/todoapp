import { useAuthContext } from '../hooks/useAuthContext'
import { useTodoContext } from '../hooks/useTodoContext'
import { TODOS } from '../utils/api'

export default function DeletePopup({todo, toggle}) {
  const {user} = useAuthContext()
  const {dispatch} = useTodoContext()

  const handleClick = async () => {
    const res = await fetch(TODOS + todo._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await res.json()

    if(res.ok){
      dispatch({type:'DELETE_TODO', payload: json})
    }
  }
  return (
    <div className='absolute top-[20px] right-[20px] z-1 bg-white text-black max-w-[200px] p-[20px] rounded-[10px] text-center flex flex-col gap-[10px]'>
      <span>Are you sure you want to delete?</span>
      <div className='flex justify-between'>
        <button className='py-[10px] px-[15px] rounded-[8px] bg-green-400' onClick={handleClick}>yes</button>
        <button className='py-[10px] px-[15px] rounded-[8px] bg-red-400' onClick={toggle}>cancel</button>
      </div>
    </div>
  )
}