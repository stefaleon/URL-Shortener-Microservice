var mongoose = require('mongoose');

var shortUrlSchema = new mongoose.Schema({
	id: String,
	destination: String
});

var ShortUrl = mongoose.model('shortUrl', shortUrlSchema);

module.exports = ShortUrl;