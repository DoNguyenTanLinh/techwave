const db = require('../../connection/connect');
const ShopBillResponse = require('../response/shop_bill.response');
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
ShopBill.findCartsShop = (shopBillID, status) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart_shop where shop_bill_id = ? and status like '${status}'`, shopBillID, (err, data) => {
            if (err) reject(err)
            else {
                Promise.all(data.map(async shop => {
                    const shopData = new ShopBillResponse(shop, ShopBillResponse)
                    await shopData.init();
                    return shopData;
                })).then(data => resolve(data))
                    .catch(err => reject(err));
            }
        })
    })
}
module.exports = ShopBill