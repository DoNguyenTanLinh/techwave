const db = require('../../connection/connect');
const ResOfReview = require('../response/resOfReview.response');
const date = require('date-and-time');
const Response = function (response) {
    this.response_id = response.response_id;
    this.content = response.content;
    this.review_id = response.review_id;
    this.createAt = response.createAt;
    this.createBy = response.createBy;
    this.picture = response.picture;
}
Response.getForReview = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM response WHERE review_id=${id}`, (err, data) => {
            if (err) console.log(err);
            else if (data) {
                const responses = data.map(async (responseData) => {
                    const response = new ResOfReview(responseData, ResOfReview);
                    await response.initResCreateBy();
                    return response;
                })
                Promise.all(responses)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch(err => console.log(err));
            } else resolve(null)
        })
    })
}
Response.create = (data, result) => {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`INSERT INTO response SET ?`, data, (err, kq) => {
        if (err) console.log(err);
        else result({ response_id: kq.insertId, ...data })
    })
}
module.exports = Response;