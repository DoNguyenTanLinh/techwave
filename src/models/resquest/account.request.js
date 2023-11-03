const AccountResquest = function (acount) {
    this.fullname = acount.fullname;
    this.email = acount.email;
    this.phone = acount.phone;
    this.dob = acount.dob;
    this.gender = acount.gender;
    this.username = acount.username;
    this.password = acount.password;
    this.avatar = acount.avatar;
    this.id_permission = acount.id_permission;
    this.status = acount.status;
}


module.exports = AccountResquest;