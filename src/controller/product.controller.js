const Product = require("../models/entity/product.entity");
const { setDetail, getDetail, deleteDetail } = require('../middleware/detailProduct.Action')
const { deleteAllOption, setAllCart } = require('../middleware/product.Action')
const { setDeleteProduct } = require('../middleware/favProduct.Action')
const { ProductResponse, ProductDetailResponse } = require('../models/response/product.response');
const Category = require("../models/entity/category.entity");
class ProductController {
    getAllForUser_product = function (req, res) {
        Product.getAll(req.user.id, (data) => {
            const products = data.map(async (productData) => {
                // console.log(req.user.id)
                const fav = {
                    product_id: productData.product_id,
                    account_id: req.user.id
                }
                const product = new ProductResponse(productData, ProductResponse);
                await product.init()
                await product.getStatus(fav);
                await product.initHaveSales();
                await product.initPlace();
                await product.initRating();
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
    getDetail_product = async function (req, res) {
        Product.getDetails(req.params.id, async (data) => {
            if (data.data) {
                data.data.content = await getDetail(data.data.product_id);
                res.json(data);
            }
            else {
                res.json(data);
            }
        })


    }
    create_product = async function (req, res) {
        req.body.createBy = req.user.id;
        try {
            if (req.body.category_child != null) {
                const category = await Category.findByName(req.body.category_child);

                if (!category) {
                    let newCategory = {
                        name: req.body.category_child,
                        category_parent_id: req.body.category_id,
                        createBy: req.user.id
                    }
                    const createdCategory = await Category.create(newCategory);
                    req.body.category_id = createdCategory.id;
                } else {
                    req.body.category_id = category.id;
                }
            }
            delete req.body.category_child;
            Product.create(req.body, (data) => {
                setDetail(data.data.product_id);
                res.json(data);
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getOne_product = function (req, res) {
        Product.getDetails(req.params.id, async (data) => {
            const fav = {
                product_id: data.product_id,
                account_id: req.user.id
            }
            const product = new ProductDetailResponse(data.data, ProductDetailResponse);
            await product.init()
            await product.getStatus(fav)
            await product.initSlReview();
            await product.initRating();
            await product.initPlace();
            await product.initHaveSales();
            await product.initReview();
            await product.initStore();
            await product.initContent();
            await product.initCategory();
            res.json(product);
        })
    }
    update_product = async function (req, res) {
        try {
            if (req.body.category_child != null) {
                const category = await Category.findByName(req.body.category_child);
                if (!category) {
                    let newCategory = {
                        name: req.body.category_child,
                        category_parent_id: req.body.category_id,
                        createBy: req.user.id
                    }
                    const createdCategory = await Category.create(newCategory);
                    req.body.category_id = createdCategory.id;
                } else {
                    req.body.category_id = category.id;
                }
            }
            delete req.body.category_child;
            Product.edit(req.params.id, req.body, (data) => {
                res.json(data);
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }


    }
    delete_product = function (req, res) {
        let id = req.params.id;
        deleteDetail(id);
        deleteAllOption(id);
        setDeleteProduct(id);
        setAllCart(id);
        Product.delete(id, (data) => {
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
                    const product = new ProductResponse(productData, ProductResponse);
                    await product.init()
                    await product.getStatus(fav)
                    await product.initHaveSales();
                    await product.initPlace();
                    await product.initRating();
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