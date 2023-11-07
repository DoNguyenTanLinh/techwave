const accountRouter = require('./account.router');
const userRouter = require('./user.router');
const staffRouter = require('./staff.router');
const adminRouter = require('./admin.router');
const addressRouter = require('./address.router');
const homeRouter = require('./home.router');
const apiController = require('../controller/api.controller');
var { checkUserJWT, checkUserPermission, checkUserAction } = require('../middleware/JWTAction');


function router(app) {
    app.all('*', checkUserJWT, checkUserPermission, checkUserAction);
    app.post('/login', apiController.handleLogin);
    app.post('/logout', apiController.handleLogout);
    app.post('/register', apiController.handleRegister);
    app.post('/registerStaff', apiController.handleRegisterStaff);
    app.put('/forgotPassword', apiController.handleForgotPassword);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
    app.use('/user', userRouter);
    app.use('/', checkUserJWT, (req, res, next) => {
        if (!req.user) {
            req.user = {};
            req.user.id = null;
        }; next()
    }, homeRouter);
}
module.exports = router;