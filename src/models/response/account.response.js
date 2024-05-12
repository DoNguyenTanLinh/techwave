const date = require('date-and-time');
const Address = require('../entity/address.entity');
const AccountDetailResponse = function (acount) {
    this.account_id = acount.account_id;
    this.fullname = acount.fullname;
    this.email = acount.email;
    this.phone = acount.phone;
    this.address = null;
    this.dob = date.format(acount.dob, 'YYYY/MM/DD');
    this.gender = acount.gender;
    this.username = acount.username;
    this.password = acount.password;
    this.id_permission = acount.id_permission;
    this.avatar = acount.avatar;
    this.status = acount.status;
    this.creatAt = acount.creatAt;
    this.modifiedAt = acount.modifiedAt;
    this.init = async () => {
        try {
            this.address = await Address.getAddress(acount.account_id);
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = AccountDetailResponse;