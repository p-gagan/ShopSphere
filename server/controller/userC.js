const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SignUp Functionality
module.exports.signUp = async (req, res) => {
    try {

        let { email, password } = req.body;


        let user1 = await User.findOne({ email });

        if (user1) {
            throw new ExpressError(401, "Please enter unique email");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);


        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const user = new User(payload);
        await user.save();
        
        res.status(201).json({
            data: user,
            success: true,
            error: false,
            message: "User created Successfully!"
        });

    } catch (err) {
        const errMsg = "Something went wrong!, Please fill appropiate input...";

        res.json({
            message: err.message || errMsg,
            error: true,
            success: false,
        })
    }
}

// Login Functionalitty
module.exports.LoginIn = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            throw new ExpressError(401, "User not Exist");
        }

        let checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const cookieOption = {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            }

            res.cookie("token", token, cookieOption).json({
                message: `${user.name}! Logged In Successfully..`,
                data: token,
                success: true,
                error: false
            })

        } else {
            throw new ExpressError(401, "Incorrect Password!");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

//fetch login user functionality
module.exports.userDetails = async (req, res) => {
    try {
        //    console.log("User details:",req.userId);
        const user = await User.findById(req.userId);
        if (!user.profilePic) {
            console.log("no url found");
        }

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        })

    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}


// logout functionality
module.exports.Logout = async (req, res) => {
    try {
        res.clearCookie("token");

        res.status(200).json({
            data: [],
            error: false,
            success: true,
            message: "Logout Successfully!",
        })
    } catch (err) {
        res.status(401).json({
            message: err.message,
            error: true,
            success: false,
        })
    }
}
