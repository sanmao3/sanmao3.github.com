# 前端开发规范

### 目录结构

```
project
├── build                  # Webpack 配置文件放在这里
├── config                 # Vue 基本配置文件放在这里
├── dist                   # 打包文件
├── docs                   # 说明文档
├── node_modules           # 第三方依赖
├── src                    # 项目源码（核心文件）
│   ├── assets             # 资源文件，只存放公共的静态资源，这里的资源会被webpack构建
│   │   ├── css            # css模块化，UI 组件
│   │       ├── main.scss  # 一个包含所有样式（公共样式）的样式表文件
│   ├── components         # 所有组件
│   │   ├── com1           # 组件1
│   │       ├── images     # 组件1静态资源
│   │       └── com1.vue   # 组件1
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
│   │           └── page1.vue
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── static                 # 纯静态资源，不会被webpack构建
├── test                   # 测试代码
├── .babelrc               # babel 编译配置
├── .editorconfig          # 代码格式
├── .gitignore             # Git 提交忽略的文件配置
├── .postcssrc.js          # 转换 css 的工具配置文件
├── package-lock.json      # 用来锁定依赖的版本号（NPM 自动生成）
├── package.json           # 项目基本信息
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
// .vue

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
* 重要图片必须加上alt属性。给重要的元素和截断的元素加上title
* 使用须以"data-"为前缀来添加自定义属性
* 在页面中尽量避免使用style属性，即style="…"。


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


###### 前期笔记

* 入口文件使用index.html
* 通用initial.css，初始化base.css，首页index.css
* 通用common.js，初始化base.js
* 必须为含有描述性表单元素(input，textarea)添加label
* 类名使用小写字母，以中划线分隔。id采用驼峰式命名
* 所有页面元素类图片均放入img文件夹，测试用图片放于demo文件夹。
* a_b a-b
* 中划线可能由于在某些平台上有问题，建议使用下划线
* 文件夹或文件命名全部采用小写方式，以下划线分隔
* 函数驼峰式
* [github](https://styleguide.github.com/)
* [腾讯开发规范](http://alloyteam.github.io/CodeGuide/)



