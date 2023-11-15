const db = require('../connection/connect');
const SetStatusReport = (id) => {
    db.query(`UPDATE report SET status='2' WHERE report_id=${id}`, (err) => {
        if (err) console.log(err)

    })
}
module.exports = SetStatusReport