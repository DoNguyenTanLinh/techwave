const Report = require("../models/entity/report.entity");

class ReportController {
    create_report = (req, res) => {
        req.body.createBy = req.user.id;
        req.body.status = '0';
        Report.create(req.body, (data) => {
            res.json(data);
        })
    }
    get_report = (req, res) => {
        if (req.user.groupWithRole.RoleName === 'ADMIN') {
            if (req.query.page) {
                Report.getAll(req.query.status, (data) => {
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
                Report.getAll(req.query.status, (data) => {
                    res.json(data);
                })
            }
        } else {
            if (req.user.groupWithRole.RoleName === 'VENDOR') {
                if (req.query.page) {
                    Report.getByRole(req.user.id, (data) => {
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
                    Report.getByRole(req.user.id, (data) => {
                        res.json(data);
                    })
                }
            }
            else {
                Report.getByRole(req.user.id, (data) => {
                    res.json(data);
                })
            }
        }
    }
    get_detail_report = (req, res) => {
        Report.getdetails(req.params.id, (data) => {
            res.json(data)
        })
    }
    resolve_report = (req, res) => {
        Report.resolve(req.params.id, (data) => {
            res.json(data)
        })
    }
}

module.exports = new ReportController;