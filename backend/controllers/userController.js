const mongoose = require('mongoose')
const User = require('../models/userModel')
const createToken = require('../utils/createToken')

const signupUser = async(req, res) => {
const {email, password} = req.body
// signup user
try{
  const user = await User.signup(email, password)
  // create token
  const token = createToken(user._id)
  // send response if successful
  res.status(200).json({email, token})
}catch(error){
  // throw error if not successful
  res.status(400).json({error:error.message})
}

}
const loginUser = async(req, res) => {
  const {email, password} = req.body
// login user
try{
  const user = await User.login(email, password)
  // create token
  const token = createToken(user._id)
  // send response if successful
  res.status(200).json({email, token})
}catch(error){
  // throw error if not successful
  res.status(400).json({error:error.message})
}
}

module.exports = {loginUser, signupUser}