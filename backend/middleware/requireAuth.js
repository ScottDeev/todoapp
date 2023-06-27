const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async(req, res, next) => {
  const {authorization} = req.headers

  if(!authorization){
    return res.status(401).json({error: 'Authorization required'})
  }
  // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' Split and get the token
  const token = authorization.split(' ')[1]
  try{
    const {_id} = jwt.verify(token, process.env.SECRET)
    // User id attached to the request for use in tbe todoController
    req.user = await User.findOne({_id}).select('_id')
    next()
  }catch(error){
    res.status(400).json({error: 'Request not authorized'})
  }
}

module.exports = requireAuth