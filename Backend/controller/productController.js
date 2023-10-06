
const Product = require('../models/product');
const ProductReview = require('../models/productReview');
const ApiFeatures = require('../utils/ApiFeatures');
const ErrorHandler = require('../utils/errorhandler')

const productController = {
    async addProduct(req, res, next) {
        try {

            req.body.user = req.user.id
            const { name, description, price, rating, category, stock, image, user } = req.body;

            const product = new Product({
                name,
                description,
                price,
                rating,
                category,
                stock,
                image,
                user
            });


            const review = new ProductReview({
                numOfReviews: 0,
                reviews: [],
            });

            product.review = review

            await product.save();
            await review.save();



            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async getAllProducts(req, res, next) {
        try {
            const productCount = await Product.countDocuments();
            const apiFeatures = new ApiFeatures(Product.find().populate('review'), req.query).search().filter().pagination(10);
            const products = await apiFeatures.query;
            res.status(200).json({ success: true, products, productCount });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const updates = req.body;

            const product = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true });

            if (!product) {
                return next(new ErrorHandler("Product Not Found", 404));
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
                return next(new ErrorHandler("Product Not Found", 404));

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
                return next(new ErrorHandler("Product Not Found", 404));
            }

            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    async createProductReview(req, res, next) {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await Product.findById(productId).populate('review');

        console.log(product.review.reviews, product.review)

        const isReviewed = product.review.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

        if (isReviewed) {

            product.review.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString()) { rev.rating = rating; rev.comment = comment }
            });

        }
        else {
            product.review.reviews.push(review);
            product.review.numOfReviews = product.review.reviews.length
        }
        var avg = 0;
        product.review.reviews.forEach((rev) => {

            avg = rev.rating + avg
        })

        product.ratings = avg / product.review.reviews.length



        const rev = product.review;
        await rev.save({ validateBeforeSave: false });
        await product.save({ validateBeforeSave: false });

        res.status(200).json({ success: true, product });


    },
    async getproductReviews(req, res, next) {
        try {

            const product = await Product.findById(req.query.id).populate("review");

            if (!product) {
                return next(new ErrorHandler("Product Not Found", 404));
            }

            res.status(200).json({ success: true, review: product.review.reviews });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteReview(req, res, next) {
        try {

            const product = await Product.findById(req.query.productId).populate("review");

            if (!product) {
                return next(new ErrorHandler("Product Not Found", 404));
            }

            const review = product.review.reviews.filter(
                (rev) => rev._id.toString() != req.query.id.toString()
              );

            let avg = 0;
            review.forEach((rev) => {
                avg += rev.rating;
            });

    
            const ratings = avg / review.length;
            const numOfReviews = review.length;
    
            console.log(review , ratings)
            // Update the product's review and ratings
            product.review.reviews = review
            console.log(product.review , review)

            product.review.numOfReviews = numOfReviews;
            product.ratings = ratings;
    
            // Save the changes
            await product.review.save();
            await product.save();


            res.status(200).json({ success: true, review: review });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
}

module.exports = productController;
