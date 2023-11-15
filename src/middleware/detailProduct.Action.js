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
        if (id) {
            db.query(`SELECT content FROM detail WHERE product_id=${id}`, (err, kq) => {
                if (err) { console.log(err); reject(err) }
                else if (kq.length == 0) resolve(null)
                else resolve(kq[0].content)
            });
        }
        else {
            resolve(null)
        }
    })
}

module.exports = { setDetail, deleteDetail, getDetail }
