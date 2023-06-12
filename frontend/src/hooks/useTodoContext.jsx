import { useContext } from "react";
import { TodoContext } from "../context/TodoConext";

export const useTodoContext = () => {
  const context = useContext(TodoContext)

  if(!context){
    throw Error('useTodoContext must be used inside a todoContextProvider')
  }
  return context
}