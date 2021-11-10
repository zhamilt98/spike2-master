'use strict';
const router = require('koa-router')();
const send = require('koa-send');
const bodyParser = require('koa-body')();
const db = require('../db');
const myDb = new db();

// router.get('/login', async (ctx, next) => {
// 	try {
// 		await send(ctx, './react-app/build/index.html');
// 	} catch(err) {
// 		console.log('error in / route');
// 		return next();
// 	}
// });
// router.get('/signup', async (ctx, next) => {
// 	try {
// 		await send(ctx, './react-app/build/signup.html');
// 	} catch(err) {
// 		console.log('error in / route');
// 		return next();
// 	}
// });

router.get('/fetchAll', async (ctx, next) => {
	try {
		const results = await myDb.queryAll();
		console.log(results);
		ctx.body = results;
	} catch(err) {
		// TODO: handle err?
		return next();
	}
});

router.get('/api/search', async (ctx, next) => {
	const search_route = require('../routes/search-route');
	// ctx.session.test = 'test123';

	ctx.body = await search_route(ctx);
	console.log('made post');
});

router.get('/api/isLoggedIn', async (ctx, next) => {
	ctx.body = { isLoggedIn: ctx.session.isLoggedIn || false };
	next();
});

router.get('/api/like', async (ctx, next) => {
	console.log('inside the api/like');
	const like_route = require('../routes/like-route');

	ctx.body = await like_route(ctx);
});

router.get('/api/getLikes', async (ctx, next) => {
	console.log('inside the api/like');
	const get_like_route = require('../routes/get-like-route');

	ctx.body = await get_like_route(ctx);
});

router.get('/api/logout', async (ctx, next) => {
	ctx.session.userId = undefined;
	ctx.session.isLoggedIn = false;
	console.log(`sess: ${JSON.stringify(ctx.session)}`);
	next();
});


router.get('/(.*)', async (ctx, next) => {
	try {
		await send(ctx, './react-app/build/index.html');
	} catch(err) {
		console.log('error in / route');
		next();
	}
});

router.post('/api/signup', bodyParser, async (ctx, next) => {
	try { 
		console.log('0');
		const signuphandler = require("../routes/signUpRouter"); 
		console.log('1');
		const thing = await signuphandler(ctx);
		console.log('2');
		ctx.body = thing;
		console.log('made post');
		
	} catch(err) {
		console.log(err.stack);
		next();
	}
	
});
router.redirect('/api/signup', 'login');

router.post('/api/login', bodyParser, async (ctx, next) => {
	try {
		ctx.response.redirect('/');
		const loginhandler = require("../routes/loginRouter");
		const thing = await loginhandler(ctx);
		console.log('2');
		console.log(` thing: ${JSON.stringify(thing)}`);
		if ( thing !== '' ) {
			ctx.session.isLoggedIn = true;
			ctx.session.userId = thing;
		}
		console.log(`session in router post api/login/ : ${JSON.stringify(ctx.session)}`);
		return next();
	} catch(err) {
		console.log('error in login');
		console.log(err);
		return next();
	}
});
router.redirect('/api/login', '/');

module.exports = router;