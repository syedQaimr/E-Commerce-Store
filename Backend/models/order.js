const moongose = require('mongoose')

const { Schema } = moongose

const orderSchema = new Schema({

    shippingInfo: { type: moongose.SchemaTypes.ObjectId, ref: 'ShippingInfo' },
    orderItems: [
        {
            name: { type: String, required: true, },
            price: { type: Number, required: true, },
            quantity: { type: Number, required: true, },
            image: { type: String, required: true, },
            product: { type: moongose.Schema.ObjectId, ref: "Product", required: true, },
        },
    ],
    user: { type: moongose.Schema.ObjectId, ref: "User", required: true, },
    paymentInfo: { type: moongose.Schema.ObjectId, ref: "PaymentInfo", required: true, },

    itemsPrice: { type: Number, required: true, default: 0, },
    taxPrice: { type: Number, required: true, default: 0, },
    shippingPrice: { type: Number, required: true, default: 0, },
    totalPrice: { type: Number, required: true, default: 0, },
    orderStatus: { type: String, required: true, default: "Processing", },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now, },

},
    { timestamps: true }
)

module.exports = moongose.model('Order', orderSchema, 'Orders')