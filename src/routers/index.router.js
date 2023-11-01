const accountRouter = require('./acount.router');

const { handleLogin } = require('../controller/login_controller');

const checkLogin = (req, res, next) => {
    const nonSecure = ['/login'];
    if (nonSecure.includes(req.path)) return next();


    next();
}

function router(app) {
    app.use('/account', accountRouter);
    app.get('/login', function (req, res) {
        handleLogin(req, res);
    });
}
module.exports = router;