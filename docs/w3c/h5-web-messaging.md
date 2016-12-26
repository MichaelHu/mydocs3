# h5 web messaging

> This specification defines two mechanisms for communicating between browsing contexts in HTML documents.

site: <https://www.w3.org/TR/2015/REC-webmessaging-20150519/>

* 浏览器不同上下文（context）之间的通信方式，比如不同tab之间
* 定义了2种通信方式


## MessageEvent接口


## 跨文档消息

> Cross-document messaging 

> 能获取到另一个文档的window对象，比如iframe

doc A:

    var o = document.getElementsByTagName('iframe')[0];
    o.contentWindow.postMessage('Hello world', 'http://b.example.org/');

doc B ( within an iframe of doc A):

    window.addEventListener('message', receiver, false);

    function receiver(e) {
        if (e.origin == 'http://example.com') {
            if (e.data == 'Hello world') {
                e.source.postMessage('Hello', e.origin);
            } else {
                alert(e.data);
            }
        }
    }



## Channel messaging

> 不能获取到另一个文档的window对象。

    var channel = new MessageChannel();
    // channel.port1
    // channel.port2

    port.postMessage( message[, transfer] )
    port.start()
    port.close()





