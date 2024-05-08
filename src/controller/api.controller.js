require('dotenv').config();
var loginService = require('../service/loginService');
const crypto = require('crypto');
const accountController = require('./account.controller');
const Account = require('../models/entity/account.enitty');
const { transporter } = require('../service/SendMail')
class ApiController {
    handleLogin = async (req, res) => {
        try {
            let data = await loginService.checkLogin(req.body);
            if (data && data.status == 1) {
                res.cookie("jwt", data.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                return res.status(200).json({
                    success: true,
                    message: "Login successful",
                    data
                });
            }
            else if (data && data.status == 0) {
                return res.status(401).json({
                    success: false,
                    message: "Tài khoản đã bị vô hiệu hóa",
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
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
            req.body.id_permission = 3;
            let email = await Account.findByEmail(req.body.email);
            if (email) {
                throw new Error("Email already exists")
            }
            else {
                return await accountController.create_account(req, res);

            }

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "err from server"
            });
        }
    }
    handleRegisterStaff = async (req, res) => {
        try {
            req.body.status = '0';
            req.body.id_permission = 2;
            let email = await Account.findByEmail(req.body.email);

            if (email) {
                return res.status(400).json({
                    err: "400",
                    message: "Email already exists"
                });

            }
            else {
                return await accountController.create_account(req, res);

            }

        } catch (error) {
            return res.status(500).json({
                err: "500",
                message: error
            });
        }
    }
    handleForgotPassword = async (req, res) => {
        try {
            let email = await Account.findByEmail(req.body.email);
            if (email) {
                let password = crypto.randomBytes(8).toString('base64');
                await Account.setpassword(password, email.email);
                email.password = password;
                const mailSend = {
                    from: 'TECHWAVE',
                    to: email.email,
                    subject: "Thông báo đổi mật khẩu thành công",
                    text: `Chào ${email.username},
                        \nChúng tôi đã nhận được thông báo đổi mật khẩu từ bạn. Dưới đây là mật khẩu mới của bạn:
                        Mật khẩu: ${password}
                        \nVui lòng không chia sẻ mật khẩu với bất kỳ ai
                        \nNếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ gì, xin đừng ngần ngại liên hệ với chúng tôi tại techwaveute@gmail.com.\nChúng tôi rất mong được phục vụ bạn và chúc bạn có trải nghiệm tuyệt vời với TECHWAVE.
                        \nXin chân thành cảm ơn đã lựa chọn chúng tôi.Trân trọng,\nAdministrator of TECHWAVE`
                }
                const info = await transporter.sendMail(mailSend);
                console.log("Message sent: %s", info.messageId);
                return res.status(200).json({ message: "Đổi mật khẩu thành công, xin hãy kiểm tra email", data: email });
            }
            else {
                return res.status(500).json({
                    message: "Email không tồn tại",
                    data: null
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "err from server",
                err
            });
        }
    }
}

module.exports = new ApiController;