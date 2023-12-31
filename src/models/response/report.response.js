const Account = require("../entity/account.enitty");
const ReportUserResponse = function (report) {
    this.report_id = report.report_id;
    this.content = report.content;
    this.account_report = null;
    this.createAt = report.createAt;
    this.status = report.status;
    this.picture = report.picture;
    this.initReport = async () => {
        try {
            let account = await Account.getById(report.id_account_report);
            this.account_report = {
                account_id: account.account_id,
                username: account.username,
                avatar: account.avatar
            }
        } catch (e) {
            console.log(e);
        }
    }
}
const ReportAdminResponse = function (report) {
    this.report_id = report.report_id;
    this.content = report.content;
    this.account_report = null;
    this.createAt = report.createAt;
    this.createBy = null
    this.status = report.status;
    this.picture = report.picture;
    this.initReport = async () => {
        try {
            let account = await Account.getById(report.id_account_report);
            this.account_report = {
                account_id: account.account_id,
                username: account.username,
                avatar: account.avatar
            }
        } catch (e) {
            console.log(e);
        }
    }
    this.initCreateBy = async () => {
        try {
            let account = await Account.getById(report.createBy);
            this.createBy = {
                account_id: account.account_id,
                username: account.username,
                avatar: account.avatar
            }
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = { ReportUserResponse, ReportAdminResponse }