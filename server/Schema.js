const joi = require("joi");

module.exports.userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required(),
        profilePic: joi.string(),
        confirmPassword: joi.string().valid(joi.ref('password')).required(),
        role: joi.string().default("GENERAL"),
});

module.exports.productSchema = joi.object({
        productName: joi.string().required(),
        brandName: joi.string().required(),
        category: joi.string().required(),
        productImage: joi.array().items(joi.string()),
        description: joi.string().required(),
        price: joi.number().required(),
        sellingPrice: joi.number().required(),
});