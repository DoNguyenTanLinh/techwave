const db = require('../../connection/connect');
const DetailProduct = function (detail) {
    this.detail_id = detail.detail_id;
    this.content = detail.content;
    this.product_id = detail.product_id;
}
DetailProduct.edit = function (id, data, result) {
    try {
        db.query(`UPDATE detail SET ? WHERE product_id=${id}`, data, (err, kq) => {
            if (err || kq.changedRows == 0) { console.log(err); result({ message: "Error Database", data: null }) }
            else result({
                message: "Update Detail Successfull", data: { id: id, ...data }
            })
        });
    } catch (err) {
        console.log(err); result({ message: "Error Updating detail", data: null })
    }
}
DetailProduct.clear = function (id, result) {
    try {
        db.query(`UPDATE detail SET content=null WHERE product_id=${id}`, (err, kq) => {
            if (err) { console.log(err); }
            else result({
                message: "Clear Detail Successfull"
            })
        });
    } catch (err) {
        console.log(err); result({ message: "Error Clear detail" })
    }
}
DetailProduct.getDetail = function (id, result) {
    try {
        db.query(`SELECT * FROM detail WHERE product_id=${id}`, (err, kq) => {
            if (err) {
                console.log(err); result({
                    message: "Lỗi: " + err
                })
            }
            else if (kq.length < 1) {
                result({
                    message: "Không tìm thấy Detail id" + id
                })
            }
            else result({
                message: "Get Detail Successfull", data: kq[0]
            })
        });
    } catch (err) {
        console.log(err); result({ message: "Error get detail" })
    }
}

module.exports = DetailProduct;