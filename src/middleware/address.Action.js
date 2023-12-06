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
const deleteAllAddress = function (id) {
    db.query(`DELETE FROM address WHERE id_account=${id}`, (err) => {
        if (err) return next(err);
    });
}

module.exports = { setAddress, deleteAllAddress };