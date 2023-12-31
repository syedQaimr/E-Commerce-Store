
const Product = require('../models/product');
const ProductReview = require('../models/productReview');
const ApiFeatures = require('../utils/ApiFeatures');
const ErrorHandler = require('../utils/errorhandler');
const { BACKEND_SERVER_PATH } = require('../config/index');
const fs = require('fs');


const productController = {
   // Create new product

    async addProduct(req, res, next) {
        try {

            req.body.user = req.user.id
            var { name, description, price, rating, category, stock, images, user } = req.body;

            console.log(name, description, price, rating, category, stock, user)


            const buffers = images.map((image, index) => {
                const buffer = Buffer.from(image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
                const imagePath = `${Date.now()}-${name + index + 1}.png`;

                fs.writeFileSync(`storage/${imagePath}`, buffer);

                return {
                    public_id: imagePath,
                    url: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
                };
            })


            images = buffers;


            const product = new Product({
                name,
                description,
                price,
                rating,
                category,
                stock,
                images,
                user
            });





            const review = new ProductReview({
                numOfReviews: 0,
                reviews: [],
            });

            product.review = review

            await product.save();
            await review.save();


            console.log(product)
            res.status(200).json({ success: true, product });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "addProduct", "Product", "productController"));

        }
    },

    // Get Products with Pagination


    async getAllProducts(req, res , next) {
        try {
            const resultPerPage = 8
            const productCount = await Product.countDocuments();

            console.log(req.query)
            const apiFeatures = new ApiFeatures(Product.find({ Active: true }).populate('review'), req.query).search().filter().pagination(8);
            const products = await apiFeatures.query;

            console.log(products.length)

            res.status(200).json({ success: true, products, productCount, resultPerPage });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "getAllProducts", "Product", "productController"));

        }
    },

        // Get Products without Pagination

    async getAllProductsWithoutPagination(req, res) {
        try {
            const resultPerPage = 8
            const productCount = await Product.countDocuments();

            const products = await Product.find().populate({ path: 'review', populate: { path: 'reviews.user', }, })

            res.status(200).json({ success: true, products, productCount, resultPerPage });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "getAllProductsWithoutPagination", "Product", "productController"));


        }
    },
    async updateProduct(req, res, next) {
        try {

            const productId = req.params.id;
            var { images, name } = req.body;
            var updates = req.body;

            if (images) {
                const buffers = images.map((image, index) => {
                    const buffer = Buffer.from(image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
                    const imagePath = `${Date.now()}-${name + index + 1}.png`;

                    fs.writeFileSync(`storage/${imagePath}`, buffer);

                    return {
                        public_id: imagePath,
                        url: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
                    };
                })
                req.body.images = buffers
                updates = req.body
            }




            if (name) {
                const product = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true });
                if (!product) {
                    return next(new ErrorHandler("Product Not Found", 404, "updateProduct", "Product", "productController"));
                }
                res.status(200).json({ success: true, product });

            }
            else {
                console.log("Hello" , req.body.review)
                const product = await Product.findById(productId).populate('review');
                console.log(product.review)
                if (product.review.reviews) {
                    const reviewIndex = product.review.reviews.findIndex(review => review._id.toString() ===  req.body.review);
                    product.review.reviews[reviewIndex].Active = !product.review.reviews[reviewIndex].Active;

                    await product.review.save();
                    await product.save();
                }
                res.status(200).json({ success: true, product });
            }



        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "updateProduct", "Product", "productController"));
        }
    },
    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id;

            const product = await Product.findById(productId);

            if (!product) {
                return next(new ErrorHandler("Product Not Found", 404, "deleteProduct", "Product", "productController"));
            }

            product.Active = !product.Active;

            // Save the updated product
            await product.save();

            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "deleteProduct", "Product", "productController"));
        }
    },
    async getProductById(req, res, next) {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId).populate('review');

            if (!product) {
                return next(new ErrorHandler("Product Not Found", 404, "getProductById", "Product", "productController"));
            }
            const {role} = req.body
            console.log(role)
            // if( product.review && product.review.reviews && req.body.role != "admin"){
            //     product.review.reviews = product.review.reviews.filter(review => review.Active)
            // }

            res.status(200).json({ success: true, product });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "getProductById", "Product", "productController"));
        }
    },

    async createProductReview(req, res, next) {

        try {
            const { rating, comment, productId } = req.body;

            const review = {
                user: req.user._id,
                name: req.user.name,
                rating: Number(rating),
                comment
            }

            const product = await Product.findById(productId).populate('review');

            if (!product) {
                return next(new ErrorHandler("Product Not Found", 404, "createProductReview", "Product", "productController"));
            }


            const isReviewed = product.review.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
                // Check product from specific user is already reviewed

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

        } catch (error) {
            console.log(error)
            return next(new ErrorHandler(error.message, 500, "createProductReview", "Product", "productController"));

        }


    },
    async getproductReviews(req, res, next) {
        try {

            const product = await Product.findById(req.query.id).populate("review");

            if (!product) {
                return next(new ErrorHandler("Product Not Found", 404, "getproductReviews", "Product", "productController"));

            }
            const filterReview = product.review.reviews.filter(review => review.Active)
            console.log(filterReview)

            res.status(200).json({ success: true, review: filterReview });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500, "getproductReviews", "Product", "productController"));
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

            console.log(review, ratings)
            // Update the product's review and ratings
            product.review.reviews = review
            console.log(product.review, review)

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
