const Address = require("../models/entity/address.entity");

class AddressController {
    get_All = async function (req, res) {
        await Address.getAllAddress(req.user.id)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => res.send(err));
    }
    update = async function (req, res) {
        // req.user.id
        await Address.update(req.params.id, req.body)
            .then((data) => {
                res.send(data);
            }).catch((err) => { res.send(err) })
    }
    delete = function (req, res) {
        Address.delete(req.params.id, req.user.id, (data) => res.json({ message: data }))
    }
    setDefault = async function (req, res) {
        await Address.setDefault(req.params.id, req.user.id, (data) => res.json({ message: data }))

    }
    create = function (req, res) {
        req.body.id_account = req.user.id;
        console.log(req.body);
        Address.create(req.body, function (data) {
            res.json({ message: data })
        })
    }
}
module.exports = new AddressController;