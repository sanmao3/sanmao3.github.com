# 前端开发规范

##### 前期笔记

* 语义化html（HTML5新增要求，减少div和span等无特定语义的标签使用）
* 入口文件使用index.html
* 通用initial.css，初始化base.css，首页index.css
* 通用common.js，初始化base.js
* 默认缩进4空格
* 标签属性值用双引号
* 引入JS库文件，文件名须包含库名称及版本号及是否为压缩版，比如jquery-1.4.1.min.js。引入插件，文件名格式为库名称+插件名称，比如jQuery.bootstrap.js。
* 使用须以"data-"为前缀来添加自定义属性
* 在页面中尽量避免使用style属性，即style="…"。
* 必须为含有描述性表单元素(input，textarea)添加label
* 重要图片必须加上alt属性。给重要的元素和截断的元素加上title
* css属性书写顺序，建议遵循：布局定位属性-->自身属性-->文本属性-->其他属性
* 样式表中中文字体名，请务必转码成unicode码
* 所有页面元素类图片均放入img文件夹，测试用图片放于demo文件夹。
* 图片命名全部用小写英文字母||数字||_的组合
* 运用css精灵图技术集中小的背景图或图标，减小页面http请求，但注意，请务必在对应的精灵图psd源图中划参考线，并保存至img目录下
* a_b a-b
* 中划线可能由于在某些平台上有问题，建议使用下划线
* 文件夹或文件命名全部采用小写方式，以下划线分隔
* 函数驼峰式
* 应在html标签上加上lang属性。这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。
* [github](https://styleguide.github.com/)
* [ITCSS](https://csswizardry.com/2018/11/itcss-and-skillshare/)
* [BEM](http://getbem.com/introduction/)
* [腾讯开发规范](http://alloyteam.github.io/CodeGuide/)