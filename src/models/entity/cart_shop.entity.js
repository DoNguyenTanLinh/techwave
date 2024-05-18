const db = require('../../connection/connect');
const CartShop = (cart) => {
    this.cart_shop_id = cart.cart_shop_id;
    this.cart_id = cart.cart_id;
    this.price = cart.price;
    this.status = cart.status;
    this.acceptAt = cart.acceptAt;
    this.shop_bill_id = cart.shop_bill_id;
}
CartShop.insertCart = (cart) => {
    try {
        db.query(`INSERT INTO cart_shop SET ?`, cart, (err) => {
            if (err) {
                console.log("Insert cartshop Error :", err);
            }
        })
    } catch (err) {
        console.log("Insert Cart shop: ", err);
    }
}
module.exports = CartShop