const express= require("express");
const router = express.Router();
const {imgupload,vidupload,imgredupload,localfileupload}= require("../controllers/fileupload")

router.post("/imageupload",imgupload)
router.post("/videoupload",vidupload)
router.post("/imagereducerupload",imgredupload)
router.post("/localfileupload",localfileupload)
module.exports = router;