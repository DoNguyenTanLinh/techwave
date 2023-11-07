const db = require('../../connection/connect');
const Bill = function (bill) {
    this.bill_id = bill.bill_id;
    this.cart_id = bill.cart_id;
    this.totalBill = bill.totalBill;
    this.address = bill.address;
    this.status = bill.status;
    this.createdAt = bill.createdAt;
    this.acceptAt = bill.acceptAt;
    this.acceptBy = bill.acceptBy;
}

module.exports = Bill;