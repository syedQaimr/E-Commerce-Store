
const Order = require('../models/order');
const PaymentInfo = require('../models/paymentInfo');
const ShippingInfo = require('../models/ShippingInfo');
const Product = require('../models/product');
const moment = require('moment');



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

            console.log(req.body, req.user._id);


            const newpaymentInfo = new PaymentInfo({ paymentInfo, paidAt: Date.now() });
            const newShippingInfo = new ShippingInfo(shippingInfo);

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
            const orders = await Order.find({ user: req.user._id }).populate(['user', 'shippingInfo', 'paymentInfo']);

            res.status(200).json({ success: true, orders, });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async getAllOrder(req, res, next) {

        try {
            const orders = await Order.find().populate('user');

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

    async adminDashBoard(req, res, next) {
        try {
            // Total number of orders for the last seven days
            const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');
            const totalOrdersLastSevenDays = await Order.countDocuments({
                createdAt: { $gte: sevenDaysAgo.toDate() }
            });
    
            // Total amount of all orders for the last seven days
            const totalAmountLastSevenDays = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sevenDaysAgo.toDate() }
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        total: { $sum: "$totalPrice" }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
    
            // Orders count date-wise for the last seven days
            const ordersCountByDate = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sevenDaysAgo.toDate() }
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
    
            // Products count date-wise for the last seven days
            const productsCountByDate = await Product.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sevenDaysAgo.toDate() }
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
    
            // Total number of orders
            const totalOrders = await Order.countDocuments();
    
            // Total amount of all orders
            const totalAmount = await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$totalPrice" }
                    }
                }
            ]);
    
            // Total number of orders with orderStatus as 'Shippable'
            const shippableOrders = await Order.countDocuments({ orderStatus: 'Shippable' });
    
            // Total number of products from Product Model
            const totalProducts = await Product.countDocuments();
    
            // Four products with the highest rating
            const topRatedProducts = await Product.find()
                .sort({ ratings: -1 })
                .limit(4);
    
            res.status(200).json({
                success: true,
                totalOrders,
                totalAmount: totalAmountLastSevenDays,
                totalIncom : totalAmount,
                shippableOrders,
                totalProducts,
                topRatedProducts,
                productsCountByDate,
                ordersCountByDate,
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async updateOrder(req, res, next) {
        console.log(req.params.id, req.body.status)


        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return next(new ErrorHandler("Order not found with this Id", 404));
            }

            if (order.orderStatus === "Delivered") {
                return next(new ErrorHandler("You have already delivered this order", 400));
            }

            if (req.body.status === "Shipped" || req.body.status === "Processing") {
                order.orderItems.forEach(async (o) => {
                    await updateStock(o.product, o.quantity);
                });
            }
            order.orderStatus = "Delivered";


            if (order.orderStatus === "Delivered") {
                order.deliveredAt = Date.now();
            }
            await order.save({ validateBeforeSave: false });
            console.log(order)
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

    product.stock -= quantity;


    await product.save({ validateBeforeSave: false });
}



module.exports = orderController