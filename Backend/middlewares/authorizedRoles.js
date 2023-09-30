
const ErrorHandler = require('../utils/errorhandler')

module.exports.authorizedRoles = (...roles)=>{


    return (req , res , next) =>{
      if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource` , 403));
      }
      next()
    }
  
  
   
};
