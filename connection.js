require('dotenv').config()
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection(process.env.JAWSDB_URL || {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

connection.connect((err) => {
    if (err) throw err;
});


module.exports = connection;

