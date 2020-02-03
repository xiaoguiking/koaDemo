const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
	if(ctx.url === '/index'){
		ctx.cookies.set(
		'MyName','JSKoa', {
		domain: '127.0.0.1', // 主机名字
		path: '/index', 				// 路径
		maxAge:1000*60*60*24,		// 有效时间
		expires:new Date('2020-12-31'),      // 到哪天cookies失效
		httpOnly: false,        // 是否必须是http
		overwrite: false,       //  是否可以重写
		})
		ctx.body = 'cookie is ok';
	}else {
		// ctx.body = "Hello world";
		// 读出cookie的值
		if(ctx.cookies.get('MyName')){
			ctx.body = ctx.cookies.get('MyName');
		}else {
			ctx.body  = 'cookis 不存在'
		}
	}
})

app.listen(3000,() => {
	console.log('demoCookies start is port 30000');
})

