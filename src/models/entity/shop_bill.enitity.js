const db = require('../../connection/connect');
const ShopBill = (shop) => {
    this.shop_bill_id = shop.shop_bill_id;
    this.shop_id = shop.shop_id;
    this.totalbill = shop.totalbill;
    this.bill_id = shop.bill_id;
}
ShopBill.insertShopBill = (shop) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO shop_bill SET ?`, shop, (err, data) => {
            if (err) reject(err)
            else resolve(data.insertId)
        })
    })
}
module.exports = ShopBill