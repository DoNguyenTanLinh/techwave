const db = require('../connection/connect');
const setAddress = function (req) {
    const newAddress = {
        diachi: req.body.address,
        status: '1',
        id_account: req.id
    }
    db.query(`INSERT INTO address SET ?`, newAddress, (err) => {
        if (err) throw err
        else return true
    });
}
const deleteAllAddress = function (req, res, next) {
    db.query(`DELETE FROM address WHERE id_account=${req.params.id}`, (err) => {
        if (err) return next(err);
        else return next();
    });
}

module.exports = { setAddress, deleteAllAddress };