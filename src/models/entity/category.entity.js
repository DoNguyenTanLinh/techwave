const db = require('../../connection/connect');
const date = require('date-and-time')
const { convert } = require('url-slug')
const categoryMapper = require('../mapper/category.mapper')
const Category = function (category) {
    this.category_id = category.category_id;
    this.name = category.name;
    this.slug = category.slug;
    this.createAt = category.createAt;
    this.createBy = category.createBy;
}
Category.getAll = function (res) {
    db.query("SELECT * FROM category", function (err, data) {
        if (err) { console.log(err); res(err) }
        else res(data)
    })
}
Category.findOne = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM category Where category_id=${id}`, function (err, data) {
            if (err) { console.log(err); reject(err) }
            else resolve(data[0])
        })
    })
}
Category.findByName = function (name) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM category Where name='${name}'`, function (err, data) {
            if (err || data.length > 0) { reject("Trùng tên danh mục") }
            else resolve()
        })
    })
}
Category.create = function (data, result) {
    const now = new Date();
    data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    data.slug = convert(data.name, {
        transformer: (fragments) => fragments.join('-')
    })
    db.query(`INSERT INTO category SET ?`, data, (er, kq) => {
        if (er) { console.log(er); result(er) }
        else result({ id: kq.insertId, ...data });
    })
}
Category.edit = async function (id, data, result) {
    const now = new Date();
    data.modifiedAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    data.slug = convert(data.name, {
        transformer: (fragments) => fragments.join('-')
    })
    let oldCate = null;
    await Category.findOne(id)
        .then((result) => oldCate = result)
        .catch(err => { result(err) });
    let newdata = categoryMapper.toEntity(data, oldCate)
    db.query(`UPDATE category SET ? WHERE category_id=${id}`, newdata, (err, kq) => {
        if (err) { console.log(err); result(err) }
        else result({ id, ...newdata });
    })
}
Category.delete = (id, result) => {
    try {
        db.query(`DELETE FROM category WHERE category_id=${id}`, (err) => {
            if (err) { console.log(err); result(err) }
            else result("Xoá thành công id: " + id)
        })
    } catch (err) {
        console.log(err);
        result("Eror deleting category");
    }
}

module.exports = Category;