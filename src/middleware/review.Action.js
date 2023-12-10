const { await } = require('await')
const db = require('../connection/connect')
const deleteResponseOfReview = (id) => {
    db.query(`DELETE FROM response WHERE review_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
const deleteReviewByProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM review WHERE product_id=${id}`, (err, data) => {
            if (err) reject(err)
            else {
                const deletePromises = data.map(review =>
                    new Promise((resolve, reject) => {
                        db.query(`DELETE FROM response WHERE review_id = ${review.review_id}`, (err, data) => {
                            if (err) reject(err)
                            resolve(data)
                        })
                    })
                );
                deletePromises.push(new Promise((resolve, reject) => {
                    db.query(`DELETE FROM review WHERE product_id = ${id}`, (err, data) => {
                        if (err) reject(err)
                        resolve(data)
                    })
                }));
                Promise.all(deletePromises).then(resolve).catch(reject);

            }
        })
    })
}
const deleteReviewByAccount = (id) => {
    db.query(`DELETE FROM review WHERE account_id=${id}`, (err) => {
        if (err) console.log(err)
    })
}
module.exports = { deleteResponseOfReview, deleteReviewByProduct, deleteReviewByAccount }