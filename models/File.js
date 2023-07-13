const mongoose = require("mongoose");
const fileschema =  new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        imageurl:{
            type:String
        },
        tags:{
            type:String
        }
    }
)
const File= mongoose.model("File",fileschema)
module.exports = File;