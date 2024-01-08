class ErrorHandler extends Error{
    constructor(message , statusCode , functionName , modelName , controllerName){
        super(message);
        console.log(statusCode, functionName , modelName  , controllerName)
        this.statusCode = statusCode,
        this.functionName = functionName,
        this.modelName = modelName,
        this.controllerName = controllerName,
        Error.captureStackTrace(this , this.constructor)
    }
}

module.exports = ErrorHandler