const Cart = require("../entity/cart.entity");
const Payment = require("../entity/payment.entity");
const ShopBill = require("../entity/shop_bill.enitity");

const BillResponse = function (data, status) {
    this.bill_id = data.bill_id;
    this.fullname = data.fullname;
    this.phone = data.phone;
    this.address = data.address;
    this.totalBill = data.Bill;
    this.payment = data.payment;
    this.createAt = data.createAt;
    this.payment_id = null;
    this.shop_bill_id = null;
    this.init = async () => {
        try {
            this.shop_bill_id = await ShopBill.findCartsShop(data.shop_bill_id, status);
        } catch (e) {
            console.log(e);
        }
    }
    this.initPaymentId = async () => {
        try {
            if (data.payment_id) this.payment_id = await Payment.getOne(data.payment_id);
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = BillResponse;