const db = require('../../connection/connect');
const date = require('date-and-time');
const Account = function (acount) {
    this.account_id = acount.account_id;
    this.fullname = acount.fullname;
    this.email = acount.email;
    this.phone = acount.phone;
    this.address = this.address;
    this.dob = date.format(acount.dob, 'YYYY/MM/DD');
    this.gender = acount.gender;
    this.username = acount.username;
    this.password = acount.password;
    this.permission = this.permission;
    this.avatar = acount.avatar;
    this.status = acount.status;
    this.creatAt = acount.creatAt;
    this.modifiedAt = acount.modifiedAt;
}
Account.search = function (require, results) {
    db.query(`SELECT * FROM techwave.account WHERE fullname like '%${require}%' or email like '%${require}%'`, (err, data) => {
        if (err) console.log(err);
        else results(data)
    })
}
Account.getPermission = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user_permission where permission_id=${id}`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

Account.getAddressByProduct = (product_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT account.address FROM product inner join account on product.createBy=account.account_id
        WHERE product.product_id=${product_id}`, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].address);
                } else {
                    resolve(null);
                }
            }
        })
    })
}
Account.getAllAccounts = function (status, result) {
    db.query(`SELECT * FROM account WHERE status=${status}`, function (err, account) {
        if (err) throw result(err);
        else result(account);
    });

}
Account.findByEmail = function (email, result) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM account Where email='${email}'`, function (err, account) {
            if (err) reject(err);
            else if (account.length == 0) resolve(null);
            else resolve(account[0])
        })
    })
}
Account.getById = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM account where account_id=${id}`, function (err, account) {
            if (err || account.length == 0) resolve(null);
            else resolve(account[0]);
        });
    })

}
Account.setpassword = function (password, email) {
    db.query(`UPDATE account SET password='${password}' Where email='${email}'`, (err, account) => {
        if (err) console.log(err);
        else console.log("Set password successfully")
    })
}
Account.findOne = function (email, password, result) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM account Where email='${email}' and password='${[password]}'`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

Account.create = function (data, result) {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query('INSERT INTO account SET ?', data, function (err, account) {
        if (err) throw reject(err);
        else {
            if (data.status == '1') result({ message: "Tạo tài khoản thành công", data: { id: account.insertId, ...data } });
            else result({ message: "Tạo thành công, đang đợi phê duyệt", data: { id: account.insertId, ...data } });
        }
    })
}
Account.update = function (id, data, result) {
    const now = new Date();
    data.modifiedAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`UPDATE account SET ? Where account_id=${id}`, data, function (err) {
        if (err) throw result(err);
        else result({ ...data });
    });
}
Account.softdelete = function (id, result) {
    db.query(`UPDATE account SET status='2' Where account_id=${id}`, function (err) {
        if (err) throw result(err);
        else result('Soft Delete Successful');
    });
}
Account.remove = function (id, result) {
    db.query(`Delete From account Where account_id=${id}`, function (err) {
        if (err) throw result(err);
        else result("Xóa thành công id: " + id);
    });
}
Account.active = function (id, result) {
    db.query(`UPDATE account SET status='1' Where account_id=${id}`, function (err) {
        if (err) throw result(err);
        else result('Active Successful');
    });
}

module.exports = Account;