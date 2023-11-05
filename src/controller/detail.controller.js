const Detail = require('../models/entity/detailProduct.entity');
class DetailProduct {
    update_detail = function (req, res) {
        Detail.edit(req.product_id, req.body, (data) => {
            res.json(data);
        })
    };
    clear_detail = function (req, res) {
        Detail.clear(req.product_id, (data) => {
            res.json(data);
        })
    }
    get_detail = function (req, res) {
        Detail.getDetail(req.product_id, (data) => {
            res.json(data);
        })
    }
}

module.exports = new DetailProduct;