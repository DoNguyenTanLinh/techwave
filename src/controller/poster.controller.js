const Poster = require("../models/entity/poster.entity");

class PosterController {
    get_all = (req, res) => {
        Poster.findAll((data) => {
            res.json({ message: "Lấy Poster thành công", data: data });
        })
    }
    get_one = async (req, res) => {
        let id = req.params.id;
        const data = await Poster.findOne(id);
        if (data) { res.json({ message: `Lấy Poster ${id} thành công`, data: data }); }
        else { res.json({ message: `Không tìm thấy trang` }); }

    }
    get_approve = (req, res) => {
        Poster.findApprove((data) => {
            res.json({ message: `Lấy Poster chưa phê duyệt thành công`, data: data });
        })
    }
    get_reject = (req, res) => {
        Poster.findReject((data) => {
            res.json({ message: `Lấy Poster bị từ chối thành công`, data: data });
        })
    }
    create_poster = (req, res) => {
        req.body.createBy = req.user.id;
        Poster.create(req.body, (data) => {
            res.json(data);
        })
    }
    update_poster = (req, res) => {
        req.body.modifiedBy = req.user.id;
        Poster.edit(req.params.id, req.body, (data) => {
            res.json(data);
        })
    }
    approve_poster = (req, res) => {
        Poster.approvePost(req.params.id, (data) => {
            res.json(data);
        })
    }
    reject_poster = (req, res) => {
        Poster.rejectPost(req.params.id, (data) => {
            res.json(data);
        })
    }
    delete_poster = (req, res) => {
        Poster.delete(req.params.id, (data) => {
            res.json(data);
        })
    }
}

module.exports = new PosterController;