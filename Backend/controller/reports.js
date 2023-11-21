
const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorhandler');





const reportController = {
  async salesReport(req, res, next) {
    try {

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based, so we add 1

      const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999); // Set to the last millisecond of the last day

      const orders = await Order.find({
        createdAt: {
          $gte: firstDayOfMonth,
          $lte: lastDayOfMonth,
        },
      });
      // Calculate total sales
      const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

      // Group orders by product
      const productSales = {};
      orders.forEach(order => {
        order.orderItems.forEach(item => {
          if (!productSales[item.product]) {
            productSales[item.product] = {
              product: item.product,
              totalQuantity: 0,
              totalRevenue: 0,
            };
          }
          productSales[item.product].totalQuantity += item.quantity;
          productSales[item.product].totalRevenue += item.price * item.quantity;
        });
      });

      // Get detailed product information
      const productIds = Object.keys(productSales);
      const products = await Product.find({ _id: { $in: productIds } });

      // Create a report combining product information and sales data
      const salesReport = {
        totalSales,
        productSales: productIds.map(productId => ({
          product: products.find(p => p._id.toString() === productId.toString()),
          salesData: productSales[productId],
        })),
      };


      res.status(200).json({ success: true, report : salesReport });

    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  },
  async generateOrderFulfillmentReport(req, res, next) {

    try {
      // Get all orders
      const allOrders = await Order.find();

      // Calculate the number of orders in each status
      const orderStatusCount = {};
      allOrders.forEach(order => {
        const status = order.orderStatus;
        if (!orderStatusCount[status]) {
          orderStatusCount[status] = 1;
        } else {
          orderStatusCount[status]++;
        }
      });

      // Calculate average order processing time
      const completedOrders = allOrders.filter(order => order.orderStatus === 'Delivered');
      const totalProcessingTime = completedOrders.reduce((acc, order) => {
        const createdAt = new Date(order.createdAt);
        const deliveredAt = new Date(order.deliveredAt);
        const processingTime = deliveredAt - createdAt;
        return acc + processingTime;
      }, 0);

      const averageProcessingTime = completedOrders.length > 0
        ? totalProcessingTime / completedOrders.length
        : 0;

      // Calculate order fulfillment efficiency
      const orderFulfillmentEfficiency = (completedOrders.length / allOrders.length) * 100;

      // Create the order fulfillment report object
      const orderFulfillmentReport = {
        orderStatusCount,
        averageProcessingTime: Math.round(averageProcessingTime / (1000 * 60 * 60)), // Convert milliseconds to minutes
        orderFulfillmentEfficiency: orderFulfillmentEfficiency.toFixed(2),
        orderDetails: allOrders.map(order => ({
          orderId: order._id,
          orderStatus: order.orderStatus,
          orderTotalPrice : order.totalPrice,
          processingTime: calculateProcessingTime(order),
        })),
        generatedAt: new Date(),
      };

      res.status(200).json({ success: true, report : orderFulfillmentReport });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }

  },

  async generateInventoryReport(req, res, next) {
    try {

      const allProducts = await Product.find();

      // Calculate stock levels for each product
      const stockLevels = allProducts.map(product => ({
        product: product,
        stock: product.stock,
      }));

      // Calculate inventory turnover
      const averageInventory = allProducts.reduce((acc, product) => acc + product.stock, 0) / allProducts.length;

      // Identify products at risk of going out of stock
      const productsAtRisk = allProducts.filter(product => product.stock <= 5); // You can adjust the threshold as needed

      // Create the inventory report object
      const inventoryReport = {
        stockLevels,
        averageProductStock: averageInventory,
        productsAtRisk,
        generatedAt: new Date(),
      };

      res.status(200).json({ success: true, report : inventoryReport });

    }
    catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  }

}

function calculateProcessingTime(order) {
  if (order.orderStatus !== 'Delivered' || !order.createdAt || !order.deliveredAt) {
    return null;
  }

  const createdAt = new Date(order.createdAt);
  const deliveredAt = new Date(order.deliveredAt);
  const processingTimeInMilliseconds = deliveredAt - createdAt;

  // Convert processing time to hours
  const processingTimeInHours = processingTimeInMilliseconds / (1000 * 60 * 60);

  return processingTimeInHours.toFixed(2);
}


module.exports = reportController;
