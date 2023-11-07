const Cart = require("../models/entity/cart.entity");
const { CartResponse } = require("../models/response/cart.response");
class CartController {
    getAll_cart = (req, res) => {
        Cart.findAll(req.user.id, (data) => {
            if (data) {
                const carts = data.map(async (cartData) => {
                    const cart = new CartResponse(cartData, CartResponse);
                    await cart.init();
                    await cart.optionName();
                    return cart;
                })
                Promise.all(carts)
                    .then((data) => {
                        res.json(data);
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send("Error fetching cart data");
                    });
            } else {
                res.json({ messager: "Không có sản phẩm trong giỏ hàng", data: null });
            }

        })
    }
    create_cart = async (req, res) => {
        const data = req.body;
        data.account_id = req.user.id;
        data.product_id = req.params.id;
        data.status = '0';
        let oldCart = await Cart.findOne(data);
        if (!oldCart) {
            Cart.create(data, (kq) => {
                res.json(kq);
            })
        }
        else {
            let cartBody = {
                quantity: oldCart.quantity + req.body.quantity,
                option_id: data.option_id,
            }
            Cart.updateQuantity(oldCart.cart_id, cartBody, (kq) => {
                res.json(kq);
            })
        }
    }
    update_cart = (req, res) => {
        Cart.updateQuantity(req.params.id, req.body, (kq) => {
            res.json(kq);
        })
    }
    delete_cart = (req, res) => {
        Cart.delete(req.params.id, req.user.id, (kq) => {
            res.json(kq);
        })
    }
}

module.exports = new CartController;