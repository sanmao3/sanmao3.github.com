# CSS
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

* box-shadow 盒子阴影
* shape-inside
* shape-outside
* shape-margin
* shape-padding

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

## flex

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

```
transform: matrix(a,b,c,d,e,f);
```

matrix矩阵是transform变换的基础


背景色：#EFEFF4
深边框色：#c8c7cc
浅边框色：#E8E8EA


苹果手机点击背景色