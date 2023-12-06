const db = require('../connection/connect');
const deleteCartByAccount = (id) => {
    db.query(`DELETE FROM cart WHERE account_id=${id}`, (err) => {
        if (err) throw err;
    })
}
module.exports = { deleteCartByAccount }