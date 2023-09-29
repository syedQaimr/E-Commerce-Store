
const User = require('../models/user');
const ApiFeatures = require('../utils/ApiFeatures');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const userController = {
    async userRegister(req, res, next) {
        try {

            const { name , email , password } = req.body;

            const user = new User({
                name,
                email,
                password,
                avatar: {
                    public_id: "this is sample id",
                    url: "profilepictureUrl"
                }
            });

           
           
            await user.save();
           
            sendToken(user , 201 , res)

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async loginUser(req , res , next){

        const {email , password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Please Enter Email & Password", 400))
        }

        const user = await User.findOne({ email }).select("+password");

        if(!user){
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

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n  If you have not request this email then, please ignore it`;

        try{

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

            return next(ErrorHandler(error.message , 505));
        }

     },

     async resetPassword(req , res , next){

        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
        const user = await User.findOne({resetPasswordToken , resetPasswordExpire:{ $gt : Date.now()}});



        if(!user){
            return next(new ErrorHandler("Resend Password Token is invalid or has been expired" , 404))
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("Password not matched" , 404) )
        }

        console.log(req.body.password)

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;



        await user.save();

        res.status(200).json({ success: true, message : `Password Successfully Update`});

     },

     async getUserDeatisl(req,res,next){
        const user = await User.findById(req.user.id);

        res.status(200).json({ success: true, user :user});


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

        sendToken(user , 200 , res)
     },

     async updateProfile(req,res,next){

        const newUserData ={
            name: req.body.name,
            email: req.body.email,
        }

        const user = User.findByIdAndUpdate(req.user.id , newUserData , {new: true , runValidators : true , userFindAndModify: false});

        return res.status(200).json({ success: true});
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
