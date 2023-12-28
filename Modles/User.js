const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
        //enum mean ye inke alawa koi or cheej nahi dall sakte
    }
});

module.exports = mongoose.model("users",userSchema);

