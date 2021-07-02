## css属性
### filter滤镜
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

### animation
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

### shape-outside
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

### transform
```
transform: matrix(a,b,c,d,e,f);
```
matrix矩阵是transform变换的基础



## css布局
### flex弹性布局
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

### grid网格布局


## LESS
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



## 其它
### 常用颜色值
背景色：#EFEFF4
深边框色：#c8c7cc
浅边框色：#E8E8EA


苹果手机点击背景色