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
		let postdata = await parsePostData(ctx);
		// ctx.body = '接受到post参数';
		ctx.body = postdata;
	}else {
		ctx.body = `<h1>404</>`;
	}
});

// 01 ctx node.js原生对象req 解析
function parsePostData(ctx){
	return  new Promise((resolve, reject) => {
		try{
			let postdata = "";
			ctx.req.on('data', (data) => {
				postdata+=data;
			})
			ctx.req.addListener('end', function () {
				let parseData = parseQueryStr(postdata);
				resolve(parseData);
			})
		}catch(error){
			reject(error);
		}
	})
};

// 02 POST字符串解析JSON对象

function parseQueryStr(queryStr){
	let queryData = {};  //  提供一个空对象
	let queryStrList = queryStr.split('&');  // 字符串转换成数组
	console.log(queryStrList, 'queryStrList');
	for(let [index, queryStr] of queryStrList.entries()) {
		let itemList = queryStr.split('=');
		console.log(itemList,'itemList');
		queryData[itemList[0]] = decodeURIComponent(itemList[1]);
	}
	return queryData;
}

app.listen(3000, () => {
	console.log("app start port is 3000");
})