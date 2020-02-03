const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();



// 子级路由
let home = new Router();
home
	.get('/js', (ctx) => {
		ctx.body = 'Home js page'
	})
	.get('/todo', (ctx) => {
		ctx.body = 'Home todo page'
	})

let page = new Router();
page
	.get('/js', (ctx) => {
		ctx.body = 'Page js page'
	})
	.get('/todo', (ctx) => {
		ctx.body = 'Page todo page'
	})





//	父级路由(装载所有子路由到父级路由) 
let router = new Router();
// router.use('/home',home.routes(),home.addowedMethods());
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());



//  使用router 的中间件
app.use(router.routes()).use(router.allowedMethods());


// 监听端口
app.listen(3000, () => {
	console.log('demoRouter start is port 3000');
})