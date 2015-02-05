# iOS8 Safari Bugs

> iOS8系统的bug之多令人吐槽N多，Safari的bug也是令人哭笑不得。

## iOS 8.1.2及以下

更新的版本还没出，尚不知新版本是否会修复这些问题。

`-webkit-transform`对不支持的3D变换函数，`不会做忽略处理`，导致其他支持的变换函数无法执行。
如下代码，在iOS8系统的Safari下，显示为空白。

但是iOS8系统下的其他浏览器，比如UC、QQ、百度、Chrome等都是正常的。安装了iOS8的iPhone4s， iPhone5s
都存在问题。iPhone6尚未测试。

实际上，类似代码，在iOS4都是正常的。可见iOS8确实被糟蹋的不行了。

    <!DOCTYPE html>
    <html>
    <head>
        <title>slides</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=320,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
        <meta name="format-detection" content="telephone=no" />
    </head>
    <body>
        <style type="text/css">
        #wrapper { 
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ffc;
            -webkit-transform: translateZ(-3000px) rotateZ(360deg) scale(.4); 
        }
        </style>
        <div id="wrapper"></div>
    </body>
    </html>

以上代码，如果将`translateZ(-3000px)`去除，就可以正常在iOS8 Safari上运行。

`2015-01-27：`这个bug也是有解决方案的，总的来讲，就是在iOS8 Safari上需要运行animation，
则需要在运行animation的元素之父元素（`不是body`）上添加`perspective`属性，如果父元素还有
`transform-style`属性，把它去除。

以上有bug的代码改成以下情况后，就能正常显示动画了。

        <style type="text/css">
        #wrapper { 
            -webkit-perspective: 5000px;
        }
        #inner {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ffc;
            -webkit-transform: translateZ(-3000px) rotateZ(360deg) scale(.4); 
        }
        </style>
        <div id="wrapper">
            <div id="inner"></div>
        </div>



