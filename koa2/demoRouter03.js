const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/',function(ctx, next) {
	// ctx.body = 'test';
	// 接受地址栏传递的参数
	ctx.body = ctx.query;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() =>{
	console.log('demoRouter03 start is port 3000');
})