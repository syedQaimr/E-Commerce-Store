const ErrorHandler = require('../utils/errorhandler');

const FrontendError = require('../models/frontendLog');


const frontendErrorController = {
    async storeError(req, res, next) {

        const { errorInfo, error } = req.body;
        const firstLine = errorInfo.componentStack.split('\n')[1].trim();

        console.log(String(firstLine));

        try {




            const frontendError = new FrontendError({
                errorInfo,
                error
            });

            await frontendError.save();

            console.log("Error Successfully Store")


            res.status(200).json({ success: true });

        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "storeError", "FrontendError", "frontendErrorController"));


        }
    },

}

module.exports = frontendErrorController;
