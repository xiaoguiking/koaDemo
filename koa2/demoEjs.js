const Koa = require('koa');
const views = require('koa-views');
const app = new Koa();
const path = require('path');



app.use(views(path.join(__dirname,'./view'),{
	extension:'ejs'
}))

app.use(async(ctx) => {
	let title = "Hello Koa";
	await ctx.render('index', {title});
});

app.listen(3000, () => {
	console.log('demoEjs start is port 3000');
})
