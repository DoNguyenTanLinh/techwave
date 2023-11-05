const FavoriteProduct = require('../models/entity/favorProduct.entity')
class FavorProduct {
    fav_product = (req, res) => {
        const data = {
            product_id: req.params.id,
            account_id: req.user.id
        }
        if (!req.user.id) {
            res.json({ message: "Not authenticated the user", data: null })
        }
        else {
            FavoriteProduct.add_fav(data, (kq) => {
                res.json(kq)
            })
        }
    }
    delete_favor_product = (req, res) => {
        const data = {
            product_id: req.params.id,
            account_id: req.user.id
        }
        if (!req.user.id) {
            res.json({ message: "Not authenticated the user", data: null })
        }
        else {
            FavoriteProduct.delete(data, (kq) => {
                res.json(kq)
            })
        }
    }
}

module.exports = new FavorProduct;