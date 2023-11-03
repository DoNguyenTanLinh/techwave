const db = require('../connection/connect');
const Account = require('../models/entity/account.enitty');
const getGroupWithRoles = (email) => {
    return new Promise((resolve, reject) => {
        getIdPermissionByEmail(email)
            .then(id => {
                return resolve(Account.getPermission(id));
            })
            .catch(error => {
                reject(error);
            });
    })
};



getIdPermissionByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id_permission FROM account where email='${email}'`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].id_permission);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

module.exports = { getGroupWithRoles }