const moongose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { hash } = require('../config/index')
const { ACCESS_TOKEN_SECRET, } = require('../config/index')
const { JWT_EXPIRE_TIME, } = require('../config/index')
const jwt = require('jsonWebToken')
const crypto = require('crypto')




const { Schema } = moongose

const userSchema = new Schema({
    name: { type: String, required: [true, "Please enter name"] },
    email: { type: String, required: [true, "Please enter email"], unique: true, validate: [validator.isEmail, "Your Format is inCorrect"] },
    password: { type: String, required: [true, "Please enter password"], minLength: [8, "Password should be greater than 8 characters"], select: false },
    avatar: {type: String}
    ,
    role: {
        type: String,
        default: "user"
    },

    Active : { type: Boolean, required: true, default: true },


    resetPasswordToken: String,
    resetPasswordExpire: Date,


},
    { timestamps: true }
)

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);

    }
    catch (error) {
        console.log(error)
    }

})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, ACCESS_TOKEN_SECRET, { expiresIn: JWT_EXPIRE_TIME })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    console.log(enteredPassword, this.password , await bcrypt.compare(enteredPassword, this.password) )

    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetpasswordToken =  function () {

    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
   
}

module.exports = moongose.model('User', userSchema, 'Users')