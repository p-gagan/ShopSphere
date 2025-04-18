const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
    },
    qunatity : Number,
    userId : String
},{
    timestamps : true
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;