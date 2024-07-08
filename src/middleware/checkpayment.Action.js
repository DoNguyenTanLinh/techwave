const db = require('../connection/connect');
const Product = require('../models/entity/product.entity');
const checkPaymentAction = (req, res, next) => {
    var quantity = 0
    var quantity2 = 0
    var product = [];

    const shop = req.body.shop;
    const shops = shop.map(async shopdata => {
        const cart = shopdata.cart;
        quantity2 += cart.length;
        let carts = await Promise.all(cart.map(async cartdata => {
            try {
                let quantityProduct = await Product.getQuantityProduct(cartdata.product.product_id);
                let quantityBill = cartdata.quantity;

                if (quantityProduct >= quantityBill) {
                    quantity += 1;

                } else {
                    cartdata.product.quantity = quantityProduct;
                    product.push(cartdata);
                }
            }
            catch (err) {
                console.log(err);
            }
        }))
    })
    Promise.all(shops).then(() => {
        if (quantity == quantity2) {
            next();
        } else {
            res.status(400).json({ cart: product })
        }
    })

}
module.exports = checkPaymentAction