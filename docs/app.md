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