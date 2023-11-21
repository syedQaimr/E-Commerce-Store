const moongose = require('mongoose')

const { Schema } = moongose

const productSchema = new Schema({
    name: { type: String, required: [true, "Please enter name"] },
    description: { type: String, required: [true, "Please enter description"] },
    price: { type: Number, required: [true, "Please enter price"] },
    ratings: { type: Number, default: 0 },
    category: { type: String, required: [true, "Please enter category"] },
    stock: { type: Number, required: [true, "Please enter stock"] },
    review : {type : moongose.SchemaTypes.ObjectId , ref : 'ProductReview'},
    user : {type : moongose.SchemaTypes.ObjectId , ref : 'User'},

    
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    Active : { type: Boolean, required: true, default: true },

},
    { timestamps: true }
)

module.exports = moongose.model('Product', productSchema, 'Products')