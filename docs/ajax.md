#### 提交文件

    var fd = new FormData(document.querySelector("form"));
	fd.append("CustomField", "This is some extra data");
	$.ajax({
	  	url: "stash.php",
		type: "POST",
		data: fd,
		processData: false,  // 不处理数据
		contentType: false   // 不设置内容类型
	});