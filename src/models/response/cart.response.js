const Account = require('../entity/account.enitty');
const Address = require('../entity/address.entity');
const Option = require('../entity/option.entity');
const Product = require('../entity/product.entity');
const CartResponse = function (cart) {
    this.cart_id = cart.cart_id;
    this.product = null;
    this.option = null;
    this.quantity = cart.quantity;
    this.price = cart.price;
    this.account_id = cart.account_id;
    this.status = cart.status;
    this.place = null;
    this.store = null;
    this.init = async function () {
        try {
            this.product = await Product.getOne(cart.product_id);
            let account = await Account.getById(this.product.createBy);
            let place = await Address.getAddress(account.account_id);
            this.store = {
                account_id: account.account_id,
                username: account.username,
                picture: account.avatar,
                province: place.province,
                province_id: place.province_id,
                district: place.district,
                district_id: place.district_id,
                ward: place.ward,
                ward_id: place.ward_id,
                address: place.address
            }
        } catch (error) {
            console.error(error);
        }
    };
    this.optionName = async function () {
        try {
            this.option = await Option.getName(cart.option_id);
        } catch (error) {
            console.log(error);
        }
    }
}
const CartBillResponse = function (cart) {
    this.product = null;
    this.option = null;
    this.quantity = cart.quantity;
    this.initProduct = async function () {
        try {
            this.product = await Product.getName(cart.product_id);
        } catch (error) {
            console.log(error)
        }
    }
    this.initOption = async function () {
        try {
            this.option = await Option.getName(cart.option_id);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = { CartResponse, CartBillResponse };