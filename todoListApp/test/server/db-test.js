var expect = require('chai').expect;
var db = require('../../db');

describe('db tests', function() {
	it('canary test should pass', function() {
		expect(true).to.be.true;
	});

	it('get should return null by default', function() {
		expect(db.get()).to.be.null;
	});

	it('close should set the connection to null', function() {
		db.close();
		expect(db.get()).to.be.null;
	});
});