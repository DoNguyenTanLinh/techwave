const Category = require("../models/entity/category.entity");

class CategoryController {
    getAll_category = (req, res) => {
        try {
            Category.getAll((data) => {
                res.status(200).json({ data });
            })
        } catch (e) {
            res.status(500).json({ message: "Error getting all categories", error: e });
        }
    }
    create_category = async function (req, res) {
        try {
            req.body.createBy = req.user.id;
            await Category.findByName(req.body.name)
                .then(() => {
                    Category.create(req.body, (data) => {
                        res.status(200).json({ message: "Create Category Successful", data })
                    })
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
            req.body.modifiedBy = req.user.id;
            await Category.findByName(req.body.name)
                .then(() => {
                    Category.edit(req.params.id, req.body, (data) => {
                        res.status(200).json({ message: "Update Category Successful", data })
                    })
                })
                .catch((err) => {
                    res.status(401).json({ message: err });
                });

        } catch (err) {
            res.status(500).json({ message: "Error Server ", err });
        }
    }
    delete_category = function (req, res) {
        try {
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