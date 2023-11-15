const Account = require("../entity/account.enitty");

const ReasonOfReportResponse = function (reason) {
    this.reason_id = reason.reason_id;
    this.content = reason.content;
    this.createAt = reason.createAt;
    this.createBy = null;
    this.initReasonReport = async () => {
        try {
            let account = await Account.getById(reason.createBy);
            this.createBy = {
                account_id: account.account_id,
                username: account.username,
                picture: account.picture
            }
        } catch (e) {
            console.log(e)
        }
    }

}
module.exports = { ReasonOfReportResponse };