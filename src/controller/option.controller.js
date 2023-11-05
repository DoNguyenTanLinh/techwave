const Option = require("../models/entity/option.entity");

class OptionController {
    get_option = (req, res) => {
        const id = req.product_id;
        console.log("req " + req)
        Option.getAll(id)
            .then((data) => res.json({ product_id: id, data }))
    }
    create_option = (req, res) => {
        req.body.product_id = req.product_id;
        Option.create(req.body, (data) => {
            res.json(data);
        })
    }
    update_option = (req, res) => {
        req.body.product_id = req.product_id;
        Option.edit(req.params.id, req.body, (data) => {
            res.json(data);
        })
    }
    delete_option = (req, res) => {
        Option.delete(req.params.id, (data) => {
            res.json(data);
        })
    }
}

module.exports = new OptionController;