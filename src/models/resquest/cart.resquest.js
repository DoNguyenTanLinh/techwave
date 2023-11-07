const cartResquest = (data, oldcart) => {
    data.product_id = oldcart.product_id;
    data.option_id = cart.option_id;
    data.quantity = oldcart.quantity;
    data.price = oldcart.price;
    data.account_id = oldcart.account_id;
    data.status = oldcart.status;
}

module.exports = { cartResquest }