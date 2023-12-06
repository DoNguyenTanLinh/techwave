const { deleteAllAddress } = require('./address.Action')
const { deleteAllProductByAccount } = require('../middleware/product.Action')
const { deleteReportByAccount } = require('./report.Action')
const { deleteReviewByAccount } = require('./review.Action')
const { deleteResponseByAccount } = require('./response.Action')
const { deleteCartByAccount } = require('./cart.Action')
const deleteAccountMiddleware = (req, res, next) => {
    deleteAllAddress(req.params.id)
    deleteAllProductByAccount(req.params.id)
    deleteReportByAccount(req.params.id)
    deleteResponseByAccount(req.params.id)
    deleteReviewByAccount(req.params.id)
    deleteCartByAccount(req.params.id)
    next()
}
module.exports = { deleteAccountMiddleware }