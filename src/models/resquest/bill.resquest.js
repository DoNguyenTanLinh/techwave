const BillResquest = function (data) {
    this.fullname = data.fullname;
    this.phone = data.phone;
    this.address = data.address + ' ' + data.ward + ' ' + data.district + ' ' + data.province;
    this.totalBill = data.totalBill;
    if (!data.payment_id) data.payment_id = null;
    this.payment_id = data.payment_id;
}
module.exports = BillResquest;