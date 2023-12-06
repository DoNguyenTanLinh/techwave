const Permission = require("../models/entity/permission.entity");

class PermissionController {
    getAll_permissions = function (req, res) {
        try {
            Permission.getAll((data) => {
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(404).json({ message: "Error getting permission", error })
        }
    }
    edit_permission = async function (req, res) {
        try {
            // console.log(req.body);
            await Permission.edit(req.body)
                .then((data) => {
                    res.status(200).json({ message: "Update Permission Successful", data })
                })
                .catch(error => {
                    console.log(error);
                    res.status(401).json({ message: "Error database Permission", error })
                })
        } catch (error) {
            res.status(500).json({ message: "Error Updating Permission", error })
        }
    };
}

module.exports = new PermissionController;