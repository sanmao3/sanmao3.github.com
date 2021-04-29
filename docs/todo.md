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
* 整理less循环
```
.head-picture(@n, @i:1) when (@i <= @n) {
  &:nth-child(@{i}) {
    transform: translateX(-30px * (@i - 1));
  }
  .head-picture(@n,(@i + 1));
}

&__item {
　　// ...
　　.head-picture(10);
}
```


* 《屠龙之技》作者：长铗
* jupyter notebook [](https://ipython.org/)
* 微前端
* 整理css linear-gradient repeating-conic-gradient等 以及产生的锯齿问题怎么解决


* 正则表达式整理
* 数据类型判断
* 废弃标志
