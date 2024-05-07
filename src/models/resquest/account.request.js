const ModifyAccountResquest = function (acount, data) {
    if (data.fullname) acount.fullname = data.fullname;
    if (data.email) acount.email = data.email;
    if (data.phone) acount.phone = data.phone;
    if (data.dob) acount.dob = data.dob;
    if (data.gender) acount.gender = data.gender;
    if (data.username) acount.username = data.username;
    if (data.password) acount.password = data.password;
    if (data.avatar) acount.avatar = data.avatar;
}


module.exports = { ModifyAccountResquest };