'use strict';
const router = require('koa-router')();
const send = require('koa-send');

const db = require('../db');
const myDb = new db();

// router.get('/login', async (ctx, next) => {
// 	try {
// 		await send(ctx, './react-app/build/login.html');
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

router.post('/search', async (ctx, next) => {
	ctx.body = 200;
	console.log('made post');
});

router.get('/(.*)', async (ctx, next) => {
	try {
		await send(ctx, './react-app/build/index.html');
	} catch(err) {
		console.log('error in / route');
		return next();
	}
});

router.post('/api/signup', async (ctx, next) => {
	try {
		console.log('made post');
	} catch(err) {
		console.log('error in signup');
		return next();
	}
});

router.post('/api/login', async (ctx, next) => {
	try {
		console.log(ctx);
	} catch(err) {
		console.log('error in login');
		return next();
	}
});

module.exports = router;