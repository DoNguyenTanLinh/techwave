const { await } = require('await');
const db = require('../connection/connect');
const Product = require('../models/entity/product.entity');
const { setDetail, getDetail, deleteDetail } = require('./detailProduct.Action')
const { setDeleteProduct } = require('./favProduct.Action')
const { deleteReviewByProduct } = require('./review.Action')


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
            setAllCart(product.product_id);
            deleteReviewByProduct(product.product_id)
        })
    }
    db.query(`DELETE FROM product WHERE createBy=${id}`, (err) => {
        if (err) console.log(err)
    })
}
module.exports = { deleteAllOption, setAllCart, deleteAllProductByAccount }