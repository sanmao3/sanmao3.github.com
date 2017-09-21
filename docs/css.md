
* filter: drop-shadow 真实世界的投影

* box-shadow 盒子阴影

* shape-inside

* shape-outside

* shape-margin

* shape-padding


    img.right {
		float: right;
		height: 100vh;
		width: calc(100vh + 100vh/4);
		shape-outside: polygon(40% 0, 100% 0, 100% 100%, 40% 100%, 45% 60%, 45% 40%);
		/* clip the image to the defined shape */
		clip-path: polygon(40% 0, 100% 0, 100% 100%, 40% 100%, 45% 60%, 45% 40%);
	}

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


transform: matrix(a,b,c,d,e,f);

matrix矩阵是transform变换的基础


背景色：#EFEFF4
深边框色：#c8c7cc
浅边框色：#E8E8EA