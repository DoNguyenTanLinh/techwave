const db = require('../../connection/connect');
const date = require('date-and-time');
const ShopBill = require('./shop_bill.enitity');
const Product = require('./product.entity');
const Bill = function (bill) {
    this.bill_id = bill.bill_id;
    this.fullname = bill.fullname;
    this.phone = bill.phone;
    this.address = bill.address;
    this.totalBill = bill.totalBill;
    this.payment = bill.payment;
    this.createdAt = bill.createdAt;
    this.payment_id = bill.payment_id;
}
Bill.getStatusByUser = (idUser, idProduct) => {
    return new Promise((resolve, reject) => {
        db.query(`select COALESCE(SUM(c.quantity), 0) as sum from cart_shop as cs
inner join shop_bill as sb on sb.shop_bill_id=cs.shop_bill_id
inner join cart as c on c.cart_id=cs.cart_id
inner join bill as b on b.bill_id=sb.bill_id
where sb.status=2 and createBy=${idUser} and c.product_id=${idProduct}`, (err, data) => {
            if (err) reject(err);
            else resolve(data[0].sum)
        })
    })
}
Bill.getBillOfVender = (id, status, result) => {
    db.query(`select b.*, ac.username, sb.shop_bill_id, sb.shop_id, sb.totalbill as Bill,sb.status from bill as b
    inner join shop_bill as sb on sb.bill_id=b.bill_id
    inner join account as ac on ac.account_id=sb.shop_id
    WHERE sb.shop_id=${id} and sb.status like '${status}' ORDER BY createAt DESC`, (err, data) => {
        if (err) console.log(err);
        else result(data)
    })
}
Bill.getBillOfUser = (id, status, result) => {
    db.query(`select b.*, ac.username, sb.shop_bill_id, sb.shop_id, sb.totalbill as Bill,sb.status, sb.totalVoucherDiscount, sb.shipFee from bill as b
    inner join shop_bill as sb on sb.bill_id=b.bill_id
    inner join account as ac on ac.account_id=sb.shop_id
        WHERE createBy=${id} and sb.status like '${status}' ORDER BY createAt DESC`, (err, data) => {
        if (err) console.log(err);
        else result(data)
    })
}
// Bill.getBillReceivedOfUser = (id, result) => {
//     db.query(`SELECT * FROM bill WHERE status='2' and createBy=${id} ORDER BY createAt DESC`, (err, data) => {
//         if (err) console.log(err);
//         else result(data)
//     })
// }
Bill.getOne = (id, result) => {
    db.query(`SELECT * FROM bill WHERE bill_id=${id} `, (err, data) => {
        if (err) console.log(err);
        else result(data[0])
    })
}

Bill.create = (data) => {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO bill SET ?`, data, (err, kq) => {
            if (err || kq.length == 0) console.log(err)
            else resolve(kq.insertId)
        })
    })
}
Bill.approve = async (id, result) => {
    try {
        const now = new Date();
        let data = {
            status: 1,
            acceptAt: date.format(now, 'YYYY/MM/DD HH:mm:ss')
        }
        db.query(`UPDATE shop_bill SET ? WHERE shop_bill_id=${id} `, data)
        result({ s: 200, message: "success" })

    } catch (err) {
        result({ s: 400, message: err })
    }
}
Bill.reject = async (id, result) => {
    try {
        const query = `
            SELECT * FROM shop_bill as sb
            INNER JOIN cart_shop as cs ON cs.shop_bill_id = sb.shop_bill_id
            INNER JOIN cart as c ON c.cart_id = cs.cart_id
            WHERE sb.shop_bill_id = ?
            `;
        const [results] = await db.promise().query(query, [id]);

        await Promise.all(results.map(async (result) => {

            const quantityProduct = await Product.getQuantityProduct(result.product_id);
            const updateQuery = `UPDATE product SET quantity = ? WHERE product_id = ?`;
            await db.query(updateQuery, [quantityProduct + result.quantity, result.product_id]);
            await db.query(`UPDATE shop_bill SET status='3' WHERE shop_bill_id=${result.shop_bill_id}`)
        }));

        result({ s: 200, message: "success" });


    } catch (err) {
        result({ s: 400, message: err.message });
    }

}
Bill.setReceived = async (id, userId, result) => {
    try {
        db.query(`UPDATE shop_bill SET status='2' WHERE shop_bill_id=${id}`)
        result({ s: 200, message: "success" })
    } catch (err) {
        console.log(err);
        result({ s: 400, message: err })
    }
}
Bill.setCancel = async (id, userId, result) => {
    try {
        // const shopBillID = await ShopBill.getShopBillofUser(id, userId);

        const query = `
            SELECT * FROM shop_bill as sb
            INNER JOIN cart_shop as cs ON cs.shop_bill_id = sb.shop_bill_id
            INNER JOIN cart as c ON c.cart_id = cs.cart_id
            WHERE sb.shop_bill_id = ? AND c.status = '1'
            `;
        const [results] = await db.promise().query(query, [id]);

        Promise.all(results.map(async (result) => {
            const quantityProduct = await Product.getQuantityProduct(result.product_id);
            const updateQuery = `UPDATE product SET quantity = ? WHERE product_id = ?`;
            await db.query(updateQuery, [quantityProduct + result.quantity, result.product_id]);
            await db.query(`UPDATE shop_bill SET status='4' WHERE shop_bill_id=${result.shop_bill_id}`)
        }));


        result({ s: 200, message: "success" });
    } catch (err) {
        result({ s: 400, message: err.message });
    }
}
Bill.delete = (id, result) => {
    db.query(`DELETE From shop_bill WHERE status='4' shop_bill_id=${id}`, (err) => {
        if (err) console.log(err);
        else result("Đơn hàng đã xóa")
    })
}
Bill.deleteByPaymentId = (payment_id) => {
    db.query(`DELETE From bill WHERE payment_id=${payment_id}`, (err) => {
        if (err) console.log(err);
    })
}

module.exports = Bill;