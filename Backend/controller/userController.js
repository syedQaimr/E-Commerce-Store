
const User = require('../models/user');
const ApiFeatures = require('../utils/ApiFeatures');
const ErrorHandler = require('../utils/errorhandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const fs = require('fs');
const { BACKEND_SERVER_PATH } = require('../config/index');

const userController = {
    async userRegister(req, res, next) {
        try {



            const { name, email, password, avatar } = req.body;

            const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64');

            const imagePath = `${Date.now()}-${name}.png`;




            try {
                fs.writeFileSync(`storage/${imagePath}`, buffer)
            } catch (error) {
                return next(new ErrorHandler(error.message, 500, "not available", "User", "userRegister"))
            }

            const user = new User({
                name,
                email,
                password,
                avatar: `${BACKEND_SERVER_PATH}/storage/${imagePath}`
            });



            await user.save();

            sendToken(user, 201, res)

        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "userRegister", "User", "userController"));
        }
    },

    async loginUser(req, res, next) {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(new ErrorHandler("Please Enter Email & Password", 400, "userlogin", "User", "userController"))
            }

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                console.log("Yes")
                return next(new ErrorHandler("Invalid email or password", 401, "userlogin", "User", "userController"));
            }

            const isPasswordMatched = await user.comparePassword(password);

            if (!isPasswordMatched) {
                return next(new ErrorHandler("Invalid email or password", 401, "userlogin", "User", "userController"));
            }

            if(!user.Active){
                return next(new ErrorHandler("Admin Remove You Kindly Contact us", 401, "userlogin", "User", "userController"));
            }


            sendToken(user, 200, res)
        }
        catch (error) {
            return next(new ErrorHandler(error.message, 500, "userlogin", "User", "userController"));

        }


    },

    async logOutUser(req, res, next) {

        try {
            res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
            res.status(200).json({ success: true, message: "Logged Out" });
        }
        catch (error) {
            return next(new ErrorHandler(error.message, 500, "logOutUser", "User", "userController"));
        }


    },

    async forgotPassword(req, res, next) {

        const user = await User.findOne({ email: req.body.email });



        if (!user) {
            return next(new ErrorHandler("User Not Found", 404, "forgotPassword", "User", "userController"))
        }

        const resetToken = user.getResetpasswordToken();



        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = resetToken;

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n  If you have not request this email then, please ignore it`;


        try {

            const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
            console.log(resetPasswordToken, "Token")


            await sendEmail({
                email: user.email,
                subject: "ecommerce password recovery",
                message,
            });

            res.status(200).json({ success: true, message: `Email send to ${user.email} successfully` });




        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500, "forgotPassword", "User", "userController"));
        }

    },

    async resetPassword(req, res, next) {

        try {

            const resetPasswordToken = crypto.createHash("sha256").update(req.body.token).digest("hex")
            const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
            console.log(resetPasswordToken)



            if (!user) {
                return next(new ErrorHandler("Resend Password Token is invalid or has been expired", 404, "resetPassword", "User", "userController"))
            }

            if (req.body.newPassword !== req.body.confirmPassword) {
                return next(new ErrorHandler("Password not matched", 404, "resetPassword", "User", "userController"))
            }


            user.password = req.body.newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;



            await user.save();

            res.status(200).json({ success: true, message: `Password Successfully Update` });
        }
        catch (error) {
            return next(new ErrorHandler(error.message, 500, "resetPassword", "User", "userController"));

        }
    },

    async getUserDeatisl(req, res, next) {

        try {

            const user = await User.findById(req.user.id);

            res.status(200).json({ success: true, user: user });
        }
        catch (error) {

            return next(new ErrorHandler("Systematic Error", 500, "getUserDeatisl", "User", "userController"));

        }



    },

    async updatePassword(req, res, next) {

        try {


            const user = await User.findById(req.user.id).select("+password");

            const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

            if (!isPasswordMatched) {
                return next(new ErrorHandler("old password is incorrect", 400, "updatePassword", "User", "userController"))
            }

            if (req.body.newPassword !== req.body.confirmPassword) {
                return next(new ErrorHandler("password does not match", 400, "updatePassword", "User", "userController"))
            }

            user.password = req.body.newPassword

            user.save();
            console.log(req.body.newPassword)

            sendToken(user, 200, res)
        }
        catch (error) {
            return next(new ErrorHandler(error.message, 500, "updatePassword", "User", "userController"));

        }
    },

    async updateProfile(req, res, next) {

        try {

            const { name, email, avatar } = req.body;

            const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64');

            const imagePath = `${Date.now()}-${name}.png`;

            try {
                fs.writeFileSync(`storage/${imagePath}`, buffer)
            } catch (error) {
                return next(error)
            }

            console.log(req.user._id, req.user.id)

            const newUserData = {
                name,
                email,
                avatar: `${BACKEND_SERVER_PATH}/storage/${imagePath}`
            }

            const user = await User.findByIdAndUpdate(req.user.id, newUserData, { new: true, runValidators: true, userFindAndModify: false });

            return res.status(200).json({ success: true });
        }
        catch (error) {
            return next(new ErrorHandler("Systematic Error", 500, "updateProfile", "User", "userController"))

        }

    },

    async getAllUser(req, res, next) {

        try {
            const users = await User.find();

            return res.status(200).json({ success: true, users });
        }
        catch (error) {
            return next(new ErrorHandler(error.message, 500, "getAllUser", "User", "userController"))

        }


    },

    async getUser(req, res, next) {

        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return next(
                    new ErrorHandler(`user does not exits with Id ${req.params.id}`, 400, "getUser", "User", "userController")
                )
            }

            return res.status(200).json({ success: true, user });
        }
        catch (error) {
            return next(new ErrorHandler(error.message, 500, "getUser", "User", "userController"))
        }

    },

    async updateUser(req, res, next) {

        try {

            const newUserData = {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
            }

            const user = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, userFindAndModify: false });

            if (!user) {
                return next(new ErrorHandler(`user does not exits with id: ${req.params.id}`, 400,"updateUser", "User", "userController"))
            }

            return res.status(200).json({ success: true });

        }
        catch (error) {
            return next(new ErrorHandler(error.message, 500,"updateUser", "User", "userController"))

        }

    },

    async deleteUser(req, res, next) {

        try{
            const user = await User.findById(req.params.id);
            if (!user) {
                return next(new ErrorHandler(`user does not exits with id: ${req.params.id}`,400 ,  "deleteUser", "User", "userController"))
            }
    
            user.Active = !user.Active;

            await user.save();

    
            return res.status(200).json({ success: true, message: "User Delete Successfully" });
        }
        catch(error)
        {
            return next(new ErrorHandler(error.message,500 ,  "deleteUser", "User", "userController"))

        }
       
    },
}

module.exports = userController;
