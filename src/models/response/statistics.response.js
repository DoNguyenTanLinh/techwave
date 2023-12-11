const Store = require("../entity/store.entity");
const StatisticResponse = function (id) {
    this.revenue = null;
    this.countCustomer = null;
    this.inventories = null;
    this.ordersStatistic = null;
    this.initRevenue = async function () {
        try {
            const revenues = await Store.getRevenue(id);
            this.revenue = (revenues * 0.0000412712).toFixed(2)
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
    this.initOrderStatistic = async function () {
        try {
            const now = new Date();
            const year = now.getFullYear();
            let listLabel = ["Đơn hàng thành công", "Đơn hàng thất bại", "Đơn hàng bị hủy"];
            const ouput = []
            for (const label of listLabel) {
                const result = {
                    label
                };
                const index = []
                let data = {
                    year
                }
                if (label == 'Đơn hàng thành công') {
                    data.status = 2;
                } else if (label == 'Đơn hàng thất bại') {
                    data.status = 3;
                } else {
                    data.status = 4;
                }
                for (let i = 1; i <= 12; i++) {
                    data.month = i
                    const countOrder = await Store.getCountOrders(id, data)
                    index.push(countOrder)
                }
                result.data = index
                ouput.push(result)
            }
            this.ordersStatistic = ouput

        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = StatisticResponse