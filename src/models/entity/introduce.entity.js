const db = require('../../connection/connect');
const date = require('date-and-time')
const Introduce = function (intro) {
    this.intro_id = intro.id;
    this.content = intro.content;
    this.modifiedBy = intro.modifiedBy;
    this.modifiedAt = intro.modifiedAt;
}
Introduce.getIntro = (req, res) => {
    db.query("SELECT * FROM introduce", function (err, data) {
        if (err) { console.log(err); res(null) }
        else res(data[0]);
    })
}
Introduce.updateIntro = (data, res) => {
    try {
        const now = new Date();
        data.modifiedAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        db.query(`UPDATE introduce SET ? WHERE intro_id=1`, data, function (err, result) {
            if (err) { console.log(err); res(null) }
            else res(data);
        })
    } catch (err) {
        res(err);
    }
}
Introduce.clear = (id, res) => {
    try {
        const now = new Date();
        let data = {
            content: null,
            modifiedBy: id,
            modifiedAt: date.format(now, 'YYYY/MM/DD HH:mm:ss')
        }
        db.query(`UPDATE introduce SET ? WHERE intro_id=1`, data, function (err, result) {
            if (err) { console.log(err); res(null) }
            else res(data);
        })
    } catch (err) {
        console.log(err);
        result("Lỗi Server");
    }
}
module.exports = Introduce;