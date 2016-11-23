var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var urlExists = require('url-exists');
var mongoose = require('mongoose');
var ShortUrl = require('./models/shortUrl');
var seedDb = require('./seeds');
var dbURL = process.env.dbURL || 'mongodb://localhost/shorturls';
var appURL = process.env.appURL || 'http://localhost:3000/';


mongoose.connect(dbURL);


// initial seed for the db
//seedDb();

// idCounter is used in order to create the shortened url
var idCounter = '';
var validUrl = '';

// checking if db is empty in order to properly assign a value to idCounter
ShortUrl.count(function (err, count) {
	if (err) {
		throw err;
	} else if (count === 0) {
        console.log('count is zero!');
        idCounter = '1000';       
    } else {
    	console.log('count is:', count);
    	// checking in the db to find the last (max) id so that we may
		// assign to idCounter from there on to our next valid destination entries
		ShortUrl
		  .findOne({ })
		  .sort('-id')  // give me the max
		  .exec(function (err, foundShortUrl) {
		    console.log('max id is', foundShortUrl.id);
		    idCounter =  foundShortUrl.id;
		    console.log('current idCounter is', idCounter);
		  });	
    }
});


app.use(express.static('public'));


// the /new/SOMEURL route adds a new shortUrl to the db
// if SOMEURL is a valid url 
app.get('/new/*', function (req, res){
	// using the asterisk so that the whole of the entered url
	// including slashes will be referred to as req.params[0]
	console.log('The req.params are:', req.params);
	console.log('req.params[0] is:', req.params[0]);	
	testUrl = req.params[0];
	// using the 'url-exists' library for url validation
	urlExists(testUrl, function(err, exists) {
		if (err) throw err;
		console.log('exists is', exists );
		if (exists) {			
			idCounter = (parseInt(idCounter) + 1).toString();
			console.log('idCounter is now:', idCounter);	
			newShortUrl = { id: idCounter, destination: testUrl };
			console.log('newShortUrl is:', newShortUrl);
			ShortUrl.create(newShortUrl);			
			res.json({ original_url: testUrl, short_url: appURL + idCounter });	
		}
		else {
			res.send({error: 'Invalid url.'});
		}
	});
});


// redirecting the shortUrls to the appropriate destination per db entry
app.get('/:id', function (req, res) {	

	console.log ('req.params.id is ' + req.params.id);
	console.log ('typeof req.params.id is ' + typeof(req.params.id) );
	ShortUrl.findOne({id: parseInt(req.params.id)}, function(err, foundShortUrl) {
		if (err) {
			throw err;		
		} else if (foundShortUrl) {
			console.log('found shortUrl:',foundShortUrl);			
			res.redirect(foundShortUrl.destination);		
		} else {
			res.status(404).send("Not found.");	
		}		 		
	});		

});



app.listen(PORT, process.env.IP, function(){
    console.log('Server started on port', PORT);
});
