const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
  title:{
    type: String,
    required:true
  },
  description:{
    type: String,
    required: true
  },
  startDate:{
    type: String,
    required: true
  },
  dueDate:{
    type: String,
    required: true
  },
  completed:{
    type: Boolean
  },
  user_id:{
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)