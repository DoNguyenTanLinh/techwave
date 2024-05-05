const db = require('../../connection/connect');

const DiscountUser = function (discountUser) {
    this.dsc_user_id = discountUser.dsc_user_id;
    this.user_id = discountUser.user_id;
    this.dsc_id = discountUser.dsc_id;
    this.status = discountUser.status;
}
DiscountUser.insertDiscount = (dscId) => {
    try {
        db.query(`INSERT INTO discount_user (user_id, dsc_id,status)
            SELECT account_id ,${dscId},1
            FROM account
            WHERE id_permission=3`)
    } catch (err) {
        console.error(err);
    }

}
DiscountUser.deleteDiscountByAdmin = (dscId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM discount_user where dsc_id=${dscId}`, (err) => {
            if (err) reject(err)
            else resolve();
        })
    })

}

module.exports = DiscountUser;