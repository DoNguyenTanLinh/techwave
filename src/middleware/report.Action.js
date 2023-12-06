const db = require('../connection/connect');
const deleteReportByAccount = (id) => {
    db.query(`DELETE FROM report WHERE id_account_report=${id} or createBy=${id}`, (err) => {
        if (err) console.log(err);
    })
}
module.exports = { deleteReportByAccount }