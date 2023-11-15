const Cart = require("../entity/cart.entity");

const BillResponse = function (data) {
    this.bill_id = data.bill_id;
    this.cart_id = null;
    this.fullname = data.fullname;
    this.phone = data.phone;
    this.address = data.address;
    this.totalBill = data.totalBill;
    this.express = data.express;
    this.payment = data.payment;
    this.status = data.status;
    this.createAt = data.createAt;
    this.init = async () => {
        try {
            this.cart_id = await Cart.BillfindById(data.cart_id);
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = BillResponse;