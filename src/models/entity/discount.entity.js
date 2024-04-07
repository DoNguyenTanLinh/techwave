const db = require('../../connection/connect');

const Discount = function (discount) {
    this.discount_id = discount.discount_id;
    this.quantity = discount.quantity;
    this.name = discount.name;
    this.minPrice = discount.minPrice;
    this.discount = discount.discount;
    this.expires = discount.expires;
    this.mdPrice = discount.mdPrice;
    this.vendor_id = discount.vendor_id;
}
Discount.getDiscountPayment = (id_product, result) => {
    if (id_product != 0) {
        db.query(`SELECT D.* FROM discount as D
        inner join product as P on P.createBy = D.vendor_id
        WHERE P.product_id=${id_product}`, (err, data) => {
            if (err) console.error(err);
            else result({ data: data });
        })
    } else {
        db.query(`SELECT D.* FROM discount as D
        inner join account as A on A.account_id=D.vendor_id
        WHERE A.id_permission=1`, (err, data) => {
            if (err) console.error(err);
            else result({ data: data });
        })
    }
}
Discount.createDiscount = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO discount SET ?`, data, (err, kq) => {
            if (err) reject(err)
            else resolve({ discount_id: kq.insertId, ...kq })
        })
    })
}
module.exports = Discount;