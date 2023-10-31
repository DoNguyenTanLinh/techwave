var mysql = require('mysql2');
var connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "linhtando20",
        database: 'techwave'
    }
);
connection.connect((error) => {
    if (error) {
        console.error('Lỗi kết nối:', error);
    } else {
        console.log('Kết nối thành công!');
        // Điều gì đó ở đây...
    }
});


module.exports = connection;