const Introduce = require("../models/entity/introduce.entity");

class IntroduceController {
    get_introduce = (req, res) => {
        Introduce.getIntro(req, (data) => {
            res.send(data);
        });
    }
    update_introduce = (req, res) => {
        try {
            req.body.modifiedBy = req.user.id;
            Introduce.updateIntro(req.body, (data) => {
                res.send({ message: "Cập nhật thành công", data });
            })
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    clear_introduce = (req, res) => {
        try {
            Introduce.clear(req.user.id, (data) => {
                res.send({ message: "Cập nhật thành công", data });
            })
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
module.exports = new IntroduceController;