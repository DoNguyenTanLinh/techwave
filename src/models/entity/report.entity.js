const db = require('../../connection/connect');
const date = require('date-and-time');
const { ReportUserResponse, ReportAdminResponse } = require('../response/report.response')
const Report = function (report) {
    this.report_id = report.report_id;
    this.content = report.content;
    this.id_account_report = report.id_account_report;
    this.createAt = report.createAt;
    this.createBy = report.createBy;
    this.status = report.status;
    this.picture = report.picture;
}
Report.getAll = function (status, result) {
    db.query(`SELECT * FROM report WHERE status='${status}'`, (err, data) => {
        if (err) console.log(err);
        else {
            const adminReports = data.map(async report => {
                const adminReport = new ReportAdminResponse(report, ReportAdminResponse)
                await adminReport.initReport()
                await adminReport.initCreateBy();
                return adminReport
            })
            Promise.all(adminReports)
                .then((report) => result(report))
                .catch((err) => console.log(err))
        };
    })
}
Report.getByRole = (id, result) => {
    db.query(`SELECT * FROM report WHERE createBy=${id}`, (err, data) => {
        if (err) console.log(err)
        else {
            const userReports = data.map(async (report) => {
                const userReport = new ReportUserResponse(report, ReportUserResponse)
                await userReport.initReport();
                // await userReport.initReason();
                return userReport
            })
            Promise.all(userReports)
                .then((report) => result(report))
                .catch((err) => console.log(err))
        }
    })
}
Report.getdetails = (id, result) => {
    db.query(`SELECT * FROM report WHERE report_id=${id}`, async (err, data) => {
        if (err) console.log(err)
        else {
            const userReport = new ReportUserResponse(data[0], ReportUserResponse)
            await userReport.initReport();
            // await userReport.initReason();
            result(userReport)
        }
    })
}
Report.create = (data, result) => {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`INSERT INTO report SET ?`, data, (err, kq) => {
        if (err) console.log(err);
        else result({ report_id: kq.insertId, ...data })
    })
}
Report.resolve = (id, result) => {
    db.query(`UPDATE report SET status='1' WHERE report_id=${id}`, (err, data) => {
        if (err) console.log(err);
        else result({ message: "Đã giải quyết report id:  " + id })
    })
}
module.exports = Report;