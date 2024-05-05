const userRouter = require('./user.router');
const vendorRouter = require('./vendor.router');
const adminRouter = require('./admin.router');
const homeRouter = require('./home.router');
const apiController = require('../controller/api.controller');
var { checkUserJWT, checkUserPermission, checkUserAction } = require('../middleware/JWTAction');


function router(app) {
    app.all('*', checkUserJWT, checkUserPermission, checkUserAction);
    app.post('/api/login', apiController.handleLogin);
    app.post('/api/logout', apiController.handleLogout);
    app.post('/api/register', apiController.handleRegister);
    app.post('/api/registerStaff', apiController.handleRegisterStaff);
    app.post('/api/forgotPassword', apiController.handleForgotPassword);
    app.use('/api/admin', adminRouter);
    app.use('/api/vendor', vendorRouter);
    app.use('/api/user', userRouter);
    app.use('/api', (req, res, next) => {
        if (!req.user) {
            req.user = {};
            req.user.id = null;
        }; next()
    }, homeRouter);
}
module.exports = router;