# JavaScript

## Array

* forEach
* map
* filter
* sort
* slice
* splice
* join
* includes()

## String

* substr 未来将可能会被移除掉，使用`substring()`替代它
* substring(indexStart[, indexEnd])
* slice(beginIndex[, endIndex])
* charAt(index)
* padStart()
* padEnd()

## Object

* Object.keys(obj)
* Object.values(obj)

## Number

* 指数计算 a**b=Math.pow(a, b)

## 正则表达式

* `/\d{2,}/.test(string)` 匹配至少连续2个数字,返回 true 或 false。

[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)


## instanceof
`instanceof` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
```
// 定义构造函数
function C(){}
function D(){}

var o = new C();


o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype


o instanceof D; // false，因为 D.prototype 不在 o 的原型链上

o instanceof Object; // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
C.prototype instanceof Object // true，同上

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

o instanceof C; // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.

D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true 因为 C.prototype 现在在 o3 的原型链上
```
[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
[参考文档](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)

