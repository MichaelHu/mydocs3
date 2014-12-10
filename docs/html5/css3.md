# CSS3 Memo

## JSAPI: RequestAnimationFrame


最早由Mozilla的Reboert O'Callahan提出，他指出CSS transitions和animation的优势
在于浏览器知道哪些动画将会发生，所以得到正确的间隔来刷新UI。

而javascript动画，浏览器不知道动画正在发生，通过setTimeout或者setInterval定期操作DOM样式，js的这种
操作只是将渲染要求添加到UI渲染队列，并不保证立即渲染，UI渲染线程可能因为其他绘制
或者用户操作，延迟渲染，甚至出现丢帧现象。

他的解决方案是创建一个`mozRequestAnimationFrame()`方法，接收
一个参数，该参数是一个屏幕重绘前调用的函数，该函数对DOM进行样式改变，这些改变用在下一次重绘中。

    window.requestAnimFrame = ( function(){  
        return  window.requestAnimationFrame
            || window.webkitRequestAnimationFrame 
            || window.mozRequestAnimationFrame    
            || window.oRequestAnimationFrame      
            || window.msRequestAnimationFrame     
            || function( callback ){  
                window.setTimeout(callback, 1000/60);  
            };  
    })();  

    // 调用  
    function animationLoop(elem){  
        requestAnimFrame(animationLoop);  
        // logic  
        performStyleUpdate();
    } 

只执行一次，再次动画需要自行再调用requestAnimFrame。

这种方式，让浏览器知道Javascript何时尝试动画，利于浏览器做更多的优化处理。

优化在于，这种方式对于一个帧中对DOM的所有操作，只进行一次Layout和Paint，如果发生动画
的元素被隐藏了，那么就不再Paint。






## DOM-Event: transitionend 

> 该事件在transition完成时触发。如果在完成前，transition被移除，该事件不会被触发。

`事件特性：`

* bubbles: yes
* cancelable: yes
* context info: propertyName, elapsedTime, pseudoElement

`跨浏览器事件名：`

* Android and Safari: `webkitTransitionEnd`
* Opera: 10 as `oTransitionEnd`, 12 as `otransitionend`, 12.10 as `transitionend`

`Example:`

    function showMessage() {
        alert('Transition has finished');
    }

    var element = document.getElementById("slidingMenu");
    element.addEventListener("transitionend", showMessage, false);




## DOM-Event: Animation Events

> 关键帧动画开始、结束，以及每次循环结束都会触发DOM事件。

1. `animationstart`

    属性： animationName, pseudoElement

2. `animationend`

    属性： animationName, elapsedTime, pseudoElement

3. `animationiteration`

    属性： animationName, elapsedTime, pseudoElement


`事件特性：`

* bubbles: yes
* cancelable: no


`跨浏览器事件名：`
1. `webkitAnimationEnd`
2. `oAnimationEnd`
3. `MSAnimationEnd`



## min-device-pixel-ratio

移动系统支持情况：
* iOS3.2 +
* Android 2.1+

`检测页面：` <a href="http://bjango.com/articles/min-device-pixel-ratio/">min-device-pixel-ratio</a>

例如，针对3倍设备像素比的设备，使用`@3x`图片，可使用以下代码：

    @media only screen and (-webkit-min-device-pixel-ratio: 3) {
        selector {
            ...
        }
        ...
    }




## Media Queries

1. `W3C：`<a href="http://www.w3.org/TR/css3-mediaqueries/"></a>
2. `参考页面：`<a href="http://www.cnblogs.com/asqq/archive/2012/04/13/2445912.html">Media Queries详解</a>

    <link rel="stylesheet" media="screen and (max-width:600px)" href="small.css" type="text/css" />
    <link rel="stylesheet" media="screen and (min-width:900px)" href="big.css" type="text/css"  />
    <link rel="stylesheet" media="screen and (max-device-width: 480px)" href="iphone.css" type="text/css" />
    <link rel="stylesheet" media="only screen and (-webkit-min-device-pixel-ratio: 2)" type="text/css" href="iphone4.css" />
    <link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css" type="text/css" /> 
    <link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css"  type="text/css" />
    <link rel="stylesheet" media="not print and (max-width: 1200px)" href="print.css" type="text/css" />
    <link rel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" type="text/css" />

