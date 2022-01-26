## nodejs

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

Node.js 是一个开源与跨平台的 JavaScript 运行时环境。 它是一个可用于几乎任何项目的流行工具！

Node.js 在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核）。 这使 Node.js 表现得非常出色。

Node.js 使用 CommonJS 模块系统

简单的说 Node.js 就是运行在服务端的 JavaScript。

Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

### MAC升级Nodejs和Npm到最新版
第一步，先查看本机node.js版本：
node -v

第二步，清除node.js的cache：
sudo npm cache clean -f

第三步，安装 n 工具，这个工具是专门用来管理node.js版本的，别怀疑这个工具的名字，是他是他就是他，他的名字就是 "n"
sudo npm install -g n

第四步，安装最新版本的node.js
sudo n stable

第五步，再次查看本机的node.js版本：
node -v

第六步，更新npm到最新版：
$ sudo npm install npm@latest -g

第七步，验证
1、node -v
2、npm -v


### JWT
JSON WEB TOKEN

Header.Payload.Signature
头部.负载.签名

[JWT Blog](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
[jsonwebtoken](https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)
[jwt.io](https://jwt.io/)
- token exp 单位秒
- > [jwt exp](https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt)

#### 第三方包
- node-jsonwebtoken
```
let jwt = require('jsonwebtoken');
let decoded = jwt.decode(token);
```
[node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- express-jwt


### 部署

将代码部署到服务器的代码目录，需要注意，如果直接 `npm start` 或 `node app.js` 启动，则一旦退出 ssh 远程登陆，nodeapp 就会停止运行。

因此我们使用 forever 或者 pm2 启动 nodeapp。

### 项目开发过程中用到的包
- iconv-lite
[gb18030编码问题](https://www.npmjs.com/package/iconv-lite)
- adm-zip 解压Word文件
[reference article](https://www.jb51.net/article/145571.htm)

### TODO
- 总结一下nodejs状态管理问题，全局变量，cookie


## expressjs
二级域名


## ejs

### <%=
Outputs the value into the template (HTML escaped)
> similar as textContent
### <%-
Outputs the unescaped value into the template
> similar as innerHTML
### escape()转义源码
```
/*!
 * EJS
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html){
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
```

## 日志打印
- winston 时差8hours问题 [](https://github.com/volumio/Volumio2/issues/1952)
- [winston](https://stackoverflow.com/questions/44952938/get-line-number-and-filename-for-a-log-output)
[](https://github.com/winstonjs/winston-daily-rotate-file)
[](https://github.com/winstonjs/winston#using-logging-levels)
[](https://juejin.cn/post/6865926810061045774)
- 比较 winston、log4js、bunyan [](https://geshan.com.np/blog/2021/01/nodejs-logging-library/)


## deno