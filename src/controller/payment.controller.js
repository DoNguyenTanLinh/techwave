const Bill = require('../models/entity/bill.entity');
const { Payment } = require('../models/response/payment.response')
const BillResquest = require('../models/resquest/bill.resquest')
const { setCartForPayment } = require('../middleware/cart.Action')
const { updateQuantity, update_product } = require('../middleware/product.Action');
const updateDiscount = require('../middleware/discount.Action');
const Cart = require('../models/entity/cart.entity');
const ShopBillResquest = require('../models/resquest/shop_bill.request');
const ShopBill = require('../models/entity/shop_bill.enitity');
const CartShopResquest = require('../models/resquest/cart_shop.request');
const CartShop = require('../models/entity/cart_shop.entity');
const Product = require('../models/entity/product.entity');

class PaymentController {
    getPaymentMethods = async (req, res) => {
        const cart = new Payment();
        await cart.initAccount(req.user.id);
        await cart.initAdd(req.user.id);
        await cart.initCart(req.body.cart_id);
        res.json(cart);
    }
    createPayment = async (req, res) => {
        try {
            const billData = new BillResquest(req.body, BillResquest)
            const shop = req.body.shop;
            billData.createBy = req.user.id;
            billData.payment = 'Thanh toán khi nhận hàng';
            const billId = await Bill.create(billData)
            Promise.all(shop.map(async (shopData) => {
                try {
                    shopData.bill_id = billId;
                    const shopCreateData = new ShopBillResquest(shopData, ShopBillResquest)
                    const idShop = await ShopBill.insertShopBill(shopCreateData);
                    if (shopData.voucher_id) await updateDiscount(shopData.voucher_id, req.user.id)
                    const cart = shopData.cart;
                    await Promise.all(cart.map(async (cartData) => {
                        var quantityProduct = await Product.getQuantityProduct(cartData.product.product_id);
                        var quantityUpdate = quantityProduct - cartData.quantity
                        await update_product(cartData.product.product_id, quantityUpdate)
                        setCartForPayment(cartData.cart_id)
                        cartData.shop_bill_id = idShop;
                        const cartCreateData = new CartShopResquest(cartData, CartShopResquest)
                        await CartShop.insertCart(cartCreateData);
                    }))

                }
                catch (error) {
                    console.log("map Payment Cart: ", error);
                }
            }))
            if (req.body.voucher_id) await updateDiscount(req.body.voucher_id, req.user.id)
            res.status(200).json({ status: "ok", message: "success" })
        } catch (error) {
            console.error("createPayment Error: ", error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }

}
module.exports = new PaymentController;