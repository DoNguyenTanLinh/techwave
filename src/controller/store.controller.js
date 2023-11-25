const { await } = require("await");
const Category = require("../models/entity/category.entity");
const Product = require("../models/entity/product.entity");
const Store = require("../models/entity/store.entity");
const { ProductResponse } = require('../models/response/product.response');
const { error } = require("jquery");
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
        if (req.user.groupWithRole.RoleName === 'USER') {
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
                result.product = await Promise.all(productMap);
                return result;

            })

            Promise.all(products)
                .then((data) => {
                    res.json({ info: newStore, data });
                })
                .catch(error => console.log(error))
        })


    }
}
module.exports = new StoreController;