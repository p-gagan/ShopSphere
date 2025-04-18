const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {authToken} = require("../middleware");
const cartController = require("../controller/cart")

// Route for adding product in the cart
router.post("/add",authToken,wrapAsync(cartController.addToCart));

// To get no product in the cart for specific user 
router.get("/countCartProduct",authToken,wrapAsync(cartController.countCartProduct));

//Show car4t Product
router.get("/showCartProduct",authToken, wrapAsync(cartController.showCartProducts));

// update cart product
router.post("/update",authToken,wrapAsync(cartController.updateCartProduct));

// delete cart product
router.post("/remove", authToken, wrapAsync(cartController.deleteCartProduct));

module.exports = router;