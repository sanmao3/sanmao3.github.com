# 数据可视化
## 分类
1. 图表
2. 图谱
3. 地图
4. 关系图
5. 立体图

# SVG

## 路径path
### 直线命令
```
L x y (or l dx dy)
H x (or h dx)
V y (or v dy)
```
Z命令会从当前点画一条直线到路径的起点，Z命令不用区分大小写。
### 曲线命令
#### 弧形
```
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
```
large-arc-flag（角度大小）决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧。
sweep-flag（弧线方向）0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧。
#### 曲线画圆公式(formulas)
```
<path d="M cx,cy
        m -r,0
        a r,r 0 1 1 (r * 2),0
        a r,r 0 1 1 -(r * 2),0"
/>
```

## 动画
```
  // 改变offset值，实现一些动效
  <defs>
    <linearGradient id="progress">
      <stop id="stop1" offset="0" stop-color="black"/>
      <stop id="stop2" offset="0" stop-color="grey"/>
    </linearGradient>
  </defs>
```

## TODO
- svg 画圆环，渐变
- SVG编辑器，可以打开SVG文件进行修改

# WebGL

# AR增强现实

# 动画库

# d3
[官网](https://d3js.org/)

# three.js 
# 玛雅软件
.glb 

# 拓扑图

网络拓扑图绘制调研

### VUE2+SVG
[github](https://github.com/Mirror198829/vue-topo)


### 乐吾乐
[官网](http://topology.le5le.com/)

> 目前开源的是核心库，可以基于核心库开发不同上层应用。核心库只有画布，左边图形库和右边属性栏属于上层业务，需要自己调用api文档里面的接口去实现。

### Vis.js
[官网](https://visjs.org/)

### Diagram Maker
是亚马逊开源的一个图编辑库
[官网](https://awslabs.github.io/diagram-maker/)

### G2
G2 一套面向常规统计图表

### G6
G6 是一个简单、易用、完备的图可视化引擎，它在高定制能力的基础上，提供了一系列设计优雅、便于使用的图可视化解决方案。能帮助开发者搭建属于自己的图可视化、图分析、或图编辑器应用。

### 其它
英文单词 diagram


## 可视化编辑
- 低代码 可视化编辑页面