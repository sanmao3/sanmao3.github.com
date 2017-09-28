function ajax(options){
	var xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url);
    xhr.onreadystatechange = function(){
      	if(xhr.readyState == 4){
	        var result, status = xhr.status;
	        if(status >= 200 && status < 300 || status == 304){
	            result = JSON.parse(xhr.responseText);
	          	options.success(result);
	        }else{
	        	alert('请求失败');
	        }
      	}
    };
    if(options.type.toLowerCase() === 'post'){
      	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
    }
    xhr.send(options.data);
}
