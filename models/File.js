const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const {transporter} = require("../config/nodemailer")
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
// pre and post middlewares are used for taking any action before and after the data entry 
// always define pre and post middleware before model
fileschema.post("save",async function(doc){
         // doc is entry which is saved on the database
          try{
         
                let info =await transporter.sendMail(
                    {
                        from:"akshay",
                        to:doc.email,
                        subject:"nodemailer se mail ",
                        html:`<h2>hello bro</h2><p>file uploaded check <a href = "${doc.imageurl}">${doc.imageurl}</a></p>`
                    }
                )
                console.log(info);
          }
          catch(err)
          {
                console.log(err)
          }
}) 
const File= mongoose.model("File",fileschema)
module.exports = File;