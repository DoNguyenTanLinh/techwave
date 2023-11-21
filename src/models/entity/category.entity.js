const db = require('../../connection/connect');
const date = require('date-and-time')
const { convert } = require('url-slug')

const Category = function (category) {
    this.category_id = category.category_id;
    this.name = category.name;
    this.slug = category.slug;
    this.image = category.image;
    this.category_parent_id = category.category_parent_id;
    this.createAt = category.createAt;
    this.createBy = category.createBy;
}

Category.getChild = function (id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM category WHERE category_parent_id=${id}`, (err, data) => {
            if (err) { console.log(err); reject(err); }
            else {
                if (data.length == 0) resolve(null)
                else resolve(data)
            }
        })
    })
}

Category.getIdCateStore = (id, result) => {
    db.query(`select c.category_id,c.name,c.slug from category as c
    inner join product as p on c.category_id=p.category_id
    WHERE p.createBy=${id}
    group by category_id`, (err, data) => {
        if (err) { console.log(err); }
        else result(data)
    })
}
Category.getAll = function (result) {
    db.query("SELECT * FROM category WHERE category_parent_id is null", function (err, data) {
        if (err) { console.log(err); result(err) }
        else result(data)
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
            if (err) reject(err)
            else if (data.length > 0) { resolve({ message: "Trùng tên danh mục", id: data[0].category_id }) }
            else resolve(null)
        })
    })
}
Category.create = function (data) {
    return new Promise((resolve, reject) => {
        const now = new Date();
        data.createAt = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        data.slug = convert(data.name, {
            transformer: (fragments) => fragments.join('-')
        })
        db.query(`INSERT INTO category SET ?`, data, (er, kq) => {
            if (er) { console.log(er); reject(er) }
            else resolve({ id: kq.insertId, ...data });
        })
    })
}

Category.edit = async function (id, data, result) {
    let oldCate = null;
    await Category.findOne(id)
        .then((category) => oldCate = category)
        .catch(err => { result(err) });
    oldCate.name = data.name;
    oldCate.slug = convert(data.name, {
        transformer: (fragments) => fragments.join('-')
    })
    oldCate.image = data.img;
    db.query(`UPDATE category SET ? WHERE category_id=${id}`, oldCate, (err, kq) => {
        if (err) { console.log(err); result(err) }
        else result({ id, ...oldCate });
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