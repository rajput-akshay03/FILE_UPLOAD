const File = require("../models/File");
 exports.localfileupload = async(req,res)=>
 {   
    
     try{
            const file = req.files.file;  //fetched file from console and file is the key in postman also
            console.log(file,"it is file");
    let path = __dirname +"/files/" + Date.now()+"."+`${file.name.split('.')[1]}`;  // path to which file will be uploaded
                   console.log("path of file is", path);
            file.mv(path,(err)=>{console.log(err)});   // moved file to that path
           res.json(
            {
                success:true,
                message:"file uploaded succesfully"
            }
           )
     }
     catch(err)
     {
        console.log(err);
        res.json(
            {
                sucess:false,
                message:err
            }
        )
     }
 }