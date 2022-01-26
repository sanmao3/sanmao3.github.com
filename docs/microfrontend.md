# 微前端

## 微前端架构
### single-spa
qiankun是基于single-spa而封装了隔离及共享机制的框架，其简化了single-spa的相关生命周期，并且提供了沙箱隔离机制及共享机制


### qiankun
### MicroApp
我们借鉴了WebComponent的思想，以此为基础推出另一种更加组件化的实现方式：类WebComponent + HTML Entry。
计划2022/03发布1.0稳定版
* micro-app依赖于CustomElements和Proxy两个较新的API。
[京东MicroApp](https://segmentfault.com/a/1190000040408399)
### Garfish

简而言之，Module Federation 允许 JavaScript 应用程序在运行时从另一个应用程序动态导入代码。模块将构建唯一的 JavaScript 入口文件，其他应用程序可以通过设置 Webpack 配置项来下载该入口文件。
[Module Federation](https://webpack.js.org/concepts/module-federation/)
- html-entry
- 如何提取出公共的依赖库？
## 样式隔离
antd组件库样式隔离
```
{
  loader: 'less-loader',
+ options: {
+   modifyVars: {
+     '@ant-prefix': 'yourPrefix',
+   },
+   javascriptEnabled: true,
+ },
}
```
[antd less变量](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

## js隔离
-  window document localstorage  第三方脚本下载至本地
- CDN
- 微应用资源路径问题，查阅`__webpack_public_path__`，css中图片路径问题
```
const publicPath = process.env.NODE_ENV === 'production' ? 'https://qiankun.umijs.org/' : `http://localhost:${port}`;
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
              publicPath,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
              publicPath,
            },
          },
        ],
      },
    ],
  },
};
```

## 跨域
- 请确保接口请求没有跨域问题，因为子应用被加载到基座渲染，所以请求接口时origin为基座应用的域名
```
devServer: {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}
```

## 内存优化
```
let app
// 应用每次渲染时都会执行 mount 方法，在此处可以执行初始化相关操作（必传)
export function mount () {
  app = new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

// 应用每次卸载时都会执行 unmount 方法，在此处可以执行卸载相关操作（必传)
export function unmount () {
  // 卸载应用
  app.$destroy()
}

// 非微前端环境直接运行
if (!window.__MICRO_APP_ENVIRONMENT__) {
  mount()
}


// 将子应用修改为umd格式
// webpack.config.js
module.exports = {
  ...
  output: {
    library: 'micro-app-子应用的name', // 子应用的name就是<micro-app name='子应用的name'></micro-app>中name属性的值
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
}
```

## 路由
微应用建议使用 history 模式的路由
### 微应用之间跳转
```
history.pushState()
```
[pushState MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)
- 路由匹配
```
const childrenPath = ['/app1', '/app2'];
router.beforeEach((to, from, next) => {
  if (to.name) {
    // 有 name 属性，说明是主应用的路由
    next();
  }
  if (childrenPath.some((item) => to.path.includes(item))) {
    next();
  }
  next({ name: '404' });
});
```


## webpack
修改 webpack 打包，允许开发环境跨域和 umd 打包。
> 注意：运行时的 publicPath 和构建时的 publicPath 是不同的，两者不能等价替代。
[publicPath](https://webpack.docschina.org/guides/public-path/#on-the-fly)
```
const packageName = require('./package.json').name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

## 浏览器兼容性

## 部署
### 如何部署
### 应用更新文件缓存
服务器需要给微应用的 index.html 配置一个响应头：Cache-Control no-cache，意思就是每次请求都检查是否更新。


## 问题讨论
- beforeRouteLeave not triggered when switching between vue microfronends
- 共享能力、隔离机制、数据方案、路由鉴权


## 拓展
### Module Federation