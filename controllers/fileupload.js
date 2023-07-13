const File = require("../models/File");
const cloudinary = require("cloudinary")
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
  function isfilesupported (filetype,supporttype)
         {
              return supporttype.includes(filetype);
         }
  async function cloudinaryupload(file,folder)
         {
               const options = {folder};
              return await cloudinary.uploader.upload(file.tempFilePath,options);
         } 
 exports.imgupload = async(req,res)=>{
          try{
                const {name,tags,email} = req.body;
                console.log(name,tags,email)
                const file  = req.files.imagefile;
                console.log(file);
                const supporttype = ["jpg","jpeg","png"];
                const filetype = file.name.split('.')[1].toLowerCase();
                console.log(filetype)
                if(!isfilesupported(filetype,supporttype))
                {
                    return res.status(400).json(
                        {
                            success:false,
                            message:"file is not supported"
                        }
                    )
                }
             const response = await cloudinaryupload(file,"clouddb");
             console.log(response)
            //  const fileondb =
              await File.create(
                {
                    name,
                    email,
                    tags,
                    imageurl:response.secure_url
                }
             )
             res.json(
                {
                    success:true,
                    message:"image uploaded successfully",
                    imageurl:response.secure_url
                }
                )
          }
          catch(err)
          {
                  console.log(err)
                  res.json(
                    {
                        success:false,
                        message:"file did not uploaded"
                    }
                  )
          }
 }