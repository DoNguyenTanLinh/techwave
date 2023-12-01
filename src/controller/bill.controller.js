const { await } = require("await");
const Bill = require("../models/entity/bill.entity");
const BillResponse = require('../models/response/bill.response');

class BillController {
    getforVender_bill = (req, res) => {
        Bill.getBillOfVender(req.user.id, req.params.status, (data) => {
            if (data) {
                const bills = data.map(async (billData) => {
                    const bill = new BillResponse(billData);
                    await bill.initPaymentId();
                    await bill.init();
                    return bill;
                })
                Promise.all(bills)
                    .then((billResult) => res.json(billResult))
                    .catch((error) => console.log(error))
            } else {
                res.json(data);
            }
        })
    }
    getOne_bill = (req, res) => {
        Bill.getOne(req.params.id, async (data) => {
            const bill = new BillResponse(data);
            await bill.initPaymentId();
            await bill.init();
            res.json(bill)
        })
    }
    getforUser_bill = (req, res) => {
        Bill.getBillOfUser(req.user.id, (data) => {
            if (data) {
                const bills = data.map(async (billData) => {
                    const bill = new BillResponse(billData);
                    await bill.init();
                    await bill.initPaymentId();
                    return bill;
                })
                Promise.all(bills)
                    .then((billResult) => res.json(billResult))
                    .catch((error) => console.log(error))
            } else {
                res.json(data);
            }
        })
    }
    getReceivedforUser_bill = (req, res) => {
        Bill.getBillReceivedOfUser(req.user.id, (data) => {
            if (data) {
                const bills = data.map(async (billData) => {
                    const bill = new BillResponse(billData);
                    await bill.init();
                    await bill.initPaymentId();
                    return bill;
                })
                Promise.all(bills)
                    .then((billResult) => res.json(billResult))
                    .catch((error) => console.log(error))
            } else {
                res.json(data);
            }
        })
    }
    setApproval = (req, res) => {
        Bill.approve(req.params.id, (kq) => {
            res.json(kq)
        })
    }
    setReject = (req, res) => {
        Bill.reject(req.params.id, (data) => {
            res.json(data)
        })
    }
    setReceived = (req, res) => {
        Bill.setReceived(req.params.id, req.user.id, (data) => {
            res.json(data);
        })
    }
    setCancel = (req, res) => {
        Bill.setCancel(req.params.id, req.user.id, (data) => {
            res.json(data);
        })
    }
    delete_bill = (req, res) => {
        Bill.delete(req.params.id, (data) => {
            res.json(data)
        })
    }
}

module.exports = new BillController;