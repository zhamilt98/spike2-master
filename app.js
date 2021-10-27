'use strict';
const Koa = require('koa');
const mystatic = require('koa-static');
const mount = require('koa-mount');
const session = require('koa-session');
const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
	key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
	/** (number || 'session') maxAge in ms (default is 1 days) */
	/** 'session' will result in a cookie that expires when session/browser is closed */
	/** Warning: If a session cookie is stolen, this cookie will never expire */
	maxAge: 86400000,
	autoCommit: true, /** (boolean) automatically commit headers (default true) */
	overwrite: true, /** (boolean) can overwrite or not (default true) */
	httpOnly: true, /** (boolean) httpOnly or not (default true) */
	signed: true, /** (boolean) signed or not (default true) */
	rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
	renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
	secure: false, /** (boolean) secure cookie*/
	sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

const static_pages = new Koa();
static_pages.use(mystatic(__dirname + "/react-app/build"));
app.use(mount("/", static_pages));

// app.use(mystatic('./react-app/build'));
const router = require('./controller/router');
app.use(router.routes());

app.use(async (ctx, next) => {
	await router.routes()(ctx, next);
});

app.listen(3000);



// old code 

// app.use(async ctx => {
//   // const results = await myDb.queryAll();
//   // console.log(results);
//   // ctx.body = results;
//   console.log(`got ctx: ${JSON.stringify(ctx)}`);
// });