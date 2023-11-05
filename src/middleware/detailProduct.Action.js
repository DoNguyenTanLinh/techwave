const db = require('../connection/connect');

const setDetail = function (id) {
    try {
        let data = {
            "content": null,
            product_id: id
        }
        db.query("INSERT INTO detail SET ?", data, (err, kq) => {
            if (err) { console.log(err) }
        });
    } catch (err) {
        console.log(err);
    }
}
const deleteDetail = function (id) {
    try {
        db.query(`DELETE FROM detail WHERE product_id=${id}`, (err) => {
            if (err) { console.log(err) }
        });
    } catch (err) {
        console.log(err);
    }
}
const getDetail = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT content FROM detail WHERE product_id=${id}`, (err, kq) => {
            if (err) { console.log(err); reject(err) }
            else resolve(kq[0].content)
        });
    })
}

module.exports = { setDetail, deleteDetail, getDetail }
