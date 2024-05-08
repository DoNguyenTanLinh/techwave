const { default: tr } = require("date-and-time/locale/tr");
const Discount = require("../models/entity/discount.entity");
const DiscountUser = require("../models/entity/discount_user.entity");

class DiscountController {
    get_DiscountShopPayment = (req, res) => {
        Discount.getDiscountShopAuto(req.query.idshop, req.query.price, result => {
            res.json(result);
        })
    }
    get_DiscountShipPayment = (req, res) => {
        Discount.getDiscountShipAuto(req.user.id, req.query.price, result => {
            res.json(result);
        })
    }
    get_DiscountSelect = (req, res) => {
        Discount.getDiscountSelect(req.query.idDiscount, req.query.price, result => {
            res.json(result)
        })
    }
    get_Discount = (req, res) => {
        Discount.getDiscount(req.user.groupWithRole.permission_id, req.user.id, req.query.idshop, result => {
            res.json(result);
        })
    }
    create_Discount = async (req, res) => {
        const data = req.body;
        data.name = "";
        data.vendor_id = req.user.id;
        if (data.discount !== undefined) {
            data.name += `Giảm ${data.discount}% `;
        }
        if (data.mdPrice !== undefined) {
            data.name += `Giảm tối đa đ${data.mdPrice / 1000}K `;
        }
        try {
            var result = await Discount.createDiscount(data);
        } catch (err) {
            console.error(err);
        }
        DiscountUser.insertDiscount(result.discount_id);
        res.json({ message: "successfully", data: result });
    }
    edit_Discount = (req, res) => {
        const data = req.body;
        data.name = "";
        data.vendor_id = req.user.id;
        if (data.discount !== undefined) {
            data.name += `Giảm ${data.discount}% `;
        }
        if (data.mdPrice !== undefined) {
            data.name += `Giảm tối đa đ${data.mdPrice / 1000}K `;
        }
        Discount.updateDiscount(req.params.id, req.body, result => {
            res.json(result);
        })
    }
    delete_Discount = async (req, res) => {
        if (req.user.groupWithRole.permission_id == 1) {
            try {
                await DiscountUser.deleteDiscountByAdmin(req.params.id);
            } catch (err) {
                console.error(err);
            }
        }
        Discount.deleteDiscount(req.params.id, result => {
            res.json(result);
        })
    }
}

module.exports = new DiscountController;