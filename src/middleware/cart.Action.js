const db = require('../connection/connect');
const setCartByAccount = (id) => {
    db.query(`UPDATE cart SET account_id=null WHERE account_id=${id}`, (err) => {
        if (err) throw err;
    })
}
module.exports = { setCartByAccount }