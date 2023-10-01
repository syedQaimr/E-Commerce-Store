const {Cookie_Expire} = require('../config/index')

const sendToken = (user , statusCode , res)=>{
    const token = user.getJWTToken();

    
    const options = {
        expires: new Date(
            Date.now() + Cookie_Expire * 24 * 60 * 60 * 1000
        ),
        httpOnly : true
    };

    res.status(statusCode).cookie("token" , token , options).json({ success: true, token  , user});
}

module.exports = sendToken