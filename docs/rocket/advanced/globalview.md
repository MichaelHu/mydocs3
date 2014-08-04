% 跨页面视图：GLOBALVIEW 
% hdm258i@gmail.com
% 2013-05-13
% 进阶, webapp框架

## 前言

页面内部的子页面可以独立于页面导航自行切换，相比于子页面，页面导航是一个跨子页面的公共视图。
那么，跨页面的公共视图呢？比如pad的左导航，phone的底部导航，这些导航能触发页面的切换，但是自身并不切换，在页面切换过程中，这些部分保持不变。举例如下：


## GlobalView的设计要求

需满足以下几个要求：
* 支持并行开发。同页面的并行开发一样，GlobalView之间，GlobalView与Page之间都能并行起来
* 继续保持模块间充分解耦。需切断GlobalView之间，GlobalView与Page之间的依赖，使用低级别耦合：事件耦合
* 开发方式与Page开发尽可能保持一致。

## GlobalView的目录结构 

@todo: routechange事件
@todo: sidenav:relayout事件名称规范
@todo: 样式，z-index

本身响应routechange事件，并可对视图本身的用户交互事件作出响应，可以向page派发自定义事件，page无法向globalview派发自定义事件，这是自定义事件的单向性。
通常情况下，Globalview是路由级别的，主要由其向page派发自定义事件，page无需向globalview派发自定义事件。


