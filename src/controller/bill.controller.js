const { await } = require("await");
const Bill = require("../models/entity/bill.entity");
const BillResponse = require('../models/response/bill.response');

class BillController {
    getforVender_bill = (req, res) => {

        if (!req.query.status) req.query.status = '%';
        if (req.query.page) {
            Bill.getBillOfVender(req.user.id, (data) => {
                if (data) {
                    const bills = data.map(async (billData) => {
                        const bill = new BillResponse(billData);
                        await bill.initPaymentId();
                        await bill.init();
                        return bill;
                    })
                    Promise.all(bills)
                        .then((billResult) => {
                            const page = parseInt(req.query.page);
                            const limit = parseInt(req.query.limit);
                            // calculating the starting and ending index
                            const startIndex = (page - 1) * limit;
                            const endIndex = page * limit;
                            const results = {};
                            results.total = Math.ceil(data.length / limit)
                            if (endIndex < billResult.length) {
                                results.next = {
                                    page: page + 1,
                                    limit: limit
                                };
                            }
                            if (startIndex > 0) {
                                results.previous = {
                                    page: page - 1,
                                    limit: limit
                                };
                            }
                            results.results = billResult.slice(startIndex, endIndex);
                            res.status(200).json(results);
                        })
                        .catch((error) => console.log(error))
                } else {
                    res.json(data);
                }
            })
        }
        else {
            Bill.getBillOfVender(req.user.id, (data) => {
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
        if (!req.query.status) req.query.status = '%';
        Bill.getBillOfUser(req.user.id, req.query.status, (data) => {
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
        Bill.getBillReceivedOfUser(req.user.id, req.query.status, (data) => {
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