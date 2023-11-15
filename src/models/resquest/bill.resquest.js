const BillResquest = function (data) {
    this.fullname = data.fullname;
    this.phone = data.phone;
    this.address = data.address;
    this.totalBill = data.totalBill;
    this.express = data.express;
    this.payment = data.payment;
}
module.exports = BillResquest;