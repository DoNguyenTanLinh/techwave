var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { createJWT, verifyToken } = require('./middleware/JWTAction');
var cookieParser = require('cookie-parser');
const router = require('./routers/index.router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

router(app);
app.listen(3000, function () {
    console.log('Server running at port 3000');
});  