# JavaScript

## Array
### 常用方法
* forEach()
* map()
* filter()
* slice()
* join()
* includes()

### 7个会改变数组的函数
- arr.push() adds one or more elements to the end of an array and returns the new length of the array
- arr.unshift()
- arr.pop() removes an element from the end of an array and returns that element
- arr.shift() removes an element from the beginning
- arr.splice() it also returns a new array containing the value of the removed elements
- arr.reverse()
- arr.sort()

```
  // 首字母排序
  var ary = ['你好', '阳光', '美好'];
			
	ary.sort(function(a, b) { 
		return a.localeCompare(b);
	});
	
	console.log(ary); // 美好,你好,阳光
``` 


## String
* substr 未来将可能会被移除掉，使用`substring()`替代它
* substring(indexStart[, indexEnd])
* slice(beginIndex[, endIndex])
* charAt(index)
* str.padStart(targetLength [, padString])
* padEnd()

## Object
* Object.keys(obj)
* Object.values(obj)

## Number
* 指数计算 a**b=Math.pow(a, b)
### Math

## 正则表达式
* `/\d{2,}/.test(string)` 匹配至少连续2个数字,返回 true 或 false。

[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)


## 类型判断
### instanceof
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

### typeof

## Function

### 自调用函数
函数在创建之后直接自动执行，通常称之为自调用匿名函数（Self-Invoked Anonymous Function）或直接调用函数表达式（Immediately Invoked Function Expression）。
```
  (function(){
    	// 置于此处的代码将自动执行
	})();  
	
	(function(a,b){
	    var result = a+b;
	    return result;
	})(10,20)
```

### FileReader
```
// 图片URI转base64字符串
var generateBase64 = function(uri, callback){
	// 本地路径转base64
	var xhr = new XMLHttpRequest();       
	xhr.open("GET", uri, true); 
	xhr.responseType = "blob";
	xhr.onload = function (e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      callback(event.target.result);
    };
    reader.readAsDataURL(this.response);
	};
	xhr.send();
};
```

### window.URL.createObjectURL
```
  // Using object URLs to display images
  var img = document.createElement("img");
  img.src = window.URL.createObjectURL(files[0]);
  img.height = 60;
  img.onload = function() {
    window.URL.revokeObjectURL(this.src);
  };
```


## Proxy
通过代理，你可以轻松地验证向一个对象的传值。下面的代码借此展示了 set handler 的作用。
```
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // 表示成功
    return true;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age);
// 100

person.age = 'young';
// 抛出异常: Uncaught TypeError: The age is not an integer

person.age = 300;
// 抛出异常: Uncaught RangeError: The age seems invalid

```

### diff with Object.defineProperty

## Ajax
### 上传文件
```
var fd = new FormData(document.querySelector("form"));
fd.append("CustomField", "This is some extra data");
$.ajax({
  url: "stash.php",
	type: "POST",
	data: fd,
	processData: false,  // 不处理数据
	contentType: false   // 不设置内容类型
});
```
> 参考/examples/ajax.html

### Form enctype
enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。
| 值                                | 描述 |
| --------------------------------- | --- |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）|
| multipart/form-data               | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。|
| text/plain                        | 空格转换为 "+" 加号，但不对特殊字符编码。|

### 跨域请求
跨域请求并非是浏览器限制了发起跨站请求，而是请求可以正常发起，到达服务器端，但是服务器返回的结果会被浏览器拦截。

- JSONP，用 JSONP 获取的不是 JSON 数据，而是可以直接运行的 JavaScript 语句。
- CORS(Cross-Origin Resource Sharing)，在服务器中对返回信息的请求头进行设置。

[CORS MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)


## WebSocket
它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

* 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL

```
ws://example.com:80/some/path
```

### webSocket.readyState
* CONNECTING：值为0，表示正在连接。
* OPEN：值为1，表示连接成功，可以通信了。
* CLOSING：值为2，表示连接正在关闭。
* CLOSED：值为3，表示连接已经关闭，或者打开连接失败


## 注释标记
### @deprecated
### @param

## 其它
### bignumber
bignumber.js  js精度问题
----------------------------------------------

# Browser JavaScript
JS是本地客户端一段字符串而已,是浏览器这个客户端跑的即时性语言,JS不能直接访问服务端的任何东西,对服务端来说(在html或者其它页面里面的JS),它就是一段需要发送出去的字符串而已。
### HTTP
#### Referer
Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。
> 需要注意的是 referer 实际上是 "referrer" 误拼写

#### response status codes
- Informational responses (100–199)
- Successful responses (200–299)
- Redirects (300–399)
- Client errors (400–499)
- Server errors (500–599)
[MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

#### 502 Bad Gateway

### requestAnimationFrame
回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。
若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用requestAnimationFrame()。
```
window.requestAnimationFrame(callback);
```
返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 `window.cancelAnimationFrame()` 以取消回调函数。

### console
启动一个计时器来跟踪某一个操作的占用时长
```
console.time(timerName)
console.timeEnd(timerName)
```

### repaint
A repaint occurs when changes are made to an elements skin that changes visibly, but do not affect its layout.

Examples of this include outline, visibility, background, or color. 

According to Opera, repaint is expensive because the browser must verify the visibility of all other nodes in the DOM tree.

### reflow
A reflow is even more critical to performance because it involves changes that affect the layout of a portion of the page (or the whole page).

Examples that cause reflows include: adding or removing content, explicitly or implicitly changing width, height, font-family, font-size and more.

[重排](https://developers.google.com/speed/docs/insights/browser-reflow)
[REFLOWS & REPAINTS: CSS PERFORMANCE MAKING YOUR JAVASCRIPT SLOW](http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/)
[CSSTriggers](https://csstriggers.com/)

### debounce
### throttle
防抖节流

### event listener
#### $event
$event中的各种坐标含义
clientX
clientY
```
window.addEventListener("afterprint", function(event) {
  console.log(event)
});
```

### event loop
宏任务&微任务
ES6 规范中，microtask 称为 jobs，macrotask 称为 task
宏任务是由宿主发起的，而微任务由JavaScript自身发起。

[event-loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

### MutationObserver
**MutationObserver**接口提供了监视对DOM树所做更改的能力。
```
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```
