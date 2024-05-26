const Admin = require("../entity/admin.entity");
const date = require('date-and-time');

const AdminResponse = function (data) {
    this.totalUsers = null;
    this.totalVendors = null;
    this.totalCates = null;
    this.totalComments = null;
    this.totalReports = null;
    this.totalDiscounts = null;
    this.registerStatitics = null;
    this.initTotal = async function () {
        try {
            this.totalUsers = await Admin.getTotalUsers();
            this.totalVendors = await Admin.getTotalVendor();
            this.totalCates = await Admin.getTotalCates();
            this.totalComments = await Admin.getTotalComments();
            this.totalReports = await Admin.getTotalReports();
            this.totalDiscounts = await Admin.getTotalDiscounts();
        } catch (e) {
            console.error(e);
        }
    }
    this.initStatics = async function () {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1; // months are 0-based, so we add 1
            const lastDay = date.format(new Date(year, month, 0), 'DD')
            const ouput = []
            const ouput1 = []
            for (let i = 1; i <= 12; i++) {
                const userYear = await Admin.getRegisterUserByYear(i, year)
                const vendorYear = await Admin.getRegisterVendorByYear(i, year)
                ouput.push(userYear)
                ouput1.push(vendorYear)
            }

            const ouput2 = []
            const ouput3 = []
            for (let i = 1; i <= lastDay; i++) {
                const userMonth = await Admin.getRegisterUserByMonth(i, year)
                const vendorMonth = await Admin.getRegisterVendorByMonth(i, year)
                ouput2.push(userMonth)
                ouput3.push(vendorMonth)
            }
            this.registerStatitics = {
                year: {
                    user: ouput,
                    vendor: ouput1
                },
                month: {
                    user: ouput2,
                    vendor: ouput3
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}


module.exports = AdminResponse;