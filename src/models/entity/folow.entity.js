const db = require('../../connection/connect');
const Follow = function (follow) {
    this.follow_id = folow.folow_id;
    this.user_id = folow.user_id;
    this.vender_id = folow.vender_id;
}
Follow.get = function (id, result) {
    db.query(`SELECT * FROM folow WHERE user_id=${id}`, (err, data) => {
        if (err) console.log(err);
        else result(data);
    })
}
Follow.getFolowStore = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM techwave.folow WHERE vender_id=${id}`, (err, data) => {
            if (err) reject(err);
            else resolve(data.length);
        })
    })
}
Follow.findFollow = function (idVendor, idUser) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM techwave.folow WHERE vender_id=${idVendor} and user_id=${idUser}`, (err, data) => {
            if (err) reject(err);
            if (data.length == 0) resolve(false)
            else resolve(true);
        })
    })
}
Follow.add = function (data, result) {
    db.query(`INSERT INTO folow SET ?`, data, (err, kq) => {
        if (err) console.log(err);
        else result({ folow_id: kq.insertId, ...data })
    })
}
Follow.delete = function (data, result) {
    db.query(`DELETE FROM folow WHERE follow_id=${data.follow_id} and user_id=${data.user_id}`, data, (err, kq) => {
        if (err) console.log(err)
        else result({ success: true, message: "Hủy folow thành công" })
    })
}
module.exports = Follow;