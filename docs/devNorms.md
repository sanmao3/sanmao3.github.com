# 前端开发规范

### 目录结构

```
project
├── build                  # Webpack 配置文件放在这里
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
│   ├── components         # 公用组件
│   │   ├── images         # 组件静态资源
│   │   └── Com1.vue       # 组件1
│   ├── constants          # 常量文件
│   ├── mixins             # 混合
│   ├── router             # 路由
│   ├── services           # 抽取出API请求
│   │   ├── msgService.js  # 示例：消息模块服务，每个模块的API封装在一个js文件中
│   ├── store              # 全局store管理
│   ├── utils              # 自己写的 js，里面各种工具类方法等
│   ├── vuex               # 状态管理
│   ├── views              # 所有页面
│   │   ├── module1        # 模块1
│   │       ├── components # 模块组件
│   │       └── Page1.vue  # 页面1
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── tests                   # 测试代码
├── .babelrc               # babel 编译配置
├── .editorconfig          # 代码格式
├── .env.development       # 只在开发模式中被载入，用来指定环境变量
├── .env.production        # 只在生产模式中被载入
├── .env.test              # 用来配置测试生产模式中的环境变量
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


### 代码检查和统一代码规范

#### ESLint
- 添加eslint配置文件 .eslintrc.js
- 添加eslint忽略配置文件.eslintignore
#### Prettier
#### .editorconfig
统一代码风格配置
#### 注释
注释应该着重描述“做了什么”而不是“怎么做”。


### 命名规范

* 图片命名全部用小写英文字母||数字||_的组合


### Git
#### Git命令
1. 创建分支
```
git checkout -b <branchname>
```
它是下面两条命令的简写：
```
git branch <branchname>
git checkout <branchname>
```
检出远程仓库的分支
```
git checkout -b <branch> --track <remote>/<branch>
```

2. 删除本地分支
```
git branch -d <branchname>
```
删除远程分支
```
git push origin --delete <branchname>
```
note: does not remove remote branches that no longer have a counterpart branch on the remote
```
git fetch
```
get rid of remote branches that no longer exist on the remote
```
git fetch --prune
```
show you an updated list of branches that really exist on the remote
```
git branch -r
```

3. 添加一个新的远程 Git 仓库，同时指定一个方便使用的简写
```
git remote add <remote-shortname> <remote-url>
```

4. 从远程仓库中抓取
```
git fetch <remote>
```

5. rebase
```
git rebase master
```

6. 将指定的提交commitHash，应用于当前分支。
```
git cherry-pick <commitHash>
```

7. push
```
git push <远程主机名> <本地分支名>:<远程分支名>
```

8. 切换分支提交
当前分支上的改动还没有commit时
```
git stash
git checkout <branch>
git stash pop
```

9. 查看项目远程地址
```
git remote -v
// 设置远程地址
git remote set-url origin git@github.com:**/**.git
// 查看文件记录
git log -- DELETED_FILE_PATH
```

基于cmp开发的项目关于与cmp框架同步更新的操作流程如下：
> 可以使用rebase命令实现如下功能

1. 添加cmp远程仓库
```
git remote add cmp-vue <cmp-vue-git-url>
```
2. 抓取cmp远程仓库资源到本地仓库
```
git fetch cmp-vue
```
3. 检出一个指向cmp/master的本地分支cmp-vue-master
```
git checkout -b cmp-vue-master --track cmp-vue/master
```
4. 切换到一个新分支
```
git checkout -b dev-branch-v2
```
5. 将dev-branch分支合并过来，操作成功后就可以在dev-branch-v2分支上继续开发了
```
git merge dev-branch
```
> 每当cmp有更新时，本地git pull后切换到cmp-vue-master分支，然后重复操作第4、5步操作。

#### commit messages 格式规范

commit message 由`header`、`body`、`footer`组成。

`header` 包含 `type`、`scope`、`subject`。

`header`是必需的，`body` 和 `footer` 可以省略。

##### Type类型必须是以下几种之一：

* **feat**: 新功能
* **fix**: bug 修复
* **docs**: 仅修改文档
* **style**: 修改格式（空格，格式化，省略分号等），对代码运行没有影响
* **refactor**: 重构（既不是修bug，也不是加功能）
* **build**: 构建流程、外部依赖变更，比如升级npm包、修改webpack配置等
* **perf**: 性能优化
* **test**: 测试相关
* **chore**: 对构建过程或辅助工具和库（如文档生成）的更改
* **ci**: ci相关的更改
* **revert**: 当前提交是为了撤销之前的某次提交。在revert后面加上被撤销的提交的`header`，在`body`中注明`This reverts commit <hash>.`，hash指的就是将要被撤销的commit SHA。

```
revert: feat(user): add user type

This reverts commit xxxxxxxxxx
```

##### Scope

scope可以指定提交更改的影响范围，这个视项目而定，当修改影响超过单个的scope时，可以指定为`*`。

##### Subject

subject是指更改的简洁描述，长度约定在50个字符以内，通常遵循以下几个规范：

* 用动词开头，第一人称现在时表述，例如`change xxxx`
* 第一个字母小写
* 结尾不加句号(.)

##### Body

body部分是对本地commit的详细描述，可以分成多行（|）。

body应该说明修改的原因和更改前后的行为对比。


##### Footer

footer基本用在这两种情况：

* 不兼容的改动（Breaking Changes），通常用`BREAKING CHANGE:`开头，后面跟一个空格或两个换行符。剩余的部分就是用来说明这个变动的信息和迁移方法等。
* 关闭Issue

#### .gitignore

```
.DS_Store
node_modules
dist

.env.local
.env.*.local

*.log

.idea
.vscode
```

> 警告：gitignore 的忽略规则只适用还没管理的文件，假如有在忽略规则添加之前已经被管理的文件，那添加的忽略规则将无法适用已经管理的文件



### 编辑器

* vscode



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



### 单元测试

测试用例的逻辑很简单，首先构建一个我们期望的结果，然后调用业务代码，最后验证业务代码的运行结果与期望是否一致。这就是写测试用例的基本套路。

在写测试用例时尽量保持用例的单一职责，不要覆盖太多不同的业务范围。测试用例数量可以有很多个，但每个都不应该很复杂。

单元测试是TDD（Test Driven Development）**测试驱动开发**的基础。好的设计分层是很容易编写测试用例的，单元测试不单单只是为了保证代码质量，它会逼着你思考代码设计的合理性，拒绝面条代码。

> 改善代码质量不一定只能从测试入手，良好的代码规范，强制性的lint，强化代码审查，将不健壮的代码挡在review阶段才是比较靠谱的。

#### Jest

安装 Jest 和 Vue Test Utils

```
npm install --save-dev jest @vue/test-utils
```

在 `package.json` 中定义一个单元测试的脚本

```
// package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

运行

```
npm run test
```

参考：[单元测试](https://vue-test-utils.vuejs.org/zh/installation/#%E7%94%A8-jest-%E6%B5%8B%E8%AF%95%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6)

[JEST](https://jestjs.io/docs/zh-Hans/getting-started)


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
  
```
npm install -g @vue/cli
```

2. 验证是否安装成功

```
vue --version
```

3. 创建一个新项目

```
vue create hello-world
```

4. 进入项目目录

```
cd hello-world
```

5. 启动服务

```
npm run serve
```


### vue.config.js

`devServer`配置的是开发环境下API请求代理功能，与生产环境不相关。


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
│   │   ├── warnSetting    # 报警配置模块
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

### v-model
自定义事件也可以用于创建支持 v-model 的自定义输入组件。记住：

<input v-model="searchText">
等价于：

<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
当用在组件上时，v-model 则会这样：

<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
为了让它正常工作，这个组件内的 <input> 必须：

将其 value attribute 绑定到一个名叫 value 的 prop 上
在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
写成代码之后是这样的：

Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
现在 v-model 就应该可以在这个组件上完美地工作起来了：

<custom-input v-model="searchText"></custom-input>
到目前为止，关于组件自定义事件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把自定义事件读完。

允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

Example：

Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  },
  // ...
})
<my-checkbox v-model="foo" value="some value"></my-checkbox>
上述代码相当于：

<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>

### provide/inject
类型：

provide：Object | () => Object
inject：Array<string> | { [key: string]: string | Symbol | Object }

provide 选项允许我们指定我们想要提供给后代组件的数据/方法。在这个例子中，就是 <google-map> 内部的 getMap 方法：

provide: function () {
  return {
    getMap: this.getMap
  }
}
然后在任何后代组件里，我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的 property：

inject: ['getMap']

### 生命周期

![生命周期图示](https://cn.vuejs.org/images/lifecycle.png)

### 插槽slot

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

#### 对象展开运算符

```
let z = { a: 3, b: 4 };
let n = { ...z }; // { a: 3, b: 4 }
```

```
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];
```

```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

> 解构赋值必须是最后一个参数，否则会报错。

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


#### 箭头函数

```
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};

// 箭头函数可以简化回调函数

// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);
```

> 箭头函数没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止

**使用注意点**

箭头函数有几个使用注意点。

1. 箭头函数不会创建自己的this，它只会从自己的作用域链的上一层继承this。

2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

#### Promise

Promise 是异步编程的一种解决方案。

Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

```
function getList(){
  return new Promise((resolve, reject) => { // resolve和reject是两个函数，由 JavaScript 引擎提供，不用自己部署。
    // ... some code

    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
}

getList().then(value => {
  
}).catch(error => {
  
}).finally(() => {
  
});
```

参考资源：
[ES6 入门教程](https://es6.ruanyifeng.com/)

```
const myPromise =
  (new Promise(myExecutorFunc))
  .then(handleFulfilledA,handleRejectedA)
  .then(handleFulfilledB,handleRejectedB)
  .then(handleFulfilledC,handleRejectedC);

// 或者，这样可能会更好...

const myPromise =
  (new Promise(myExecutorFunc))
  .then(handleFulfilledA)
  .then(handleFulfilledB)
  .then(handleFulfilledC)
  .catch(handleRejectedAny);
```
> 注意，所有的 promise 都一定是异步的。

**静态方法**
```
Promise.all(iterable)
Promise.allSettled(iterable)
Promise.any(iterable)
Promise.race(iterable)
Promise.reject(reason)
Promise.resolve(value)
```
> 有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。

**Promise原型方法**
```
Promise.prototype.catch(onRejected)
Promise.prototype.then(onFulfilled, onRejected)
Promise.prototype.finally(onFinally)
```


#### await

`await`操作符用于等待一个Promise对象。它只能在异步函数`async function`中使用。

```
async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}
```

#### Fetch

```
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```


### 技术栈

node > npm > vue > webpack > Vue CLI

#### babel

Babel 是一个 JavaScript 编译器。

主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

#### Vue-CLI

多页面配置


#### Vue Router

完整的导航解析流程

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


#### Vuex

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：
```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）

创建一个 store
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```
以 `store` 选项的方式“注入”该 store 的机制
```
new Vue({
  el: '#app',
  store
})
```
现在可以从组件的方法提交一个变更
```
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

#### 自定义指令
```
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

### Vue3
#### 安装
```
npm init vite@latest my-vue-app -- --template vue-ts
```
#### TypeScript


### 注意事项

* v-for需配合key使用


## NPM

node package manager

npm consists of three distinct components:

* the website
* the Command Line Interface (CLI)
* the registry

Use the website to discover packages, set up profiles, and manage other aspects of your npm experience. For example, you can set up Orgs (organizations) to manage access to public or private packages.

The CLI runs from a terminal, and is how most developers interact with npm.

The registry is a large public database of JavaScript software and the meta-information surrounding it.


[npm由来](https://www.zhihu.com/question/327989736/answer/787995048)

### CLI Commands

`npm link`

```
cd ~/projects/node-redis    # go into the package directory
    npm link                    # creates global link
    cd ~/projects/node-bloggy   # go into some other package directory.
    npm link redis              # link-install the package
```

Now, any changes to ~/projects/node-redis will be reflected in ~/projects/node-bloggy/node_modules/node-redis/. Note that the link should be to the package name, not the directory name for that package.

### NPM命令
查看npm版本
```
npm -v
```
更新npm
```
npm install -g npm
```
卸载
```
npm uninstall <package>
```
如需从 package.json 文件中删除依赖，需要在命令后添加参数 --save
```
npm uninstall --save lodash
npm uninstall --save-dev <package>
```
更新
```
npm update <package>              #更新局部模块
npm update -g <package>           #更新全局模块
npm update -g <package>@version   #更新全局模块指定版本
```
其它命令
```
npm view <package> versions #查看包的所有版本
npm i vue@2.0.0 --save      #安装指定版本
npm root                    #查看本地安装的目录
npm root -g                 #查看全局安装的目录
npm info package            #查看包信息
npm ls                      #查看本地安装包
npm ls -g                   #查看全局安装包，包含依赖
npm ls -g --depth 0         #查看全局安装包，不包含依赖
npm outdated                #列出所有不是最新版的包，可以带参数
npm cache clean             #清除本地缓存
npm config ls -l            #查看npm配置
npm publish                 #发布包
npm access                  #设置发布包的访问级别
npm search modulNmae        #搜索包是否存在
```

### 淘宝镜像代理
临时使用
```
npm --registry https://registry.npm.taobao.org install express
```
永久使用
```
npm config set registry https://registry.npm.taobao.org
```
配置CNPM，npm访问官方，cnpm访问代理
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
恢复使用
```
npm config set registry https://registry.npmjs.org
```
验证设置
```
npm info express
or
npm config get registry
```




## Webpack

webpack 是一个现代 JavaScript 应用程序的静态模块打包器。

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件。

[vue-cli手动配置webpack](https://vue-loader.vuejs.org/zh/guide/#vue-cli)

### 热更新

`webpack-dev-server`使用`sockjs`发送`websocket`

Webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。

### require.context
```
require.context(’./assets/image’, false, /.png$/).keys();
```
[require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)

### webpack.config.js
```
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'helloworld.js'
	},
	module: {
		rules: [{
				test: /\.vue$/,
				use: [{
					loader: 'vue-loader'
				}]
			},
			// 它会应用到普通的 `.js` 文件
			// 以及 `.vue` 文件中的 `<script>` 块
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			// 它会应用到普通的 `.css` 文件
			// 以及 `.vue` 文件中的 `<style>` 块
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		// 请确保引入这个插件！
		new VueLoaderPlugin()
	]
};
```


# Shell命令

* telnet
* ping
* unzip
* mkdir
* cd
* ls
* pwd	显示当前的目录路径
* rm 文件 删除文件
* rm -r 文件夹 删除文件夹
* cp -r dir1 dir2 将dir1下所有文件复制到dir2下

# CDN
内容分发网络（Content Delivery Network，简称CDN）是建立并覆盖在承载网之上，由分布在不同区域的边缘节点服务器群组成的分布式网络。
CDN应用广泛，支持多种行业、多种场景内容加速，例如：图片小文件、大文件下载、视音频点播、直播流媒体、全站加速、安全加速。


# 其它

### 本地服务

* `http-server`


### 代理

devServer代理原理：`node-http-proxy`创建客户端服务器，代理发送请求并返回数据。因为服务器之间请求不存在跨域

所谓的跨域，其实是浏览器拦截服务端返回的数据


### 优化

* 减少HTTP请求数

### 提示语

通过在list页面定义refresh方法，在detail页面的beforeDestroy钩子函数调用this.$parent.refresh()刷新页面，也看出event bus不适用于父子组件，官网也提到适用于兄弟组件的数据通讯

### 问题

scoped less文件中html,body样式不生效
原因：scoped只对当前组件里面的内容生效，会对组件里面的dom加data-v-hash属性，而不会对html,body等组件之外的dom添加,但是css里面的属性选择器都是data-v-hash属性的，所以匹配不上


FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory

Using an npm package to fix

1. install https://www.npmjs.com/package/increase-memory-limit globally
2. run `increase-memory-limit` in the root of your project

Manual fix

### 按钮权限控制

自定义指令以控制按钮是否显示


### html模板
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="keywords" content="your keywords">
		<meta name="description" content="your description">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>your title</title>
		<link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
	</head>
	<body>
	</body>
</html>
```