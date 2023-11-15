const Account = require("../entity/account.enitty");
const Response = require("../entity/response.entity");

const ReviewResponse = function (review) {
    this.review_id = review.review_id;
    this.content = review.content;
    this.rating = review.rating;
    this.account = null;
    this.picture = review.picture;
    this.createAt = review.createAt;
    this.responses = null;
    this.initResCreateBy = async function () {
        try {
            let account = await Account.getById(review.account_id)
            this.account = {
                account_id: account.account_id,
                username: account.username,
                avatar: account.avatar
            }
        } catch (e) {
            console.log(e);
        }
    }
    this.initOfResponse = async () => {
        try {
            this.responses = await Response.getForReview(review.review_id)
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ReviewResponse;