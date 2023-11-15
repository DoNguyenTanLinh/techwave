const Folow = require("../models/entity/folow.entity");
class FolowController {
    get_folow = (req, res) => {
        Folow.get(req.user.id, (data) => {
            res.json(data);
        })
    }
    add_folow = (req, res) => {
        req.body.user_id = req.user.id;
        Folow.add(req.body, (data) => {
            res.json(data);
        })
    }
    delete_folow = (req, res) => {
        let data = {
            vender_id: req.params.id,
            user_id: req.user.id
        }
        Folow.delete(data, (result) => {
            res.json(result);
        })
    }
}

module.exports = new FolowController;