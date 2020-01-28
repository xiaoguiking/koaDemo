const Koa = require('koa');
const app = new Koa();
app.use(async(ctx) => {
	if(ctx.url === '/'&& ctx.method === 'GET') {
		let html = `
		<h1>js Koa2 request Post<h1/>
		<form method='POST' action = '/'>
		<p>name</p>
		<input name="username" /><br/>
		<p>age</p>
		<input name = "age" /><br/>
		<p>website</p>
		<input name="website" /></br>
		<button type="submit">submit</button>
		</form>
		`
		ctx.body = html;
	}else if (ctx.url === '/' && ctx.method === 'POST') {
		ctx.body = '接受到post参数';
	}else {
		ctx.body = `<h1>404</>`;
	}
});

app.listen(3000, () => {
	console.log("app start port is 3000");
})