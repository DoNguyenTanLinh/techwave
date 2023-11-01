var loginService = require('../service/loginService');
const handleLogin = async (req, res) => {
    try {
        let data = await loginService.checkLogin(req.query);
        res.cookie("jwt", data.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        return res.status(200).json({
            data
        });
    }
    catch (err) {
        throw err
    }

}
module.exports = { handleLogin }