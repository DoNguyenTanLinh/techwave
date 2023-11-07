const db = require('../../connection/connect')
const date = require('date-and-time');
const Option = require('./option.entity');
const FavorProduct = require('./favorProduct.entity');
const Product = function (product) {
    this.product_id = product.product_id;
    this.name = product.name
    this.quantity = product.quantity
    this.origin = product.origin
    this.price = product.price
    this.promotional_price = product.promotional_price
    this.category_id = product.category_id
    this.option = null;
    this.favStatus = null;
    this.init = async function () {
        try {
            this.option = await Option.getAll(product.product_id);
        } catch (error) {
            console.error(error);
        }
    };
    this.getStatus = async function (data) {
        try {
            this.favStatus = await FavorProduct.find_fav(data);
        } catch (error) {
            console.error(error);
        }
    }

}
Product.getAll = function (result) {
    db.query('SELECT * FROM product', (err, data) => {
        if (err) result(null)
        else result(data)
    })
}
Product.getOne = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * From product WHERE product_id=${id}`, (err, data) => {
            if (err || data.length == 0) resolve(null)
            else resolve(data[0])
        })
    })
}

Product.getDetails = function (id, result) {
    try {
        db.query(`SELECT * From product WHERE product_id=${id}`, (err, data) => {
            console.log(data)
            if (err) { console.log(err); result({ message: "Error database" }) }
            else if (data.length < 1) { result({ message: "Không có sản phẩm" }) }
            else result({ message: "Getting Detail Successful", data: data[0] })
        })
    } catch (err) {
        console.log(err);
        result({ message: "Error getting detail products", data: null })
    }
}
Product.create = function (data, result) {
    try {
        const now = new Date();
        data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        db.query(`INSERT INTO product SET ?`, data, (err, kq) => {
            if (err) { console.log(err); result({ message: "Error database" }) }
            else result({ message: "Create Product Successful", data: { product_id: kq.insertId, ...data } })
        })
    } catch (err) {
        console.log(err);
        result({ message: "Error Creating Product", data: null })
    }
}
Product.edit = function (id, data, result) {
    try {
        const now = new Date();
        data.modifiedAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        db.query(`UPDATE product SET ? WHERE product_id=${id}`, data, (err) => {
            if (err) { console.log(err); result({ message: "Error database" }) }
            else result({ message: "Edit Product Successful", data: { product_id: id, ...data } })
        })
    } catch (err) {
        console.log(err);
        result({ message: "Error Updating Product", data: null })
    }
}
Product.delete = function (id, result) {
    try {
        db.query(`DELETE FROM product WHERE product_id=${id}`, (err) => {
            if (err) { console.log(err); result({ message: "Error database" }) }
            else result({ message: "Xóa thành công sản phẩm " + id })
        })
    } catch (err) {
        console.log(err);
        result({ message: "Error delete Product" })
    }
}

Product.getByCategory = function (id, result) {
    try {
        db.query(`SELECT * FROM product WHERE category_id=${id}`, (err, data) => {
            if (err || data.length < 1) { console.log(err); result(null) }
            else result(data)
        })
    } catch (err) {
        console.log(err);
        result(null)
    }
}
module.exports = Product;