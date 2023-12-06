const db = require('../../connection/connect')
const date = require('date-and-time');
const Product = function (product) {
    this.product_id = product.product_id;
    this.name = product.name;
    this.quantity = product.quantity;
    this.origin = product.origin;
    this.price = product.price;
    this.promotional_price = product.promotional_price;
    this.category_id = product.category_id;
    this.image = product.image;
    this.createBy = product.createBy;
    this.createAt = product.createAt;
    this.modifiedAt = product.modifiedAt;
}

Product.getAll = function (result) {
    db.query('SELECT * FROM product', (err, data) => {
        if (err) result(null)
        else result(data)
    })
}
Product.getForVendor = function (id, result) {
    db.query(`	SELECT * FROM product WHERE createBy=${id}`, (err, data) => {
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
Product.getName = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT product_id,name From product WHERE product_id=${id}`, (err, data) => {
            if (err || data.length == 0) resolve(null)
            else resolve(data[0])
        })
    })
}
Product.findByCreateById = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM product WHERE createBy=${id}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
Product.getDetails = function (id, result) {
    try {
        db.query(`SELECT * From product WHERE product_id=${id}`, (err, data) => {
            if (err) { console.log(err); result({ message: "Error database" }) }
            else if (data.length < 1) {
                result({ message: "Không có sản phẩm", data: null })
            }
            else result({ message: "Getting Detail Successful", data: data[0] })
        })
    } catch (err) {
        console.log(err);
        result({ message: "Error getting detail products", data: null })
    }
}
Product.getRating = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT FORMAT(sum(rating)/count(rating),1) as rating FROM review inner join product on review.product_id=product.product_id
        WHERE product.product_id=${id}`, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0].rating);
                } else {
                    resolve(null);
                }
            }
        })
    })
}
Product.findHaveSales = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM bill inner join cart on bill.cart_id=cart.cart_id
        inner join product on cart.product_id=product.product_id
        WHERE product.product_id=${id} and bill.status=2`, (err, data) => {
            if (err) console.log(err);
            else resolve(data.length)
        })
    })
}
Product.findByName = function (name, result) {
    db.query(`SELECT * FROM product WHERE name like '%${name}%'`, (err, data) => {
        if (err) console.log(err)
        else result(data)
    })
}
Product.getQuantity = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM techwave.product WHERE createBy=${id}`, (err, data) => {
            if (err) reject(err)
            else resolve(data.length)
        })
    })
}
Product.create = function (data, result) {
    try {
        const now = new Date();
        data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        console.log(data)
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
        db.query(`SELECT p.* FROM product as p
        inner join category as c on p.category_id=c.category_id
        WHERE p.category_id=${id} or c.category_parent_id=${id}`, (err, data) => {
            if (err || data.length < 1) { console.log(err); result(null) }
            else result(data)
        })
    } catch (err) {
        console.log(err);
        result(null)
    }
}
Product.getByCategoryStore = function (idStore, idCate) {
    return new Promise((resolve, reject) => {
        db.query(`select p.* from category as c
        inner join product as p on c.category_id=p.category_id
        WHERE p.createBy=${idStore} and p.category_id=${idCate}`, (err, data) => {
            if (err) { console.log(err); reject(err) }
            if (data.length == 0) resolve(null)
            else resolve(data)
        })
    })

}
module.exports = Product;