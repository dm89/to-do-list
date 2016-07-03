var expect = require('chai').expect;
var db = require('../../../db');
var task = require('../../../models/task');

describe('task tests', function() {
	var tasklist;

	before(function(done) {
		db.connect('mongodb://localhost/mytestdb', done);
	});

	after(function() {
		db.close();
	});

	beforeEach(function() {
		tasklist = [
		  {title: 'Test', description: 'This is a test task', category: 'general', completed: 'n'}
		];
		db.get().collection('tasklist').insert(tasklist);
	});

	afterEach(function() {
		db.get().collection('tasklist').drop();
	});

	it('all should return all tasks', function(done) {
		var callback = function(err, data) {
			expect(err).to.be.null;
			expect(data).to.be.eql(tasklist);
			done();
		}
		task.all(callback);
	});

	it('add should add a task', function(done) {
		var newTask = {title: 'Sample', description: 'This is a sample task', category: 'general', completed: 'n'};

		var callback = function(msg) {
			expect(msg).to.be.eql('task added');

			var fetchAllData = function(err, data) {
				expect(data[1].title).to.be.eql(newTask.title);
				expect(data[1].description).to.be.eql(newTask.description);
				expect(data[1].category).to.be.eql(newTask.category);
				expect(data[1].completed).to.be.eql(newTask.completed);
				done();
			}

			task.all(fetchAllData);
		}

		task.add(newTask, callback);
	});

	it('add with no task should fail', function(done) {
		var callback = function(msg) {
			expect(msg).to.be.eql('unable to add task');
			done();
		}

		var newTask = undefined;
		task.add(newTask, callback);
	});

	it('add should fails when no title', function(done) {
		var newTask = {description: 'This is a sample task', category: 'general', completed: 'n'};

		var callback = function(msg) {
		  expect(msg).to.be.eql('unable to add task');
		  done();
		}

		task.add(newTask, callback);
	});

	it('add should fails when no category', function(done) {
		var newTask = {description: 'This is a sample task', category: 'general', completed: 'n'};

		var callback = function(msg) {
		  expect(msg).to.be.eql('unable to add task');
		  done();
		}

		task.add(newTask, callback);
	});

	it('add should fails when no completed field', function(done) {
		var newTask = {description: 'This is a sample task', category: 'general', completed: 'n'};

		var callback = function(msg) {
		  expect(msg).to.be.eql('unable to add task');
		  done();
		}

		task.add(newTask, callback);
	});

})