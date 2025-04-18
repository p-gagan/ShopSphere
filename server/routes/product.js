const express = require("express");
const router = express.Router({mergeParams: true});
const productController = require("../controller/product");
const wrapAsync = require("../utils/wrapAsync");
const {authToken} = require("../middleware");
const {validateProduct} = require("../middleware");

//product upload route
router.post("/upload",validateProduct,authToken,wrapAsync(productController.uploadProduct));

//show product
router.get("/show", wrapAsync(productController.showProducts));

//update product
router.post("/update",authToken,wrapAsync(productController.updatedProduct));

// get product category
router.get("/get-category",wrapAsync(productController.getProductCategory));

// category wise product
router.post("/categorized-product",wrapAsync(productController.categoryWiseProduct));

// product details
router.post("/product-details", wrapAsync(productController.productDetails));

// search
router.get("/search",wrapAsync(productController.search));

module.exports = router;