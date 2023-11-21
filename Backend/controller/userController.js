
const User = require('../models/user');
const ApiFeatures = require('../utils/ApiFeatures');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const fs = require('fs');
const {BACKEND_SERVER_PATH} = require('../config/index');

const userController = {
    async userRegister(req, res, next) {
        try {

            const { name , email , password , avatar } = req.body;

            const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") , 'base64');

            const imagePath = `${Date.now()}-${name}.png`;
    
            try {
                fs.writeFileSync(`storage/${imagePath}` , buffer)
            } catch (error) {
                return next(error)
            }

            const user = new User({
                name,
                email,
                password,
                avatar : `${BACKEND_SERVER_PATH}/storage/${imagePath}`
            });

           
           
            await user.save();
           
            sendToken(user , 201 , res)

        } catch (error) {
            return next(new ErrorHandler(error.message),500);
        }
    },

    async loginUser(req , res , next){

        const {email , password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Please Enter Email & Password", 400))
        }

        const user = await User.findOne({ email }).select("+password");

        if(!user){
            console.log("Yes")
            return next(new ErrorHandler("Invalid email or password"),401);
        }
        
        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password"),401);
        }


        sendToken(user , 200 , res)

       
    },

    async logOutUser(req , res , next){

       res.cookie("token" , null , {expires : new Date(Date.now()), httpOnly : true});
       res.status(200).json({ success: true, message : "Logged Out"});

    },

    async forgotPassword(req , res , next){

        const user = await User.findOne({email : req.body.email});



        if(!user){
            return next(new ErrorHandler("User Not Found" , 404))
        }

        const resetToken = user.getResetpasswordToken();



        await user.save({validateBeforeSave : false});

        const resetPasswordUrl = resetToken;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n  If you have not request this email then, please ignore it`;
        

        try{

            const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
            console.log(resetPasswordToken , "Token")


                await sendEmail({
                    email: user.email,
                    subject : "ecommerce password recovery",
                    message,
                });

                res.status(200).json({ success: true, message : `Email send to ${user.email} successfully`});




        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({validateBeforeSave : false});

            return next(new ErrorHandler(error.message , 505));
        }

     },

     async resetPassword(req , res , next){

        console.log(req.body.token , req.body.confirmPassword , req.body.newPassword)
        const resetPasswordToken = crypto.createHash("sha256").update(req.body.token).digest("hex")
        const user = await User.findOne({resetPasswordToken , resetPasswordExpire:{ $gt : Date.now()}});
        console.log(resetPasswordToken)



        if(!user){
            return next(new ErrorHandler("Resend Password Token is invalid or has been expired" , 404))
        }

        if(req.body.newPassword !== req.body.confirmPassword){
            return next(new ErrorHandler("Password not matched" , 404) )
        }

        console.log(req.body.password)

        user.password = req.body.newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;



        await user.save();

        res.status(200).json({ success: true, message : `Password Successfully Update`});

     },

     async getUserDeatisl(req,res,next){
      
        try{

            const user = await User.findById(req.user.id);

            res.status(200).json({ success: true, user :user});
        }
        catch(error){

            return next(new ErrorHandler("Systematic Error",500));

        }
       


     },

     async updatePassword(req,res,next){
        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatched){
            return next(new ErrorHandler("old password is incorrect" , 400))
        }

        if(req.body.newPassword !== req.body.confirmPassword){
            return next(new ErrorHandler("password does not match" , 400))
        }

        user.password = req.body.newPassword
        
        user.save();
        console.log(req.body.newPassword)

        sendToken(user , 200 , res)
     },

     async updateProfile(req,res,next){

    try{ 

        const { name , email  , avatar } = req.body;

        const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") , 'base64');

        const imagePath = `${Date.now()}-${name}.png`;

        try {
            fs.writeFileSync(`storage/${imagePath}` , buffer)
        } catch (error) {
            return next(error)
        }

        console.log(req.user._id , req.user.id)

    const newUserData ={
            name,
            email,
            avatar : `${BACKEND_SERVER_PATH}/storage/${imagePath}`
        }

        const user = await User.findByIdAndUpdate(req.user.id , newUserData , {new: true , runValidators : true , userFindAndModify: false});

        return res.status(200).json({ success: true});}
        catch(error){
            return next(new ErrorHandler("Systematic Error" , 500))

        }
       
     },

     async getAllUser(req,res,next){

        const users = await User.find();

        return res.status(200).json({ success: true , users});
     },

     async getUser(req,res,next){

        const user = await User.findById(req.params.id);

        if(!user){
            return next(
                new ErrorHandler(`user does not exits with Id ${req.params.id}`)
            )
        }

        return res.status(200).json({ success: true , user});
     },

     async updateUser(req,res,next){

        const newUserData ={
            name: req.body.name,
            email: req.body.email,
            role : req.body.role,
        }

        const user = await User.findByIdAndUpdate(req.params.id , newUserData , {new: true , runValidators : true , userFindAndModify: false});

        if(!user){
            return next(new ErrorHandler(`user does not exits with id: ${req.params.id}`))
        }

        return res.status(200).json({ success: true});
     },

     async deleteUser(req,res,next){

        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`user does not exits with id: ${req.params.id}`))
        }

        await user.deleteOne()

        return res.status(200).json({ success: true , message : "User Delete Successfully" });
     },
}

module.exports = userController;
