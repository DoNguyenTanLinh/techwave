require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const router = require('./routers/index.router');
var cors = require('cors');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET
});
const allowedOrigins = ['http://localhost:3001', 'https://techwave-fe.vercel.app'];
var corsOption = {
    origin: allowedOrigins,
    // origin: 'https://techwave-fe.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

router(app);
app.listen(3000, function () {
    console.log('Server running at port 3000');
});  