require('dotenv').config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', '*'],
    // filename: function (req, file, cb) {
    //     cb(null, file.originalname);
    // }
    params: {
        folder: 'techwave'
    }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;