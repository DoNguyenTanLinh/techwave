var mysql = require('mysql2');
require('dotenv').config();
const util = require('util');
var connection = mysql.createConnection(
    {
        host: "techwave-linhltv9a2-d660.d.aivencloud.com",
        user: "avnadmin",
        password: "AVNS_SQLD89AF0idjjh-QBhO",
        database: 'techwave',
        port: 22006,
        connectTimeout: 30000
        // host: process.env.HostDB,
        // user: process.env.UserDB,
        // password: process.env.PassDB,
        // database: process.env.DBName,
        // port: process.env.PORT_DB
    }
);
connection.connect((error) => {
    if (error) {
        console.error('Lỗi kết nối:', error);
    } else {
        console.log('Kết nối thành công!');
    }
});
connection.query = util.promisify(connection.query);
// connection.query(
//     'SELECT * FROM account',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );

module.exports = connection;