const db = require('../../connection/connect');
const Admin = function () {
    this.totalUsers = null;
    this.totalVendors = null;
    this.totalCates = null;
    this.totalComments = null;
    this.totalReports = null;
    this.totalDiscounts = null;
    this.registerStatitics = null;
}
Admin.getTotalUsers = async function () {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) as data FROM account where id_permission=3", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}
Admin.getTotalVendor = async function () {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) as data FROM account where id_permission=2", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}
Admin.getTotalCates = async function () {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) as data FROM category", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}
Admin.getTotalComments = async function () {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) as data FROM review", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}
Admin.getTotalReports = async function () {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) as data FROM report", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}
Admin.getTotalDiscounts = async function () {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) as data FROM discount", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}
Admin.getRegisterUserByYear = async function (month, year) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT count(*) as data FROM account 
        where id_permission=3 and Month(createAt)=${month} and Year(createAt)=${year}`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}

Admin.getRegisterUserByYear = async function (month, year) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT count(*) as data FROM account 
        where id_permission=3 and Month(createAt)=${month} and Year(createAt)=${year}`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}

Admin.getRegisterVendorByYear = async function (month, year) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT count(*) as data FROM account 
        where id_permission=2 and Month(createAt)=${month} and Year(createAt)=${year}`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}

Admin.getRegisterUserByMonth = async function (day, year) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT count(*) as data FROM account 
        where id_permission=3 and Day(createAt)=${day} and Year(createAt)=${year}`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}

Admin.getRegisterVendorByMonth = async function (day, year) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT count(*) as data FROM account 
        where id_permission=2 and Day(createAt)=${day} and Year(createAt)=${year}`, (err, result) => {
            if (err) reject(err);
            else resolve(result[0].data);
        })
    })
}
module.exports = Admin;