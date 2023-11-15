const db = require('../connection/connect');
const setCateProduct = (id) => {
    db.query(`UPDATE product SET category_id=null WHERE category_id=${id}`, (err) => { if (err) console.log(err) })
}

module.exports = setCateProduct