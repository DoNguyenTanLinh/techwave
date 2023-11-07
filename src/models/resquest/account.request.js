const ModifyAccountResquest = function (acount, data) {
    acount.fullname = data.fullname;
    acount.email = data.email;
    acount.phone = data.phone;
    acount.dob = data.dob;
    acount.gender = data.gender;
    acount.username = data.username;
    acount.password = data.password;
    acount.address = data.address;
    acount.avatar = data.avatar;
}


module.exports = { ModifyAccountResquest };