const Bill = require('../models/entity/bill.entity');
const { Payment } = require('../models/response/payment.response')
const BillResquest = require('../models/resquest/bill.resquest')
const { setCartForPayment } = require('../middleware/cart.Action')
const { updateQuantity } = require('../middleware/product.Action');
const Cart = require('../models/entity/cart.entity');

class PaymentController {
    getPaymentMethods = async (req, res) => {
        const cart = new Payment();
        await cart.initAccount(req.user.id);
        await cart.initAdd(req.user.id);
        await cart.initCart(req.body.cart_id);
        res.json(cart);
    }
    createPayment = async (req, res) => {
        const data = new BillResquest(req.body, BillResquest)
        let carts = req.body.carts;
        data.createBy = req.user.id;
        data.payment = 'Thanh toán khi nhận hàng';
        const results = carts.map(async (cartData) => {
            const cart = await Cart.findById(cartData.cart_id);
            data.cart_id = cart.cart_id;
            data.totalBill = cart.price * cart.quantity;
            setCartForPayment(cart.cart_id)
            updateQuantity(cart.cart_id)
            const bill = await Bill.create(data)
            return { bill, cart }

        })
        Promise.all(results)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error fetching cart data");
            });
    }
}
module.exports = new PaymentController;