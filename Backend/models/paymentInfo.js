const moongose = require('mongoose')

const { Schema } = moongose

const paymentInfoSchema = new Schema({

    paymentInfo: { 
        id: { type: String,  required: true, },
        status: {  type: String,   required: true, }, 
    },
    paidAt: {type: Date, required: true, },
    Active : { type: Boolean, required: true, default: true },

},
    { timestamps: true }
)

module.exports = moongose.model('PaymentInfo', paymentInfoSchema, 'PaymentInfoes')