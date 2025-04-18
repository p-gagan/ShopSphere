const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.js");
const { authToken } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Route to get all users
router.get("/all-users", authToken ,wrapAsync(adminController.allUsers));
router.post("/update-user", authToken, wrapAsync(adminController.updateUserRole));

// Route to get all products
// router.get("/all-products", authToken, wrapAsync(adminController.allProducts));

module.exports = router;

