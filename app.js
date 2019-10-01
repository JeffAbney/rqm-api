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

//Get all quotes from DB in random order
app.get('/', function (req, res) {
	var q = 'SELECT * FROM quotes ORDER BY RAND();'
	connection.query(q, function (error, results) {
		if (error) throw error;
		res.send(results);
	});
});
// Post new share 
app.get('/addShare/:id', function (req, res) {
	const id = req.query.id;
	console.log('heres id ', id)
	var q = `INSERT INTO shares (platform, quote_id) VALUES ("twitter", ${id});`
	connection.query(q, function (error, results) {
		if (error) throw error;
		console.log('add share results', results)
		res.send(results);
	});
})

app.get('/shares', function (req, res) {
	var q = `SELECT quote_id, platform, count(*) as count FROM shares GROUP BY quote_id,shares.platform`
	connection.query(q, function (error, results) {
		if (error) throw error;
		res.send(results);
	})
})


app.listen(process.env.PORT || '3000', function () {
	console.log('App is listening on port 3000!');
});