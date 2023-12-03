const Account = require('../models/entity/account.enitty');
const Address = require('../models/entity/address.entity');
// const { ModifyAccountResquest } = require('../models/resquest/account.request');
const { setAddress } = require('../middleware/address.Action');
const { deleteAllfav } = require('../middleware/favProduct.Action');
const { transporter } = require('../service/SendMail')
const joi = require('joi');
const ejs = require('ejs');
const fs = require('fs');
class AccountController {
    get_All = function (req, res) {
        if (req.query.page) {
            Account.getAllAccounts(req.query.status, function (data) {
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);
                // calculating the starting and ending index
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                const results = {};
                results.total = Math.ceil(data.length / limit)
                if (endIndex < data.length) {
                    results.next = {
                        page: page + 1,
                        limit: limit
                    };
                }
                if (startIndex > 0) {
                    results.previous = {
                        page: page - 1,
                        limit: limit
                    };
                }
                results.results = data.slice(startIndex, endIndex);
                res.status(200).json(results);
            })
        }
        else {
            Account.getAllAccounts(req.query.status, function (data) {
                res.json(data);
            })
        }
    }
    get_Detail = async function (req, res) {
        try {
            let data = await Account.getById(req.user.id)
            res.json(data);
        } catch (err) {
            res.json({ message: "Error", err })
        }
    }
    get_OthDetails = async function (req, res) {
        try {
            let data = await Account.getById(req.params.id)
            res.json(data);
        } catch (err) {
            res.json({ message: "Error", err })
        }
    }
    create_account = async function (req, res) {
        if (!req.body.status) req.body.status = '1';
        let email = await Account.findByEmail(req.body.email);
        if (email) {
            return res.status(200).json({
                message: "Email đã tồn tại",
                data: null
            })
        }
        else {
            Account.create(req.body, (data) => res.json(data))

        }

    }
    update_account = async (req, res) => {
        if (!req.params.id) {
            try {
                let oldAccount = await Account.getById(req.user.id);
                // ModifyAccountResquest(oldAccount, req.body);
                Account.update(req.user.id, req.body, function (result) {
                    res.json({ message: result });
                })
            } catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let oldAccount = await Account.getById(req.params.id);
                if (oldAccount) {
                    ModifyAccountResquest(oldAccount, req.body);
                    Account.update(req.params.id, oldAccount, function (result) {
                        res.json({ message: result });
                    })
                }
                else {
                    res.json({ message: "Không thấy tài khoản" })
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    soft_delete = (req, res) => {
        var id = req.params.id;
        Account.softdelete(id, function (result) {
            res.json({ message: result });
        })
    }
    remove_account = async (req, res) => {
        var id = req.params.id;
        await deleteAllfav(req.params.id)
        Account.remove(id, function (result) {
            res.json({ message: result });
        })

    }

    active = (req, res) => {
        Account.active(req.params.id, function (result) {
            res.json({ message: result });
        })
    }
    approve = (req, res) => {
        Account.active(req.params.id, async function (result) {
            if (result) {
                let account = await Account.getById(req.params.id);
                const emailTemplate = fs.readFileSync('teamplate/MailTeamplate.ejs', 'utf-8');
                const renderedTemplate = ejs.render(emailTemplate, { username: account.username, email: account.email, password: account.password });
                const mailSend = {
                    from: 'TECHWAVE',
                    to: account.email,
                    subject: "Thông Báo: Đăng Ký Bán Hàng Thành Công trên TECHWAVE",
                    // text: `Chào ${account.username},
                    //     \nChúc mừng! Bạn đã đăng ký trở thành người bán trên TECHWAVE thành công.
                    //     \nDưới đây là một số thông tin quan trọng về tài khoản của bạn:
                    //     \nTên Đăng Nhập: ${account.email}\nMật khẩu: ${account.password}
                    //     \nHãy kiểm tra và đảm bảo rằng thông tin của bạn đã đúng. Nếu có bất kỳ thay đổi hoặc sửa đổi nào cần thiết, vui lòng cập nhật trong phần cài đặt tài khoản của bạn.
                    //     \nChúng tôi rất mong đợi sự hợp tác thành công giữa bạn và [Tên Nền Tảng của Bạn]. Nếu có bất kỳ câu hỏi hoặc cần hỗ trợ nào, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email hỗ trợ: techwaveute@gmail.com.
                    //     \nChúng tôi hy vọng bạn có trải nghiệm tốt nhất khi sử dụng dịch vụ của chúng tôi. Xin chân thành cảm ơn đã tham gia cùng chúng tôi!
                    //     \nTrân trọng,\nAdministrator of TECHWAVE`
                    html: renderedTemplate
                }
                const info = await transporter.sendMail(mailSend);
                console.log("Message sent: %s", info.messageId);
                res.status(200).json({ message: "Phê duyệt thành công" });
            }
        })
    }
}
module.exports = new AccountController;
