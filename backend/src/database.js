const mysql = require('mysql');
const config = require('config');

const mysqlConnection = mysql.createConnection({
	host: config.get('db.host'),
	user: config.get('db.user'),
	password: config.get('db.password'),
	database: config.get('db.name')
});


mysqlConnection.connect(function(err){
	if (err) {
		console.log(err);
		return;
	}else{
		console.log('DB is connected');
	}
});

module.exports = mysqlConnection;