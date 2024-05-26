const AdminResponse = require("../models/response/admin.response");

class HomeController {
    getAdminHome = async (req, res) => {
        const admin = new AdminResponse();
        await admin.initTotal();
        await admin.initStatics();
        res.json(admin);
    }
}
module.exports = new HomeController;