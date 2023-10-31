var express = require('express');
var app = express();
require('./routers/test.router')(app);
app.listen(3000, function () {
    console.log('Server running at port 3000');
});  