var db = require('../db');

var collectionName = 'tasklist';

module.exports = {
	all: function(callback) {
		db.get().collection(collectionName).find().toArray(callback);
	},

	add: function(newTask, callback) {
		var inserted = function(err) {
			if(!err)
				callback('task added');
		}

		if(!newTask)
			callback('unable to add task');
		else
			db.get().collection(collectionName).insertOne(newTask, inserted);
	}
};