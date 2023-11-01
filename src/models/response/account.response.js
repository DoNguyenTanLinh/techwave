const AccountResponse = function (acount) {
    this.account_id = acount.account_id;
    this.fullname = acount.fullname;
    this.email = acount.email;
    this.phone = acount.phone;
    this.address = acount.diachi;
    this.dob = acount.dob;
    this.gender = acount.gender;
    this.username = acount.username;
    this.avatar = acount.avatar;
}

module.exports = AccountResponse;