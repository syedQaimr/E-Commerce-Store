const ErrorHandler = require('../utils/errorhandler');
const {STRIPE_SECRET_KEY , STRIPE_API_KEY} = require('../config/index');


const stripe = require("stripe")(STRIPE_SECRET_KEY);


const paymentController = {
    // Process payment on payment the amount

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
            return next(new ErrorHandler(error.message, 500, "processPayemnt", "", "paymentController"));


        }
    },
        // Get Stripe API KEY

    async sendStripeApiKey(req, res, next) {
        try {
            console.log(STRIPE_API_KEY)
           res.status(200).json({ success: true, stripeApiKey : STRIPE_API_KEY });

        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "sendStripeApiKey", "", "paymentController"));

        }
    }
}

module.exports = paymentController;
