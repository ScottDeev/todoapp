const mongoose = require('mongoose')
const Todo = require('../models/todoModel')

// Get all todos
const getTodos = async (req, res) => {
  const user_id = req.user._id
  const Todos = await Todo.find({user_id}).sort({createdAt: -1})
  res.status(200).json(Todos)
}

// Get a single todo
const getTodo = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such todo'})
  }

  const todo = await Todo.findById(id)

  if(!todo){
    return res.status(404).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

// Create a todo
const createTodo = async (req, res) => {
  const {title, description, startDate, dueDate, completed} = req.body
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!startDate) {
    emptyFields.push('startDate')
  }
  if (!dueDate) {
    emptyFields.push('dueDate')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add doc to db
  try{
    const user_id = req.user._id
    const todo = await Todo.create({title, description, startDate, dueDate, completed, user_id})
    res.status(200).json(todo)
  }catch(err){
    console.log(err);
  }
}

// delete todo
const deleteTodo = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such todo'})
  }

  const todo = await Todo.findByIdAndDelete({_id:id})

  if(!todo){
    return res.status(404).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

// update todo
const updateTodo = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such todo'})
  }

  const todo = await Todo.findByIdAndUpdate({_id:id}, {
    ...req.body
  })

  if(!todo){
    return res.status(404).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}
module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo
}