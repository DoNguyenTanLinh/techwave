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
    this.init = async function () {
        try {
            this.product = await Product.getOne(cart.product_id);
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

module.exports = { CartResponse };