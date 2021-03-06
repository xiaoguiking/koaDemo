# koaDemo
koa learn

### Koa 开发环境搭建

要求Ndoe版本 > v7.6,因为node.js 7.6版本完全支持async /await, 不需要再加入flag，

查看Node 版本方法（win版本）

`
打开运行 快捷键 win + R  然后输入cmd 打开命令行工具，命令行输入
`

 > node -v

Mac 更新方法

```
sudo npm install -g n
sudo n stable
```
#### 搭建环境

- 建立文件目录
```
cd koaDemo  进入koaDemo 文件夹
mkdir koa2  创建koa2 文件夹
cd koa2     进入koa2 文件夹
```
- 初始化生产package.json 文件
```
npm init -y
```
- 生成package.json, 安装koa包， npm 安装
```
3种安装方式
$ nvm install 7
$ npm i koa
$ node my-koa-app.js
```
index.js
```
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) =>{
    ctx.body ="Hello world"
})

app.listen(3000);
console.log('app start');
```
运行  node index.js
```
http://127.0.0.1:3000
```

### 02 async/ await 用法

```
async function testAsync() {
    return 'Hello world';
}

const res = testAsync();
console.log(res); // Promise { 'Hello world' }
```

### 03get 请求接收 

在koa2中GET请求通过request接收，但是接受的方法有两种：query和querystring。
- query: 返回的是格式化好的参数对象
- querystring: 返回的是请求字符串

```
http://127.0.0.1:3000/?user=wangyi&age=12


{"url":"/?user=wangyi&age=12","req_query":{"user":"wangyi","age":"12"},"req_querystring":"user=wangyi&age=12"}
```

> 从request接受Get请求

```
let url = ctx.url;
let request = ctx.request;
let req_query = request.query;
let req_querystring = request.querystring;
```

> 从上下文直接获取get请求

```
let ctx_query = ctx.query;
let ctx_querystring = ctx.querystring;

```

### 04 接受post请求 （1）

获取Post请求的步骤：
- 1.解析上下文ctx中原生node.js对象req
- 2.将POST表单数据解析成query string- 字符串（例如：user=jsA&age=124)
- 3.将字符串转换成JSON格式 

ctx.request和ctx.req的区别

- ctx.request: 是Koa2中context经过封装的请求对象，直观简单
- ctx.req： 是context提供的node.js原生HTTP请求对象，不直观，但是可以得到更多的内容，适合深度编程

ctx.method 得到的请求类型
 
 Koa2提供了ctx.method属性，可以容易得到请求的类型，举例：根据请求类型获得不同的页面内容。
 GET请求得到表单填写页面，POST请求时候，得到POST处理页面
 
 ### 05 接受POST请求02
 
 ```
 01） node.js 原生接收 ctx.req
 
 function parsePostData(ctx){
 	return  new Promise((resolve, reject) => {
 		try{
 			let postdata = "";
 			ctx.req.on('data', (data) => {
 				postdata+=data;
 			});
 			ctx.req.addListener('end', function () {
 				resolve(postdata);
 			})
 		}catch(error){
 			reject(error);
 		}
 	})
 }
 
 
 
 结果： username=12141124&age=12&website=123
 
 ```
 
 ```
 2) 3)
 username=12141124&age=12&website=123  将这个修改 
	 JSON 对象
	 
	 {
	 "username": "123",
	 "age": "213",
	 "website": "123123"
	 }
	 
 function parseQueryStr(queryStr) {
	 let queryData = {};
	 let queryStringList = queryStr.split('&');
	 console.log(quertStringList);
	 for(let [index, queryStr] of queryStrList.entries()){
		 let itemList = queryStr.split('=');
		 console.log(itemList);
		 queryData[itemList[0]] = decodeURIComponent(itemList[1]);
	 }
	 return queryData;
 }
 
 ```
 
 
 ### 06中间件使用

koa-bodyparser（简化post上述的功能插件）

- 安装中间件 生产环境使用
`npm install --save koa-bodyparser@3`
- 安装完成后，需要在代码中引入并使用。我们在代码顶部用require进行引入。
`const bodyParser = require('koa-bodyparser');` 
- 使用中间件
`app.use(bodyParser())`
- 打开端口测试

### 07原生路由实现

```
举例demo
http://127.0.0.1:3000
页面： /

http://127.0.0.1:3000/js

页面： /js
```
建立page文件夹  404.html index.html todo.html

```
demoUrl.js

实现route方法， render方法
引入
const fs = require('fs');
```

### 08 koa-router 中间件01

- 安装koa-router 中间件
`npm install --save koa-router`

```
eg demo

const Koa = require('koa');
const Router = require('koa-router');  // 引入声明

const app = new Koa();
const router = new Router();  使用

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
```

### 09 koa-router 中间件02 层级处理

demoRouter01.js
```
const router = new Router({
	prefix:'/jsKnow'
});

加入层级 之后效果
http://127.0.0.1:3000/jsKnow/  ---------------  Hello js

http://127.0.0.1:3000/jsKnow/todo --------------  todo page
```

>  分级加载不同的子孙路由

```
http://127.0.0.1:3000/home/js           Home js page
http://127.0.0.1:3000/page/todo			Home todo page
http://127.0.0.1:3000/page/js			Page js page
http://127.0.0.1:3000/page/todo			Page todo page
```


### 10 Koa-router中间件3 参数

如何接受传递参数？
127.0.0.1/3000?name=js&age=34

```
本章介绍 get 请求
ctx.body  = ctx.query

{"name":"12","age":"12"}

```


### koa 11 cookie的使用

引入nodemon 热更新机制

- cnpm install -g  nodemon 安装全局
- 使用对应名字 nodemon demoCookies.js

Cookie选项

比如我们要存储用户名，保留用户登录状态时，你可以选择7天内不用登录，也可以选择30天内不用登录。这就需要在写入是配置一些选项：

- domain：写入cookie所在的域名
- path：写入cookie所在的路径
- maxAge：Cookie最大有效时长
- expires：cookie失效时间
- httpOnly:是否只用http请求中获得
- overwirte：是否允许重写

```
const Koa  = require('koa');
const app = new Koa();

app.use(async(ctx)=>{
    if(ctx.url=== '/index'){
		// 写入cookie
		
        ctx.cookies.set(
            'MyName','JSPang',{
                domain:'127.0.0.1', // 写cookie所在的域名
                path:'/index',       // 写cookie所在的路径
                maxAge:1000*60*60*24,   // cookie有效时长
                expires:new Date('2018-12-31'), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取
                overwrite:false  // 是否允许重写
            }
        );
        ctx.body = 'cookie is ok';
    }else{
		// 读出cookies 的value值
        if( ctx.cookies.get('MyName')){
            ctx.body = ctx.cookies.get('MyName');
        }else{
            ctx.body = 'Cookie is none';
        }

    }
});

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
})
```

### 12.Koa2模板引擎ejs

安装模板机制中间件

> cnpm install --save koa-views

安装ejs模板引擎

>  npm install  --save ejs

**编写模板**

-  建立view文件夹，创建index.ejs
-  

> while compiling ejs    If the above error is not helpful, you may want to try EJS-Lint:    ejs  渲染错误

解决方案：  主要是index.ejs  文件夹里面写了注释 ，或者变量（字面量写的有问题）查看修改