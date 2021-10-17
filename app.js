'use strict';
const Koa = require('koa');
const mystatic = require('koa-static');
const mount = require('koa-mount');
const app = new Koa();

// app.use(async ctx => {
//   // const results = await myDb.queryAll();
//   // console.log(results);
//   // ctx.body = results;
//   console.log(`got ctx: ${JSON.stringify(ctx)}`);
// });

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