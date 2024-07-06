const { await } = require('await');
const db = require('../connection/connect');
const Product = require('../models/entity/product.entity');
const { setDetail, getDetail, deleteDetail } = require('./detailProduct.Action')
const { setDeleteProduct } = require('./favProduct.Action')
const { deleteReviewByProduct } = require('./review.Action');



const updateQuantity = function (cartId) {
    db.query(`SELECT p.quantity as productQuantity,c.* FROM cart as c
    inner join product as p on p.product_id=c.product_id
    WHERE c.cart_id=${cartId}`, (err, data) => {
        if (err) reject(err)
        else {
            const result = data[0];
            let quantity = result.productQuantity - result.quantity;
            db.query(`UPDATE product SET quantity=${quantity} WHERE product_id=${result.product_id}`, (err) => {
                if (err) console.log(err)
            })
        }
    })
}
const updateQuantityByVNPay = function (paymentId) {
    db.query(`SELECT c.*,p.quantity as productQuantity FROM bill as b
    inner join cart as c on c.cart_id=b.cart_id
    inner join product as p on c.product_id=p.product_id
    WHERE b.payment_id=${paymentId}`, (err, data) => {
        if (err) console.log(err)
        else {
            data.map(cart => {
                let quantity = cart.productQuantity - cart.quantity;
                db.query(`UPDATE product SET quantity=${quantity} WHERE product_id=${cart.product_id}`, (err) => {
                    if (err) console.log(err)
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
const deleteCart = async function (id) {
    try {
        await db.query("DELETE FROM cart WHERE product_id = ?", [id]);
    }
    catch (err) {
        await db.rollback();
        console.error(err);
        throw err;
    }
}
const deleteAllCart = async function (id) {
    try {
        const cartIds = await db.query("SELECT cart_id FROM cart WHERE product_id= ?", [id]);
        await db.beginTransaction();
        await Promise.all(cartIds.map(cartId => {
            db.query("DELETE FROM bill WHERE cart_id = ?", [cartId.cart_id])
        }
        ));
        await db.query("DELETE FROM cart WHERE product_id = ?", [id]);
        await db.commit();
    }
    catch (err) {
        await db.rollback();
        console.error(err);
        throw err;
    }
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

    try {
        db.query(`DELETE FROM product WHERE createBy=${id}`)
    } catch (err) {
        console.log(err)
    }
}

const update_product = async function (id, quantity) {
    try {
        db.query(`UPDATE product SET quantity=${quantity} WHERE product_id=${id}`)
    } catch (err) {
        console.log("Product Action: ", err)
    }
}
module.exports = { deleteAllOption, deleteAllCart, deleteAllProductByAccount, updateQuantity, updateQuantityByVNPay, deleteCart, update_product }