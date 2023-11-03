var loginService = require('../service/loginService');
const accountController = require('./account.controller');
class ApiController {
    handleLogin = async (req, res) => {
        try {
            let data = await loginService.checkLogin(req.body);
            if (data) {
                res.cookie("jwt", data.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                return res.status(200).json({
                    success: true,
                    message: "Login successful",
                    data
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                    data
                });
            }
        }
        catch (err) {
            throw err;
        }

    }
    handleLogout = (req, res) => {
        try {
            res.clearCookie("jwt");
            return res.status(200).json({
                message: "Logout successful",
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "err from server",
            });
        }
    }
    handleRegister = async (req, res) => {
        try {
            let data = await accountController.create_account(req, res);
            return res.status(200).json({
                message: "Sigin successful",
                data
            })

        } catch (err) {
            console.log(error);
            return res.status(500).json({
                message: "err from server",
            });
        }
    }
}

module.exports = new ApiController;