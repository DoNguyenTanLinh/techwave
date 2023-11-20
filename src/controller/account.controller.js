const Account = require('../models/entity/account.enitty');
const Address = require('../models/entity/address.entity');
const { ModifyAccountResquest } = require('../models/resquest/account.request');
const { setAddress } = require('../middleware/address.Action');
const { deleteAllfav } = require('../middleware/favProduct.Action');

const joi = require('joi');
class AccountController {
    get_All = function (req, res) {
        Account.getAllAccounts(function (data) {
            res.json(data);
        })
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
                ModifyAccountResquest(oldAccount, req.body);
                Account.update(req.user.id, oldAccount, function (result) {
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
}
module.exports = new AccountController;
