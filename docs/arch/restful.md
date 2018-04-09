# RESTful

一种软件架构风格、设计风格，而不是标准，只是提供了一组设计原则和约束条件。它主要用于客户端和服务器交互类的软件。基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制。


## Resources

* 三分钟彻底了解Restful最佳实践 <https://blog.csdn.net/chenxiaochan/article/details/73716617>


## Features

> `REST`架构的主要原则

* 网络上所有事物都被抽象为资源
* 每个资源都有一个唯一的资源标识符
* 同一个资源具有多种表现形式（XML，json等）
* 对资源的各种操作不会改变资源标识符
* 所有的操作都是无状态的
* 符合REST原则的架构方式可称为RESTful

    * RESTful中文含义为`REST式的`
    * RESTful web service是一种常见的REST应用，是遵守了REST风格的web服务
    * RESTful web service是一种ROA( The Resource-Oriented Architecture ) - `面向资源`的架构


## RESTful接口

非RESTful接口：

    http://127.0.0.1/user/query/1   GET         根据用户id查询用户数据
    http://127.0.0.1/user/save      POST        新增用户
    http://127.0.0.1/user/update    POST        修改用户信息
    http://127.0.0.1/user/delete    GET/POST    删除用户信息

RESTful接口：

    http://127.0.0.1/user/1         GET         根据用户id查询用户数据
    http://127.0.0.1/user           POST        新增用户
    http://127.0.0.1/user           PUT         修改用户信息
    http://127.0.0.1/user           DELETE      删除用户信息


## HTTP方法

    method      operation       idempotent      safe
    ==================================================
    GET         SELECT          yes             yes
    POST        INSERT          no              no
    PUT         UPDATE          yes             no
    DELETE      DELETE          yes             no

    * idempotent - 幂等






