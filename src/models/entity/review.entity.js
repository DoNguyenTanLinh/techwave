const db = require('../../connection/connect');
const { ReviewResponse } = require('../response/review.response');
const date = require('date-and-time');
const Review = function (review) {
    this.review_id = review.review_id;
    this.content = review.content;
    this.rating = review.rating;
    this.product_id = review.product_id;
    this.account_id = review.account_id;
    this.picture = review.picture;
    this.status = review.status;
    this.createAt = review.createAt;
}
Review.getSlByProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM techwave.review WHERE product_id=${id}`, (err, data) => {
            if (err) reject(err)
            else resolve(data.length)
        })
    })
}
Review.getSlByStore = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM review as r inner join product as p on r.product_id=p.product_id
        WHERE p.createBy=${id}`, (err, data) => {
            if (err) reject(err)
            else resolve(data.length)
        })
    })
}
Review.getByProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM review WHERE product_id =${id}`, (err, data) => {
            if (err) console.log(err);
            else if (data) {
                const reviews = data.map(async (reviewData) => {
                    const review = new ReviewResponse(reviewData, ReviewResponse)
                    await review.initResCreateBy();
                    await review.initOfResponse();
                    return review;
                })
                Promise.all(reviews)
                    .then((reviews) => resolve(reviews))
                    .catch(err => console.log(err))
            }
            else resolve(data)
        })
    })
}
Review.getByStaff = (id, status, result) => {
    db.query(`SELECT review.* FROM review
    inner join product on review.product_id=product.product_id
    WHERE product.createBy=${id} and status=${status}`, (err, data) => {
        if (err) console.log(err)
        result(data)
    })
}
Review.getByUser = (id, status, result) => {
    db.query(`SELECT * FROM review WHERE account_id=${id} and status=${status}`, (err, data) => {
        if (err) console.log(err)
        result(data)
    })
}
Review.getStatusByUser = (idUser, idProduct) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM techwave.review
        WHERE product_id=${idProduct} and account_id=${idUser}`, (err, data) => {
            if (err) reject(err)
            else resolve(data.length)
        })
    })
}
Review.getByAdmin = (result) => {
    db.query(`SELECT * FROM review`, (err, data) => {
        if (err) console.log(err)
        result(data)
    })
}
Review.getDetail = (id, result) => {
    db.query(`SELECT * FROM review WHERE review_id=${id}`, async (err, data) => {
        if (err) console.log(err);
        else {
            const review = new ReviewResponse(data[0], ReviewResponse)
            await review.initResCreateBy();
            await review.initOfResponse();
            result(review)
        }
    })

}
Review.create = (data, result) => {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    db.query(`INSERT INTO review SET ?`, data, (err, kq) => {
        if (err) console.log(err)
        else result({ review_id: kq.insertId, ...data })
    })
}
Review.delete = (id, result) => {
    db.query(`DELETE FROM review WHERE review_id =${id}`, (err, kq) => {
        if (err) console.log(err)
        else result({ message: "Xóa thành công id: " + id })
    })
}
module.exports = Review;