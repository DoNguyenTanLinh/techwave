const { await } = require("await");
const Category = require("../models/entity/category.entity");
const Product = require("../models/entity/product.entity");
const Store = require("../models/entity/store.entity");
const { ProductResponse } = require('../models/response/product.response');
const StatisticResponse = require('../models/response/statistics.response');
const Follow = require("../models/entity/folow.entity");
class StoreController {
    getStore = async (req, res) => {
        const newStore = new Store(req.params.id, Store);
        await newStore.initInfo();
        await newStore.initRiew();
        await newStore.initProduct();
        await newStore.initResponseRate();
        await newStore.initJoin();
        await newStore.initFolower();
        newStore.status = false;
        if (req.user.id != null && req.user.groupWithRole.RoleName === 'USER') {
            newStore.status = await Follow.findFollow(req.params.id, req.user.id)
        }
        Category.getIdCateStore(req.params.id, (data) => {
            const products = data.map(async (category) => {
                const result = {}
                result.category = category;
                const product = await Product.getByCategoryStore(req.params.id, category.category_id)
                const productMap = product.map(async (product) => {
                    const fav = {
                        product_id: product.product_id,
                        account_id: req.user.id
                    }
                    const productResponse = new ProductResponse(product, ProductResponse)
                    await productResponse.init();
                    await productResponse.getStatus(fav);
                    await productResponse.initHaveSales();
                    await productResponse.initPlace();
                    await productResponse.initRating();
                    return productResponse;
                })
                const resultProduct = await Promise.all(productMap);
                if (req.query.page) {
                    const page = parseInt(req.query.page);
                    const limit = parseInt(req.query.limit);
                    // calculating the starting and ending index
                    const startIndex = (page - 1) * limit;
                    const endIndex = page * limit;
                    const pagination = {};
                    pagination.total = Math.ceil(resultProduct.length / limit)
                    if (endIndex < resultProduct.length) {
                        pagination.next = {
                            page: page + 1,
                            limit: limit
                        };
                    }
                    if (startIndex > 0) {
                        pagination.previous = {
                            page: page - 1,
                            limit: limit
                        };
                    }
                    pagination.results = resultProduct.slice(startIndex, endIndex);
                    result.products = pagination
                }
                else {
                    result.products = resultProduct;
                }
                return result;

            })

            Promise.all(products)
                .then((data) => {
                    res.json({ info: newStore, data });
                })
                .catch(error => console.log(error))
        })


    }
    getStatistic = async (req, res) => {
        const statistic = new StatisticResponse(req.user.id, StatisticResponse)
        await statistic.initRevenue();
        await statistic.initCustomer();
        await statistic.initInventory();
        await statistic.initOrderStatistic();
        res.json({ statistic })
    }
}
module.exports = new StoreController;