const Account = require("../entity/account.enitty");

const ResOfReview = function (response) {
    this.response_id = response.response_id;
    this.content = response.content;
    this.createAt = response.createAt;
    this.createBy = null;
    this.picture = response.picture;
    this.initResCreateBy = async function () {
        try {
            let account = await Account.getById(response.createBy)
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

module.exports = ResOfReview;