const dotenv = require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const Refresh_TOKEN_SECRET = process.env.Refresh_TOKEN_SECRET
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH
const hash = process.env.hash
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME
const SMT_SERVICE = process.env.SMT_SERVICE
const Cookie_Expire = process.env.Cookie_Expire
const SMPT_MAIL = process.env.SMPT_MAIL
const SMPT_PASSWORD = process.env.SMPT_PASSWORD
const SMPT_HOST = process.env.SMPT_HOST
const SMPT_PORT = process.env.SMPT_PORT


module.exports = {
    PORT,
    MONGODB_CONNECTION_STRING,
    ACCESS_TOKEN_SECRET,
    Refresh_TOKEN_SECRET,
    BACKEND_SERVER_PATH,
    hash,
    JWT_EXPIRE_TIME,
    Cookie_Expire,
    SMT_SERVICE,
    SMPT_MAIL,
    SMPT_PASSWORD,
    SMPT_HOST,
    SMPT_PORT,

}