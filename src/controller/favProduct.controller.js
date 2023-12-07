const { FavorProductResponse } = require('../models/response/favProduct.response')
const FavoriteProduct = require('../models/entity/favorProduct.entity')
class FavorProductController {
    add_fav_product = (req, res) => {
        const data = {
            product_id: req.params.id,
            account_id: req.user.id
        }
        if (!req.user.id) {
            res.json({ message: "Not authenticated the user", data: null })
        }
        else if (req.user.groupWithRole.url !== '/user') res.json({ message: "You dont have permission to access this resource...", data: null })
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
        else if (req.user.groupWithRole.url !== '/user') res.json({ message: "You dont have permission to access this resource...", data: null })
        else {
            FavoriteProduct.delete(data, (kq) => {
                res.json(kq)
            })
        }
    }
    get_favor_product = async (req, res) => {
        FavoriteProduct.find_userFavProduct(req.user.id, async (data) => {
            if (data) {
                const products = data.map(async (productData) => {

                    const product = new FavorProductResponse(productData, FavorProductResponse);
                    await product.init()
                    return product;

                })
                Promise.all(products)
                    .then((productsWithData) => {
                        res.json({ data: productsWithData });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send("Error fetching product data");
                    });
            } else res.json({ message: "Không có sản phẩm", data: null })
        }
        )
    }
}





module.exports = new FavorProductController;