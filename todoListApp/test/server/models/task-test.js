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
	})
})