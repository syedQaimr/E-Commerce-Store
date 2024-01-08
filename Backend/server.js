const express = require('express')
const app = express()
const {PORT} = require('./config/index')
// const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const frontendLogRoute = require('./routes/frontendLogRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');
const productRoute = require('./routes/productRoute');
const reportRoute = require('./routes/reportRoute');
const reviewRoute = require('./routes/reviewRoute');
const userRoute = require('./routes/userRoute');





const dbConnect = require('./database/index');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const corsOptions = {
  credentials : true,
  origin : ['http://localhost:3000' , 'http://192.168.111.1:3000']
}
app.use(cors(corsOptions));

app.use(express.json({limit: "50mb"}));

app.use(cookieParser());


// app.use(router);
app.use('/',frontendLogRoute)
app.use('/',orderRoute)
app.use('/',paymentRoute)
app.use('/',productRoute)
app.use('/',reportRoute)
app.use('/',reviewRoute)
app.use('/',userRoute)






dbConnect();
// app.use("/storage", express.static("storage"));
app.use("/storage", express.static("storage"));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.use(errorHandler)