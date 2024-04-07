const db = require('../../connection/connect');

const DiscountUser = function (discountUser) {
    this.dsc_user_id = discountUser.dsc_user_id;
    this.user_id = discountUser.user_id;
    this.dsc_id = discountUser.dsc_id;
    this.status = discountUser.status;
}
DiscountUser.insertDiscount = (dscId, userID, role) => {
    if (role == 2) {
        try {
            db.query(`INSERT INTO discount_user (user_id, dsc_id,status)
            SELECT user_id ,${dscId},1
            FROM folow
            WHERE vender_id=${userID}`)
        } catch (err) {
            console.error(err);
        }
    }
    else if (role == 1) {
        try {
            db.query(`INSERT INTO discount_user (user_id, dsc_id,status)
            SELECT account_id ,${dscId},1
            FROM account
            WHERE id_permission=3`)
        } catch (err) {
            console.error(err);
        }
    }

}
module.exports = DiscountUser;