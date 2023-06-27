const express = require('express')
const {getTodos, getTodo, createTodo, deleteTodo, updateTodo} = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// Authorization check
router.use(requireAuth)

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