## css

### 字体
#### Consolas
等宽字体


### position
- position: absolute元素切换display是否会产生reflow，影响性能

### 属性

#### animation
`animation` 是下列属性的一个简写属性形式。
```
animation-name: none
animation-duration: 0s
animation-timing-function: ease
animation-delay: 0s
animation-iteration-count: 1
animation-direction: normal | alternate | reverse | alternate-reverse
animation-fill-mode: none | forwards | backwards | both
animation-play-state: running | paused

@keyframes animation-name{
	
}
```
添加动画事件监听器
```
var e = document.getElementById("watchme");
e.addEventListener("animationstart", listener, false);
e.addEventListener("animationend", listener, false);
e.addEventListener("animationiteration", listener, false);

e.className = "slidein";


function listener(e) {
  var l = document.createElement("li");
  switch(e.type) {
    case "animationstart":
      l.innerHTML = "Started: elapsed time is " + e.elapsedTime;
      break;
    case "animationend":
      l.innerHTML = "Ended: elapsed time is " + e.elapsedTime;
      break;
    case "animationiteration":
      l.innerHTML = "New loop started at time " + e.elapsedTime;
      break;
  }
  document.getElementById("output").appendChild(l);
}
```

#### box-shadow
该属性可设置的值包括阴影的X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色。

#### filter滤镜
```
/* URL to SVG filter */
filter: url("filters.svg#filter-id");

/* <filter-function> values */
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);

/* Multiple filters */
filter: contrast(175%) brightness(3%);

/* Use no filter */
filter: none;

/* Global values */
filter: inherit;
filter: initial;
filter: unset;
```
[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
> `filters`属性值同样适用于`backdrop-filter`属性（为一个元素后面区域添加滤镜效果）

#### shape-outside
该属性定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装。
```
shape-outside: circle();
shape-outside: ellipse();
shape-outside: inset(10px 10px 10px 10px);
shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);
shape-outside: url(image.png);
```
示例
```
img.right {
	float: right;
	height: 100vh;
	width: calc(100vh + 100vh/4);
	shape-outside: polygon(40% 0, 100% 0, 100% 100%, 40% 100%, 45% 60%, 45% 40%);
	/* clip the image to the defined shape */
	clip-path: polygon(40% 0, 100% 0, 100% 100%, 40% 100%, 45% 60%, 45% 40%);
}
```
`shape-margin`用于设定由`shape-outside`创建的CSS形状的外边距。
```
shape-margin: 10px;
```

#### transform
```
transform: matrix(a,b,c,d,e,f);
```
matrix矩阵是transform变换的基础

#### scrollbar
```
/* 修改滚动条样式火狐 */
.menu-ver {
  scrollbar-color:rgb(239, 239, 239); /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
}
```


### function
#### image functions
These functions may be used wherever an `<image>` is valid as the value for a property.
#### linear-gradient()
- 网格背景实现原理
#### repeating-conic-gradient()
> 产生的锯齿问题怎么解决

#### var()
通过在 :root 伪类上设置自定义属性，然后在整个文档需要的地方使用，可以减少这样的重复性
```
:root {
  --main-bg-color: brown;
}

.one {
  color: white;
  background-color: var(--main-bg-color);
}
```
[var()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var())

### layout

#### flex
弹性容器属性
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

弹性元素属性
* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self

#### grid
By default, a grid item cannot be smaller than the size of its content.

Grid items have an initial size of min-width: auto and min-height: auto.

You can override this behavior by setting grid items to min-width: 0, min-height: 0 or overflow with any value other than visible.

#### table
#### table-cell




## less
### 循环
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




## app
```
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999;
}
```

#### 0.5px边框
```
  div {
		position: relative;
		padding: 15px;
		border-radius: 4px;
	}
	
	div:before {
		content: "";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid #000;
		transform: scale(0.5);
		transform-origin: 0 0;
		padding: 1px;
		box-sizing: border-box;
		pointer-events: none;
		border-radius: 8px;
	}
```

#### 上边框
```
  div:before{
    content: '';
		display: block;
		height: 1px;
	  position: absolute;
		left: 0;
		right: 0;
		top: 0;
		background: #c8c7cc;
		-webkit-transform: scaleY(0.5);
		-webkit-transform-origin: top;
  }
```

#### 背景模糊
```
backdrop-filter: blur(2px); // 扩展见mdn
```

#### 裁剪路径
```
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
``` 

#### 文本行数超出省略
```
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  text-overflow: ellipsis;
  overflow : hidden;
```
  
#### 两端对齐
```
  text-align: justify;
```
  
#### collapsing margins
1. overflow: hidden; (推荐)
2. padding: 1px;
3. border: 1px solid transparent;
4. position: absolute;
5. float: left;
> no line boxes, no clearance, no padding and no border separate them

## 库
### TailwindCSS

## 其它

### 常用颜色值
- 背景色：#EFEFF4
- 深边框色：#c8c7cc
- 浅边框色：#E8E8EA
