const db = require('../../connection/connect');
const date = require('date-and-time');
const Bill = function (bill) {
    this.bill_id = bill.bill_id;
    this.cart_id = bill.cart_id;
    this.fullname = bill.fullname;
    this.phone = bill.phone;
    this.address = bill.address;
    this.totalBill = bill.totalBill;
    this.express = bill.express;
    this.payment = bill.payment;
    this.status = bill.status;
    this.createdAt = bill.createdAt;
    this.acceptAt = bill.acceptAt;
}

Bill.getBillOfVender = (id, status, result) => {
    db.query(`SELECT bill.* FROM bill
    inner join cart on cart.cart_id=bill.cart_id
    inner join product on cart.product_id=product.product_id
    WHERE product.createBy=${id} and bill.status='${status}'`, (err, data) => {
        if (err) console.log(err);
        else result(data)
    })
}
Bill.getBillOfUser = (id, result) => {
    db.query(`SELECT * FROM bill WHERE status!='2' and createBy=${id}`, (err, data) => {
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
    data.status = '0';
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO bill SET ?`, data, (err, kq) => {
            if (err || kq.length == 0) console.log(err)
            else resolve({ bill_id: kq.insertId, ...data })
        })
    })
}
Bill.approve = (id, result) => {
    const now = new Date();
    data.acceptAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`UPDATE bill SET status='1' WHERE bill_id=${id} `, (err) => {
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

module.exports = Bill;