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
    app.get('/login', apiController.handleLogin);
    app.get('/logout', apiController.handleLogout);
    app.post('/register', apiController.handleRegister);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
    app.use('/user', userRouter);
    app.use('/', homeRouter);
}
module.exports = router;