const db = require('../../connection/connect');

const Permission = function (permisson) {
    this.Role = permisson.RoleName;
    this.Product = permisson.Product;
    this.Category = permisson.Category;
    this.Account = permisson.Account;
    this.PostNew = permisson.PostNew;
    this.Review = permisson.Review;
    this.Report = permisson.Report;
    this.url = permisson.url;
}
Permission.getAll = (res) => {
    db.query('SELECT * FROM user_permission', (err, data) => {
        if (err) {
            console.log(err);
            res({ message: "Error getting permission", err })
        } else res({ message: "Get Permission Successful", data });
    })
}
Permission.edit = async (data) => {
    for (const element of data) {
        await new Promise((resolve, reject) => {
            db.query(`UPDATE user_permission SET ? WHERE permission_id=${element.permission_id}`, element, (err) => {
                if (err) {
                    reject(err);
                }
                else resolve()
            });
        });
    }
    return data;
};

module.exports = Permission;