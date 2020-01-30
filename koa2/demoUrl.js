const Koa = require('koa');
const fs = require('fs'); 
const app = new Koa();


//  流操作基本都需要做异步处理
function render(page) {
	return new Promise((resolve, reject) => {
		let pageUrl = `./page/${page}`; // 注意需要加入. 表示本地目录层级
		 fs.readFile(pageUrl, "binary",(err, data) => {
			 if(err){
				 reject(err);
			 }else {
				 resolve(data);
			 }
		 })
	})
}

async function route(url){
	let page = '404.html';
	switch(url) {
		case '/':
		page = 'index.html';
		break;
		case '/index':
		page = 'index.html';
		case '/todo':
		page = 'todo.html';
		case '/404':
		page = '404.html';
		default: 
		break;
	}
	let html = await render(page); // 异步防止卡死页面
	console.log(html);
	return html;
}


app.use(async(ctx) => {
	let url = ctx.request.url;
	let html = await route(url);
	ctx.body = html;
});


app.listen(3000, () => {
	console.log('demoUrl start port is 3000');
});