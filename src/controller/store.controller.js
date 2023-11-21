const { await } = require("await");
const Category = require("../models/entity/category.entity");
const Product = require("../models/entity/product.entity");
const Store = require("../models/entity/store.entity");
class StoreController {
    getStore = async (req, res) => {
        const newStore = new Store(req.params.id, Store);
        await newStore.initInfo();
        await newStore.initRiew();
        await newStore.initProduct();
        await newStore.initResponseRate();
        await newStore.initJoin();
        await newStore.initFolower();

        Category.getIdCateStore(req.params.id, (data) => {
            const product = data.map(async (category) => {
                const result = {}
                result.category = category;
                result.product = await Product.getByCategoryStore(req.params.id, category.category_id)
                return result;
            })
            Promise.all(product)
                .then((data) => {
                    res.json({ info: newStore, data });
                })
                .catch(error => console.log(error))
        })


    }
}
module.exports = new StoreController;