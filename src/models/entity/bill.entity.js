const db = require('../../connection/connect');
const date = require('date-and-time');
const ShopBill = require('./shop_bill.enitity');
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
        db.query(`SELECT * FROM bill as b
        inner join cart as c on c.cart_id=b.cart_id
        inner join product as p on p.product_id=c.product_id
        WHERE b.createBy=${idUser} and p.product_id=${idProduct} and b.status=2`, (err, data) => {
            if (err) reject(err);
            else resolve(data.length)
        })
    })
}
Bill.getBillOfVender = (id, status, result) => {
    db.query(`select b.*, ac.username, sb.shop_bill_id, sb.shop_id, sb.totalbill as Bill,sb.status from bill as b
    inner join shop_bill as sb on sb.bill_id=b.bill_id
    inner join account as ac on ac.account_id=sb.shop_id
    WHERE sb.shop_id=${id} and sb.status=${status} ORDER BY createAt DESC`, (err, data) => {
        if (err) console.log(err);
        else result(data)
    })
}
Bill.getBillOfUser = (id, status, result) => {
    db.query(`select b.*, ac.username, sb.shop_bill_id, sb.shop_id, sb.totalbill as Bill,sb.status from bill as b
    inner join shop_bill as sb on sb.bill_id=b.bill_id
    inner join account as ac on ac.account_id=sb.shop_id
        WHERE createBy=${id} and sb.status like '${status}' ORDER BY createAt DESC`, (err, data) => {
        if (err) console.log(err);
        else result(data)
    })
}
Bill.getBillReceivedOfUser = (id, result) => {
    db.query(`SELECT * FROM bill WHERE status='2' and createBy=${id} ORDER BY createAt DESC`, (err, data) => {
        if (err) console.log(err);
        else result(data)
    })
}
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
        const shopBillID = await ShopBill.getShopBillofBill(id);
        const now = new Date();
        let data = {
            status: 1,
            acceptAt: date.format(now, 'YYYY/MM/DD HH:mm:ss')
        }
        Promise.all(shopBillID.map(async (idshop) => {
            await db.query(`UPDATE shop_bill SET ? WHERE shop_bill_id=${idshop.shop_bill_id} `, data)
        }))
            .then(() => result({ s: 200, message: "success" }))
            .catch(err => result({ s: 400, message: err }))
    } catch (err) {
        result({ s: 400, message: err })
    }
}
Bill.reject = async (id, result) => {
    try {
        const shopBillID = await ShopBill.getShopBillofBill(id);
        Promise.all(shopBillID.map(async (idshop) => {
            db.query(`UPDATE shop_bill SET status='3' WHERE shop_bill_id=${idshop.shop_bill_id}`)
        }))
            .then(() => {
                result({ s: 200, message: "success" })
            })
            .catch(err => result({ s: 400, message: err }))
    } catch (err) {
        console.log(err);
        result({ s: 400, message: err })
    }
}
Bill.setReceived = async (id, userId, result) => {
    try {
        const shopBillID = await ShopBill.getShopBillofUser(id, userId);
        Promise.all(shopBillID.map(async (idshop) => {
            db.query(`UPDATE shop_bill SET status='2' WHERE shop_bill_id=${idshop.shop_bill_id}`)
        }))
            .then(() => {
                result({ s: 200, message: "success" })
            })
            .catch(err => result({ s: 400, message: err }))
    } catch (err) {
        console.log(err);
        result({ s: 400, message: err })
    }
}
Bill.setCancel = async (id, userId, result) => {
    try {
        const shopBillID = await ShopBill.getShopBillofUser(id, userId);
        Promise.all(shopBillID.map(async (idshop) => {
            db.query(`UPDATE shop_bill SET status='4' WHERE shop_bill_id=${idshop.shop_bill_id}`)
        }))
            .then(() => {
                result({ s: 200, message: "success" })
            })
            .catch(err => result({ s: 400, message: err }))
    } catch (err) {
        console.log(err);
        result({ s: 400, message: err })
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