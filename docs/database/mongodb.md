# MongoDB Memo

> Agility, scalability, performance. Pick three.
> 敏捷，扩展性，性能。三者皆得。

* Main: https://www.mongodb.org
* Install: http://docs.mongodb.org/manual/installation/
* Drivers: https://docs.mongodb.org/ecosystem/drivers/
* `Docs`: http://docs.mongodb.org/manual/



## 评价


MongoDB是一个`面向文档`的数据库，目前由`10gen`开发并维护，它的功能丰富，齐全，所以完全可以替代MySQL。
与MySQL等关系型数据库相比，MongoDB的`优点`如下：

* 弱一致性，更能保证用户的访问速度。
* 文档结构的存储方式，能够更便捷的获取数据。
* 内置`GridFS`，支持大容量的存储。
* 内置Sharding。
* 第三方支持丰富。（这是与其他的NoSQL相比，MongoDB也具有的优势）
* 性能优越



## 特点介绍

* `JSON`风格语法，MongoDB中的JSON文档称其为`BSON`，是JSON的二进制表达方式。
* `面向文档`：`Documents`类似于编程语言中的`结构体`，保存`key-value` pairs。
* `Collection`：集合，包含多个Document，类似于Table




## 安装


`普通青年`，HomeBrew安装：

    # 更新brew packages database
    $ brew update
    $ brew install mongodb

另：
    
    # 支持TLS/SSL
    $ brew install mongodb --with-openssl
    # 安装最新的开发版本
    $ brew install mongodb --devel


`文艺青年`，二进制包安装：

* 下载二进制包
* 解压至你希望的有权限的任何目录
* 添加`PATH`


## 使用

1. 建立数据目录 

        $ mkdir -p /path/to/db/data

    `默认的`mongodb数据文件目录是`/data/db`

        $ mkdir -p /data/db
    
    如果不是使用默认目录，则需要在启动时使用`--dbpath`选项传入

2. check： 确保启动mongodb的用户对数据目录有`读写权限`

3. 启动

        $ mongod

    如果自定义数据目录：

        $ mongod --dbpath /path/to/db/data

    配置文件： 

        $ mongod --config /usr/local/etc/mongod.conf


4. 交互命令行

    $ mongo



## CRUD操作

### find

每一次查询对应一个`Collection`，`find`命令通过JSON格式提供查询标准或条件

    $ db.users.find( { age: { $gt: 18 } } ).sort( { age: 1 } );

<img src="./img/crud-query-stages.png">



### insert 

    $ db.users.insert({name: "sue", age: 26, status: "A", groups: ["news", "sports"]});

<img src="./img/crud-insert-stages.png">



## 与NodeJS的配合

主要通过`express`







