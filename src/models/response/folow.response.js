const Account = require("../entity/account.enitty");

const FolowResponse = function (folow) {
    this.folow_id = folow.folow_id;
    this.user_id = folow.user_id;
    this.store = null;
    this.initStore = async () => {
        try {
            let account = await Account.getById(folow.vender_id)
            this.store = {
                account_id: account.account_id,
                username: account.username,
                avatar: account.avatar
            }
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = FolowResponse;
