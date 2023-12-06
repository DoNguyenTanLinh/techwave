const db = require('../connection/connect');
const setBillByAccount = (id) => {
    db.query(`UPDATE bill SET createBy=null WHERE createBy=${id}`, (err) => {
        if (err) throw err;
    })
}
module.exports = { setBillByAccount }