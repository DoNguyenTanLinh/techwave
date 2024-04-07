const Discount = require("../models/entity/discount.entity");
const DiscountUser = require("../models/entity/discount_user.entity");

class DiscountController {
    get_Discount_Payment = (req, res) => {
        Discount.getDiscountPayment(req.query.id, result => {
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
        DiscountUser.insertDiscount(result.discount_id, req.user.id, req.user.groupWithRole.permission_id);
        res.json({ message: "successfully", data: result });
    }
}

module.exports = new DiscountController;