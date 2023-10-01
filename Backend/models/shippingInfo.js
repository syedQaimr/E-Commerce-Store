const moongose = require('mongoose')

const { Schema } = moongose

const shippingInfoSchema = new Schema({
    country: { type: String, required: [true, "Please enter country"] },
    city: { type: String, required: [true, "Please enter city"] },
    state : { type : String , required: [true, "Please enter state"]},
    address: { type: String, required: [true, "Please enter postalAddress"]},  
    phoneNumber: { type: Number, required: [true, "Please enter phoneNumber"]},  
    pinCode : { type : Number , required: [true, "Please enter PIN CODE"]},



},
    { timestamps: true }
)

module.exports = moongose.model('ShippingInfo', shippingInfoSchema, 'ShippingInfoes')