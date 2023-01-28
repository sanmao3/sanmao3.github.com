- 背景
- 解决思路
- 工程实践
- 总结与展望


```
// (x, y)旋转θ后的坐标公式
x' = x * cosθ - y * sinθ
y' = x * sinθ + y * cosθ
```

```
function handleDrop(e) {
  e.stopPropagation(); // Stops some browsers from redirecting.
  e.preventDefault();

  var files = e.dataTransfer.files;
  for (var i = 0, f; f = files[i]; i++) {
    // Read the File objects in this FileList.
  }
}
```

使用getBoundingClientRect()方法可以立刻获得网页元素的位置。
它返回一个对象，其中包含了left、right、top、bottom四个属性

CommonJs AMD CMD UMD ES6 Module

密码加密

The change event of the `MediaQueryList` interface fires when the status of media query support changes.

google font 'Rubik Moonrocks'

antd select 数据量大时很卡顿

createDocumentFragment() 渲染性能优化

`hyphens`告知浏览器在换行时如何使用连字符连接单词

这种支持多语言的功能称之为国际化，英文是internationalization，缩写为i18n（因为首字母i和末字母n中间有18个字母）。

```
1、   传递参数时需要使用encodeURIComponent，这样组合的url才不会被#等特殊字符截断。                            

例如：<script language="javascript">document.write('<a href="http://passport.baidu.com/?logout&aid=7&u= +encodeURIComponent("http://cang.baidu.com/bruce42")+">退出< /a>');</script> 

2、   进行url跳转时可以整体使用encodeURI 

例如：Location.href=encodeURI("http://cang.baidu.com/do/s?word=百度&ct=21"); 
```


## TODO
* 实现树状结构绘制（树状拓扑图、树状结构图、树状甘特图）（canvas & svg）（三次贝塞尔曲线）
* 实现缩放拖拽（设置边界、拖拽分类功能）
* 研究d3重力布局实现原理
* 思考SAN拓扑图实现方案
* css实现字体渐变、背景网络
* svg实现环形进度条
* 实现数字流量雨
* svg箭头流动
* 实现正弦函数波浪🌊
* 选择文本显示弹框（window.getSelection()），右击选择弹框
* CSS Art
* 一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是最近的真实可滚动祖先。


## TODO
* nodemon restart server but it will install many packages
* cookie(nodejs-filereader save dirPath from token) and token
* 优化3d柱图
* color.less JEditor
* antd-multi-cascader-vue
* sso and cas
* SaaS，Software as a service，软件即服务
*  -webkit-box-orient: vertical;  编译后会没有，添加/* autoprefixer: off */
[](https://www.bryanbraun.com/checkboxland/docs/demos/webcam-test/)
* `string.codePointAt(index)`,`String.fromCodePoint(number)`,正规化`string.normalize([normForm])`
* 小球动画在高刷新率的屏幕下运行的更快
* WebWorker
* 模块化编程
* jupyter notebook [ipython](https://ipython.org/)
* PWA应用
* web安全 API
- figma
- spark plugin  
- MQTT
- 最长递增子序列 贪心算法
- eslint
- FreeMarker
- GeeksforGeeks
- freelancer
- avocode
- Instagram = ins

## Q&A
- 专业的语言形容自己
- 延展问题在项目中的应用
- snabbdom
- stdout stdin stderr
- cwd command
- hbs 模板 handlebars
- 柯里化
- compositionstart
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
- v-for click绑定到父元素
- vue-cli-service实现
- vue-cli快速创建项目
- vue 注入inject
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
- 当需要在对象上添加新属性时，你应该使用 Vue.set(obj, 'newProp', 123), 或者以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：
`state.obj = { ...state.obj, newProp: 123 }`
- what why where how
- v-model sync
- github.com/57code/vue-interview
- 子系统监控 子组件共享父组件数据 provide inject 注入 子系统监控页面 翻译字典优化
- 异步组件
- vue入口文件main.js require *.css导入文件 插入在public/index.html页面head时，为啥不是在组件css前面
> 注意问题，入口文件中如果有 css 导入，要注意先导入的组件的 css 会比入口文件中的 css 先导入。


## CSS
* line-height, mobile垂直居中兼容问题
* vertical-align
* border-image

## 聊天
* 未读提醒
* 消息推送
* 聊天记录
* 图片缓存
* 聊天列表

## 层叠上下文
## BFC
## skia

## 移动端适配

dpr设备像素比及其相关概念与计算、分辨率

不同的dpr下，加载不同的尺寸的图片？如何实现？资源加载？安装包大小？

> 我想，做的好的公司，都会有这么一个图片服务器，通过url获取参数，然后可以控制图片质量，也可以将图片裁剪成不同的尺寸。  
所以我们只需上传大图(@2x)，其余小图都交给图片服务器处理，我们只要负责拼接url即可。

---------------------------------------------

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

--------------------------------------------