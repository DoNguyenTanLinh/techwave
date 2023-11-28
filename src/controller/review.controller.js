const Review = require("../models/entity/review.entity");
const { deleteResponseOfReview } = require('../middleware/review.Action')
class ReviewController {
    create_review = (req, res) => {
        req.body.account_id = req.user.id;
        req.body.status = '0';
        Review.create(req.body, (kq) => {
            res.json(kq)
        })
    }
    getReview_ByAdmin = (req, res) => {
        Review.getByAdmin((data) => {
            res.json(data)
        })
    }
    getReview_ByStaff = (req, res) => {
        if (req.user.groupWithRole.RoleName === 'VENDOR') {
            Review.getByStaff(req.user.id, req.params.status, (data) => {
                res.json(data)
            })
        } else if (req.user.groupWithRole.RoleName === 'USER') {
            Review.getByUser(req.user.id, req.params.status, (data) => {
                res.json(data)
            })
        }
    }
    getDetail_review = (req, res) => {
        Review.getDetail(req.params.id, (data) => {
            res.json(data)
        })
    }
    delete_review = (req, res) => {
        let id = req.params.id;
        deleteResponseOfReview(id);
        Review.delete(id, (data) => {
            res.json(data)
        })
    }
}

module.exports = new ReviewController;