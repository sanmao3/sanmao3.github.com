# 前端开发规范

### 目录结构

```
project
├── build                  # Webpack 配置文件放在这里
├── config                 # Vue 基本配置文件放在这里
├── dist                   # 打包文件
├── docs                   # 说明文档
├── node_modules           # 第三方依赖
├── public                 # 纯静态资源，不会被webpack构建
│   ├── index.html         # 入口模板
├── src                    # 项目源码（核心文件）
│   ├── assets             # 资源文件，只存放公共的静态资源，这里的资源会被webpack构建
│   │   ├── images         # 图片
│   │   ├── demo           # 测试用图片
│   │   ├── css            # css模块化，UI 组件
│   │       ├── main.scss  # 一个包含所有样式（公共样式）的样式表文件
│   ├── components         # 所有组件
│   │   ├── com1           # 组件1
│   │       ├── images     # 组件1静态资源
│   │       └── Com1.vue   # 组件1
│   ├── mixins             # 混合
│   ├── router             # 路由
│   ├── services           # 抽取出API请求
│   │   ├── msgService.js  # 示例：消息模块服务，每个模块的API封装在一个js文件中
│   ├── store              # 全局store管理
│   ├── utils              # 自己写的 js，里面各种工具类方法等
│   ├── vuex               # 状态管理
│   ├── views              # 所有页面
│   │   ├── module1        # 模块1
│   │       ├── page1      # 页面1
│   │           ├── components
│   │           └── Page1.vue
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── test                   # 测试代码
├── .babelrc               # babel 编译配置
├── .editorconfig          # 代码格式
├── .gitignore             # Git 提交忽略的文件配置
├── .postcssrc.js          # 转换 css 的工具配置文件
├── package-lock.json      # 用来锁定依赖的版本号（NPM 自动生成）
├── package.json           # 项目基本信息
├── vue.config.js          # 一个可选的配置文件
```

1. 文件夹和文件夹内部文件的语义一致性
2. 就近原则，紧耦合的文件应该放到一起，且应以相对路径引用
3. 公共的文件应该以绝对路径的方式从根目录引用

> 主要的原因还是绝对路径有全局的语义，相对路径有独立模块的语义。这点会方便新上手的人熟悉这个模块是共用的还是私有的。

> **为了在项目结构调整或者重构的时候，更快更安全的对文件进行修改。**

#### services示例代码

```
// msgService.js

/**
 * 留言板所用到的 API
 */
class MsgService {
  /**
   * 获取留言信息列表
   * @param   {String}   query.authors 作者名（逗号隔开）
   * @param   {String}   query.offset  skip 条数（默认 0）
   * @param   {String}   query.limit   每页显示条数（默认 5）
   * @resolve {Object[]} msgs
   */
  fetchList (query) {
    return xhr({
      url: '/msg',
      body: query
    })
  }
  
  /**
   * 删除留言信息
   * @param  {String} msgId
   * @return {Promise}
   */
  del (msgId) {
    return xhr({
      method: 'delete',
      url: `/msg/${msgId}`
    })
  }
}

// 实例化后导出，全局单例
export default new MsgService()
```

```
// Hello.vue

import msgService from '@/services/msgService'

msgService.fetchList().then(() => {});
```

> service设计参考了[这个仓库](https://github.com/kenberkeley/vue-demo/tree/master/src/services)


### 部署

* 指派专人负责


### HTML

* 语义化html（HTML5新增要求，减少div和span等无特定语义的标签使用）
* 应在html标签上加上lang属性。这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。
* 标签属性值用双引号
* 重要图片必须加上alt属性
* 给重要的元素和截断的元素加上title
* 使用须以"data-"为前缀来添加自定义属性
* 在页面中尽量避免使用style属性，即style="…"。
* 必须为含有描述性表单元素(input，textarea)添加label
* 使用代码代替特殊符号，如`&gt;` => (>)、`&lt;` => (<)

#### HTML5元素

| 元素               | 描述            |
| ----------------- | --------------- |
| `<header>`        | 定义页面或章节的头部。它经常包含 logo、页面标题和导航性的目录。 |
| `<footer>`        | 定义页面或章节的尾部。它经常包含版权信息、法律信息链接和反馈建议用的地址。 |
| `<aside>`         | 定义和页面内容关联度较低的内容——如果被删除，剩下的内容仍然很合理。 |
| `<nav>`           | 定义只包含导航链接的章节。 |
| `<article>`       | 定义可以独立于内容其余部分的完整独立内容块。  |
| `<section>`       | 定义文档中的一个章节。                    |
| `<main>`          | 定义文档中主要或重要的内容。               |
| `<audio>`         | 代表一段声音 ，或音频流 。                 |
| `<video>`         | 代表一段视频 及其视频文件和字幕，并提供了播放视频的用户界面。  |
| `<source>`        | 为 `<video>` 或 `<audio>` 这类媒体元素指定媒体源 。|
| `<figure>`        | 代表一个和文档有关的图例。          |
| `<figcaption>`    | 代表一个图例的说明。               |
| `<datalist>`      | 代表提供给其他控件的一组预定义选项 。 |
| `<progress>`      | 代表进度条 。   |
| `<meter>`         | 代表滑动条 。   |
| `<canvas>`        | 代表位图区域，可以通过脚本在它上面实时呈现图形，如图表、游戏绘图等。 |
| `<svg>`           | 定义一个嵌入式矢量图 。  |
| `<math>`          | 定义一段数学公式 。     |
| `<mark>`          | 代表一段需要被高亮的引用文字。 |
| `<wbr>`           | 代表建议换行 (Word Break Opportunity) ，当文本太长需要换行时将会在此处添加换行符。 |
| `<details>`       | 代表一个用户可以(点击)获取额外信息或控件的小部件 。 |
| `<summary>`       | 代表 `<details>` 元素的综述或标题 。 |



### CSS

* 样式表中中文字体名，请务必转码成unicode码
* 运用css精灵图技术集中小的背景图或图标，减小页面http请求，但注意，请务必在对应的精灵图psd源图中划参考线，并保存至img目录下
* 尽量将媒体查询的规则靠近与他们相关的规则，不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部，这样做只会让大家以后更容易忘记他们。
* css属性书写顺序，建议遵循：布局定位属性-->自身属性-->文本属性-->其他属性

#### CSS模块化

创建一个main.scss文件，里面只包含`@import`语句，如下所示
```
@import 'base';
@import 'message';
@import 'button';
@import 'media';
@import 'dropdown';
```

> 这样每个模块都单独拥有一个便于维护的文件

#### CSS方法论

* [BEM](http://getbem.com/introduction/)
* [ITCSS](https://csswizardry.com/2018/11/itcss-and-skillshare/)
* [ITCSS讲解](https://ruby-china.org/topics/37440)

`.b__e--m`

#### CSS预处理器

* less vs scss

> bootstrap => scss, ant-design => less


### JavaScript

* 标准变量采用驼峰式命名
* 常量全大写，用下划线连接
* jquery对象必须以'$'开头命名
* js最外层统一使用单引号
* 引入JS库文件，文件名须包含库名称及版本号及是否为压缩版，比如jquery-1.4.1.min.js。引入插件，文件名格式为库名称+插件名称，比如jQuery.bootstrap.js。


### Vue

[官方的 Vue 特有代码的风格指南](https://cn.vuejs.org/v2/style-guide/)


### 格式化

* 默认缩进2个空格

> 主流框架源码均采用缩进2个空格


### 命名规范

* 图片命名全部用小写英文字母||数字||_的组合


### 版本管理工具

* Git

##### .gitignore

```
.DS_Store
node_modules
dist

*.log

.idea
.vscode
```

> 警告：gitignore 的忽略规则只适用还没管理的文件，假如有在忽略规则添加之前已经被管理的文件，那添加的忽略规则将无法适用已经管理的文件


### Code Review

* Code Review 的首要目的是改善和保证代码质量，预防 bug。此外还有益于制定团队代码规范，形成团队技术氛围，加深技术团队成员沟通，老带新互助成长等等。
* Code Review 是代码编写到部署的必经部分，所有代码都必须经过 Review 才能 merge。

##### 代码审查工具

* [Gerrit](https://www.gerritcodereview.com/)：Google 开源的 git 代码审查工具；
* [GitHub](https://github.com/)：程序员应该很熟悉了，上面的 "Pull Request" 在代码审查这里很好用；
* [LGTM](https://lgtm.com/)：可用于 GitHub 和 Bitbucket 的 PR 代码安全漏洞和代码质量审查辅助工具；
* [Phabricator](https://www.phacility.com/phabricator/)：Facebook 开源的 git/mercurial/svn 代码审查工具； 
* [PullRequest](https://www.pullrequest.com/)：GitHub pull requests 代码审查辅助工具；
* [Pull Reminders](https://pullreminders.com/)：GitHub 上有 PR 需要你审核，该插件自动通过 Slack 提醒你；
* [Reviewable](https://reviewable.io/)：基于 GitHub pull requests 的代码审查辅助工具；
* [Sider](https://sider.review/)：GitHub 自动代码审查辅助工具；


### 编辑器

* vscode


### 单元测试

测试用例的逻辑很简单，首先构建一个我们期望的结果，然后调用业务代码，最后验证业务代码的运行结果与期望是否一致。这就是写测试用例的基本套路。

在写测试用例时尽量保持用例的单一职责，不要覆盖太多不同的业务范围。测试用例数量可以有很多个，但每个都不应该很复杂。

单元测试是TDD（Test Driven Development）**测试驱动开发**的基础。好的设计分层是很容易编写测试用例的，单元测试不单单只是为了保证代码质量，它会逼着你思考代码设计的合理性，拒绝面条代码。

> 改善代码质量不一定只能从测试入手，良好的代码规范，强制性的lint，强化代码审查，将不健壮的代码挡在review阶段才是比较靠谱的。

#### 测试框架

* Mocha 
* Jest
* Karma


### 其它

* 入口文件使用index.html
* 通用initial.css，初始化base.css，首页index.css
* 通用common.js，初始化base.js
* 文件夹或文件命名全部采用小写方式，以下划线分隔
* [github styleguide](https://styleguide.github.com/)
* [腾讯开发规范](http://alloyteam.github.io/CodeGuide/)


---


# Vue开发

> 除了专业前端外，我们还有些后端开发也会在这个框架基础上做些vue的开发

### Vue核心概念

* 数据驱动
* 组件系统

```
<!-- Hello.vue -->

<template>
  <div>
    <input type="number" v-model="count" placeholder="输入一个数字"> 
    计数：<span>{{count}}</span><button type="button" @click="add">click me</button>
    
    <other-component></other-component>
  </div>
</template>

<script>
  import OtherComponent from './OtherComponent.vue'
  
  export default{
    data(){
      return {
        count: 0
      }
    },
    components: {
      OtherComponent
    },
    created(){
      // 在实例创建完成后被立即调用。
    },
    mounted(){
      // 实例被挂载后调用
    },
    methods: {
      add(){
        this.count++;
      }
    }
  }
</script>

<style scoped>

</style>
```

* 使用 scoped 后，父组件的样式将不会渗透到子组件中。
* CSS 作用域不能代替 class。考虑浏览器性能问题，使用 class 或者 id 取代元素选择器。

### 创建一个项目

> Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。

1. 安装命令行工具 (CLI)
  
  `npm install -g @vue/cli`

2. 验证是否安装成功

  `vue --version`

3. 创建一个新项目

  `vue create hello-world`

4. 进入项目目录

  `cd hello-world`

5. 启动服务

  `npm run serve`


### 开发者工具

> Chrome and Firefox DevTools extension for debugging Vue.js applications.

[vue-devtools](https://github.com/vuejs/vue-devtools)


### 核心代码结构

> 开发过程中修改频率高的目录

```
project
├── src                    # 项目源码（核心文件）
│   ├── assets             # 资源文件，只存放公共的静态资源，这里的资源会被webpack构建
│   │   ├── images         # 图片
│   │   ├── css            # css模块化，UI 组件
│   │       ├── base.scss  # 
│   │       ├── table.scss # 
│   │       ├── main.scss  # 一个包含所有样式（公共样式）的样式表文件
│   ├── components         # 存放基础组件、公共组件
│   │   ├── AppChart.vue   # 图表组件
│   │   ├── AppTable.vue   # 表格组件
│   ├── mixins             # 混合
│   ├── services           # 抽取出API请求
│   │   ├── msgService.js  # 示例：消息模块服务，每个模块的API封装在一个js文件中
│   ├── utils              # 自己写的 js，里面各种工具类方法等
│   ├── views              # 所有页面
│   │   ├── warnConfig     # 报警配置模块
│   │   │   ├── components # 该模块的业务组件
│   │   │   ├── Page1.vue  # 页面1
│   │   └── subSystem      # 子系统模块
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
```

### 指令

* `v-show`
* `v-if`
* `v-else-if`
* `v-else`
* `v-for`
* `v-on` 或 `@`
* `v-bind` 或 `:`
* `v-model`


### ES6语法

#### 属性的简洁表示法

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。

```
let birth = '2000/01/01';

const Person = {

  name: '张三',

  // 等同于 birth: birth
  birth,

  // 等同于 hello: function (){}
  hello() { 
    console.log('我的名字是', this.name); 
  }

};
```

这种写法用于函数的返回值，将会非常方便。

```
function getPoint() {
  const x = 1;
  const y = 10;
  return {x, y}; // 等同于 {x: x, y: y}
}
```


#### 变量声明

1. **let**

let的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效，不存在变量提升。

```
function fn() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n);
}
```

上面的函数有两个代码块，都声明了变量n，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是 10。

> ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

除了let，还有const、class均不存在变量提升。

```
console.log(n); // ReferenceError
let n = 10;
```

2. **const**

const声明一个只读的常量。一旦声明，常量的值就不能改变。

```
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

```
const foo;
// SyntaxError: Missing initializer in const declaration
```

对于const来说，只声明不赋值，就会报错。

3. **class**

通过class关键字，可以定义类。

```
class Foo {
  // 实例属性
  bar = 'hello';
  baz = 'world';
  
  // 静态属性
  static myStaticProp = 42;

  // 方法
  toString() {
    return this.bar + ' ' + this.baz;
  }
}
```

注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

> 静态属性指的是 Class 本身的属性

> 基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

4. **import**

import命令用于输入其他模块提供的功能。

> 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口。

```
// profile.js

// 写法一
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

export function getFullname() {
  return 'Michael Jackson';
};

// 写法二
var firstName = 'Michael';
var lastName = 'Jackson';
var birthYear = 1958;

function getFullname() {
  return 'Michael Jackson';
}

export { firstName, lastName, birthYear as year, getFullname };


// 引用profile模块文件

// 写法一
import { firstName, lastName as surname, year, getFullname } from './profile.js';

// 写法二
import * as profile from './profile';

profile.firstName
profile.getFullname()


// default写法

// 写法三
// export default命令用于指定模块的默认输出。一个模块只能有一个默认输出。
export default {
  firstName,
  lastName,
  year,
  getFullname
}

// 这时import命令后面，不使用大括号。import命令可以为default变量指定任意名字
import profile from './profile';

profile.firstName
profile.getFullname()


// 错误写法

export 1;

var m = 1;
export m;

function f() {}
export f;

export default var a = 1;


// 正确写法
export var a = 1;

var a = 1;
export {a}

var a = 1;
export default a;

export default 1;
```

> import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。

> export default命令的本质是将后面的值，赋给default变量，输出一个叫做default的变量或方法，所以它后面不能跟变量声明语句。


参考：
[ES6 入门教程](https://es6.ruanyifeng.com/)



### Vue Router

#### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。