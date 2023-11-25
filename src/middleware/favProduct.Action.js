const db = require('../connection/connect');
const deleteAllfav = (id) => {
    db.query(`DELETE FROM favorite_product WHERE account_id=${id}`, (err) => {
        if (err) (console.log(err));
    })
}
const setDeleteProduct = (id) => {
    db.query(`DELETE FROM favorite_product where product_id=${id}`, (err) => {
        if (err) (console.log(err));
    })
}
module.exports = { deleteAllfav, setDeleteProduct }