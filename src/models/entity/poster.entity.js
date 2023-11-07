const db = require('../../connection/connect');
const date = require('date-and-time');
const { PosterResquest } = require('../resquest/poster.resquest');
const Poster = function (poster) {
    this.pos_new_id = poster.pos_new_id;
    this.title = poster.title;
    this.description = poster.description;
    this.content = poster.content;
    this.status = poster.status;
    this.product_id = poster.product_id;
    this.image = poster.image;
    this.createBy = poster.createBy;
    this.createAt = poster.createAt;
    this.modifiedBy = poster.modifiedBy;
    this.modifiedAt = poster.modifiedAt;
}
Poster.findAll = (result) => {
    db.query("SELECT * FROM poster_new WHERE status='1'", (err, data) => result(data))
}
Poster.findApprove = (result) => {
    db.query("SELECT * FROM poster_new WHERE status='0'", (err, data) => result(data))
}
Poster.findReject = (result) => {
    db.query("SELECT * FROM poster_new WHERE status='2'", (err, data) => result(data))
}
Poster.findOne = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM poster_new WHERE pos_new_id=${id} and status='1'`, (err, data) => {
            if (err || data.length == 0) resolve(null)
            else resolve(data[0])
        })
    })
}
Poster.create = (data, result) => {
    data.status = '0';
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`INSERT INTO poster_new SET ?`, data, (err, kq) => {
        if (err) result({ message: "Error inserting", data: null })
        else result({ message: "Tạo post thành công. Đang chờ phê duyệt", data: { pos_new_id: kq.insertId, ...data } })
    })
}
Poster.edit = async (id, data, result) => {
    const oldPost = await Poster.findOne(id);
    if (oldPost) {
        PosterResquest(oldPost, data);
        const now = new Date();
        oldPost.modifiedAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        db.query(`UPDATE poster_new SET ? WHERE pos_new_id=${id}`, oldPost, (err, kq) => {
            if (err) result({ message: "Error updating", data: null })
            else result({ message: "Update post thành công.", data: { pos_new_id: id, ...oldPost } })
        })
    } else {
        result({ message: "Không tìm thấy poster", data: null })
    }

}
Poster.approvePost = (id, result) => {
    db.query(`UPDATE poster_new SET status='1' WHERE pos_new_id=${id}`, (err) => {
        if (err) result({ message: "Error approve" })
        else result({ message: `Approve post ${id} thành công.` })
    })
}
Poster.rejectPost = (id, result) => {
    db.query(`UPDATE poster_new SET status='2' WHERE pos_new_id=${id}`, (err) => {
        if (err) result({ message: "Error reject" })
        else result({ message: `Reject post ${id} thành công.` })
    })
}
Poster.delete = (id, result) => {
    db.query(`DELETE FROM poster_new WHERE pos_new_id=${id}`, (err) => {
        if (err) result({ message: "Error deleting posts" })
        else result({ message: `Xóa Posts ${id} thành công.` })
    })
}
module.exports = Poster;