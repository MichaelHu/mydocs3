# chrome extensions

> `Extensions` are small software programs that can `modify and enhance` the functionality of the Chrome browser. You write them using web technologies such as `HTML, JavaScript, and CSS`. Extensions bundle all their files `into a single file` that the user downloads and installs.

## Features

* 浏览器的扩展小程序
* `修改`或`增强`浏览器的功能，而不需要理解`native`代码的实现
* 使用`HTML／CSS／JavaScript`技术
* 所有所需资源都在安装包中，可`离线`运行

> `2016-8月起`，新上传的Chrome App仅限于Chrome OS使用，其他平台的Chrome浏览器不再可用。 <https://blog.chromium.org/2016/08/from-chrome-apps-to-web.html> [ 这貌似不影响本文谈的extension ]


## Resources

* `Getting started` [ `YouTube 插件` ]: <https://developer.chrome.com/extensions/getstarted>
* `Chrome Extension Overview`: <https://developer.chrome.com/extensions/overview>
* Extension reference: <https://developer.chrome.com/extensions>
* Chromium Blog: <https://blog.chromium.org/>
* `发布`扩展程序或应用`到应用商店`: <https://chrome.google.com/webstore/developer/dashboard>
* 发布产品的`详细参考文档`，可以发布4类产品「Websites, Chrome App, Extensions以及Themes」: <http://code.google.com/chrome/webstore>
* chrome extension CSP ( Content Security Policy ): <https://developer.chrome.com/extensions/contentSecurityPolicy>
* `CSP on W3C`: <https://w3c.github.io/webappsec-csp/>
* Chrome扩展开发（Gmail附件管理助手）系列 <http://www.cnblogs.com/ligerleng/p/gmail_assist_0.html>



## 插件开发相关

`.crx`是一个压缩文件

扩展图标 & 地址栏图标

Browser Actions & Page Actions

Browser Actions: 包含`popup`，全部页面都可以使用

Page Actions: 特定于某些页面

Background Pages: 后台运行

图标文件不小于`19px * 19px`

`manifest.json`配置：

    {  
      "name": "MyTaskList",  
      "version": "0.9.0",  
      "description": "Management my everyday's task lists.",  
      "browser_action": {  
        "default_icon": "icon.png" ,
        "default_title": "My Task List",
        "default_popup": "popup.html"
      }  
    }

popup.html源码不使用`html、header、body`标签




实现一个UI element: browser action

* 编写manifest.json，UI element以及permissions
* icon.png
* popup.html
* popup.js    
* 打开`chrome://extensions`，开启右上角的`开发者模式`
* 打开插件所在目录，导入插件；或者将插件目录拖拽到chrome也可以导入插件
* 修改插件代码，然后在`chrome://extensions`中刷新，即可查看修改后效果




## manifest.json 



## APIs

### global chrome

    chrome.tabs.query( queryInfo, callback );








## Tips

* html和js`必须分开`成两个文件，不能在html中直接编写js。参考 <https://developer.chrome.com/extensions/contentSecurityPolicy>。`默认情况`下，提供`严格`的资源`限制`，你需要`显式设置`黑白名单来确定资源的可访问性。

    * `manifest_version: 2`开始，提供默认的CSP设置

            {
                ...
                "content_security_policy": "script-src 'self'; object-src 'self'
                ...
            }

    * `严格`的默认设置`要求`：
        * `eval`以及`相关函数`不能使用，比如：

                alert( eval( "foo.bar.baz" ) );
                window.setTimeout( "alert( 'hi' )", 10 ); 
                window.setInterval( "alert( 'hi' )", 10 ); 
                new Function( "return foo.bar.baz" );

            而必须写成：

                alert( foo && foo.bar && foo.bar.baz );
                window.setTimeout( function() { alert( 'hi' ); }, 10 );
                window.setInterval( function() { alert( 'hi' ); }, 10 );
                function() { return foo && foo.bar && foo.bar.baz };

        * inline的js不执行，包括`<script>`标签内的内容，以及inline的事件处理函数，例如`<button onclick="...">`

        * 这两种限制，就`要求js`（控制行为的部分）需要`单独文件`存放，避免使用`eval`，并且使用`addEventListner`添加事件注册

        * `只能`加载`本地script`和object资源，比如你不能使用cdn上的jquery lib，只能将该lib下载并放到插件所在的package中

        * `chrome 46`开始，可以通过设置csp，放宽限制，具体可查看上述CSP文档的相关章节。 

                

* Chrome插件能直接访问本地硬盘的文件吗？<https://www.zhihu.com/question/21926079>




