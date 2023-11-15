const db = require('../../connection/connect');
const Folow = function (folow) {
    this.folow_id = folow.folow_id;
    this.user_id = folow.user_id;
    this.vender_id = folow.vender_id;
}
Folow.get = function (id, result) {
    db.query(`SELECT * FROM folow WHERE user_id=${id}`, (err, data) => {
        if (err) console.log(err);
        else result({ data });
    })
}
Folow.getFolowStore = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM techwave.folow WHERE vender_id=${id}`, (err, data) => {
            if (err) reject(err);
            else resolve(data.length);
        })
    })
}
Folow.add = function (data, result) {
    db.query(`INSERT INTO folow SET ?`, data, (err, kq) => {
        if (err) console.log(err);
        else result({ folow_id: kq.insertId, ...data })
    })
}
Folow.delete = function (data, result) {
    db.query(`DELETE FROM folow WHERE vender_id=${data.vender_id} and user_id=${data.user_id}`, data, (err, kq) => {
        if (err) console.log(err)
        else result({ success: true, message: "Hủy folow thành công" })
    })
}
module.exports = Folow;