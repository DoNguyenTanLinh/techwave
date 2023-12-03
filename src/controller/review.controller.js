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
    // getReview_ByAdmin = (req, res) => {
    //     Review.getByAdmin((data) => {
    //         res.json(data)
    //     })
    // }
    getAll_Review = (req, res) => {
        if (req.user.groupWithRole.RoleName === 'VENDOR') {
            if (req.query.page) {
                Review.getByStaff(req.user.id, req.query.status, (data) => {
                    const page = parseInt(req.query.page);
                    const limit = parseInt(req.query.limit);
                    // calculating the starting and ending index
                    const startIndex = (page - 1) * limit;
                    const endIndex = page * limit;
                    const results = {};
                    results.total = Math.ceil(data.length / limit)
                    if (endIndex < data.length) {
                        results.next = {
                            page: page + 1,
                            limit: limit
                        };
                    }
                    if (startIndex > 0) {
                        results.previous = {
                            page: page - 1,
                            limit: limit
                        };
                    }
                    results.results = data.slice(startIndex, endIndex);
                    res.status(200).json(results);
                })
            }
            else {
                Review.getByStaff(req.user.id, req.query.status, (data) => {
                    res.json(data)
                })
            }
        } else if (req.user.groupWithRole.RoleName === 'USER') {
            Review.getByUser(req.user.id, req.query.status, (data) => {
                res.json(data)
            })
        } else if (req.user.groupWithRole.RoleName === 'ADMIN') {
            if (req.query.page) {
                Review.getByAdmin((data) => {
                    const page = parseInt(req.query.page);
                    const limit = parseInt(req.query.limit);
                    // calculating the starting and ending index
                    const startIndex = (page - 1) * limit;
                    const endIndex = page * limit;
                    const results = {};
                    results.total = Math.ceil(data.length / limit)
                    if (endIndex < data.length) {
                        results.next = {
                            page: page + 1,
                            limit: limit
                        };
                    }
                    if (startIndex > 0) {
                        results.previous = {
                            page: page - 1,
                            limit: limit
                        };
                    }
                    results.results = data.slice(startIndex, endIndex);
                    res.status(200).json(results);
                })
            }
            else {
                Review.getByAdmin((data) => {
                    res.json(data)
                })
            }

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