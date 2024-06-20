const express = require('express')
const router = express.Router();
const  cloudinary= require( 'cloudinary').v2;
const multer = require('multer')
const pool = require("../db");
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const CLOUD_NAME = process.env.cloud_name;
const API_KEY = process.env.api_key;
const API_SECRET = process.env.api_secret;

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const storage = multer.memoryStorage(); 
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 8 * 1024 * 1024,  
  },
});

const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req:any, file:any) => {
    let folder;
    switch (file.mimetype) {
      case 'application/pdf':
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        folder = 'documents';
        break;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/svg+xml':
        folder = 'images';
        break;
      case 'video/mp4':
      case 'video/avi':
      case 'video/mkv':
      case 'video/mov':
      case 'video/wmv':
      case 'video/flv':
      case 'video/webm':
        folder = 'videos';
        break;
      default:
        folder = 'others';
        break;
    }
    return {
      folder: folder,
      format: file.originalname.split('.').pop(), // Keeps the original file extension
      resource_type: 'auto', // Automatically detect the resource type (image, video, raw, etc.)
    };
  },
});

const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Set to 100MB or adjust as needed
  },
});

router.post('/courseImage', upload.single("file"), async (req:any, res:any)=>{

    const image = req.file ;
    const {courseId} = req.query;

    try {
      const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    const imageurl = await pool.query("UPDATE course SET imageurl=$1 WHERE id=$2 RETURNING*", [uploadResponse.url, courseId]);
      res.json(imageurl.rows[0])
   
    console.log(imageurl)
    } catch (error) {
      console.log(error)
    }
    
}) 

router.post('/courseAttachment', fileUpload.single("url"), async (req:any, res:any)=>{



  
  const file= req.file ;
  const {courseId} = req.query;
 

  try {
   
      await pool.query("INSERT INTO attachment(name, url, courseid) VALUES($1, $2, $3)", [file.originalname, file.path, courseId]);
      const fileUrl = await pool.query("SELECT * FROM attachment WHERE courseid=$1 ORDER BY createdat DESC ",[courseId])
    res.json(fileUrl.rows);
    
  
 
 
  } catch (error) {
    console.log(error)
  }
  
})
router.get('/courseAttachment', async (req:any, res:any )=>{
  const {courseId} = req.query;
  const fileUrl = await pool.query("SELECT * FROM attachment WHERE courseid=$1 ORDER BY createdat DESC ",[courseId])
  res.json(fileUrl.rows)
})

router.delete('/courseAttachmentDelete', async(req:any, res:any)=>{
  

const {courseId , attachmentId} = req.query;


try {
  await pool.query("DELETE FROM attachment WHERE id=$1 RETURNING * ",[attachmentId])
 const updatedAttachment = await pool.query("SELECT * FROM attachment WHERE courseid=$1 ORDER BY createdat DESC",[courseId])
 console.log(updatedAttachment.rows)
res.json(updatedAttachment.rows)
} catch (error) {
  console.log(error)
}
 


})




module.exports = router;
export {};