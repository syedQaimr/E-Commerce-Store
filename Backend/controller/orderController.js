
const Order = require('../models/order');
const PaymentInfo = require('../models/paymentInfo');
const ShippingInfo = require('../models/ShippingInfo');
const Product = require('../models/product');


const ApiFeatures = require('../utils/ApiFeatures');
const ErrorHandler = require('../utils/errorhandler')

const orderController = {
    async newOrder(req, res, next) {

        try {


            const {
                shippingInfo,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            } = req.body;


            const newShippingInfo = new ShippingInfo(shippingInfo);
            const newpaymentInfo = new PaymentInfo({ paymentInfo, paidAt: Date.now() });

            await newShippingInfo.save();
            await newpaymentInfo.save();



            const order = new Order({
                shippingInfo: newShippingInfo._id,
                orderItems,
                paymentInfo: newpaymentInfo._id,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                user: req.user._id,
            });

            await order.save();

            res.status(200).json({ success: true, order });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    },

    async getSingleOrder(req, res, next) {

        try {
            const order = await Order.findById(req.params.id).populate("user", "name email");

            if (!order) {
                return next(new ErrorHandler("Order not found with this Id", 404));
            }

            res.status(200).json({ success: true, order, });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async myOrder(req, res, next) {

        try {
            const orders = await Order.find({ user: req.user._id });

            res.status(200).json({ success: true, orders, });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async getAllOrder(req, res, next) {

        try {
            const orders = await Order.find();

            let totalAmount = 0;

            orders.forEach((order) => {
                totalAmount += order.totalPrice;
            });

            res.status(200).json({ success: true, totalAmount, orders, });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    },

    async updateOrder(req, res, next) {

        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return next(new ErrorHandler("Order not found with this Id", 404));
            }

            if (order.orderStatus === "Delivered") {
                return next(new ErrorHandler("You have already delivered this order", 400));
            }

            if (req.body.status === "Shipped") {
                order.orderItems.forEach(async (o) => {
                    console.log(o.product, o.quantity)
                    await updateStock(o.product, o.quantity);
                });
            }
            order.orderStatus = req.body.status;

            if (req.body.status === "Delivered") {
                order.deliveredAt = Date.now();
            }

            await order.save({ validateBeforeSave: false });
            res.status(200).json({ success: true, });

        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    },
    async deleteOrder(req, res, next) {

        try {

            const order = await Order.findById(req.params.id);
            if (!order) {
                return next(new ErrorHandler("Order not found with this Id", 404));
            }
            await order.deleteOne();

            res.status(200).json({ success: true, });

        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    },
   




}

async function updateStock(id, quantity) {

    const product = await Product.findById(id);
    console.log(product)

    product.stock -= quantity;

    console.log( product.stock , quantity)

    await product.save({ validateBeforeSave: false });
}



module.exports = orderController