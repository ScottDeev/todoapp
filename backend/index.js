require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/users')
const cors = require('cors')

// initialize express
const app = express();

// middleware
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// routes
app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 