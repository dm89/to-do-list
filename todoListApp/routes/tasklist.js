var express = require('express');
var router = express.Router();
var task = require('../models/task');

router.get('/', function(req, res, next) {
	var callback = function(err, data) {
		res.send(data);
	}
	task.all(callback);
});

router.post('/', function(req, res, next) {
	var newTask = req.body;

	var callback = function(err) {
		if(err)
			res.send('unable to add task');
		else
			res.send('added task');
	}

	task.add(newTask, callback);
});

module.exports = router;