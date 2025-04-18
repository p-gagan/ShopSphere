const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required : true,
    },
    password: String,
    profilePic: String,
    role: String,
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;