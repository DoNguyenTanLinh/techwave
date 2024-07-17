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
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { transporter } = require('../service/SendMail')
class PaymentController {
    getPaymentMethods = async (req, res) => {
        const cart = new Payment();
        await cart.initAccount(req.user.id);
        await cart.initAdd(req.user.id);
        await cart.initCart(req.body.cart_id);
        res.json(cart);
    }
    createPayment = async (req, res, next) => {
        try {
            const billData = new BillResquest(req.body, BillResquest)
            const shop = req.body.shop;
            billData.createBy = req.user.id;
            billData.payment = 'Thanh toán khi nhận hàng';
            const billId = await Bill.create(billData)
            var products = []
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
                        var product = {
                            name: cartData.product.name,
                            quantity: cartData.quantity,
                            image: cartData.product.image,
                            option: cartData.option?.name,
                            price: cartData.price
                        }
                        products.push(product);
                        return products;
                    }))

                }
                catch (error) {
                    console.log("map Payment Cart: ", error);
                    res.status(400).json({ status: 'error', message: error.message })
                }
                if (req.body.voucher_id) await updateDiscount(req.body.voucher_id, req.user.id)


            }))
            const email = {
                fullname: req.body.fullname,
                email: req.body.email,
                address: req.body.phone,
                district: req.body.address + ' ' + req.body.ward,
                province: req.body.district + ' ' + req.body.province,
                payment: billData.payment,
                incompletedTotal: req.body.incompletedTotal,
                shipFee: req.body.shipFee,
                totalVoucherDiscount: req.body.totalVoucherDiscount,
                totalBill: req.body.totalBill,
                products: products
            }
            req.email = email
            next();
        } catch (error) {
            console.error("createPayment Error: ", error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
    createEmail = function (req, res) {

        // const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        // const products = data.products;
        // const recipient = data.recipient;

        // //Định nghĩa helper shortenText để cắt ngắn văn bản

        handlebars.registerHelper('shortenText', (text, maxLength) => {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        });
        const filePath = path.resolve(__dirname, '../../teamplate/index.hbs');
        const source = fs.readFileSync(filePath, 'utf-8');
        const template = handlebars.compile(source);
        const email = req.email;

        // // Render template với dữ liệu sản phẩm
        const htmlToSend = template(email);
        // Cấu hình transporter của Nodemailer


        // Cấu hình email
        let mailOptions = {
            from: 'techwaveute@gmail.com',
            to: email.email,
            subject: 'Hoá đơn mua hàng tại techwave',
            html: htmlToSend
        };

        // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(400).json({ status: "error", message: error });
            }
            console.log('Email sent: ' + info.response);
            if (req.vnpay)
                res.json({ http: req.vnpay });
            res.status(200).json({ status: "ok", message: "success" })
        });
    }

}
module.exports = new PaymentController;