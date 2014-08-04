# 事件中心 

% 事件中心 
| hdm258i@gmail.com
| 2013-04-02
| 基础, webapp框架

## 前言

`Backbone.Event`提供了事件交互机制的支持，使用事件交互，使功能模块之间形成一种松耦合。
rocket在此基础上，对事件交互的使用进行了规范。

## 页面事件中心

原则上，我们规定页面之间是相互独立的，页面之间`不能`进行交互。
这样才能确保页面开发的独立性，并行开发才有了可能。

事实上，页面之间确实没有或很少需要进行交互的。

所以，我们需要主要考虑的是页面内部功能模块之间的交互，`页面事件中心`作为页面内部的全局事件中心，
可由页面内部所有功能模块所使用，使页面功能模块之间更好的解耦。

视图类通过`this.ec`可以直接引用页面事件中心，例如：

    ...
    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }
    ...

实际上，页面事件中心就是视图树的`根节点`，也就是`页面UI控制器`。

## 局部事件中心

页面内部，每个功能模块都继承自Backbone.Event，都可以作为一个局部事件中心，
当一个事件`不需要`在页面这个级别进行派发的时候，就无需使用页面事件中心，
而直接使用功能模块本身提供的事件中心功能，达到部分功能模块间的事件交互。

例如`view`监听`model`对应的change事件，代码如下：

    ...
    ,registerEvents: function(){
        var me = this;

        me.model.on('change', me.render, me);
    }
    ...


## 子页面事件中心

`子页面`是一种非常常用的方式，webapp会频繁的进行子页面的创建和销毁（不同于页面，一般不进行销毁操作）。
子页面内部各组件进行松耦合交互，需要一个事件中心，这个事件中心能hold住整个子页面内部的所有模块。
`子页面事件中心`是一个级别最适合的事件中心。子页面内组件可以随时通过`this.subec`来引用子页面事件中心。

    ...
    ,registerEvents: function(){
        var me = this, subec = me.subec;

        subec.on("clean", me.onclean, me);
    }
    ...

## 预定义事件和处理函数

Rocket框架预定义了一些`事件`，这些事件默认`由框架派发`，页面和功能模块可`按需监听`，主要为以下两个事件：

* `pagebeforechange`： 页面切换前派发，此时页面切换动画尚未执行，当前页面可见，目标页面处于隐藏状态。
    比如`发起数据请求`等可在这里处理。
* `pageafterchange`： 页面切换完成后派发，此时页面切换动画已经执行完成。
    当前页面已经隐藏，目标页面展现。比如`创建子页面`等可在这里处理。

    这两个事件的参数如下结构：

        {
            from: <fromPageview>
            to: <toPageview>
            params: <options>
        }

* `routechange`：该事件与`globalview`相关，globalview可以独立于page存在，其可以`直接响应路由事件`，
    该事件当路由发生变化时触发，事件参数结构如下：

        {
            from: <fromPageView>
            to: <toPageView>
        }

此外，针对子页面管理，框架提供了两个`事件处理函数`，子页面通过实现该函数，以便对子页面事件进行响应：
* `onsubpagebeforechange`： 子页面切换前派发，此时子页面切换动画尚未执行。比如`发起子页面数据请求、展示隐藏子页面`等都可在这里处理。
* `onsubpageafterchange`： 子页面切换完成后派发，此时子页面切换动画已经执行完成。比如`子页面回收`等逻辑（框架已实现）可在这里处理。

以上两个子页面事件处理函数的`事件参数同页面事件`。以下是典型事件处理函数实现：

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        // 若是当前活动页面，则显示
        if(to == me.ec) {
            me.$el.show();
        }
    }

注意，子页面处理函数，`只有rocket.subpageview对象`会被调用，其`子模块`是无法进行响应的。


## 默认事件处理器

移动设备的特殊性，有某些事件是PC上没有的，比如屏幕旋转、陀螺仪等。目前webapp封装了`屏幕旋转`事件处理函数。

### onorientationchange事件处理函数

webapp页面在设备不同方向旋转时，页面布局会发生改变。有些情况下，通过CSS的设置，可以做到自适应变化。不过也有些需求是通过CSS样式无法做到的，这时就需要通过脚本来响应方向变化。

框架封装的`onorientationchange`事件处理函数有如下特性：

1. `活动页面`立即响应该事件
2. `非活动页`不会立即响应，但是会跟踪方向变化，等到其再次成为活动页时，响应该事件。当然，如果切换前又回到原来的方向，那么该事件就不再响应了。

使用方式为在rocket.pageview或者rocket.subview的实例方法中实现该函数即可，框架已经自动注册事件并会在适当时候触发该事件处理函数。代码举例如下：

    (function($){

    rocket.subview.listzaker_pageslider = rocket.subview.extend({

        ...

        ,onorientationchange: function(from, to){
            var me = this;


            me.setDisplayOptions(to);
            me.render(null, null, true);

            /**
             * @note: 设置左滚动距离，确保方向切换后页面仍然正常显示在同一页
             * @note: 避免尺寸读取错误，最好延时读取
             */
            setTimeout(function(){
                me.el.scrollLeft = 
                    (me.sliderIndex - 1) * me.$el.width();
            }, 0);

        }

    });

    })(Zepto);
