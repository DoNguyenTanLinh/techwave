const Account = require('../models/entity/account.enitty');
const accountMapper = require('../models/mapper/account.mapper');
const accountResponse = require('../models/response/account.response');
const jwtService = require('../service/JWTService')
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
        Account.getById(req.params.id, function (data) {
            res.send(accountMapper.toResponseSimple(data, accountResponse));
        })
    }
    get_token = async function (req, res) {
        try {
            const email = 'linhabc@...';
            const result = await jwtService.getGroupWithRoles(email);
            res.json(result);
        } catch (error) {
            console.error(error);
        }

    }
}
module.exports = new AccountController;
