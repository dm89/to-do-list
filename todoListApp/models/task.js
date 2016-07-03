var db = require('../db');

var collectionName = 'tasklist';

module.exports = {
	all: function(callback) {
		db.get().collection(collectionName).find().toArray(callback);
	}
};