const Account = require("../entity/account.enitty");
const Cart = require("../entity/cart.entity");
const Payment = require("../entity/payment.entity");
const ShopBill = require("../entity/shop_bill.enitity");

const BillResponse = function (data) {
    this.bill_id = data.bill_id;
    this.user = null;
    this.totalBill = data.Bill;
    this.payment = data.payment;
    this.createAt = data.createAt;
    this.status = data.status;
    this.shopname = data.username;
    this.paid = null;
    this.payment_id = null;
    this.shop_bill_id = data.shop_bill_id;
    this.shipFee = data.shipFee;
    this.totalVoucherDiscount = data.totalVoucherDiscount;
    this.cart_shop = null;
    this.init = async () => {
        try {
            this.user = await Account.getInfoAccountBill(data.createBy)
            this.user.fullname = data.fullname
            this.user.phone = data.phone
            this.user.address = data.address
            this.paid = await Payment.getStatusPaid(data.bill_id)
            this.cart_shop = await ShopBill.findCartsShop(data.shop_bill_id);
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