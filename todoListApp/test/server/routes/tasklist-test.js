var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var task = require('../../../models/task');

describe('tasklist routes test', function() {
	var sandbox;
	var router;
	var tasklist;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();

		router = {
			get: sinon.spy(),
			post: sinon.spy()
		};

		sandbox.stub(express, 'Router')
			   .returns(router);

		delete require.cache[require.resolve('../../../routes/tasklist')];
		tasklist = require('../../../routes/tasklist')
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('tasklist registers / with get on the router', function() {
		expect(router.get.calledWith('/', sinon.match.any)).to.be.true;
	});

	it('the handler for get / sends all the tasks to response', function() {
		var allTasks = [
			{title: 'Test', description: 'This is a test task', category: 'general', completed: 'n'}
		];

		var res = {
			send: function(data) {
				expect(data).to.be.eql(allTasks);
			}
		};

		task.all = function(callback) {
			callback(null, allTasks);
		}

		var theHandler = router.get.firstCall.args[1];
		var req = {};
		theHandler(req, res);
	});

	it('tasklist registers / with post on the router', function() {
		expect(router.post.calledWith('/', sinon.match.any)).to.be.true;
	});

	it('the handler for post / sends a success response for a valid insert', function() {
		var newTask = {title: 'Test', description: 'This is a test task', 
						category: 'general', completed: 'n'};

		var res = {
			send: function(msg) {
				expect(msg).to.be.eql('added task');
			}
		};

		task.add = function(newObj, callback) {
			callback(null, 'added task');
		}
		
		var theHandler = router.post.firstCall.args[1];
		var req = newTask;
		theHandler(req, res);
	});

});