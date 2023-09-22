const express = require('express')
const app = express()
const {PORT} = require('./config/index')
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');



const dbConnect = require('./database/index');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const corsOptions = {
  credentials : true,
  origin : ['http://localhost:3000']
}
app.use(cors(corsOptions));

app.use(express.json({limit: "50mb"}));

app.use(cookieParser());


app.use(router);






dbConnect();
// app.use("/storage", express.static("storage"));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.use(errorHandler)