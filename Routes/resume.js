const express=require("express");

const router=express.Router();
const ResumeController=require('../controller/resume');

const {upload}=require('../utils/multer');


router.post('/addResume',upload.single('resume'),ResumeController.addResume);
router.get('/get/:user',ResumeController.getAllResumerForUser);
router.get('/get',ResumeController.getResumeForAdmin);

module.exports=router;