MIME的英文名称是Mutipurpose internet mail extensions—多功能internet邮件扩充服务。

媒体类型是一种标准，用来表示文档、文件或字节流的性质和格式。

> 重要：浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理URL，因此Web服务器在响应头中添加正确的MIME类型非常重要。如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。

### 常见的MIME类型

1. **超文本标记语言文本** .html `text/html` 　　
2. **xml文档** .xml `text/xml` 　　
3. **XHTML文档** .xhtml `application/xhtml+xml` 　　
4. **普通文本** .txt `text/plain` 　　
5. **RTF文本** .rtf `application/rtf` 　　
6. **PDF文档** .pdf `application/pdf` 　　
7. **Microsoft Word文件** .word `application/msword` 　　
8. **PNG图像** .png `image/png` 　　
9. **GIF图形** .gif `image/gif` 　　
10. **JPEG图形** .jpeg,.jpg `image/jpeg` 　　
11. **au声音文件** .au `audio/basic` 　　
12. **MIDI音乐文件** mid,.midi `audio/midi`,`audio/x-midi` 　　
13. **RealAudio音乐文件** .ra, .ram `audio/x-pn-realaudio` 　　
14. **MPEG文件** .mpg,.mpeg `video/mpeg` 　　
15. **AVI文件** .avi `video/x-msvideo` 　　
16. **GZIP文件** .gz `application/x-gzip` 　　
17. **TAR文件** .tar `application/x-tar` 


#### text/css

在网页中要被解析为CSS的任何CSS文件必须指定MIME为text/css。通常，服务器不识别以.css为后缀的文件的MIME类型，而是将其以MIME为text/plain 或 application/octet-stream 来发送给浏览器：在这种情况下，大多数浏览器不识别其为CSS文件，直接忽略掉。特别要注意为CSS文件提供正确的MIME类型。

#### JavaScript MIME 类型

* `application/javascript`
* `application/ecmascript`
* `text/javascript`
* `text/ecmascript`

> 所有的 `text` JavaScript 类型已经被 RFC 4329 废弃。


### 参考
[常见 MIME 类型列表](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
[MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)