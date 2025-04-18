const Cart = require("../models/cart");

// Add product into the cart
module.exports.addToCart = async(req,res)=>{
    try{
        const {productId} = req?.body;
        const currentUser = req.userId;
        
        const isProductAvailable = await Cart.findOne({productId});
       
        if(isProductAvailable){
            res.json({
                message : "Product is already available in the cart",
                error : true,
                success : false,
            })
        }

        const payload = {
            productId : productId,
            qunatity : 1,
            userId : currentUser
        }

        const addedProduct = new Cart(payload);
        const saveProduct = await addedProduct.save();
        
        res.status(200).json({
            data : saveProduct,
            message : "Product Added to Cart",
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

// Count the number of product in cart of specific user
module.exports.countCartProduct = async(req,res)=>{
    try{
        const userId = req.userId;
        const count = await Cart.countDocuments({userId : userId});

        res.status(201).json({
            data : count,
            message : "Data fetch successfully",
            error : false,
            success : true
        })

    }catch(error){
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

// show product of cart
module.exports.showCartProducts = async(req,res)=>{
    try{
        const currentUser = req.userId;
        const allProducts = await Cart.find({userId : currentUser}).populate('productId');

        res.status(201).json({
            data : allProducts,
            message : "OK",
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

// update cart product
module.exports.updateCartProduct = async(req,res)=>{
    try{
        const currentUser = req.userId;
        const cartProductId = req.body._id;
        const qty = req.body.qunatity;

        // Validate inputs
        if (!cartProductId || !qty) {
            return res.status(400).json({
                message: "Invalid request: Product ID and quantity are required.",
                error: true,
                success: false,
            });
        }

        // Validate quantity is a positive number
        if (typeof qty !== 'number' || qty <= 0) {
            return res.status(400).json({
                message: "Quantity must be a positive number.",
                error: true,
                success: false,
            });
        }

        const updateProduct = await Cart.updateOne({_id : cartProductId, userId : currentUser},
            {$set : {qunatity : qty} }
        );


        res.status(201).json({
            data : updateProduct,
            message : "Product Updated",
            error : false,
            success : true
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : true
        })
    }
}

// delete cart product
module.exports.deleteCartProduct = async(req,res)=>{
    try{
        const currentUser = req.userId;
        const productId = req.body._id;

        const deletedProduct = await Cart.deleteOne({
            _id : productId,
            userId : currentUser,
        })

        res.status(201).json({
            data : deletedProduct,
            message : "Product Removed From Cart",
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