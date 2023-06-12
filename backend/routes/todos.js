const express = require('express')
const {getTodos, getTodo, createTodo, deleteTodo, updateTodo} = require('../controllers/todoController')

const router = express.Router()

// Get all todos
router.get('/', getTodos);

// Get a single todo
router.get('/:id', getTodo);

// create a todo
router.post('/', createTodo);

// delete todo
router.delete('/:id', deleteTodo);

// update todo
router.patch('/:id', updateTodo);

module.exports = router