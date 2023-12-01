const Bill = require('../models/entity/bill.entity');
const { Payment } = require('../models/response/payment.response')
const BillResquest = require('../models/resquest/bill.resquest')
class PaymentController {
    getPaymentMethods = async (req, res) => {
        const cart = new Payment();
        await cart.initAccount(req.user.id);
        await cart.initAdd(req.user.id);
        await cart.initCart(req.body.cart_id);
        res.json(cart);
    }
    createPayment = (req, res) => {
        const data = new BillResquest(req.body, BillResquest)
        let carts = req.body.carts;
        data.createBy = req.user.id;
        data.payment = 'Thanh toán khi nhận hàng';
        const results = carts.map(async (cart) => {
            data.cart_id = cart.cart_id;
            return await Bill.create(data)
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