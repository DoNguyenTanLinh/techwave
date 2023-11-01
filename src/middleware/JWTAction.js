require('dotenv').config();
const jwt = require("jsonwebtoken");
const createJWT = function (payload) {
    return new Promise(function (resolve, reject) {

        jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.TOKEN_TIME_LIFE,
        },
            function (err, _token) {
                if (err) {
                    reject(err);
                } else {
                    resolve(_token);
                }
            });
    });
}
const verifyToken = (token) => {
    let data = null;
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            console.log(err);
            return data;
        }
        console.log(decoded);
        return decoded;
    })
}
module.exports = {
    createJWT, verifyToken
}