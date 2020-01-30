const Koa = require('koa');
const app = new Koa();
const bodyParser =  require('koa-bodyparser');
app.use(bodyParser());
app.use(async(ctx) => {
	if(ctx.url === '/'&& ctx.method === 'GET'){
		let html = `
		<form method="POST"" action = "/">
		<p>name</p>
		<input name="username" />
		<p>age</p>
		<input name="age" />
		<p>website</p>
		<input name="webiste" />
		<button type="submit">提交</button>
		</form>`
		ctx.body=html;
	}else if(ctx.url === '/' && ctx.method ==='POST') {
		let  postdata = ctx.request.body;
		ctx.body =  postdata;
	}else {
		ctx.body = `<h1>404</h1>`;
	}
	
})

app.listen(3000, () => {
	console.log('app start port is 3000');
})