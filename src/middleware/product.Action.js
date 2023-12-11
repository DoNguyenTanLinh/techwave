const { await } = require('await');
const db = require('../connection/connect');
const Product = require('../models/entity/product.entity');
const { setDetail, getDetail, deleteDetail } = require('./detailProduct.Action')
const { setDeleteProduct } = require('./favProduct.Action')
const { deleteReviewByProduct } = require('./review.Action');


const updateQuantity = function (cartId) {
    db.query(`SELECT p.quantity as productQuantity,c.* FROM techwave.cart as c
    inner join product as p on p.product_id=c.product_id
    WHERE c.cart_id=${cartId}`, (err, data) => {
        if (err) reject(err)
        else {
            const result = data[0];
            let quantity = result.productQuantity - result.quantity;
            db.query(`UPDATE product SET quantity=${quantity} WHERE product_id=${result.product_id}`, (err) => {
                if (err) reject(err)
            })
        }
    })
}
const updateQuantityByVNPay = function (paymentId) {
    db.query(`SELECT c.*,p.quantity as productQuantity FROM techwave.bill as b
    inner join cart as c on c.cart_id=b.cart_id
    inner join product as p on c.product_id=p.product_id
    WHERE b.payment_id=${paymentId}`, (err, data) => {
        if (err) console.log(err)
        else {
            data.map(cart => {
                let quantity = cart.productQuantity - cart.quantity;
                db.query(`UPDATE product SET quantity=${quantity} WHERE product_id=${cart.product_id}`, (err) => {
                    if (err) reject(err)
                })
            })
        }
    })
}
const deleteAllOption = function (id) {
    try {
        db.query(`DELETE FROM options WHERE product_id=${id}`, function (err) {
            if (err) console.log(err)

        })
    } catch (err) {
        console.log(err)
    }
}

const setAllCart = function (id) {
    db.query(`UPDATE cart set product_id=null WHERE product_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
const deleteAllProductByAccount = async function (id) {
    const products = await Product.findByCreateById(id)
    if (products) {
        products.map((product) => {
            deleteDetail(product.product_id);
            deleteAllOption(product.product_id);
            setDeleteProduct(product.product_id);
            // setAllCart(product.product_id);
            deleteReviewByProduct(product.product_id)
        })
    }
    db.query(`DELETE FROM product WHERE createBy=${id}`, (err) => {
        if (err) console.log(err)
    })
}
module.exports = { deleteAllOption, setAllCart, deleteAllProductByAccount, updateQuantity, updateQuantityByVNPay }