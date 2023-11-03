const date = require('date-and-time')
const Address = require('../entity/address.entity');
class AccountResponse {
    AccountResponse = function (acount) {
        this.account_id = acount.account_id;
        this.fullname = acount.fullname;
        this.email = acount.email;
        this.phone = acount.phone;
        this.address = acount.diachi;
        // this.dob = date.format(acount.dob, 'YYYY/MM/DD');
        this.dob = acount.dob;
        this.gender = acount.gender;
        this.username = acount.username;
        this.avatar = acount.avatar;
    }
    AccountResponseAll = function (acount) {
        this.account_id = acount.account_id;
        this.fullname = acount.fullname;
        this.email = acount.email;
        this.phone = acount.phone;
        this.address = null;
        this.dob = date.format(acount.dob, 'YYYY/MM/DD');
        this.gender = acount.gender;
        this.username = acount.username;
        this.avatar = acount.avatar;
        this.init = async function () {
            try {
                this.address = await Address.getAllAddress(acount.account_id);
            } catch (error) {
                console.error(error);
            }
        };
    }
}
module.exports = new AccountResponse;