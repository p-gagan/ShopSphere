const { date } = require("joi");
const uploadProductPermission = require("../helper");
const Product = require("../models/product");
const ExpressError = require("../utils/ExpressError");

//upload product information in database
module.exports.uploadProduct = async (req, res,) => {
    try {
        const sessionId = req.userId;
        if (!uploadProductPermission(sessionId)) {
            throw new ExpressError(400, "Permission denied!");
        }

        const product = new Product(req.body);
        const saveProduct = await product.save();

        res.status(201).json({
            data: saveProduct,
            message: "Product saved successfully",
            error: false,
            success: true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//Fetch all the products from database to show
module.exports.showProducts = async (req, res) => {
    try {
        const allProduct = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            data: allProduct,
            message: "Product fetched successfully",
            error: false,
            success: true,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: FontFaceSetLoadEvent
        });
    }
}

//update admin product
module.exports.updatedProduct = async (req, res) => {
    try {
        const sessionId = req.userId;
        if (!uploadProductPermission(sessionId)) {
            throw new ExpressError(400, "Permission denied!");
        }

        const {_id, ...remAttr} = req.body;

        if(!_id){
            throw new ExpressError(400,"Id is not find");
        }

        const updatedProduct = await Product.findByIdAndUpdate(_id,remAttr);

        res.status(201).json({
            data : updatedProduct,
            message : "Product Updated Successfully",
            error : false,
            success : true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// Fetch all the category of product 

module.exports.getProductCategory = async(req,res)=>{
    try{

        const productCategory = await Product.distinct("category");

        // create a empty array to store one product of each category
        const productByCategory = [];

        for(const category of productCategory){
            const product = await Product.findOne({category});

            if(product){
                productByCategory.push(product);
            }
        }

        res.status(200).json({
            data : productByCategory,
            message : "Categorised product successfully",
            error : false,
            success : true
        });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        });
    }
}

// get product according to their category

module.exports.categoryWiseProduct = async(req,res)=>{
    try{
        const {category} = req?.body || req?.query;

        const product = await Product.find({category});

        res.status(200).json({
            data : product,
            message : "Fetching Successfully",
            error : false,
            success : true
        })

    }catch(err){
        res.json(400).json({
            message : err.message || err,
            error : true,
            success : FontFaceSetLoadEvent
        });
    }
}

// show particular product details

module.exports.productDetails = async(req,res)=>{
    try{
        const {userId} = req.body;

        const product = await Product.findById(userId);

        res.status(200).json({
            data : product,
            message : "Product found",
            error : false,
            success : true
        })

    }catch(error){
        res.status(400).json({
            message : error.message || error,
            error : true.value,
            success : false
        })
    }
}

// search a product
module.exports.search = async(req,res)=>{
    try{
        const query = req.query.q;
        const regex = RegExp(query,"i","g");

        const products = await Product.find({
            $or : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        });

        res.status(201).json({
            data : products,
            message : "Products Searched",
            error : false,
            success : true
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}