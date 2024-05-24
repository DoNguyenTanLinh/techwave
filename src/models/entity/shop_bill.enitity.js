const db = require('../../connection/connect');
const ShopBillResponse = require('../response/shop_bill.response');
const ShopBill = (shop) => {
    this.shop_bill_id = shop.shop_bill_id;
    this.shop_id = shop.shop_id;
    this.totalbill = shop.totalbill;
    this.status = shop.status;
    this.bill_id = shop.bill_id;
}
ShopBill.getShopBillofBill = (idBill) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT shop_bill_id FROM shop_bill
        where bill_id=${idBill}`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}
ShopBill.getShopBillofUser = (idBill, idUser) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT sb.* FROM shop_bill as sb
        inner join bill as b on b.bill_id=sb.bill_id
        where sb.bill_id=${idBill} and b.createBy=${idUser}`, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}
ShopBill.insertShopBill = (shop) => {
    shop.status = 0
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO shop_bill SET ?`, shop, (err, data) => {
            if (err) reject(err)
            else resolve(data.insertId)
        })
    })
}
ShopBill.findCartsShop = (shopBillID) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart_shop where shop_bill_id = ? `, shopBillID, (err, data) => {
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