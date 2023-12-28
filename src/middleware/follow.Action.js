const db = require('../connection/connect');
const deleteFollowVendor = function (id) {
    db.query(`DELETE FROM folow WHERE vender_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
module.exports = { deleteFollowVendor }