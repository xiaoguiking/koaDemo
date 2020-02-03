const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
// 加入层级处理之后
const router = new Router({
	prefix:'/jsKnow'
});
 
router
	.get('/', (ctx, next) => {
	ctx.body = 'Hello js';
})
	.get('/todo', (ctx, next) => {
		ctx.body = 'todo page';
	})

app
	.use(router.routes())
	.use(router.allowedMethods());



app.listen(3000, () => {
	console.log('demoRoute start is port 3000');
})

