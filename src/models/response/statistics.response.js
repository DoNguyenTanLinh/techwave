const date = require('date-and-time');
const Store = require("../entity/store.entity");
const StatisticResponse = function (id) {
    this.revenue = null;
    this.countCustomer = null;
    this.inventories = null;
    this.saleStatitics = null;
    this.ordersStatistic = null;
    this.initRevenue = async function () {
        try {
            this.revenue = await Store.getRevenue(id);
            // this.revenue = (revenues * 0.0000412712).toFixed(2)
        } catch (e) {
            console.error(e)
        }
    }
    this.initCustomer = async function () {
        try {
            this.countCustomer = await Store.getCustomer(id);
        } catch (e) {
            console.error(e)
        }
    }
    this.initInventory = async function () {
        try {
            this.inventories = await Store.getInventory(id);
        } catch (e) {
            console.error(e)
        }
    }
    this.initSaleStatitics = async function () {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1; // months are 0-based, so we add 1
            const lastDay = date.format(new Date(year, month, 0), 'DD')
            const ouput = []
            for (let i = 1; i <= 12; i++) {
                const statistic = await Store.getStatiticsByYear(id, i, year)
                ouput.push(statistic)
            }

            const ouput2 = []
            for (let i = 1; i <= lastDay; i++) {
                const statistic = await Store.getStatiticsByMonth(id, i, year)
                ouput2.push(statistic)
            }
            this.saleStatitics = {
                year: ouput,
                month: ouput2
            }
        } catch (e) {
            console.error(e)
        }
    }
    this.initOrderStatistic = async function () {
        try {

            const ouput = []
            for (let i = 0; i <= 4; i++) {
                const countOrder = await Store.getCountOrders(id, i)
                ouput.push(countOrder)
            }
            this.ordersStatistic = ouput
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = StatisticResponse