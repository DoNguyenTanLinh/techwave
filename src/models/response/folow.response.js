const Account = require("../entity/account.enitty");

const FollowResponse = function (follow) {
    this.follow_id = follow.follow_id;
    this.user_id = follow.user_id;
    this.store = null;
    this.initStore = async () => {
        try {
            let account = await Account.getById(follow.vender_id)
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
module.exports = FollowResponse;
