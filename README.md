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