const Account = require("../entity/account.enitty");
const FavorProduct = require("../entity/favorProduct.entity");
const Option = require("../entity/option.entity");
const Product = require("../entity/product.entity");
const Bill = require("../entity/bill.entity");
const Review = require("../entity/review.entity");
const Store = require("../entity/store.entity");
const { getDetail } = require('../../middleware/detailProduct.Action');
const Category = require("../entity/category.entity");
const ProductDetailResponse = function (product) {
    this.statusReview = null;
    this.product_id = product.product_id;
    this.name = product.name;
    this.rating = null;
    this.slReview = null;
    this.haveSales = null;
    this.place = null;

    this.quantity = product.quantity;
    this.origin = product.origin;
    this.price = product.price;
    this.promotional_price = product.promotional_price;
    this.image = product.image;
    this.option = null;
    this.favStatus = null;
    this.store = null;
    this.category = null;
    this.content = null;
    this.review = null;
    this.initStatusReview = async () => {
        try {
            const billCount = await Bill.getStatusByUser(product.idUser, product.product_id)
            const reviewCount = await Review.getStatusByUser(product.idUser, product.product_id)
            console.log("bill: " + billCount + " review: " + reviewCount)
            if (billCount - reviewCount >= 1) {
                this.statusReview = true;
            }
            else {
                this.statusReview = false;
            }
        } catch (error) {
            console.log(error)
        }
    }
    this.init = async function () {
        try {
            this.option = await Option.getAll(product.product_id);
        } catch (error) {
            console.error(error);
        }
    };
    this.getStatus = async function (data) {
        try {
            this.favStatus = await FavorProduct.find_fav(data);
        } catch (error) {
            console.error(error);
        }
    }
    this.initReview = async function () {
        try {
            this.review = await Review.getByProduct(product.product_id);
        } catch (error) {
            console.log(error);
        }
    }
    this.initHaveSales = async () => {
        try {
            this.haveSales = await Product.findHaveSales(product.product_id)
        } catch (error) {
            console.log(error);
        }
    }
    this.initPlace = async () => {
        try {
            this.place = await Account.getAddressByProduct(product.product_id)
        } catch (error) {
            console.log(error);
        }
    }
    this.initRating = async () => {
        try {
            this.rating = await Product.getRating(product.product_id)
        } catch (error) {
            console.log(error);
        }
    }
    this.initSlReview = async () => {
        try {
            this.slReview = await Review.getSlByProduct(product.product_id)
        } catch (error) {
            console.log(error)
        }
    }
    this.initStore = async () => {
        try {
            const newStore = new Store(product.createBy, Store);
            await newStore.initInfo();
            await newStore.initRiew();
            await newStore.initProduct();
            await newStore.initResponseRate();
            await newStore.initJoin();
            await newStore.initFolower();
            this.store = newStore;
        } catch (error) {
            console.log(error);
        }
    }
    this.initCategory = async () => {
        try {
            const category = await Category.findOne(product.category_id)
            if (category.category_parent_id) {
                const cateParent = await Category.findOne(category.category_parent_id)
                this.category = {
                    parent: {
                        category_id: cateParent.category_id,
                        name: cateParent.name
                    },
                    current: {
                        category_id: category.category_id,
                        name: category.name
                    }
                }
            } else {
                this.category = {
                    category_id: category.category_id,
                    name: category.name
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    this.initContent = async () => {
        try {
            this.content = await getDetail(product.product_id)
        } catch (error) {
            console.log(error);
        }
    }
}

const ProductResponse = function (product) {
    this.product_id = product.product_id;
    this.name = product.name;
    this.price = product.price;
    this.promotional_price = product.promotional_price;
    this.image = product.image;
    this.option = null;
    this.rating = null;
    this.haveSales = null;
    this.place = null;
    this.favStatus = null;
    this.init = async function () {
        try {
            this.option = await Option.getAll(product.product_id);
        } catch (error) {
            console.error(error);
        }
    };
    this.getStatus = async function (data) {
        try {
            this.favStatus = await FavorProduct.find_fav(data);
        } catch (error) {
            console.error(error);
        }
    }
    this.initHaveSales = async () => {
        try {
            this.haveSales = await Product.findHaveSales(product.product_id)
        } catch (error) {
            console.log(error);
        }
    }
    this.initPlace = async () => {
        try {
            this.place = await Account.getAddressByProduct(product.product_id)
        } catch (error) {
            console.log(error);
        }
    }
    this.initRating = async () => {
        try {
            this.rating = await Product.getRating(product.product_id)
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = { ProductDetailResponse, ProductResponse };