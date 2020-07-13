::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999;
}


#### 0.5px边框

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

##### 上边框

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


#### 图片URI转base64字符串

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
    

#### Using object URLs to display images

    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(files[0]);
    img.height = 60;
    img.onload = function() {
    	window.URL.revokeObjectURL(this.src);
    };


#### 背景模糊

    backdrop-filter: blur(2px); // 扩展见mdn
    


#### 裁剪路径

    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    

#### 文本行数超出省略

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    text-overflow: ellipsis;
    overflow : hidden;
  
#### 两端对齐

    text-align: justify;
  
#### collapsing margins

1. overflow: hidden; (推荐)
2. padding: 1px;
3. border: 1px solid transparent;
4. position: absolute;
5. float: left;
  
> no line boxes, no clearance, no padding and no border separate them


#### CSS

* line-height, mobile垂直居中兼容问题
* vertical-align
* border-image
  
  
#### 首字母排序

    var ary = ['你好', '阳光', '美好'];
			
	ary.sort(function(a, b) { 
		return a.localeCompare(b);
	});
	
	console.log(ary); // 美好,你好,阳光
  


----------------------------------------------

#### 聊天

* 未读提醒
* 消息推送
* 聊天记录
* 图片缓存
* 聊天列表


#### WebSocket

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

* 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL


    ws://example.com:80/some/path


1. webSocket.readyState

* CONNECTING：值为0，表示正在连接。
* OPEN：值为1，表示连接成功，可以通信了。
* CLOSING：值为2，表示连接正在关闭。
* CLOSED：值为3，表示连接已经关闭，或者打开连接失败

----------------------------------------------


#### 移动端适配

dpr设备像素比及其相关概念与计算、分辨率

不同的dpr下，加载不同的尺寸的图片？如何实现？资源加载？安装包大小？

> 我想，做的好的公司，都会有这么一个图片服务器，通过url获取参数，然后可以控制图片质量，也可以将图片裁剪成不同的尺寸。  
所以我们只需上传大图(@2x)，其余小图都交给图片服务器处理，我们只要负责拼接url即可。



---------------------------------------------

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。




--------------------------------------------


#### 跨域请求


跨域请求并非是浏览器限制了发起跨站请求，而是请求可以正常发起，到达服务器端，但是服务器返回的结果会被浏览器拦截。

* JSONP

用 JSONP 获取的不是 JSON 数据，而是可以直接运行的 JavaScript 语句。

* CORS(Cross-Origin Resource Sharing)

在服务器中对返回信息的请求头进行设置。


参考：[CORS MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)


#### 自调用函数

函数在创建之后直接自动执行，通常称之为自调用匿名函数（Self-Invoked Anonymous Function）或直接调用函数表达式（Immediately Invoked Function Expression）。

    (function(){
    	// 置于此处的代码将自动执行
	})();  
	
	(function(a,b){
	    var result = a+b;
	    return result;
	})(10,20)
