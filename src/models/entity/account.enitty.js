const db = require('../../connection/connect');
const date = require('date-and-time');
const Address = require('./address.entity');
const Account = function (acount) {
    this.account_id = acount.account_id;
    this.fullname = acount.fullname;
    this.email = acount.email;
    this.phone = acount.phone;
    this.address = null;
    this.dob = acount.dob;
    this.gender = acount.gender;
    this.username = acount.username;
    this.password = acount.password;
    this.permission = null;
    this.avatar = acount.avatar;
    this.status = acount.status;
    this.creatAt = acount.creatAt;
    this.modifiedAt = acount.modifiedAt;
    this.init = async function () {
        try {
            this.address = await Address.getAddress(acount.account_id);
        } catch (error) {
            console.error(error);
        }
    };
    this.permission = async () => {
        try {
            this.permission = await Account.getPermission(acount.account_id);
        } catch (error) {
            console.error(error);
        }
    }
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
//address

Account.getAllAccounts = function (result) {
    db.query("SELECT * FROM account", function (err, account) {
        if (err) throw result(err);
        else result(account);
    });

}
Account.getOthById = function (id, result) {
    db.query(`SELECT * FROM account as a
    inner join address as b on a.account_id=b.id_account
    where a.account_id=${id} and b.status='1'`, function (err, account) {
        if (err || account.length == 0) throw result(null);
        else result(account[0]);
    });
}
Account.getById = function (id, result) {
    db.query(`SELECT * FROM account where account_id=${id}`, function (err, account) {
        if (err || account.length == 0) throw result(null);
        else result(account[0]);
    });
}

Account.findOne = function (email, password, result) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM account Where email='${email}' and password='${[password]}' and status=1`, function (err, result) {
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
Account.create = function (data) {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO account SET ?', data, function (err, account) {
            if (err) throw reject(err);
            else resolve({ message: "Tạo tài khoản thành công", data: { id: account.insertId, ...data } });
        })
    });
}
Account.update = function (id, data, result) {
    const now = new Date();
    data.modifiedAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`UPDATE account SET ? Where account_id=${id}`, data, function (err) {
        if (err) throw result(err);
        else result({ id: id, ...data });
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