# throttle-debounce

> throttle - `节流`，debounce - `防抖`

## Features
> **关键词**：时间间隔、调用动作、执行动作
* 面向的问题：针对**指定时间间隔**内**调用**动作（意愿表达），如何**执行**该动作（意愿实现）？
* **throttle-debounce**引入的目的，在我看来是**为了避免调用的频繁执行**，它们是针对`频繁`事件的两种处理方式，将**调用与执行分开**，调用是一种**意愿表达**，执行是一种**意愿实现**
* `throttle`: 预先设定一个**执行周期**，当调用动作的时刻大于等于执行周期则**执行该动作**，然后进入下一个新的时间周期
    * 忽略指定时间间隔内的调用
    * 时间间隔外的调用立即执行
    * 指定时间周期会执行一次动作（存在调用的话），确保调用有响应
* `debounce`: 当**调用动作**触发`一段时间后`，才会**执行该动作**，若在这段**时间间隔**内又调用此动作则将`重新计算`时间间隔
    * 动作调用后，延迟指定时间间隔才会执行
    * 动作执行合并，时间间隔内的多次调用，只会执行一次，且执行时间会顺延到最后一个动作调用时刻起指定时间间隔后
    * 调用后不会立即执行，会增加延迟时间


## 应用场景

> 根据不同应用场景，选用不同的处理方案

1. `throttle` - **响应键盘输入、拖动页面元素**
    * 对于键盘事件，当用户输入非常频繁，但是我们又必须要在一定时间内（阈值）内执行处理函数的时候，就可以使用throttle，例如，一些网页游戏的键盘事件
    * 对于鼠标移动和窗口滚动，鼠标的移动和窗口的滚动会带来大量的事件，但是在一段时间内又必须看到页面的效果的情况，适合使用`throttle`，定期响应用户操作
    * 例如在页面上拖动元素，需要响应`*move`事件，根据鼠标位置，及时更新元素的位置。使用throttle，可以达到此种效果，如果使用debounce，那么元素会在**拖动停止后一下子跳到目标位置**，效果并不好

2. `debounce` - **下拉加载更多**
    * 对于mousemove, touchmove等频繁触发的事件，只希望执行一次动作的，可以通过**debounce**合并处理
    * 比如`下拉加载更多`的交互效果，当页面下拉超过触发范围后松开手指，会发起ajax请求；下拉超过触发范围后，不松开手指情况下离开触发范围，则不会发起ajax请求。需要根据`*move`事件来判定处在触发范围与否，由于`*move`事件非常频繁，如果不进行特殊处理，会出现频繁响应，形成抖动。此种情形适合使用debounce，在`*move`事件触发一段时间后，才响应，如果这段时间内，又继续触发该事件，则重新计算时间间隔



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



