# cors

> `Cross-Origin Resource Sharing`，跨域（跨源）资源共享。

* `同源策略`，限制`脚本`发起的请求，比如XMLHttpRequest、Fetch请求
* 定义一种使`客户端`可以`跨域`请求的机制
* W3 REC文档：<http://www.w3.org/TR/cors/>
* `2014-01-16`成为`REC`文档
* MDN文档：HTTP访问控制（CORS）<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS>


## 场景

* XMLHttpRequest/Fetch跨域请求
* web字体，通过`@font-face`使用跨域字体资源
* `WebGL`贴图
* 使用`drawImage`将images/video绘制到canvas
* 样式表（CSSOM）
* Scripts（未处理的异常）


## 原理简介

 <img src="./img/cors.png" height="260">

站点A`http://hello-world.example`的Server在Response Header中包含：

    Access-Control-Allow-Origin: http://example.org

站点B`http://example.org`的页面就可以不受同域限制，向站点A发起跨域请求。


### 简单请求

1. 站点B页面发起AJAX请求：

        var client = new XMLHttpRequest()
        client.open("GET", "http://hello-world.example/hello")
        client.onreadystatechange = function() { /* do something */ }
        client.send()


2. 站点A返回Headers：

        Access-Control-Allow-Origin: http://example.org


### 复杂请求

1. 站点B页面发起`preflight`请求，是一个`OPTIONS`请求
2. 站点A返回的Headers：

        Access-Control-Allow-Origin: http://example.org
        Access-Control-Max-Age: 3628800
        Access-Control-Allow-Methods: PUT, DELETE

3. 站点B页面发起AJAX请求：

        function deleteItem(itemId, updateUI) {
            var client = new XMLHttpRequest()
            client.open("DELETE", "http://calendar.example/app")
            client.onload = updateUI
            client.onerror = updateUI
            client.onabort = updateUI
            client.send("id=" + itemId)
        }

4. 站点A返回Headers：

        Access-Control-Allow-Origin: http://example.org






## Simple Things

### Simple Method

* GET
* HEAD
* POST

### Simple Header

* Accept
* Accept-Language
* Content-Language
* Content-Type: application/x-www-form-urlencoded
* Content-Type: multipart/form-data 
* Content-Type: text/plain


### Simple Response Header

* Cache-Control
* Content-Language
* Content-Type
* Expires
* Last-Modified
* Pragma



## 字段格式

### Response Headers

* Access-Control-Allow-Origin
* Access-Control-Allow-Credentials
* Access-Control-Expose-Headers
* Access-Control-Max-Age
* Access-Control-Allow-Methods
* Access-Control-Allow-Headers

### Request Headers

* Origin
* Access-Control-Request-Method
* Access-Control-Request-Headers



## 服务器支持CORS

MDN: <https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Server-Side_Access_Control>






