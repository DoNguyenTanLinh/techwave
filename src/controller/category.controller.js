const Category = require("../models/entity/category.entity");
const CategoryResponse = require('../models/response/category.response')
const setCateProduct = require('../middleware/category.Action')
class CategoryController {
    getAll_category = (req, res) => {
        try {
            Category.getAll((data) => {
                res.status(200).json(data);
            })
        } catch (e) {
            res.status(500).json({ message: "Error getting all categories", error: e });
        }
    }
    getDetail_category = async (req, res) => {
        const oldCate = await Category.findOne(req.params.id);
        const category = new CategoryResponse(oldCate, CategoryResponse)
        await category.initCateChild();
        res.status(200).json(category);
    }
    create_category = async function (req, res) {
        try {
            req.body.createBy = req.user.id;
            await Category.findByName(req.body.name)
                .then(async () => {
                    const newCategory = await Category.create(req.body);
                    if (newCategory) {
                        res.status(200).json({ message: "Create Category Successful", data: newCategory })
                    }

                })
                .catch((err) => {

                    res.status(401).json({ message: err });
                });


        } catch (err) {
            console.log(err); res.status(500).json({ message: "Error creating category", error: err })
        }
    }
    update_category = async function (req, res) {
        try {
            await Category.findByName(req.body.name)
                .then(() => {
                    console.log(req.body)
                    Category.edit(req.params.id, req.body, (data) => {
                        res.status(200).json({ message: "Update Category Successful", data })
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(401).json(err);
                });

        } catch (err) {
            res.status(500).json({ message: "Error Server ", err });
        }
    }
    delete_category = function (req, res) {
        try {
            setCateProduct(req.params.id);
            Category.delete(req.params.id, (data) => {
                res.status(200).json({ message: data })
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error Server ", err });
        }
    }
}
module.exports = new CategoryController;