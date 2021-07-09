## javascript
JS是本地客户端一段字符串而已,是浏览器这个客户端跑的即时性语言,JS不能直接访问服务端的任何东西,对服务端来说(在html或者其它页面里面的JS),它就是一段需要发送出去的字符串而已。
### HTTP
#### Referer
Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。
> 需要注意的是 referer 实际上是 "referrer" 误拼写
#### http response status codes
- Informational responses (100–199)
- Successful responses (200–299)
- Redirects (300–399)
- Client errors (400–499)
- Server errors (500–599)
[MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

##### 502 Bad Gateway

### console
启动一个计时器来跟踪某一个操作的占用时长
```
console.time(timerName)
console.timeEnd(timerName)
```

### repaint&reflow
#### repaint
A repaint occurs when changes are made to an elements skin that changes visibly, but do not affect its layout.

Examples of this include outline, visibility, background, or color. 

According to Opera, repaint is expensive because the browser must verify the visibility of all other nodes in the DOM tree.

#### reflow
A reflow is even more critical to performance because it involves changes that affect the layout of a portion of the page (or the whole page).

Examples that cause reflows include: adding or removing content, explicitly or implicitly changing width, height, font-family, font-size and more.

[重排](https://developers.google.com/speed/docs/insights/browser-reflow)
[REFLOWS & REPAINTS: CSS PERFORMANCE MAKING YOUR JAVASCRIPT SLOW](http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/)
[CSSTriggers](https://csstriggers.com/)

### debounce&throttle
防抖节流

### $event
$event中的各种坐标含义
clientX
clientY

### event loop 宏任务&微任务
ES6 规范中，microtask 称为 jobs，macrotask 称为 task
宏任务是由宿主发起的，而微任务由JavaScript自身发起。

[event-loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

## skia