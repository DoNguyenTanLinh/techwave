const db = require('../connection/connect');
const deleteAllOption = function (id) {
    try {
        db.query(`DELETE FROM options WHERE product_id=${id}`, function (err) {
            if (err) console.log(err)

        })
    } catch (err) {
        console.log(err)
    }
}
const setAllPost = function (id) {
    db.query(`UPDATE poster_new set product_id=null WHERE product_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
const setAllCart = function (id) {
    db.query(`UPDATE cart set product_id=null WHERE product_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
module.exports = { deleteAllOption, setAllPost, setAllCart }