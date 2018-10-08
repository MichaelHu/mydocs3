# fullscreen

> js开启浏览器全屏模式

## Resources

* Javascript 开启浏览器全屏模式 <https://blog.csdn.net/VhWfR2u02Q/article/details/79784125>
* 怎么样用JavaScript让chrome浏览器全屏 <https://zhidao.baidu.com/question/1959125935518935220.html>


## Features

* 开启无缝全屏模式，不带标题栏、地址栏、Tab栏等
* 支持仅将某个DOM元素进行全屏展示


## 代码

以下代码来自网络，仅供参考：

    /**
     * 全屏方法
     */
    function fullScreen(domId) {
        var element = document.getElementById(domId);
        // request fullScreen
        this.request = function() {
            if (element.requestFullScreen) {
                element.requestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                // 对 Chrome 特殊处理，
                // 参数 Element.ALLOW_KEYBOARD_INPUT 使全屏状态中可以键盘输入。
                if (
                    window.navigator.userAgent.toUpperCase().indexOf("CHROME") >= 0
                ) {
                    element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                } else {
                    // Safari 浏览器中，如果方法内有参数，则 Fullscreen 功能不可用。
                    element.webkitRequestFullScreen();
                }
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else {
                throw new Error(
                    "your browser doesn't support the fullScreen,please change or update it."
                );
            }
            console.log(element.style.zIndex);
            return element.style.zIndex;
        };

        // 取消全屏
        this.cancelFullscreen = function() {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else {
                throw new Error(
                    "your browser doesn't support the fullScreen,please change or update it."
                );
            }
        };
    }

    // 判断当前状态是否为全屏
    var isFullScreen = function() {
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        )
            return true;
        else return false;
    };
