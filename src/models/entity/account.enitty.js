const db = require('../../connection/connect');
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
    this.deleted = acount.deleted;
    this.creatAt = acount.creatAt;
    this.modifiedAt = acount.modifiedAt;


    // Hàm để lấy giá trị của address
    this.init = async function () {
        try {
            this.address = await Account.getaddress(acount.account_id);
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
                    resolve(result);
                } else {
                    resolve(null);
                }
            }
        });
    });
}
Account.getaddress = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT diachi FROM address where id_account=${id} and status='1'`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].diachi);
                } else {
                    resolve(null);
                }
            }
        });
    });
};
Account.getAllAccounts = function (result) {
    db.query("SELECT * FROM account", function (err, account) {
        if (err) throw result(err);
        else result(account);
    });

}
Account.getById = function (id, result) {
    db.query(`SELECT * FROM account as a
    inner join address as b on a.account_id=b.id_account
    where a.account_id=${id} and b.status='1'`, function (err, account) {
        if (err || account.length == 0) throw result(null);
        else result(account[0]);
    });
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

module.exports = Account;