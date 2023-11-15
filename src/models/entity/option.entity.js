const db = require('../../connection/connect');
const Option = function (option) {
    this.option_id = option.option_id;
    this.product_id = option.product_id;
    this.name = option.name;
    this.image = option.image;
}
Option.getAll = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM options WHERE product_id=${id}`, (err, data) => {
            if (err) { console.log(err); reject({ message: "Error getting option", error: err }) }
            else resolve(data)
        })
    })
}
Option.getName = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT name,image FROM options WHERE option_id=${id}`, (err, data) => {
            if (err || data.length == 0) {
                resolve(null)
            }
            else resolve(data[0])
        })
    })
}
Option.create = function (data, result) {
    try {
        db.query(`INSERT INTO options SET ?`, data, (err, kq) => {
            if (err) { console.log(err); result({ message: "Error inserting option", error: err }) }
            else result({ message: "CREATE option Successful", data: { option_id: kq.insertId, ...data } })
        })
    } catch (err) {
        console.log(err); result({ message: "ERROR SERVER", error: err })
    }
}
Option.edit = function (id, data, result) {
    try {
        db.query(`UPDATE options SET ? WHERE option_id=${id}`, data, (err, kq) => {
            if (err) { console.log(err); result({ message: "Error updating option", error: err }) }
            else result({ message: "Update option Successful", data: { option_id: id, ...data } })
        })
    } catch (err) {
        console.log(err); result({ message: "ERROR SERVER", error: err })
    }
}
Option.delete = function (id, result) {
    try {
        db.query(`DELETE FROM options WHERE option_id=${id}`, (err) => {
            if (err) { console.log(err); result({ message: "Error delting option", error: err }) }
            else result({ message: "Xóa thành công" })
        })
    } catch (err) {
        console.log(err); result({ message: "ERROR SERVER", error: err })
    }
}
module.exports = Option;