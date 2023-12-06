const db = require('../connection/connect');
const setStatusReview = (id) => {
    db.query(`UPDATE review SET status=1 WHERE review_id=${id}`, (err) => {
        if (err) console.log(err);
    })
}
const deleteResponseByAccount = (id) => {
    db.query(`DELETE FROM response WHERE createBy=${id}`, (err) => {
        if (err) console.log(err);
    })
}
module.exports = { setStatusReview, deleteResponseByAccount }