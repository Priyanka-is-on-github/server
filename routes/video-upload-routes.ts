
const express = require('express')
const router = express.Router();
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const  cloudinary= require( 'cloudinary').v2;
import Mux from '@mux/mux-node';

const CLOUD_NAME = process.env.cloud_name;
const API_KEY = process.env.api_key;
const API_SECRET = process.env.api_secret;

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

const Storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req:any, file:any) => {
    let folder;
    switch (file.mimetype) {
      
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

const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 100 * 1024 * 1024,  
  },
});


router.post('/chapterVideo/:chapterid', upload.single('videourl'), async (req:any, res:any) => {

  const {chapterid} = req.params;
  const video = req.file ;
// console.log(req);





 // const asset = await mux.video.assets.create({
  //   input: [{ url: 'https://muxed.s3.amazonaws.com/leds.mp4' }],
  //   playback_policy: ['public'],
  //   encoding_tier: 'baseline',
  // });



})


module.exports = router;

