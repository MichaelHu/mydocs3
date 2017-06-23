# mongodb-shell

> The mongo shell is an `interactive JavaScript interface` to MongoDB and is a component of the MongoDB package. You can use the mongo shell to query and update data as well as perform administrative operations.


## Common Shell

* `Shell Help`: <http://docs.mongodb.org/manual/tutorial/access-mongo-shell-help/>
* `URI`: <https://docs.mongodb.org/getting-started/shell/client/>


mongo命令帮助：

    $ mongo --help


启动：

    $ mongo


帮助：

    $ help
    $ db.help()


列出数据库：

    $ show dbs
    local
    myproject

也可使用：`show databases`

列出当前使用的数据库：

    $ db


选择数据库：

    $ use myproject



列出collection（等同于MySQL的table）：

    $ show collections

collection帮助：

    $ db.collection.help()

<collection>是任意collection的名称，即使不存在也是可以的。不存在的collection会被创建。
db下一级的属性，是collection级别的。

    $ db.abc.help()

abc这个collection还不会在`show collections`命令后显示：

    $ show collections

但是如果进行实质性数据操作后，比如：

    $ db.abc.insert({name: 'hudamin'})
    $ show collections
    abc

如果collection的名称含有一些特殊字符，不能直接接在db后面，可以使用以下方式：

    $ db["3test"].find()
    $ db.getCollection("3test").find()



列出用户列表：

    $ show users


列出用户角色：

    $ show roles
    > show roles
    {
        "role" : "dbAdmin",
        "db" : "local",
        "isBuiltin" : true,
        "roles" : [ ],
        "inheritedRoles" : [ ]
    }
    {
        "role" : "dbOwner",
        "db" : "local",
        "isBuiltin" : true,
        "roles" : [ ],
        "inheritedRoles" : [ ]
    }
    {
        "role" : "read",
        "db" : "local",
        "isBuiltin" : true,
        "roles" : [ ],
        "inheritedRoles" : [ ]
    }
    {
        "role" : "readWrite",
        "db" : "local",
        "isBuiltin" : true,
        "roles" : [ ],
        "inheritedRoles" : [ ]
    }
    {
        "role" : "userAdmin",
        "db" : "local",
        "isBuiltin" : true,
        "roles" : [ ],
        "inheritedRoles" : [ ]
    }


退出mongo，使用`CTRL-C`或者：

    $ quit()




其他：

    $ db.version()
    $ db.hostInfo()
    $ db.getName()
    $ db.auth(username, password)
    ...




## print

不带格式输出：

    $ print()

带格式输出：

    $ printjson()
    $ print(tojson())



## .mongorc.js

rc文件，$HOME目录下，如果存在`.mongorc.js`文件，则在第一次显示shell提示语前，先执行该文件。

@todo


## 环境变量

`EDITOR：`

    $ export EDITOR=vim
    $ mongo




## help

> help非常强大，好好利用

1. Command Line Help
    
        $ mongo --help

2. Shell Help

    查看可用命令

        $ help

3. Database Help
        
        $ show dbs
        $ db.help()
        $ db.<methodname>

4. Collection Help

        $ db.collection.help()

5. Cursor Help

        $ db.collection.find().help()




## Shell Scripts

* `Shell Scripts`: <http://docs.mongodb.org/manual/tutorial/write-scripts-for-the-mongo-shell/>


Shell和Shell Scripts在写法上的区别：


区别：

    show dbs, show databases    
    db.adminCommand('listDatabases')

    use <db>    
    db = db.getSiblingDB('<db>')

    show collections    
    db.getCollectionNames()

    show users  
    db.getUsers()

    show roles  
    db.getRoles({showBuiltinRoles: true})

    show log <logname>  
    db.adminCommand({ 'getLog' : '<logname>' })

    show logs   
    db.adminCommand({ 'getLog' : '*' })

    it  
    cursor = db.collection.find()
    if ( cursor.hasNext() ){
       cursor.next();
    }


`--eval`选项

    $ mongo test --eval "printjson(db.getCollectionNames())"

传入一个js片段用于执行，以上命令将collection的名称作为命令返回。


执行一个js文件：

    $ mongo localhost:27017/test myjsfile.js


在shell中载入一个js文件：

    $ load('mytest.js')




## Shell Types

> Mongo Shell支持的一些数据类型，是BSON提供的额外的比JSON多的数据类型

`Shell Types`: <http://docs.mongodb.org/manual/core/shell-types/>

* Date
* ISODate
* ObjectId
* NumberLong
* NumberInt

检验数据类型

    $ myDate instanceof Date
    $ typeof myDate



## Shell Methods


db.collection.***

cursor.***

db.***

    db.eval() // Deprecated
    db.runCommand()
    db.getCollection()
    db.getMongo()
    db.getName()
    db.help()
    db.hostInfo()
    db.logout()
    db.stats()
    db.version()
    db.repaireDatabase()
    db.copyDatabase()
    db.cloneDatabase()
    ...
    

PlanCache.***

Bulk.***


User Management:

    db.auth()
    db.createUser()
    ...


Role Management: 

    db.createRole()
    db.getRole()
    ...


Sharding:

    sh.help()
    ...


Constructor:

    Date()
    UUID()
    ...


Connection:

    Mongo()
    Mongo.getDB()
    ...





## Shell Examples


### 关于[object Object]

    // Deprecated
    $ db.documents.copyTo('abc')
    51008

    $ db.abc.copyTo(db.docs)
    51008
    $ show collections 
    [object Object]
    abc
    documents

想看看`[objcet Object]`是个什么鬼，需要怎么操作呢？

先看看各个collection的信息，可以看到`ns`字段：

    $ db.printCollectionStats()

    [object Object]
    {
        "ns" : "myproject.[object Object]",
        "count" : 50108,
    ...

知道ns以后，我们想把这个奇怪的collection干掉，可以这么操作：

    $ db.getCollection('[object Object]').drop()
    true




