const mongoose  = require("mongoose")
// Importing the MongoDB connection string from the config file
const {MONGODB_CONNECTION_STRING} = require('../config/index')


const dbConnect = async ()=>{
    try{
        // Using mongoose to connect to the MongoDB database
        const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`Database Connect to host: ${conn.connection.host}`)

    }
    catch(error){
        console.log(`Error: ${error}`)
    }
}

module.exports = dbConnect;