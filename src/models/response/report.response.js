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
            }
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = { ReportUserResponse }