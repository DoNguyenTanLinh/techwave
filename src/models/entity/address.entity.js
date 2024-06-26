const db = require('../../connection/connect');
const Address = function (address) {
    this.add_id = address.add_id;
    this.province = address.province;
    this.district = address.district;
    this.ward = address.ward;
    this.address = address.address;
    this.id_account = address.id_account;
    this.status = address.status;
}
Address.getAddress = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM address where id_account=${id} and status='1'`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
};
Address.getAllAddress = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM address where id_account=${id}`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result);
                } else {
                    resolve(null);
                }
            }
        });
    });
};
Address.update = function (id, data) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE address SET ? Where id_account=${id}`, data, function (err) {
            if (err) throw reject(err);
            else resolve({ id: id, ...data });
        });
    })
}
Address.delete = function (id, id_user, result) {
    db.query(`DELETE from address Where add_id=${id} and id_account=${id_user}`, function (err) {
        if (err) throw result(err);
        else result("Xóa địa chỉ thành công");
    });
}
Address.resetStatus = function (id_user) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE address SET status='0' Where id_account=${id_user}`, function (err) {
            if (err) throw reject(err);
            else resolve("Done");
        });
    })
}
Address.setDefault = async function (id, id_user, result) {
    await Address.resetStatus(id_user)
        .then((data) => console.log(data))
        .catch(err => { throw result(err) });
    db.query(`UPDATE address SET status='1' Where add_id=${id} and id_account=${id_user}`, function (err) {
        if (err) throw result(err);
        else result("Đã đặt thành địa chỉ mặc định");
    });
}
Address.create = function (data) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO address SET ?`, data, function (err, result) {
            if (err) reject(err)
            else resolve({ id: result.insertId, ...data })
        });
    })

}
module.exports = Address;