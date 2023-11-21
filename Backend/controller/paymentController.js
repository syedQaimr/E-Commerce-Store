const ErrorHandler = require('../utils/errorhandler');
const {STRIPE_SECRET_KEY , STRIPE_API_KEY} = require('../config/index');


const stripe = require("stripe")(STRIPE_SECRET_KEY);


const paymentController = {
    async processPayemnt(req, res, next) {
        console.log( req.body.amount)
        try {

           const myPayment = await stripe.paymentIntents.create({ 
            amount : req.body.amount,
            payment_method_types: ['card'], 
            currency : 'inr',
            metadata: {
                compony :"Eccomerce",
            },
           });

           res.status(200).json({ success: true, client_secret: myPayment.client_secret });

        } catch (error) {
            console.log(error)
            return next(new ErrorHandler(error.message),500);

        }
    },
    async sendStripeApiKey(req, res, next) {
        try {
            console.log(STRIPE_API_KEY)
           res.status(200).json({ success: true, stripeApiKey : STRIPE_API_KEY });

        } catch (error) {
            return next(new ErrorHandler(error.message),500);
        }
    }
}

module.exports = paymentController;
