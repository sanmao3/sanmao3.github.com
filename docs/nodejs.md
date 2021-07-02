## nodejs

简单的说 Node.js 就是运行在服务端的 JavaScript。

Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

### JWT
JSON WEB TOKEN

Header.Payload.Signature
头部 负载 签名

[JWT Blog](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
[jsonwebtoken](https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)
[jwt.io](https://jwt.io/)

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
