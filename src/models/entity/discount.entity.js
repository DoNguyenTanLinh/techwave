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
Discount.getDiscountShopAuto = (idShop, price, result) => {
    db.query(`SELECT derived.discount_id,
    CAST(IF(price >= 0, derived.mdPrice, price2) as UNSIGNED) AS result, 
    derived.discount
    FROM (
        SELECT 
            (${price} * dc.discount * 0.01 - dc.mdPrice) AS price,
            (${price} * dc.discount * 0.01) AS price2, 
            dc.* 
        FROM discount AS dc 
        WHERE dc.vendor_id = ${idShop} and minPrice<=${price}
    ) AS derived 
    ORDER BY result desc`, (err, data) => {
        if (err) console.log(err);
        else result(data[0])
    })
}
Discount.getDiscountShipAuto = (idUser, price, result) => {
    db.query(`SELECT derived.discount_id,
    CAST(IF(price >= 0, derived.mdPrice, price2) as UNSIGNED) AS result, 
    derived.discount
    FROM (
        SELECT 
            (${price} * dc.discount * 0.01 - dc.mdPrice) AS price,
            (${price} * dc.discount * 0.01) AS price2, 
            dc.* 
        FROM discount AS dc inner join discount_user as dsu
        on dc.discount_id=dsu.dsc_id where user_id=${idUser}
    ) AS derived 
    ORDER BY result desc`, (err, data) => {
        if (err) console.log(err);
        else result(data[0])
    })
}
Discount.getDiscount = (idPermission, idUser, result) => {

    if (idPermission == 2) {
        db.query(`SELECT * FROM discount
        where vendor_id=${idUser}`, (err, data) => {
            if (err) console.error(err);
            else result({ data: data });
        })
    } else if (idPermission == 3) {
        db.query(`SELECT D.* FROM discount as D
        inner join discount_user as DS on DS.dsc_id=D.discount_id
        WHERE DS.user_id=${idUser}`, (err, data) => {
            if (err) console.error(err);
            else result({ data: data });
        })
    }
    else {
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
            else resolve({ discount_id: kq.insertId, ...data })
        })
    })
}
Discount.updateDiscount = (id_dsc, data, result) => {
    db.query(`UPDATE discount SET ? WHERE discount_id=${id_dsc}`, data, (err, kq) => {
        if (err) console.log(err)
        else result({ message: "success", data: "Sửa mã giảm giá thành công" })
    })
}
Discount.deleteDiscount = (id_dsc, result) => {
    db.query(`DELETE FROM discount WHERE discount_id=${id_dsc}`, (err) => {
        if (err) console.log(err)
        else result({ message: "success", data: `Xoá mã giảm giá ${id_dsc} thành công ` })
    })
}
module.exports = Discount;