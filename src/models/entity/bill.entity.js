const db = require('../../connection/connect');
const date = require('date-and-time');
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
    db.query(`SELECT bill.* FROM bill
    inner join cart on cart.cart_id=bill.cart_id
    inner join product on cart.product_id=product.product_id
    WHERE product.createBy=${id} and bill.status='${status}' ORDER BY createAt DESC`, (err, data) => {
        if (err) console.log(err);
        else result(data)
    })
}
Bill.getBillOfUser = (id, status, result) => {
    if (status) {
        db.query(`SELECT * FROM bill WHERE status=${status} and createBy=${id} ORDER BY createAt DESC`, (err, data) => {
            if (err) console.log(err);
            else result(data)
        })
    } else {
        db.query(`SELECT * FROM bill WHERE status!='2' and createBy=${id} ORDER BY createAt DESC`, (err, data) => {
            if (err) console.log(err);
            else result(data)
        })
    }

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
Bill.approve = (id, result) => {
    const now = new Date();
    let data = {
        status: 1,
        acceptAt: date.format(now, 'YYYY/MM/DD HH:mm:ss')
    }
    db.query(`UPDATE bill SET ? WHERE bill_id=${id} `, data, (err) => {
        if (err) console.log(err);
        else result("Chấp nhận đơn hàng Thành công")
    })
}
Bill.reject = (id, result) => {
    db.query(`UPDATE bill SET status='3' WHERE bill_id=${id}`, (err) => {
        if (err) console.log(err);
        else result("Đơn hàng không được duyệt")
    })
}
Bill.setReceived = (id, userId, result) => {
    db.query(`UPDATE bill SET status='2' WHERE bill_id=${id} and status='1' and createBy=${userId}`, (err) => {
        if (err) console.log(err);
        else result("Đã nhận đơn hàng Thành công")
    })
}
Bill.setCancel = (id, userId, result) => {
    db.query(`UPDATE bill SET status='4' WHERE bill_id=${id} and status='0' and createBy=${userId}`, (err) => {
        if (err) console.log(err);
        else result("Đã hàng đã hủy")
    })
}
Bill.delete = (id, result) => {
    db.query(`DELETE From bill WHERE status='4' bill_id=${id}`, (err) => {
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