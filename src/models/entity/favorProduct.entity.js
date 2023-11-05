const db = require('../../connection/connect')
const FavorProduct = function (fav) {
    this.fav_product_id = fav.fav_product_id;
    this.product_id = fav.product_id;
    this.account_id = fav.account_id;
}
FavorProduct.add_fav = (data, result) => {
    try {
        db.query(`INSERT INTO favorite_product SET ?`, data, (err, kq) => {
            if (err) result({ message: "Error inserting favorite", error: err })
            else result({ message: "Success", status: true })
        })
    } catch (err) {
        result({ message: "Error SERVER", error: err })
    }
}
FavorProduct.find_fav = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM favorite_product WHERE product_id=${data.product_id} and account_id=${data.account_id}`, (err, kq) => {
            if (err || kq.length < 1) resolve(false)
            else resolve(true)
        })
    })
}
FavorProduct.delete = (data, result) => {
    try {
        db.query(`DELETE FROM favorite_product WHERE product_id=${data.product_id} and account_id=${data.account_id}`, data, (err, kq) => {
            if (err) result({ message: "Error inserting favorite", error: err })
            else result({ message: "Success", status: false })
        })
    } catch (err) {
        result({ message: "Error SERVER", error: err })
    }
}
module.exports = FavorProduct;