const Reason = require("../models/entity/reason.entity");
const SetStatusReport = require('../middleware/reason.Action')
class ReasonController {
    create_reason = (req, res) => {
        req.body.createBy = req.user.id;
        SetStatusReport(req.body.report_id)
        Reason.create(req.body, (data) => {
            res.json(data);
        })
    }
}

module.exports = new ReasonController;