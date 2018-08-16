# throttle-debounce

> todo


## Features

* 针对`频繁`事件的两种处理方式
* throttle - `节流`，debounce - `去抖`
* `throttle`: 预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新的时间周期
* `debounce`: 当调用动作触发`一段时间后`，才会执行该动作，若在这段时间间隔内又调用此动作则将重新计算时间间隔


## 应用场景

1. `debounce`
    * 对于键盘事件，当用户输入比较频繁的时候，可以通过debounce合并键盘事件处理
    * 对于`下拉加载更多`的交互效果，当页面下拉超过一定范围，就发起ajax请求，由于touchmove或mousemove事件派发频繁，可以通过debounce合并事件
    * 另外，下拉加载更多，通常的交互应该是下拉松开手后，才会发起ajax请求
2. `throttle`
    * 对于键盘事件，当用户输入非常频繁，但是我们又必须要在一定时间内（阈值）内执行处理函数的时候，就可以使用throttle，例如，一些网页游戏的键盘事件
    * 对于鼠标移动和窗口滚动，鼠标的移动和窗口的滚动会带来大量的事件，但是在一段时间内又必须看到页面的效果，例如对于可以拖动的div，如果使用debounce，那么div会在拖动停止后一下子跳到目标位置；这时就需要使用throttle



## Resources

* [ 160921 ] 白话debounce和throttle <https://www.cnblogs.com/wilber2013/p/5893426.html>
* [ 180613 ] `throttle-debounce` - Throttle and debounce functions. <https://github.com/niksy/throttle-debounce> <iframe src="http://258i.com/gbtn.html?user=niksy&repo=throttle-debounce&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>

        # Install
        $ npm install throttle-debounce --save

        // Usage:
        import { throttle, debounce } from 'throttle-debounce';

        throttle( 300, function () {
            // Throttled function
        } );

        debounce( 300, function () {
            // Debounced function
        } );



