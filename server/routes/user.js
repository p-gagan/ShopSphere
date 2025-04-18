const express = require("express");
const router = express.Router({mergeParams:true});
const userController = require("../controller/userC.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateUser} = require("../middleware.js");
const {authToken} = require("../middleware.js");

router.post("/signup",validateUser,wrapAsync(userController.signUp));
router.post("/login",wrapAsync(userController.LoginIn));
router.get("/user-details",authToken,wrapAsync(userController.userDetails));
router.get("/logout", wrapAsync(userController.Logout));

module.exports = router;