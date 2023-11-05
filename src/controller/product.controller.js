const Product = require("../models/entity/product.entity");
const { setDetail, getDetail, deleteDetail } = require('../middleware/detailProduct.Action')
const { deleteAllOption } = require('../middleware/product.Action')
class ProductController {
    getAll_product = function (req, res) {
        Product.getAll((data) => {
            const products = data.map(async (productData) => {
                // console.log(req.user.id)
                const fav = {
                    product_id: productData.product_id,
                    account_id: req.user.id
                }
                const product = new Product(productData, Product);
                await product.init()
                await product.getStatus(fav);
                return product;

            })
            Promise.all(products)
                .then((productsWithData) => {
                    res.json(productsWithData);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send("Error fetching product data");
                });

        })
    }
    getDetail_product = function (req, res) {
        Product.getDetails(req.params.id, async (data) => {
            data.data.content = await getDetail(data.data.product_id);
            res.json(data);
        })
    }
    create_product = function (req, res) {
        req.body.createBy = req.user.id;
        Product.create(req.body, (data) => {
            setDetail(data.data.product_id);
            res.json(data);
        })
    }
    getOne_product = function (req, res) {
        Product.getDetails(req.params.id, async (data) => {
            const product = new Product(data.data, Product);
            await product.init()
            res.json(product);
        })
    }
    update_product = function (req, res) {
        req.body.modifiedBy = req.user.id;
        Product.edit(req.params.id, req.body, (data) => {
            res.json(data);
        })
    }
    delete_product = function (req, res) {
        deleteDetail(req.params.id);
        deleteAllOption(req.params.id);
        Product.delete(req.params.id, (data) => {
            res.json(data);
        })
    }
    getByCategory = function (req, res) {
        Product.getByCategory(req.params.id, (data) => {
            if (data) {
                const products = data.map(async (productData) => {
                    const fav = {
                        product_id: productData.product_id,
                        account_id: req.user.id
                    }
                    const product = new Product(productData, Product);
                    await product.init()
                    await product.getStatus(fav)
                    return product;

                })
                Promise.all(products)
                    .then((productsWithData) => {
                        res.json(productsWithData);
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send("Error fetching product data");
                    });
            } else res.json({ message: "Không có sản phẩm", data: null })
        })
    }
}

module.exports = new ProductController;