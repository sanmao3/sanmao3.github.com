* BFC
* 头像裁剪
* 必填验证，格式验证
* 图片尺寸不一致的解决方案
* 图片占位符
* 快捷键
* $event中的各种坐标含义
* repaint和reflow
* WebWorker
* 内存管理和内存泄露
* 模块化编程
* 纯前端 -> 大前端
* 动画库
* SVG编辑器，可以打开SVG文件进行修改
* 整理svg.md path 曲线参数
* css display: table; table-cell使用
* 整理grid常用属性


* 《屠龙之技》作者：长铗
* jupyter notebook [](https://ipython.org/)
* 微前端
* 整理css linear-gradient repeating-conic-gradient等 以及产生的锯齿问题怎么解决
* 正则表达式整理
* 数据类型判断
* 废弃标志
* animation demo marquee
* GC 《垃圾回收的算法与实现》
* AR增强现实
* WebGL
* PWA应用
* 防抖节流
* 插槽slot
* JS是本地客户端一段字符串而已,是自己浏览器这个客户端跑的即时性语言,JS不能直接访问服务端的任何东西,对服务端来说(在html或者其它页面里面的JS),他就是一段需要发送出去的字符串而已
如果你要访问,只有靠服务端代码支持,AJAX来实现这个功能
* web安全 API
* require.context(’./assets/image’, false, /.png$/).keys();
* [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)

简单的说 Node.js 就是运行在服务端的 JavaScript。

Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。


[JWT](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
Header.Payload.Signature
头部 负载 签名

[jsonwebtoken](https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)
[jsonwebtoken github](https://github.com/auth0/node-jsonwebtoken)
[jwt.io](https://jwt.io/)

express-jwt

node URL v10 or later. older version const URL = require('url').URL


将代码部署到服务器的代码目录，这里要注意，如果直接 npm start 或 node app.js 启动，则一旦退出 ssh 远程登陆，nodeapp 就会停止运行。因此我们使用 forever 或者pm2启动 nodeapp。

forever和pm2的区别：

forever 管理多个站点，每个站访问量不大，不需要监控。

pm2网站访问量比较大，需要完整的监控界面。


统一代码风格配置

Referer

[gb18030编码问题](https://www.npmjs.com/package/iconv-lite)

[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)


[word parse article](https://www.jb51.net/article/145571.htm)

adm-zip 解压Word文件

宏任务微任务

bignumber.js  js精度问题

启动一个计时器来跟踪某一个操作的占用时长
console.time(timerName)
console.timeEnd(timerName)

http 状态码

统一代码规范
注释应该着重描述“做了什么”而不是“怎么做”。
添加eslint配置文件 .eslintrc.js
添加eslint忽略配置文件.eslintignore

figma
sparkplugin
MQTT


jsconf 系列的视频 youtube 上有很多，翻墙上去看还是值得的，不过可能对英语听力有些要求。
社区的话：
- Twitter，多 follow 些前端界人士，follow 的人够多了一般最新的东西出来都能跟到。
我的 JavaScript list: https://twitter.com/youyuxi/lists/javascript
- GitHub（看看各大知名项目的 issue 讨论，可以了解项目的走向）
- 用户自主发布新闻的，比如 Reddit 的 javascript 频道，EchoJS
- StackOverflow 算不算...

作者：尤雨溪
链接：https://www.zhihu.com/question/22902084/answer/23274998
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


关于开源协议的书
Working in Public: The Making and Maintenance of Open Source Software


By default, a grid item cannot be smaller than the size of its content.
Grid items have an initial size of min-width: auto and min-height: auto.
You can override this behavior by setting grid items to min-width: 0, min-height: 0 or overflow with any value other than visible.