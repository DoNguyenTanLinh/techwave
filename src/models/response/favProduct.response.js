const Product = require('../entity/product.entity');
const FavorProductResponse = function (fav) {
    this.fav_product_id = fav.fav_product_id;
    this.account_id = fav.account_id;
    this.product = null;
    this.init = async function () {
        try {
            this.product = await Product.getOne(fav.product_id);
        } catch (error) {
            console.error(error);
        }
    };
}
module.exports = { FavorProductResponse };