var expect = require('chai').expect;
describe('backend tests', function() {
    describe('db', function() {
        it('should be defined ', function() {
            const db = require('../db');
            expect(db).to.exist;
        });
    });
    describe('router', function() {
        it('should be defined ', function() {
            const router = require('../router/router');
            expect(router).to.exist;
        });
    });
});