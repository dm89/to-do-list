var MongoClient = require('mongodb').MongoClient;

module.exports = {
	connection: null,

	get: function() {
		return null;
	},

	close: function() {
		if(this.connection)
			return this.connection;
	}
}