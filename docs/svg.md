
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

### TODO
- SVG编辑器，可以打开SVG文件进行修改