# Cookie备忘


> Cookie使用需谨慎，保持短小精悍



## 1 容量限制

4k Bytes


## 2 读取cookie

`document.cookie`，返回当前域名（包括父级域名）的cookie串。

cookie串由`'; '`分隔每个cookie，每个cookie按`name=value`的方式保存。如下格式：

    name1=value1; name2=value2; name3=value3

示例代码：

    var cookie = document.cookie;
    output: 
        name=test; name1=test1; name2=test2

读取时，只有`name=<value>`部分，不会包含其他cookie属性字段。每个cookie以`'; '`分隔。


### 2.1 cookie的四个属性

    name=<value>[; expires=<date>][; domain=<domain>][; path=<path>][; secure] 


### 2.2 属性默认值

* `domain`，默认为`location.hostname`，而不是location.host
* `path`，默认为当前路径，比如当前为`/static/abc/d.html`，则path为`/static/abc`。路径不存在，cookie设置不成功
* `expires`，默认为当前session有效


## 3 设置cookie


示例代码：

    document.cookie = 'name=test; expires=' + date.toGMTString() 
        + '; domain=' + domain
        + '; path=' + path
        + '; secure'
        ;


## 4 路径和域名属性

### 4.1 父路径

子路径能获取父路径下的cookie，比如`/static/abc`下，能获取path为`/static`的cookie。反之则不行

### 4.2 父域名

同父路径类似，子域名能获取父域名下的cookie，反之则不行


