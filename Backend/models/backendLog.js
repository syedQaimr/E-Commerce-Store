const moongose = require('mongoose')

const { Schema } = moongose

const BackendLogSchema = new Schema({
   
    functionName: { type: String, required: true},
    controllerName: { type: String, required: true },
    modelName: { type: String},
    status : { type: Number, required: true },
    errorMessage :  { type: String, required: true },
    Active : { type: Boolean, required: true, default: true },
   
},
    { timestamps: true }
)

module.exports = moongose.model('BackendLog', BackendLogSchema, 'BackendLogs')