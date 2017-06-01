# MongoDB Memo

> Agility, scalability, performance. Pick three.
> `敏捷，扩展性，性能`。三者皆得。

* Main: <https://www.mongodb.org>
* Install: <http://docs.mongodb.org/manual/installation/>
* Drivers: <https://docs.mongodb.org/ecosystem/drivers/>
* `Docs`: <http://docs.mongodb.org/manual/>



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

* `JSON`风格语法，MongoDB中的JSON文档称其为`BSON`，是JSON的`二进制`表达方式。
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

`Linux下安装：`除了常用系统的rpm包，还提供通用Linux版本的tarball包，兼容绝大部份的Linux系统，但不包含TLS/SSL支持。如果不需要TLS/SSL，tarball方法也是比较方便的。




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

    自定义端口：

        $ mongod --port 27017

    监听`27017端口`可能不一定能成功，比如该端口已被占用，
    这时需要通过`--port`选项，设置新的端口。

        $ mongod --dbpath=./data --fork --syslog --port 8345

    启动`server进程`，使用`--fork --syslog`选项。使用`nohup`和`&`无效。


4. 交互命令行

        $ mongo



## CRUD操作

查看`MongoDB CURDs`: <ref://./mongodb-curd.md.html>


## Operators操作符

DOCs: <http://docs.mongodb.org/manual/reference/operator/>

`4大类`：

1. Query and Projection Operators

    查看<a href="./mongodb-operators.md.html">MongoDB Operators</a>


2. Update Operators

    Update operators are operators that enable you to modify the data in your database or add additional data.

3. Aggregation Pipeline Operators

    Aggregation pipeline operations have a collection of operators available to define and manipulate documents in pipeline stages.

4. Query Modifiers

    Query modifiers determine the way that queries will be executed.





## MongoDB Shell

`MongoDB Shell Memo`: <ref://./mongodb-shell.md.html>





### 索引

MongoDB默认在创建collection时添加`_id`索引字段

后续可以使用`createIndex()`创建collection的索引字段

1. 单字段索引

        $ db.restaurants.createIndex( { "cuisine": 1 } )
        {
            "createdCollectionAutomatically" : false,
            "numIndexesBefore" : 1,
            "numIndexesAfter" : 2,
            "ok" : 1
        }


2. 复合索引

        $ db.restaurants.createIndex( { "cuisine": 1, "address.zipcode": -1 } )
        {
           "createdCollectionAutomatically" : false,
           "numIndexesBefore" : 2,
           "numIndexesAfter" : 3,
           "ok" : 1
        }



    


## BSON Types

> `BSON`是存储文档和RPC时使用的`二进制序列`化格式。MongoDB BSON provides support for additional data types than JSON.

* `BSON Types`: <http://docs.mongodb.org/manual/reference/bson-types>


### 支持的BSON数据类型

支持`20种`数据类型



### Comparison/Sort Order







> MongoDB提供多种语言支持的`驱动器（Driver）`

## 与NodeJS的配合


驱动器： `node-mongodb-native`

* `github`: https://github.com/mongodb/node-mongodb-native
* `docs`: http://mongodb.github.io/node-mongodb-native/2.0/api/



### 连接数据库

使用`MongoClient`：

    var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');

    // Connection URL
    var url = 'mongodb://localhost:27017/myproject';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        db.close();
    });



`插入数据`：

    var insertDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');

        // Insert some documents
        collection.insert(
            [
                {a : 1}, {a : 2}, {a : 3}
            ]
            , function(err, result) {
                assert.equal(err, null);
                assert.equal(3, result.result.n);
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the document collection");
                callback(result);
            }
        );
    }


`更新数据`：

    var updateDocument = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        // Update document where a is 2, set b equal to 1
        collection.update(
            { a : 2 }
            , { $set: { b : 1 } }
            , function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the document with the field a equal to 2");
                callback(result);
            }
        );  
    }






