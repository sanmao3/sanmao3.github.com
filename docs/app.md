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


----------------------------------------------


观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。