var expect = require('chai').expect;
const sinon = require('sinon');
describe('backend tests', function() {
    describe('db', function() {
        it('should be defined ', function() {
            const dbClass = require('../db');
            const db = new dbClass();
            expect(db).to.exist;
        });

        it('db like', async function() {
            const dbClass = require('../db');
            const db = new dbClass( false );
            const likeTest = await db.likeRecipe( 1, JSON.stringify({ id: '1', image: '1', title: '1', recipeId: '1' }) );
            expect(likeTest).to.be.equal(200);
        });

        it('db get likes', async function() {
            const dbClass = require('../db');
            const db = new dbClass( false );
            const likeTest = await db.getLikes( 1 );
            expect(likeTest).to.be.equal(JSON.stringify([{ id: '1', image: '1', title: '1', recipeId: '1' }]));
        });

        it('db unlike', async function() {
            const dbClass = require('../db');
            const db = new dbClass( false );
            const unlikeTest = await db.unlikeRecipe( 1, JSON.stringify({ id: '1', image: '1', title: '1', recipeId: '1' }) );
            expect(unlikeTest).to.be.equal(200);
        });

        it('db signup', async function() {
            const dbClass = require('../db');
            const db = new dbClass( false );
            const unlikeTest = await db.enterUnamePass( 'uname', 'pass' );
            expect(unlikeTest).to.be.equal(200);
        });

        it('db signin', async function() {
            const dbClass = require('../db');
            const db = new dbClass( false );
            const unlikeTest = await db.returnAcc( 'uname', 'pass' );
            expect(unlikeTest.length).to.be.equal(1);
        });
    });
    describe('router', function() {
        it('should be defined ', function() {
            const router = require('../controller/router');
            expect(router).to.exist;
        });

        it('get likes route', async function() {
            const route = require('../routes/get-like-route');
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    },
                    query: {
                        recipe: JSON.stringify({
                            image: 'test',
                            title: 'test',
                            recipeId: 'test',
                        })
                    }
                },
                session: {
                    userId: '1'
                }
            };
            const fakeRes = [{test: 'test'}, {test: 'test'}];
            const myDb = {
                getLikes: ( uname, pass ) => { return fakeRes }
            };
            const res = await route(myctx, myDb);
            expect(route).to.exist;
            expect(res.length).to.equal(2);
        });

        it('search route', function() {
            const route = require('../routes/search-route');
            expect(route).to.exist;
        });

        it('signUp route', async function() {
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    } 
                }
            };
            const fakeRes = {
                message: 200
            };
            const myDb = {
                enterUnamePass: ( uname, pass ) => { return fakeRes }
            };
            const route = require('../routes/signUpRouter');
            const res = await route(myctx, myDb);
            expect(route).to.exist;
            expect(res).to.equal(200);
        });

        it('login route - success', async function() {
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    } 
                }
            };
            const fakeRes = [ {
                id: 1
            } ];
            const myDb = {
                returnAcc: ( uname, pass ) => { return fakeRes }
            };
            const route = require('../routes/loginRouter');
            const res = await route(myctx, myDb);
            expect(route).to.exist;
            expect(res).to.equal(1);
        });

        it('login route - fail', async function() {
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    } 
                }
            };
            const fakeRes = [];
            const myDb = {
                returnAcc: ( uname, pass ) => { return fakeRes }
            };
            const route = require('../routes/loginRouter');
            const res = await route(myctx, myDb);
            expect(route).to.exist;
            expect(res).to.equal('');
        });

        it('like recipe', async function() {
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    },
                    query: {
                        recipe: JSON.stringify({
                            image: 'test',
                            title: 'test',
                            recipeId: 'test',
                        })
                    }
                },
                session: {
                    userId: '1'
                }
            };
            const fakeRes = [];
            const myDb = {
                likeRecipe: ( uname, pass ) => { return fakeRes }
            };
            const route = require('../routes/like-route');
            const res = await route(myctx, myDb);
            expect(route).to.exist;
            expect(res).to.equal(200);
        });

        it('like route', function() {
            const route = require('../routes/like-route');
            expect(route).to.exist;
        });

        it('unlike recipe', async function() {
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    },
                    query: {
                        title: 'test'
                    }
                },
                session: {
                    userId: '1'
                }
            };
            const fakeRes = [];
            const myDb = {
                unlikeRecipe: ( uname, pass ) => { return fakeRes }
            };
            const route = require('../routes/unlike-route');
            const res = await route(myctx, myDb);
            expect(route).to.exist;
            expect(res).to.equal(200);
        });

        it('search for recipes with spoonacular api', async function() {
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    },
                    query: {
                        list: JSON.stringify([{name: 'testName'}])
                    }
                },
                session: {
                    userId: '1'
                }
            };
            const fakeRes = { data: 1 };
            const myAgent = {
                get: ( uname ) => { return fakeRes }
            };
            const route = require('../routes/search-route');
            const res = await route(myctx, myAgent);
            expect(route).to.exist;
            expect(res).to.equal(1);
        });

        it('get spoonacular recipe info', async function(){
            const myctx = {
                request: { 
                    body: { 
                        username: 'testUser', 
                        password: 'testPass' 
                    },
                    query: {
                        list: JSON.stringify([{name: 'testName'}])
                    }
                },
                session: {
                    userId: '1'
                }
            };
            const fakeRes = { data: 1 };
            const myAgent = {
                get: ( uname ) => { return fakeRes }
            };
            const route = require('../routes/search-route');
            const res = await route(myctx, myAgent);
            expect(route).to.exist;
            expect(res).to.equal(1);
        });

    });
});