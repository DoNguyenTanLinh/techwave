var mysql = require('mysql2');
const util = require('util');
var connection = mysql.createConnection(
    {
        // host: "sql10.freesqldatabase.com",
        // user: "sql10670611",
        // password: "wRlttwNYDt",
        // database: 'sql10670611',
        // port: 3306
        host: "localhost",
        user: "root",
        password: "linhtando20",
        database: 'techwave'
        // port: 3306
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