const db = require('../connection/connect')
const deleteResponseOfReview = (id) => {
    db.query(`DELETE FROM response WHERE review_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}

module.exports = { deleteResponseOfReview }