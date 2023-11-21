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
        res.json(newStore);
    }
}
module.exports = new StoreController;