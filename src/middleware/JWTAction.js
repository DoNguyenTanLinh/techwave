require('dotenv').config();
const jwt = require("jsonwebtoken");
// const nonSecure = ['/logout', '/login', '/register', '/product', '/registerStaff', '/forgotPassword'];
const abc = ['/admin', '/vendor', '/user']
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
    return new Promise(function (resolve, reject) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                console.log(err);
                resolve(decoded);
            }
            resolve(decoded);
        })
    });
}
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
const checkUserJWT = async (req, res, next) => {
    req.api = `/${req.path.split('/')[2]}`
    let cookie = req.cookies;
    const tokenFromHeader = extractToken(req);
    if ((cookie && cookie.jwt) || tokenFromHeader) {
        let token = cookie && cookie.jwt ? cookie.jwt : tokenFromHeader;
        let decoded = await verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                message: "Not authenticated the user"
            })
        }
    }
    else {
        // if (nonSecure.includes(req.api)) return next();
        if (req.path.split('/')[4] === 'vnpay_return') next();
        else if (abc.includes(req.api)) {
            console.log("Authentication");
            return res.status(401).json({
                message: "Not authenticated the user"
            })
        }
        else return next();
    }
}
const checkUserPermission = (req, res, next) => {

    // if (nonSecure.includes(req.api)) return next();
    if (req.path.split('/')[4] === 'vnpay_return') next();
    else if (abc.includes(req.api)) {
        if (req.user) {
            let email = req.user.email;
            let roles = req.user.groupWithRole;
            let currentUrl = req.path.split('/');
            const result = `/${currentUrl[2]}`;
            if (!roles || roles.length === 0) {
                return res.status(403).json({
                    message: "You dont have permission to access this resource..."
                })
            }
            if (roles.url === result) {
                next();
            }
            else {
                return res.status(403).json({
                    message: "You dont have permission to access this resource..."
                })
            }

        } else {
            return res.status(401).json({
                message: "Not authenticated the user"
            })
        }
    }
    else return next();
}
const checkUserAction = (req, res, next) => {
    // if (nonSecure.includes(req.api)) return next();
    if (req.path.split('/')[4] === 'vnpay_return') next();
    else if (abc.includes(req.api)) {
        if (req.user) {
            let oldUrl = (`${req.path.split('/')[3]}`);
            let currentUrl = (`${req.path.split('/')[4]}`);
            let roles = req.user.groupWithRole;
            if (currentUrl === 'undefined') {
                currentUrl = ''
            }
            if (!roles || roles.length === 0) {
                return res.status(403).json({
                    message: "You dont have permission to access this resource..."
                })
            }

            let acctionAccount = {
                create: ((currentUrl === 'create' && roles.RoleName == 'ADMIN') && (roles.Account == process.env.FULL_ACCESS || roles.Account == process.env.CREATE)),
                modify: (currentUrl === 'edit' && (roles.Account == process.env.FULL_ACCESS || roles.Account == process.env.MODIFY)),
                delete_soft: (currentUrl === 'delete-soft' && roles.Account == process.env.FULL_ACCESS),
                remove: (currentUrl === 'remove' && roles.Account == process.env.FULL_ACCESS),
                active: (currentUrl === 'active' && roles.Account == process.env.FULL_ACCESS),
                active: (currentUrl === 'approve' && roles.Account == process.env.FULL_ACCESS),
                view: (currentUrl == 'detail' && roles.Account != process.env.ACCESS_DENIED),
                view_all: ((currentUrl === '' && roles.RoleName == 'ADMIN') && roles.Account != process.env.ACCESS_DENIED)
            }

            let category = {
                create: (req.method === 'POST' && (roles.Category == process.env.FULL_ACCESS || roles.Category == process.env.CREATE)),
                modify: (req.method === 'PUT' && (roles.Category == process.env.FULL_ACCESS || roles.Category == process.env.MODIFY)),
                remove: (req.method === 'DELETE' && roles.Category == process.env.FULL_ACCESS),
                view: (req.method === 'GET' && roles.Category != process.env.ACCESS_DENIED)
            }

            let productAccount = {
                create: (req.method === 'POST' && (roles.Product == process.env.FULL_ACCESS || roles.Product == process.env.CREATE)),
                modify: (req.method === 'PUT' && (roles.Product == process.env.FULL_ACCESS || roles.Product == process.env.MODIFY)),
                remove: (req.method === 'DELETE' && roles.Product == process.env.FULL_ACCESS),
                view: (req.method === 'GET' && roles.Product != process.env.ACCESS_DENIED)
            }

            let review = {
                create: (req.method === 'POST' && roles.RoleName === 'USER' && (roles.Review == process.env.FULL_ACCESS || roles.Review == process.env.CREATE)),
                modify: (req.method === 'PUT' && (roles.Review == process.env.FULL_ACCESS || roles.Review == process.env.MODIFY)),
                remove: (req.method === 'DELETE' && roles.Review == process.env.FULL_ACCESS),
                view: (req.method === 'GET' && roles.Review != process.env.ACCESS_DENIED)
            }
            let report = {
                create: (req.method === 'POST' && (roles.Report == process.env.FULL_ACCESS || roles.Report == process.env.CREATE)),
                modify: (req.method === 'PUT' && (roles.Report == process.env.FULL_ACCESS || roles.Report == process.env.MODIFY)),
                remove: (req.method === 'DELETE' && roles.Report == process.env.FULL_ACCESS),
                view: (req.method === 'GET' && roles.Report != process.env.ACCESS_DENIED)
            }
            if (oldUrl === 'account') {
                if (acctionAccount.create || acctionAccount.modify || acctionAccount.delete_soft || acctionAccount.remove || acctionAccount.view || acctionAccount.view_all || acctionAccount.active) {
                    next();
                } else {
                    return res.status(403).json({
                        message: "You dont have permission to access this resource...",
                        data: null
                    })
                }
            }
            else if (oldUrl === 'permission') next();
            else if (oldUrl === 'payment') next();
            else if (oldUrl === 'createBill') next();
            else if (oldUrl === 'bill') next();
            else if (oldUrl === 'folow') next();
            else if (oldUrl === 'reason') next();
            else if (oldUrl === 'response') next();
            else if (oldUrl === 'favor-product') next();
            else if (oldUrl === 'cart') next();
            else if (oldUrl === 'report') {
                if (report.create || report.modify || report.remove || report.view) next();
                else {
                    return res.status(403).json({
                        message: "You dont have permission to access this resource...",
                        data: null
                    })
                }
            }
            else if (oldUrl === 'review') {
                if (review.create || review.modify || review.remove || review.view) next();
                else {
                    return res.status(403).json({
                        message: "You dont have permission to access this resource...",
                        data: null
                    })
                }
            }

            else if (oldUrl === 'category') {
                if (category.create || category.modify || category.remove || category.view) next();
                else {
                    return res.status(403).json({
                        message: "You dont have permission to access this resource...",
                        data: null
                    })
                }
            }
            else if (oldUrl === 'product') {
                if (productAccount.create || productAccount.modify || productAccount.remove || productAccount.view) {
                    next();
                }
                else if (currentUrl == 'option') next();
                else {
                    return res.status(403).json({
                        message: "You dont have permission to access this resource...",
                        data: null
                    })
                }
            }


            else {
                return res.status(403).json({
                    message: "You dont have permission to access this resource...",
                    data: null
                })
            }

        } else {

            return res.status(401).json({
                message: "Not authenticated the user"
            })
        }
    }
    else return next();
}
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission, checkUserAction
}