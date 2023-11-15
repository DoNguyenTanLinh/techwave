const Folow = require("./folow.entity");
const Product = require("./product.entity");
const Review = require("./review.entity");
const moment = require('moment');
const db = require('../../connection/connect');
const Account = require("./account.enitty");
const Store = function (user_id) {
    this.info = null;
    this.review = null;
    this.product = null;
    this.responseRate = null;
    this.responseTime = "Trong vài giờ";
    this.join = null;
    this.followers = null;
    this.initInfo = async () => {
        try {
            let account = await Account.getById(user_id);
            this.info = {
                account_id: account.account_id,
                username: account.username,
                picture: account.avatar
            }
        } catch (e) {
            console.log(e)
        }
    }
    this.initRiew = async () => {
        try {
            this.review = await Review.getSlByStore(user_id);
        } catch (e) {
            console.log(e);
        }
    }
    this.initProduct = async () => {
        try {
            this.product = await Product.getQuantity(user_id)
        } catch (err) {
            console.log(err);
        }
    }
    this.initResponseRate = async () => {
        try {
            this.responseRate = await Store.getResponseRate(user_id)
        } catch (err) {
            console.log(err);
        }
    }
    this.initJoin = async () => {
        try {
            this.join = await Store.getJoin(user_id)
        } catch (e) {
            console.log(e);
        }
    }
    this.initFolower = async () => {
        try {
            this.followers = await Folow.getFolowStore(user_id)
        } catch (err) {
            console.log(err);
        }
    }
}
Store.getResponseRate = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT SUM(CASE WHEN r.status = 1 THEN 1 ELSE 0 END) / COUNT(*) AS result
        FROM review AS r INNER JOIN product AS p ON r.product_id = p.product_id
        WHERE p.createBy=${id}`, (err, data) => {
            if (err) reject(err);
            else resolve(data[0].result)
        })
    })
}
Store.getJoin = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM account WHERE account_id=${id}`, (err, data) => {
            if (err) reject(err)
            else {
                const currentDate = moment();
                const createdAt = data[0].createAt;
                const duration = moment.duration(currentDate.diff(createdAt));
                const days = duration.days();
                const months = duration.months();
                const years = duration.years();
                let result;
                if (years > 0) {
                    result = `${years} năm trước`;
                } else if (months > 0) {
                    result = `${months} tháng trước`;
                } else {
                    result = `${days} ngày trước`;
                }
                resolve(result)
            }
        })
    })
}
module.exports = Store;