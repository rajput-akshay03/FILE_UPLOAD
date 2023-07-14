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
  async function cloudinaryupload(file,folder,quality)
         {
               const options = {folder};
               options.resource_type = "auto";
               if(quality)
               {
                    options.quality = quality;
               }
               console.log("resource type is", options.resource_type)
               console.log("temp file path is",file.tempFilePath);
              return await cloudinary.v2.uploader.upload(file.tempFilePath,options);
         } 
 exports.imgupload = async(req,res)=>{
          try{
                const {name,tags,email} = req.body;
                console.log(name,tags,email)
                const file  = req.files.file;
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
 exports.vidupload=  async(req,res)=>{
      try{
             const {name,tags,email} = req.body;
             const file = req.files.file;
             console.log("file is",file,name,tags,email);
         
            const filetype = file.name.split('.')[1].toLowerCase();
            // file.name.split('.')[1].toLowerCase();
            console.log("filetype is" + filetype);
            const supporttype = ["mp4","mp3"];
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
            res.json(
                {
                    success:true,
                    message:"video uploaded successfully",
                    videourl:response.secure_url,
                }
                )
      }
      catch(err)
      {
           console.log(err)
           res.json({
            message:"video not uploaded",
            error:err
           })
      }
 }
 exports.imgredupload = async(req,res)=>{
            const {name,email,tags} = req.body;
            const file = req.files.file;
            const filetype = file.name.split('.')[1].toLowerCase();
            const supporttype = ["png","jpeg","mp4"];
            if(!isfilesupported(filetype,supporttype))
            {   
                return res.status(400).json(
                    {
                        success:false,
                        message:"file is not supported"
                    }
                )
            }
           
            const response = await cloudinaryupload(file,"clouddb",40);
            console.log(response)
          res.json(
              {
                  success:true,
                  message:"video uploaded successfully",
                  videourl:response.secure_url,
              }
              )

 }