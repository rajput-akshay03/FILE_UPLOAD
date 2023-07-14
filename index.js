const express =require("express");
const fileupload = require("express-fileupload")
const db = require("./config/database")
const cloudinary = require("./config/cloudinary")
const app =express();
require("dotenv").config();
const PORT = process.env.PORT||4000;
app.use(express.json());
app.use(fileupload( 
    {
    useTempFiles:true,
    tempFileDir:'/tmp/'
    } 
));
db.connect();
cloudinary.cloudinaryconnect();
const upload = require("./routes/FileUpload")
app.use("/api/v1/upload",upload)
app.listen(PORT,()=>{
    console.log(`listening port no. ${PORT}`)
})