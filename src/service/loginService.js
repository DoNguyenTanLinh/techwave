const db = require('../connection/connect');
const Account = require('../models/entity/account.enitty');
const jwtService = require('../service/JWTService');
var { createJWT, verifyToken } = require('../middleware/JWTAction');
const checkLogin = async function (req) {
    const data = await Account.findOne(req.email, req.password, function (account) {
        return account
    });

    if (data) {

        let groupWithRole = await jwtService.getGroupWithRoles(data.email)
        let payload = {
            email: data.email,
            groupWithRole
        }

        let token = await createJWT(payload)
        return { access_token: token, groupWithRole }
    } else {
        return ({ success: false, message: "Invalid email or password" });
    }
}

module.exports = { checkLogin }