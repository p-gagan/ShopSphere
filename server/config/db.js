const mongoose = require("mongoose");
const DBURl = process.env.MONGODB_URL;

DBconnect()
    .then((res)=>{
        console.log("Connection Successful!");
    })
    .catch((err)=>{
        console.log(err);
    })


async function DBconnect(){
    mongoose.connect(DBURl);
}

module.exports = DBconnect;