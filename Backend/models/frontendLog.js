const mongoose = require('mongoose');

const { Schema } = mongoose;

const FrontendErrorSchema = new Schema({
    error: { type: String, required: true },
    errorInfo: { type: Schema.Types.Mixed },
});

module.exports = mongoose.model('FrontendError', FrontendErrorSchema, 'FrontendErrors');