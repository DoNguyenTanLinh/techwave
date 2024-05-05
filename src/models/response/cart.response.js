const Account = require('../entity/account.enitty');
const Option = require('../entity/option.entity');
const Product = require('../entity/product.entity');
const CartResponse = function (cart) {
    this.cart_id = cart.cart_id;
    this.product = null;
    this.option = null;
    this.quantity = cart.quantity;
    this.price = cart.price;
    this.account_id = cart.account_id;
    this.status = cart.status;
    this.store_name = null;
    this.init = async function () {
        try {
            this.product = await Product.getOne(cart.product_id);
            let account = await Account.getById(this.product.createBy);
            this.store = {
                account_id: account.account_id,
                username: account.username,
                picture: account.avatar
            }
        } catch (error) {
            console.error(error);
        }
    };
    this.optionName = async function () {
        try {
            this.option = await Option.getName(cart.option_id);
        } catch (error) {
            console.log(error);
        }
    }
}
const CartBillResponse = function (cart) {
    this.product = null;
    this.option = null;
    this.quantity = cart.quantity;
    this.initProduct = async function () {
        try {
            this.product = await Product.getName(cart.product_id);
        } catch (error) {
            console.log(error)
        }
    }
    this.initOption = async function () {
        try {
            this.option = await Option.getName(cart.option_id);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = { CartResponse, CartBillResponse };