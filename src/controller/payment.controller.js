const { Payment } = require('../models/response/payment.response')
class PaymentController {
    getPaymentMethods = async (req, res) => {
        const cart = new Payment();
        await cart.initAdd(req.user.id);
        await cart.initCart(req.body.cart_id);
        res.json(cart);
    }
}

module.exports = new PaymentController;