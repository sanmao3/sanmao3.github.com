* vue 注入inject
* nodemon restart server but it will install many packages
* cookie(nodejs-filereader save dirPath from token) and token
* 优化3d柱图
* 内存溢出（程序错误） && 内存泄露（资源未释放）
* color.less JEditor
* antd-multi-cascader-vue
* vue-cli快速创建项目
* 等宽字体Consolas
* sso and cas
*  -webkit-box-orient: vertical;  编译后会没有，添加/* autoprefixer: off */
[](https://www.bryanbraun.com/checkboxland/docs/demos/webcam-test/)
* micro-app依赖于CustomElements和Proxy两个较新的API。
* ```
```
<defs>
    <linearGradient id="progress">
      <stop id="stop1" offset="0" stop-color="black"/>
      <stop id="stop2" offset="0" stop-color="grey"/>
    </linearGradient>
  </defs>
  
  改变offset值，实现一些动效
```

* 当需要在对象上添加新属性时，你应该使用 Vue.set(obj, 'newProp', 123), 或者

以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：

state.obj = { ...state.obj, newProp: 123 }
* 正向代理和反向代理
正向代理是客户端的代理，帮助客户端访问其无法访问的服务器资源。反向代理则是服务器的代理，帮助服务器做负载均衡，安全防护等。
正向代理中，服务器不知道真正的客户端到底是谁，以为访问自己的就是真实的客户端。
反向代理中，客户端不知道真正的服务器是谁，以为自己访问的就是真实的服务器。
* TailwindCSS
* `string.codePointAt(index)`,`String.fromCodePoint(number)`,正规化`string.normalize([normForm])`
* 小球动画在高刷新率的屏幕下运行的更快
* 低代码 可视化编辑页面
* WebWorker
* 内存管理和内存泄露
* 模块化编程
* 纯前端 -> 大前端 -> 架构师
* 动画库
* jupyter notebook [ipython](https://ipython.org/)
* 微前端
* AR增强现实
* WebGL
* PWA应用
* web安全 API
- figma
- spark plugin  
- MQTT
- position: absolute元素切换display是否会产生reflow，影响性能
- 了解502发生的可能性原因
- 最长递增子序列 贪心算法
- vue-cli-service实现
- 网络相关知识
- 网格背景实现原理
- v-for click绑定到父元素
- svg 画圆环，渐变
- expressjs 二级域名
- eslint
- async await vue beforeRouteEnter
- FreeMarker
- word-break: break-word;标准文档定义
- 总结一下nodejs状态管理问题，全局变量，cookie
- g2 可视化理论
- d3
- three.js .glb 玛雅软件
- webpack gzip 打包
```
/*修改滚动条样式火狐 start*/
.menu-ver {
  scrollbar-color:rgb(239, 239, 239); /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
}
/*修改滚动条样式火狐 end*/
```

## Q&A
- 专业的语言形容自己
- 延展问题在项目中的应用
- snabbdom
- 拷贝副本 let a = [...new Set(ary)]
- deno
- stdout stdin stderr
- cwd command
- hbs 模板 handlebars
- 柯里化
- compositionstart
- window.getSelection()
- chalk
- with(){}
- pwa service work
- 骨架屏
- ast语法树
- 掘金 deno 夏老师
- for循环中的变量递增问题
- element.scrollTo() mdn
- [grid](https://www.joomlashack.com/blog/tutorials/center-and-align-items-in-css-grid/)
- dart eggjs koa
- [momentjs](https://momentjs.com/docs/#/parsing/string-format/)
- [vue-i18n switch language](https://www.programmersought.com/article/72734289888/)

## Vue
- vue-virtual-scroll-list
- vue-lazyload
- vite
- vue cli source
- vue-cli运行原理
- v-for列表的key可以用遍历索引index吗？why?
- vue数据响应原理、深入、优缺点、vue3如何改进、延展答案
- 源码实现原理
- 框架或库的设计思想
- 回答模式：总分总 v-for v-if 可以放在一起吗？示例作答
- key 虚拟DOM、patch dom diff
- 隐蔽的bug
- what why where how
- v-model sync
- github.com/57code/vue-interview
- 子系统监控 子组件共享父组件数据 provide inject 注入 子系统监控页面 翻译字典优化
- 异步组件
- vue入口文件main.js require *.css导入文件 插入在public/index.html页面head时，为啥不是在组件css前面
> 注意问题，入口文件中如果有 css 导入，要注意先导入的组件的 css 会比入口文件中的 css 先导入。


#### CSS
* line-height, mobile垂直居中兼容问题
* vertical-align
* border-image

#### 聊天

* 未读提醒
* 消息推送
* 聊天记录
* 图片缓存
* 聊天列表

### 层叠上下文
### BFC

## skia

#### 移动端适配

dpr设备像素比及其相关概念与计算、分辨率

不同的dpr下，加载不同的尺寸的图片？如何实现？资源加载？安装包大小？

> 我想，做的好的公司，都会有这么一个图片服务器，通过url获取参数，然后可以控制图片质量，也可以将图片裁剪成不同的尺寸。  
所以我们只需上传大图(@2x)，其余小图都交给图片服务器处理，我们只要负责拼接url即可。

---------------------------------------------

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

--------------------------------------------


## reading
- 《屠龙之技》作者：长铗
- Working in Public: The Making and Maintenance of Open Source Software  一本关于开源协议的书
- 《垃圾回收的算法与实现》about GC

## websites
- dev.to
- stackoverflow.com
- medium.com
- github.com
- simpleprogrammer.com
- sitepoint.com
- youtube.com
- freecodecamp.org