const db = require('../connection/connect');
const Account = require('../models/entity/account.enitty');
const jwtService = require('../service/JWTService');
var { createJWT, verifyToken } = require('../middleware/JWTAction');
const checkLogin = async function (req) {
    const data = await Account.findOne(req.email, req.password, function (account) {
        return account
    });
    if (data && data.status == 1) {
        let groupWithRole = await jwtService.getGroupWithRoles(data.email)
        let payload = {
            id: data.account_id,
            email: data.email,
            username: data.username,
            groupWithRole
        }
        let token = await createJWT(payload);
        return ({ account_id: data.account_id, username: data.username, access_token: token, groupWithRole, status: data.status });
    } else {
        return (data);
    }
}

module.exports = { checkLogin }