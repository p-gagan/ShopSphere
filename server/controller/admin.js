const User = require("../models/user");

// functionality to fetch all the registered users
module.exports.allUsers = async(req,res)=>{
    try{
        const allUsers = await User.find();
        res.status(200).json({
            data: allUsers,
            message: "User fetch successfully!",
            success: true,
            error: false,
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

// Update user role
module.exports.updateUserRole = async(req,res)=>{
    try{
        const sessionId = req.userId;
        const {userId, name, email, role} = req.body;

        const payload = {
            ...(email && {email:email}),
            ...(name && {name: name}),
            ...(role && {role: role}),
        }

        const user = await User.findById(sessionId);

        const updateUser = await User.findByIdAndUpdate(userId,payload);

        res.status(200).json({
            data: updateUser,
            message: "User Updated Successfully!",
            success: true,
            error: false,
        })

        
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}