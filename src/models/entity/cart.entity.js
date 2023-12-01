const db = require('../../connection/connect');
const { CartResponse, CartBillResponse } = require('../response/cart.response')
const Cart = (cart) => {
    this.cart_id = cart.cart_id;
    this.product_id = cart.product_id;
    this.option_id = cart.option_id;
    this.quantity = cart.quantity;
    this.price = cart.price;
    this.account_id = cart.account_id;
    this.status = cart.status;
}
Cart.findAll = (id, result) => {
    db.query(`SELECT * FROM cart WHERE account_id=${id}`, (err, data) => {
        if (err) console.log(err)
        else if (data.length == 0) result(null)
        else result(data)

    })
}
Cart.findOne = (dataId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart WHERE account_id=${dataId.account_id} and product_id=${dataId.product_id} and status='0'`, (err, data) => {
            if (err) reject(err)
            else if (data.length == 0) resolve(null)
            else resolve(data[0])
        })
    })
}
Cart.BillfindById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart WHERE cart_id=${id}`, async (err, data) => {
            if (err) reject(err)
            else if (data.length == 0) resolve(null)
            else {
                const cart = new CartBillResponse(data[0], CartBillResponse);
                await cart.initProduct();
                await cart.initOption();
                resolve(cart)
            }
        })
    })
}
Cart.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM cart WHERE cart_id=${id}`, async (err, data) => {
            if (err) reject(err)
            else if (data.length == 0) resolve(null)
            else {
                const cart = new CartResponse(data[0], CartResponse);
                await cart.init();
                await cart.optionName();
                resolve(cart)
            }
        })
    })
}
Cart.create = (data, result) => {
    db.query(`INSERT INTO cart SET ?`, data, (err, kq) => {
        if (err) { console.log(err); result({ message: "Error creating Cart", data: null }) }
        else result({ message: "Thêm vào giỏ hàng thành công", data: { cart_id: kq.insertId, ...data } })

    })
}
Cart.updateQuantity = (id, data, result) => {
    db.query(`UPDATE cart SET ? WHERE cart_id=${id}`, data, (err) => {
        if (err) { console.log(err); result({ message: "Error creating Cart", data: null }) }
        else result({ message: "Thêm vào giỏ hàng thành công" })

    })
}
Cart.delete = (id, idUser, result) => {
    db.query(`DELETE FROM cart WHERE cart_id=${id} and account_id=${idUser}`, (err) => {
        if (err) { console.log(err); result({ message: "Error deleting Cart", err }) }
        else result({ message: "Xóa sản phẩm khỏi giỏ hàng thành công" })

    })
}

module.exports = Cart;