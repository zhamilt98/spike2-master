var expect = require('chai').expect;
const sinon = require('sinon');
describe('backend tests', function() {
    describe('db', function() {
        it('should be defined ', function() {
            const db = require('../db');
            expect(db).to.exist;
        });
    });
    describe('router', function() {
        it('should be defined ', function() {
            const router = require('../controller/router');
            expect(router).to.exist;
        });

        it('get likes route', function() {
            const route = require('../routes/get-like-route');
            expect(route).to.exist;
        });

        it('login route', function() {
            const route = require('../routes/loginRouter');
            expect(route).to.exist;
        });

        it('like route', function() {
            const route = require('../routes/like-route');
            expect(route).to.exist;
        });

        it('search route', function() {
            const route = require('../routes/search-route');
            expect(route).to.exist;
        });

        it('signUp route', function() {
            const route = require('../routes/signUpRouter');
            route({ request: { body: { username: 'testUser', password: 'testPass' } } });
            expect(route).to.exist;
        });
    });
});