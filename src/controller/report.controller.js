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
        if (req.user.groupWithRole.RoleName !== 'ADMIN') {
            Report.getByRole(req.user.id, (data) => {
                res.json(data);
            })
        } else {
            Report.getAll(req.body.status, (data) => {
                res.json(data);
            })
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