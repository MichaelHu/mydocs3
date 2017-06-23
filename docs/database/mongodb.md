# mongodb 

> `Agility`, `scalability`, `performance`. Pick three.
> `敏捷，扩展性，性能`。三者皆得。

> changelog: 1706, 1603, 1509 


## 相关资源

* Main: <https://www.mongodb.org>
* Install: <http://docs.mongodb.org/manual/installation/>
* Drivers: <https://docs.mongodb.org/ecosystem/drivers/>
* `Docs`: <http://docs.mongodb.org/manual/>
* JIRA board: <https://jira.mongodb.org/browse/SERVER/>



## Features

`MongoDB`是一个`面向文档`的数据库，目前由`10gen`开发并维护，它的功能丰富，齐全，所以完全可以替代MySQL。
与MySQL等关系型数据库相比，MongoDB的`优点`如下：

* 弱一致性，更能保证用户的访问速度。
* 文档结构的存储方式，能够更便捷的获取数据。
* 内置`GridFS`，支持`大容量`的存储。
* 内置Sharding。
* 第三方支持丰富。（这是与其他的NoSQL相比，MongoDB也具有的优势）
* 性能优越

其他特征列举：
* `JSON`风格语法，MongoDB中的JSON文档称其为`BSON`，是JSON的`二进制`表达方式。
* `面向文档`：`Documents`类似于编程语言中的`结构体`，保存`key-value` pairs。
* `Collection`：集合，包含多个Document，类似于Table



## 安装

> download center ( 社区版 ): <https://www.mongodb.com/download-center>

### Binary Packages
* 170623 - `v3.4.5`，该版本`已无32位安装包`: 
    * osx: <https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.5.tgz>
    * linux: <https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.4.5.tgz>


### 二进制包安装

* `下载`包并`解压`至目标目录，确保你对该目录有`读写`权限，一级目录结构如下：

        bin  GNU-AGPL-3.0  MPL-2  README  THIRD-PARTY-NOTICES

* 如果需要方便调用mongodb的命令，可将`bin`目录添加到系统`PATH`

`Linux下安装：`除了常用系统的rpm包，还提供通用Linux版本的tarball包，兼容绝大部份的Linux系统，但不包含TLS/SSL支持（补充：新版本已经支持SSL）。如果不需要TLS/SSL，tarball方法也是比较方便的。


### 使用brew安装

    # 更新brew packages database
    $ brew update
    $ brew install mongodb

另：
    
    # 支持TLS/SSL
    $ brew install mongodb --with-openssl
    # 安装最新的开发版本
    $ brew install mongodb --devel




## 启动数据库

1. 建立数据文件目录： 

        $ mkdir -p /path/to/db/data

    `默认的`mongodb数据文件目录是`/data/db`：

        $ mkdir -p /data/db
    
    如果不是使用默认目录，则需要在启动时使用`--dbpath`选项传入，务必确保启动mongodb的用户对数据目录有`读写权限`。

2. 使用`默认配置`启动数据库服务：

        $ mongod

    如果自定义数据目录，如上所述，`务必确保`目录读写`权限`：

        $ mongod --dbpath /path/to/db/data

    指定配置文件： 

        $ mongod --config /usr/local/etc/mongod.conf

    自定义端口：

        $ mongod --port 27017

    监听`27017端口`可能不一定能成功，比如该端口已被占用，这时需要通过`--port`选项，设置新的端口。

        $ mongod --dbpath=./data --fork --syslog --port 8345

    启动`server进程`，使用`--fork --syslog`选项。使用`nohup`和`&`无效。

    `成功启动`mongodb服务器以后，命令行上会提示`warning`：

        ** WARNING: Access control is not enabled for the database.
        **          Read and write access to data and configuration is unrestricted .

    该提示的原因是数据库没有启用`权限控制`，这时可以`匿名`访问数据库，并做任何操作，那样是`不安全`的；可以使用`--auth`选项开启：

        $ mongod --auth --dbpath=./data --fork --syslog --port 8345

    `! 注意`：不过，mongodb默认`没有`设置任何`账号`，所以`首次`启动全新数据库，不应添加`--auth`选项，待创建完账户后，再启动权限控制。


3. 交互命令行：

        $ mongo

    适用于`首次`连接数据库服务器，由于系统默认没有设置任何用户，数据库服务也没有使用`--auth`选项启动，这种情况下`匿名`用户就是`超级`用户。

    接下来需要尽快新建对应权限的`账号`，请参考<ref://./mongodb-user-role.md.html>，再用对应账号登录，比如超级用户root：

       $ mongo -uroot -proot admin 

    该命令默认情况下会连接`本地的27017端口`，连接成功的同时会显示`服务器版本`，以及`warning`信息：

        $ mongo
        MongoDB shell version v3.4.5
        connecting to: mongodb://127.0.0.1:27017
        MongoDB server version: 3.4.5
        ...
        > show dbs
        admin  0.000GB
        local  0.000GB
        > db
        test
        > db.test
        test.test
        > use admin
        switched to db admin
        > db.test
        admin.test
        > show collections
        system.version
        > use local
        switched to db local
        > show collections
        startup_log
        > db.startup_log.find()
        ....
        > exit

    如果是`远程`连接，则通过`--host`, `--port`设置连接主机：

        $ mongo -uroot -proot --host <HOST> --port <PORT> admin 


* `db`是当前数据库的`别名`






## Shell Commands

* `mongodb-shell-commands`: <ref://./mongodb-shell.md.html>
* shell命令在`底层`都调用`database-commands`
* shell命令相比Database命令`更便捷`


## Database Commands

* `mongodb-db-commands`: <ref://./mongodb-commands.md.html>
* 统一调用接口：`db.runCommand( ... )` 
* 相比shell命令，Database命令`功能更全`，更完善



## GridFS

> A convention for `storing large files` in a MongoDB database. All of the official MongoDB drivers support this convention, as does the mongofiles program. 

<https://docs.mongodb.com/manual/core/gridfs/>

todo



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

* `github`: <https://github.com/mongodb/node-mongodb-native>
* `docs`: <http://mongodb.github.io/node-mongodb-native/2.0/api/>



### 连接数据库

使用`MongoClient`：

    var MongoClient = require( 'mongodb' ).MongoClient,
        assert = require('assert');

    // Connection URL
    var url = 'mongodb://localhost:27017/myproject';
    // Use connect method to connect to the Server
    MongoClient.connect( url, function( err, db ) {
        assert.equal( null, err );
        console.log( "Connected correctly to server" );

        db.close();
    });



`插入数据`：

    var insertDocuments = function( db, callback ) {
        // Get the documents collection
        var collection = db.collection( 'documents' );

        // Insert some documents
        collection.insert(
            [
                {a : 1}, {a : 2}, {a : 3}
            ]
            , function( err, result ) {
                assert.equal( err, null );
                assert.equal( 3, result.result.n );
                assert.equal( 3, result.ops.length );
                console.log( "Inserted 3 documents into the document collection" );
                callback( result );
            }
        );
    }


`更新数据`：

    var updateDocument = function( db, callback ) {
        // Get the documents collection
        var collection = db.collection( 'documents' );
        // Update document where a is 2, set b equal to 1
        collection.update(
            { a : 2 }
            , { $set: { b : 1 } }
            , function( err, result ) {
                assert.equal( err, null );
                assert.equal( 1, result.result.n );
                console.log( "Updated the document with the field a equal to 2" );
                callback( result );
            }
        );  
    }






