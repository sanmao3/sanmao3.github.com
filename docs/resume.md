### 如何做出项目的亮点？
1. 项目中遇到了什么问题？
2. 解决问题的过程并且如何思考？
3. 思考之后通过什么方式解决？
4. 最后这一个任务你学到了什么，给团队带来了什么价值，解决了哪些痛点

### 监控平台
1. css文件被解析成text/plain格式，导致样式无法应用
2. 环境变量和模式配置，实现生产和测试环境变量分离，添加.env.[mode]文件，scripts命令`build --mode [mode]`，见Vue-CLI
3. 基于echarts开发线性图表组件
4. 深入了解git命令，branch/rebase/remote/checkout/fetch
5. 学习linux命令，前端代码部署
6. 通过定义ref属性，使用`this.$refs.refname`实现访问子组件实例或元素
7. 2.x版本中在一个元素上同时使用`v-if`和`v-for`时，`v-for`会优先作用，建议避免在同一元素上同时使用两者。比起在模板层面管理相关逻辑，更好的办法是通过创建计算属性筛选出列表，并以此创建可见元素。
8. 控制台的preview和response不一样是因为js的number类型不支持后台给的long类型的数据，太大了精度丢失了
9. 解决打包时css文件引用顺序报警，vue.config.js配置如下：
```
css: {
  extract: {
    ignoreOrder: true
  }
}
```
10. 注入`provide``inject`共享父子组件数据
11. main.js中require *.css导入文件在插入到public/index.html页面head时，为啥不是在组件css前面
> 注意问题，入口文件中如果有 css 导入，要注意先导入的组件的 css 会比入口文件中的 css 先导入。
12. `-webkit-box-orient: vertical;` 编译后会消失，需要添加 `/* autoprefixer: off */`

### 日志平台
1. 更新@jeecg/antd-online/dist/OnlineForm.css，低版本将整个项目的css代码全部打包进去了，导致样式优先级问题

### Ant Design Vue
1. antd的`setFieldsValue({[fieldName]: value})`函数设置的field必须存在，否则控制台会打印报警信息，并且会导致表单概率性赋值失败的问题
2. 修改main.js中antd.css引入顺序，以解决antd和自定义样式的优先级问题
3. vue.config.js配置less modifyVars修改antd less变量
4. 下拉框默认值是`undefined`时才会显示placeholder占位符内容

### 大屏页面
1. html,body或组件外的元素无法应用组件scope样式，因为编译后的css不能与组件外的元素匹配（data-@#$%&）
2. 异常处理（分母变量会不会是0、forEach时是否是数组、条件是否覆盖）
3. echarts自适应调用`resize()`
4. svg path数据格式兼容性问题，代号字母前不可加逗号，否则火狐不兼容
5. promise使用，`Promise.all()`、`Promise.resolve()`、`Promise.reject()`
6. `line-height`使用无单位数值
7. 使用`transform: translateX();`代替left实现动画。变换在浏览器中的性能要好得多。
8. 对`transform`指定多个值时，变换的每个值从右向左按顺序执行。
9. `animation-fill-mode: both;`表示动画执行前取动画第一帧值并应用在元素上，和动画结束后取最后一帧值应用在元素上。
10. 网格布局grid关于`repeat(auto-fill, minmax(min, max))`和`repeat(auto-fit, minmax(min, max))`区别
11. svg中`textPath`使用
12. svg中可以使用`foreignObject`，Common use case: embed HTML text into SVG
13. 谷歌渲染的最小字体是12px，火狐没有限制，可以是任意值，如10px、5px等，甚至是负数(此时字体渲染成12px)
14. 了解`background: repeating-conic-gradient()`锥形渐变
15. 使用less循环
16. grid item content expanding problem in firefox v53.0.3 that 1fr means minmax(auto, 1fr), so set min-width: 0 or minmax(0, 1fr). see [automatic minimum size of grid item](https://www.w3.org/TR/css3-grid-layout/#min-size-auto)
17. `mouseover&mouseout`vs`mouseenter&mouseleave`
18. 深度选择器`/deep/`
19. `Content-Type: multipart/form-data` vs `Content-Type: application/x-www-form-urlencoded` vs `Content-Type: application/json`

### UI设计
1. SQL语句悬浮框展示，黑色背景`rgba(0, 0, 0, 0.9)`or`#1c2237`，关键词高亮并换行，易读、美观、舒适、匹配用户习惯的场景。关键词如SELECT,FROM,WHERE,ORDER BY,GROUP BY,LIMIT等。`color: #c678dd`
2. 后台日志内容使用等宽字体`Consolas`
3. 表单高级选项的使用

### 日志查看
#### nodejs-filereader
1. 日志文件
2. token中exp过期时间单位
#### multi-page多页面模式
文件结构参考
```
|- public
|- src
|  |--assets
|  |--components
|  |--pages
|  |  |--index
|  |  |  |--index.html
|  |  |  |--index.js
|  |  |  |--App.vue
|  |  |  |--Home.vue
|  |  |  |--About.vue
|  |  |--mobile
|  |  |  |--mobile.html
|  |  |  |--index.js
|  |  |  |--mobile.vue
|  |  |  |--Home.vue
|  |  |  |--About.vue
|  |--router  
|  |  |--index.js
|  |  |--mobile.js
| - vue.config.js
| - package.json
```
访问路径
```
// pc端
localhost:8080
// mobile端
location:8080/mobile
```
实现路由
```
// pc端
localhost:8080/about 
// mobile端
localhost:8080/mobile/about
```
mobile端mobile.js 添加 base: '/mobile',
```
// mobile.js
import Router from 'vue-router'
import Home from 'mobile/views/Editor.vue'

export default new Router({
  mode: 'history',
  base: '/mobile',
  routes: [
    ...
  ]
})
```
nginx配置
```
location /login {
  root /demo/root/dir;
  try_files $uri $uri/ /login.html;
}
location / {
  root /;
  try_files $uri $uri/ /index.html;
}
```

### onlyoffice nodejs示例
1. `express()`
2. `debug()`



1）初期接触项目时，子系统与图表卡组卡片的配置功能急需完善，在了解和分析业务需求后，同项目经理重新设计了数据结构和配置流程，对核心代码进行了重构，并优化了配置页面，最终顺利按时上线。
2）基于多年的工作经验，加上持续不断地学习积累，成功开发了切换演练大屏、拓扑图大屏、链路大屏、以及其它监控大屏。
3）随着项目业务的熟悉，对系统的易操作性，界面合理性和美观性，做了一系列的优化工作。
4）在其它小组成员需要帮助的时候，愿意花费时间和精力排查问题并提供建议或解决方案。