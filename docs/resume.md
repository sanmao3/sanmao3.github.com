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

### 大屏页面

1. html,body或组件外的元素无法应用组件scope样式，因为编译后的css不能与组件外的元素匹配（data-@#$%&）
2. 异常处理（分母变量会不会是0、forEach时是否是数组、条件是否覆盖）
3. echarts自适应调用`resize()`
4. svg path数据格式兼容性问题，代号字母前不可加逗号，否则火狐不兼容
5. promise使用，`Promise.all()`、`Promise.resolve()`、`Promise.reject()`
6. line-height使用无单位数值
7. 使用transform: translateX();代替left实现动画。变换在浏览器中的性能要好得多。
8. 对transform指定多个值时，变换的每个值从右向左按顺序执行。
9. animation-fill-mode: both;表示动画执行前取动画第一帧值并应用在元素上，和动画结束后取最后一帧值应用在元素上。
10. 网格布局grid
11. svg中`textPath`使用
