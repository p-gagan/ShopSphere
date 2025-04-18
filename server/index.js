const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const DBconnect = require("../server/config/db");
const ExpressError = require("./utils/ExpressError.js");
const userRouter = require("./routes/user.js");
const cookieParser = require('cookie-parser');
const adminRouter = require("./routes/admin.js");
const productRouter = require("./routes/product.js");
const cartRouter = require("./routes/cart.js");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({limit: '1-mb',extended:true}));
app.use(cookieParser());

app.use("/",userRouter);
app.use("/admin-panel",adminRouter);
app.use("/product", productRouter);
app.use("/cart",cartRouter);

const port = 8080 || process.env.PORT;
DBconnect();

app.use("/",(req,res)=>{
    res.send("hii!");
});

//All Pages
app.all("*", (req, res, next) => {
    next(new ExpressError(401, "Page not Found!"));
});

//Errror Handler
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`App is listening in port ${port}`);
});