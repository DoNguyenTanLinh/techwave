const Response = require("../models/entity/response.entity");
const { setStatusReview } = require('../middleware/response.Action')
class ResponseController {
    create_response = (req, res) => {
        req.body.createBy = req.user.id;
        Response.create(req.body, (data) => {
            setStatusReview(data.review_id);
            res.json(data);
        })
    }
}

module.exports = new ResponseController;