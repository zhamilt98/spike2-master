'use strict';
const Koa = require('koa');
const mystatic = require('koa-static');
const app = new Koa();

// app.use(async ctx => {
//   // const results = await myDb.queryAll();
//   // console.log(results);
//   // ctx.body = results;
//   console.log(`got ctx: ${JSON.stringify(ctx)}`);
// });

app.use(mystatic('./react-app/build'));
const router = require('./router/router');
app.use(router.routes());

app.use(async (ctx, next) => {
	await router.routes()(ctx, next);
});

app.listen(3000);