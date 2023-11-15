const db = require('../../connection/connect');
const { ReasonOfReportResponse } = require('../response/reason.response')
const date = require('date-and-time');
const Reason = function (reason) {
    this.reason_id = reason.reason_id;
    this.content = reason.content;
    this.report_id = reason.report_id;
    this.createAt = reason.createAt;
    this.createBy = reason.createBy;
}
Reason.getByReport = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM reason WHERE report_id=${id}`, async (err, data) => {
            if (err) console.log(err);
            else {
                const reason = new ReasonOfReportResponse(data[0], ReasonOfReportResponse)
                await reason.initReasonReport()
                resolve(reason)
            }
        })
    })
}
Reason.create = (data, result) => {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`INSERT INTO reason SET ?`, data, (err, kq) => {
        if (err) console.log(err)
        else result({ reason_id: kq.insertId, ...data })
    })
}
module.exports = Reason