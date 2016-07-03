var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');

describe('tasklist routes test', function() {
	var sandbox;
	var router;
	var tasklist;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();

		router = {
			get: sinon.spy()
		};

		sandbox.stub(express, 'Router')
			   .returns(router);

		tasklist = require('../../../routes/tasklist')
	})

	afterEach(function() {
		sandbox.restore();
	})

	it('tasklist registers / with get on the router', function() {
		expect(router.get.calledWith('/', sinon.match.any)).to.be.true;
	})
});