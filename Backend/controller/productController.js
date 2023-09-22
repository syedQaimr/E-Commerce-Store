
const Product = require('../models/product');
const ProductReview = require('../models/productReview');
const ErrorHandler = require('../utils/errorhandler')

const productController = {
    async addProduct(req, res, next) {
        try {

            const { name, description, price, rating, category, stock, image } = req.body;

            const product = new Product({
                name,
                description,
                price,
                rating,
                category,
                stock,
                image
            });

            
            const review = new ProductReview({
                numOfReviews:0 ,
                reviews:[],
            });

            product.review = review

            await product.save();
            await review.save();

            product.review = review._id;
            await product.save();

            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find();
            res.status(200).json({ success: true, products });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id; 
            const updates = req.body; 

            const product = await Product.findByIdAndUpdate(productId, updates, { new: true  , runValidators:true});

            if (!product) {
                return next(new ErrorHandler("Product Not Found" , 404));
            }

            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id; 

            const product = await Product.findByIdAndRemove(productId);

            if (!product) {
                return next(new ErrorHandler("Product Not Found" , 404));

            }

            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    async getProductById(req, res, next) {
        try {
            const productId = req.params.id; 

            const product = await Product.findById(productId);

            if (!product) {
                return next(new ErrorHandler("Product Not Found" , 404));
            }

            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = productController;
