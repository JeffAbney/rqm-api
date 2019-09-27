var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

const app = express();
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
	host: 'remotemysql.com',
	user: 'ZogkJE9gUn',
	database: 'ZogkJE9gUn',
	password: 'yYG9bt9yJU',
});


app.get('/', function (req, res) {

	//var q = 'INSERT INTO quotes (author, content) VALUES ?;';
	var q = 'SELECT * from quotes;'
	connection.query(q, function(error, results) {
		if (error) throw error;
		res.send(results);
	});
});


app.listen(process.env.PORT || '3000', function () {
	console.log('App is listening on port 3000!');
});