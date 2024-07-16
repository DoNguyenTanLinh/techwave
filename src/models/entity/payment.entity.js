const db = require('../../connection/connect');

const Payment = function (payment) {
    this.payment_id = payment.payment_id;
    this.status = payment.status;
    this.url = payment.url;
}
Payment.getOne = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM payment WHERE payment_id=${id}`, (err, data) => {
            if (err) reject(err);
            else resolve(data[0]);
        })
    })
}
Payment.getStatusPaid = (idBill) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM bill as b
        inner join payment as pm on b.payment_id=pm.payment_id
        where b.bill_id=${idBill}`, (err, data) => {
            if (err) reject(err)
            else {
                if (data.length == 0) resolve(false)
                else resolve(true)
            }
        })
    })
}
Payment.create = function (data) {
    db.query(`INSERT INTO payment SET ?`, data, (err) => {
        if (err) console.log(err);
    })
}
Payment.update = function (id) {
    db.query(`UPDATE payment SET status=1 WHERE payment_id=${id}`, (err) => {
        if (err) console.log(err);
    })
}
Payment.delete = function (id) {
    db.query(`DELETE FROM payment WHERE payment_id=${id}`, (err) => {
        if (err) console.log(err);
    })
}
module.exports = Payment;