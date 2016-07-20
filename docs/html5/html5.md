# html5

## CORS 

> Cross-Origin Resource Sharing，跨域（跨源）资源共享。

* REC文档：<http://www.w3.org/TR/cors/>
* `2014-01-16`成为`REC`文档
* 定义一种使`客户端`可以`跨域`请求的机制


### 原理简介

 <img src="./img/cors.png" height="260">

站点A`http://hello-world.example`的Server在Response Header中包含：

    Access-Control-Allow-Origin: http://example.org

站点B`http://example.org`的页面就可以不受同域限制，向站点A发起跨域请求。


#### 简单请求

1. 站点B页面发起AJAX请求：

        var client = new XMLHttpRequest()
        client.open("GET", "http://hello-world.example/hello")
        client.onreadystatechange = function() { /* do something */ }
        client.send()


2. 站点A返回Headers：

        Access-Control-Allow-Origin: http://example.org


#### 复杂请求

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






### Simple Things

#### Simple Method

* GET
* HEAD
* POST

#### Simple Header

* Accept
* Accept-Language
* Content-Language
* Content-Type: application/x-www-form-urlencoded
* Content-Type: multipart/form-data 
* Content-Type: text/plain


#### Simple Response Header

* Cache-Control
* Content-Language
* Content-Type
* Expires
* Last-Modified
* Pragma



### 字段格式

#### Response Headers

* Access-Control-Allow-Origin
* Access-Control-Allow-Credentials
* Access-Control-Expose-Headers
* Access-Control-Max-Age
* Access-Control-Allow-Methods
* Access-Control-Allow-Headers

#### Request Headers

* Origin
* Access-Control-Request-Method
* Access-Control-Request-Headers

