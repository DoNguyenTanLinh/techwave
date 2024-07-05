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
    db.query(`SELECT * FROM product WHERE createBy=${id} ORDER BY createAt DESC`, (err, data) => {
        if (err) result(null)
        else {
            result(data)
        }
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
        db.query(`SELECT product_id,name,image From product WHERE product_id=${id}`, (err, data) => {
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
        db.query(`SELECT FORMAT(COALESCE(sum(rating)/count(rating),0),1) as rating FROM review inner join product on review.product_id=product.product_id
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
Product.findHaveSales = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select COALESCE(SUM(c.quantity), 0) as sum from cart_shop as cs
inner join shop_bill as sb on sb.shop_bill_id=cs.shop_bill_id
inner join cart as c on c.cart_id=cs.cart_id
where sb.status=2 and c.product_id=${id}`, (err, data) => {
            if (err) reject(err);
            else resolve(data[0].sum)
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
        db.query(`SELECT * FROM product WHERE createBy=${id}`, (err, data) => {
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
Product.getProductTrend = function (result) {
    db.query(`SELECT sum(cs.price),p.* from shop_bill as sb
                inner join cart_shop as cs on cs.shop_bill_id=sb.shop_bill_id
                inner join cart as c on c.cart_id=cs.cart_id
                inner join product as p on c.product_id=p.product_id
                where sb.status=2
                group by c.product_id
                LIMIT 5`, (err, data) => {
        if (err) { console.log(err); }
        else result(data)
    })
}
Product.getByCategory = function (id, query, result) {
    try {
        if (query = 'topsale') {

            db.query(` select *, (SELECT count(*) FROM cart_shop as csh
inner join cart as c on c.cart_id=csh.cart_id
where product_id=pd.product_id) as pr From (SELECT p.* FROM product as p
        inner join category as c on p.category_id=c.category_id
        WHERE p.category_id=${id} or c.category_parent_id=${id}) as pd
        order by pr desc`, (err, data) => {
                if (err) { console.log(err); }
                else result(data)
            })
        }
        else {
            db.query(`SELECT p.* FROM product as p
                inner join category as c on p.category_id=c.category_id
                WHERE p.category_id=${id} or c.category_parent_id=${id}
                ${query}`, (err, data) => {
                if (err) { console.log(err); }
                else result(data)
            })
        }

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