const db = require('../connection/connect')
const deleteResponseOfReview = (id) => {
    db.query(`DELETE FROM response WHERE review_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
const deleteReviewByProduct = (id) => {
    db.query(`DELETE FROM review WHERE product_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
const deleteReviewByAccount = (id) => {
    db.query(`DELETE FROM review WHERE account_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
module.exports = { deleteResponseOfReview, deleteReviewByProduct, deleteReviewByAccount }