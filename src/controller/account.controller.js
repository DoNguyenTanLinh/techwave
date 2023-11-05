const Account = require('../models/entity/account.enitty');
const Address = require('../models/entity/address.entity');
const accountMapper = require('../models/mapper/account.mapper');
const accountResponse = require('../models/response/account.response');
const accountResquest = require('../models/resquest/account.request');
const { setAddress } = require('../middleware/address.Action')
class AccountController {
    get_All = function (req, res) {
        Account.getAllAccounts(function (data) {
            // res.json(accountMapper.toResponse(data, Account));\
            const accountPromises = data.map(accountData => {
                const myAccount = new Account(accountData, Account);
                const promises = [myAccount.init(), myAccount.permission()];
                return Promise.all(promises).then(() => myAccount);
            });
            Promise.all(accountPromises)
                .then(accounts => {
                    res.json(accounts);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send("Error fetching account data");
                });

        })
    }
    get_Detail = function (req, res) {
        Account.getById(req.user.id, async function (data) {
            const myAccount = accountMapper.toResponseSimple(data, accountResponse.AccountResponseAll);
            await myAccount.init()
                .then(() => {
                    res.json(myAccount);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send("Error fetching account data");
                });

        })
    }
    get_DetailOthAccount = function (req, res) {
        Account.getOthById(req.params.id, function (data) {
            res.send(accountMapper.toResponseSimple(data, accountResponse.AccountResponse));
        })
    }
    create_account = async function (req, res) {
        var data = accountMapper.toResquestSimple(req.body, accountResquest);
        let accResponse = null;
        await Account.create(data)
            .then((account) => {
                req.id = account.data.id;
                accResponse = account;
            })

        setAddress(req)
        accResponse.data.address = req.body.address;
        res.json(accResponse);

    }
    update_account = async (req, res) => {
        var data = accountMapper.toResquestSimple(req.body, accountResquest);
        let address = null;
        await Address.update(req.body.address.add_id, { ...req.body.address })
            .then((result) => {
                address = result.diachi;
            })
            .catch((error) => {
                console.error(error);
            });
        Account.update(req.user.id, data, function (result) {
            result.address = address;
            res.json({ message: result });
        });
    }
    soft_delete = (req, res) => {
        var id = req.params.id;
        Account.softdelete(id, function (result) {
            res.json({ message: result });
        })
    }
    remove_account = (req, res) => {
        var id = req.params.id;
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
