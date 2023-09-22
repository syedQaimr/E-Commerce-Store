const moongose = require('mongoose')

const { Schema } = moongose

const productReviewSchema = new Schema({
   
   
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: { type: String, required: true, },
            rating: { type: Number, default: 0 },
            Comment: { type: String, required: true, },

        }
    ],
   
},
    { timestamps: true }
)

module.exports = moongose.model('ProductReview', productReviewSchema, 'RroductReviews')