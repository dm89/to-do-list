var express = require('express');
var router = express.Router();
var task = require('../models/task');

router.get('/', function(req, res, next) {
	var callback = function(err, data) {
		res.send(data);
	}
	task.all(callback);
});

module.exports = router;