require('dotenv').config();
const jwt = require("jsonwebtoken");
const nonSecure = ['/logout', '/login', '/register', '/introduce', '/product', '/category'];
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
const checkUserJWT = async (req, res, next) => {
    req.api = `/${req.path.split('/')[1]}`
    let cookie = req.cookies;
    if (cookie && cookie.jwt) {
        let token = cookie.jwt;
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
    } else {
        if (nonSecure.includes(req.api)) return next();
        return res.status(401).json({
            message: "Not authenticated the user"
        })
    }
}
const checkUserPermission = (req, res, next) => {

    if (nonSecure.includes(req.api)) return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRole;
        let currentUrl = req.path.split('/');
        const result = `/${currentUrl[1]}`;
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
const checkUserAction = (req, res, next) => {

    if (nonSecure.includes(req.api)) return next();
    if (req.user) {
        let oldUrl = (`${req.path.split('/')[2]}`);
        let currentUrl = (`${req.path.split('/')[3]}`);
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
            view: (currentUrl == 'detail' && roles.Account != process.env.ACCESS_DENIED),
            view_all: ((currentUrl === '' && roles.RoleName == 'ADMIN') && roles.Account != process.env.ACCESS_DENIED)
        }
        console.log(currentUrl)

        let category = {
            create: (currentUrl === 'create' && (roles.Category == process.env.FULL_ACCESS || roles.Category == process.env.CREATE)),
            modify: (currentUrl === 'edit' && (roles.Category == process.env.FULL_ACCESS || roles.Category == process.env.MODIFY)),
            remove: (currentUrl === 'remove' && roles.Category == process.env.FULL_ACCESS),
            view: ((currentUrl === '' || currentUrl == 'detail') && roles.Category != process.env.ACCESS_DENIED)
        }

        let productAccount = {
            create: (currentUrl === 'create' && (roles.Product == process.env.FULL_ACCESS || roles.Product == process.env.CREATE)),
            modify: (currentUrl === 'edit' && (roles.Product == process.env.FULL_ACCESS || roles.Product == process.env.MODIFY)),
            remove: (currentUrl === 'remove' && roles.Product == process.env.FULL_ACCESS),
            view: ((currentUrl !== 'create' && currentUrl !== 'edit' && currentUrl !== 'remove') && roles.Product != process.env.ACCESS_DENIED)
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
        else if (oldUrl === 'introduce') next();
        else if (oldUrl === 'permission') next();
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
            } else {
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
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission, checkUserAction
}