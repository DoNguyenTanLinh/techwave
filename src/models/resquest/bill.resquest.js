const BillResquest = function (data) {
    this.fullname = data.fullname;
    this.phone = data.phone;
    this.address = data.address;
    this.express = data.express;
    this.payment = data.payment;
    this.payment_id = data.payment_id;
}
module.exports = BillResquest;