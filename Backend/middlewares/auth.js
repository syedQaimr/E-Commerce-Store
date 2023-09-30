
const JWTService = require('../utils/jwtToken')
const ErrorHandler = require('../utils/errorhandler')
const {ACCESS_TOKEN_SECRET} = require('../config/index')

const User = require('../models/user');
const jwt = require('jsonWebToken');


const auth = async (req , res , next)=>{

  try{
    const {token} = req.cookies;
    const decodedData = jwt.verify(token , ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decodedData.id)
    next()  
  }
  catch(error){
    return next(new ErrorHandler("Please Login to access this resource" , 401));
  }
   
}

module.exports =  auth 


