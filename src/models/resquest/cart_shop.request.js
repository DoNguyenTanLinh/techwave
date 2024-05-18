const CartShopResquest = function (cart) {
    this.cart_id = cart.cart_id;
    this.price = cart.price;
    this.status = 0;
    this.shop_bill_id = cart.shop_bill_id;
}
module.exports = CartShopResquest;