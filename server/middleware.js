const {userSchema} = require("./Schema.js");
const ExpressError = require("./utils/ExpressError.js");
const jwt = require("jsonwebtoken");
const {productSchema} = require("./Schema.js");

//user schema validation
module.exports.validateUser = (req,res,next)=>{
    const {error} = userSchema.validate(req.body);
    if(error){
        const errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//Product Schema validation
module.exports.validateProduct = (req,res,next)=>{
    const {error} = productSchema.validate(req.body);
    if(error){
        const errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

//auth token authentication
module.exports.authToken = async(req,res,next)=>{
    try{
        
        const token = req.cookies?.token;

        if(!token){
            return res.status(401).json({
                message: " Please login first",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
           if(err){
            return res.status(401).json({
                message: "Failed to authenticate token",
                error: true,
                success: false
            });
           }
        //    console.log("decoded:",decoded);
           req.userId =  decoded?._id;
           next();

        });
        

    }catch(err){
        console.error("Error in authToken middleware:",err);
        res.status(400).json({
            message : err.message || "An error occuried",
             error : true,
            success : false
        });
    }
};