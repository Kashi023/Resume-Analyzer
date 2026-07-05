const multer=require('multer');
const pdfparse=require('pdf-parse');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'uploads/'),
    filename:(req,file,cb)=> cb(null,Date.now()+ path.extname(file.originalname))
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'application/pdf') cb(null,true);
    else cb(new Error("only Pdf allowed"),false);
}

exports.upload=multer({storage,fileFilter});