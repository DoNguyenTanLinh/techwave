const Account = require("../entity/account.enitty");
const Address = require("../entity/address.entity");
const Cart = require("../entity/cart.entity");

const Payment = function () {
    this.account = null;
    this.address = null;
    this.carts = null;
    this.initAccount = async function (id) {
        try {
            this.account = await Account.getById(id);
        } catch (e) {
            console.log(e);
        }
    }
    this.initAdd = async (id) => {
        try {
            this.address = await Address.getAllAddress(id);
        } catch (e) {
            console.log(e);
        }
    }
    this.initCart = async (arrayId) => {
        try {
            const cartPromises = arrayId.map(id => Cart.findById(id));
            const cartResults = await Promise.all(cartPromises);
            this.carts = cartResults;
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = { Payment };