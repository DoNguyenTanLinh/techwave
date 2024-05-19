const Cart = require("../entity/cart.entity");

const ShopBillResponse = function (cart) {
    this.cart = null;
    this.price = cart.price;
    this.price_desc = cart.price_desc;
    this.status = cart.status;
    this.init = async function () {
        try {
            this.cart = await Cart.BillfindById(cart.cart_id);
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = ShopBillResponse;