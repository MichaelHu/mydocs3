# Flux <img src="./img/flux_logo.svg">


> Flux is the `application architecture` that Facebook uses for building client-side web applications.

> An application architecture for React utilizing a unidirectional data flow.

`关键词`： 应用程序架构、React、Facebook

<https://facebook.github.io/flux/docs/overview.html>


## 一、初识

Facebook使用的webapp应用架构，用于`控制数据流`。它提出一种应用`架构模式`，而不是一个应用框架（代码库）。

所以，理解其架构思想才是关键。


### 1.1 3 Major parts

`单向`数据流，避开使用传统MVC。

<img src="./img/flux-simple-f8-diagram-explained-1300w.png" width="700">

* the dispatcher
* the stores
* the views

    React components


下图为一个flux应用的单向数据流示意图：

<img src="./img/flux-diagram-white-background.png" width="700">



Redux是一个接受度比较高的应用框架，Flux的设计思想的实现者。

Flux之于Redux，正如CommonJS之于RequireJS。

例子：

<https://github.com/facebook/flux/tree/master/examples/flux-todomvc>

<https://github.com/facebook/flux/tree/master/examples/flux-utils-todomvc>


