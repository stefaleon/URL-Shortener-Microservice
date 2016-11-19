var mongoose = require('mongoose');
var ShortUrl = require('./models/shortUrl');



var data = [
	{
		id: '1000', 
		destination: 'https://nodejs.org/en/'
	},
	{
		id: '1001', 
		destination: 'http://expressjs.com/'
	},
	{
		id: '1002', 
		destination: 'http://mongoosejs.com/'
	},
	{
		id: '1003', 
		destination: 'http://mashable.com/category/cats/'
	}

];


function seedDb(){
	// remove all
	ShortUrl.remove({}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('shortUrls removed!')
			// add data
			data.forEach(function (shortUrl) {
				ShortUrl.create(shortUrl, function(err, addedShortUrl){
					if (err) { 
						console.log(err);
					} else {
						console.log(addedShortUrl.destination, "added");						
					}
				});	
			});
		}
	});
	

}

module.exports = seedDb;