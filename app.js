var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;

var app = express();

//View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password123'));
var session = driver.session();
/*
app.get('/', function(req, res){
	session
	.run('MATCH(n:Movie) RETURN n LIMIT 25')
	.then(function(result){
		var movieArr = [];
		result.records.forEach(function(record){
			movieArr.push({
				id: record._fields[0].identity.low,
				title: record._fields[0].properties.title,
				year: record._fields[0].properties.year
			});
		});

		session
		.run('MATCH(n:Person) RETURN n LIMIT 25')
		.then(function(result2){
			var actorArr = [];
			result2.records.forEach(function(record){
				actorArr.push({
				id: record._fields[0].identity.low,
				name: record._fields[0].properties.name
				});
			});
			res.render('index', {
				movies: movieArr,
				actors: actorArr
			});
		})
		.catch(function(err){
		console.log(err);
		});
	})
	.catch(function(err){
		console.log(err);
	});

});
*/
app.get('/', function(req, res){
	session
	.run('MATCH(n:Node) RETURN n LIMIT 25')
	.then(function(result){
		var movieArr = [];
		result.records.forEach(function(record){
			movieArr.push({
				id: record._fields[0].identity.low,
				CircuitID: record._fields[0].properties.CircuitID,
			
			});
		});

		session
		.run('MATCH(n:Node) RETURN n LIMIT 25')
		.then(function(result2){
			var actorArr = [];
			result2.records.forEach(function(record){
				actorArr.push({
				id: record._fields[0].identity.low,
				PortId: record._fields[0].properties.PortId
			

				});
			});
			res.render('index', {
				movies: movieArr,
				actors: actorArr
			});
		})
		.catch(function(err){
		console.log(err);
		
	/*})
	.catch(function(err){
		console.log(err);
	});*/
/*
app.post('/movie/add',function(req, res){
	var name = req.body.port_start
	var end = req.body.port_end

	session
	.run('CREATE(n:Movie {title:{titleParam},year:{yearParam}}) RETURN n.title', );
		.then(function(result){
			res.redirect('/');

			session.close();
		})


	res.redirect('/');
})
*/
});

app.listen(3000);
console.log('Server Started on port 3000');

module.exports = app;
	})});