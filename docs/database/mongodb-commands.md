# mongodb-commands

> mongodb内建命令，各类DB Driver实现的方法，内部调用的都是这些Commands


`所有`数据库内建命令，都通过以下接口进行调用：

    db.runCommand( { ... } );

例如，`find`命令调用格式如下：

    db.runCommand(
        {
            find: "restaurants",
            filter: { rating: { $lt: 5 } },
            readConcern: { level: "majority" }
        }
    )


## Resources

* docs: <http://docs.mongodb.org/manual/reference/command/>


## 1 用户命令

* Aggregation Commands
* Geospatial Commands
* Query and Write Operation Commands
* Query Plan Cache COmmands


## 2 数据库操作

* Authentication Commands
* User Management Commands
* Role Management Commands
* Replication Commands
* Sharding Commands
* Instance Administration Commands
* Diagnostic Commands

    查看`myproject.documents`占用的数据空间：

        $ db.runCommand({dataSize: 'myproject.documents'})
        {
            "estimate" : false,
            "size" : 5293968,
            "numObjects" : 50108,
            "millis" : 12,
            "ok" : 1
        }    

    查看版本构建信息：

        $ db.runCommand({buildInfo: 1})
        {
            "version" : "3.0.5",
            "gitVersion" : "8bc4ae20708dbb493cb09338d9e7be6698e4a3a3",
            "OpenSSLVersion" : "",
            "sysInfo" : "Darwin bs-osx108-6 12.5.0 Darwin Kernel Version 12.5.0: Sun Sep 29 13:33:47 PDT 2013; root:xnu-2050.48.12~1/RELEASE_X86_64 x86_64 BOOST_LIB_VERSION=1_49",
            "versionArray" : [
                3,
                0,
                5,
                0
            ],
            "loaderFlags" : "",
            "compilerFlags" : "-Wnon-virtual-dtor -Woverloaded-virtual -stdlib=libc++ -std=c++11 -fPIC -fno-strict-aliasing -ggdb -pthread -Wall -Wsign-compare -Wno-unknown-pragmas -Winvalid-pch -pipe -Werror -O3 -Wno-unused-function -Wno-unused-private-field -Wno-deprecated-declarations -Wno-tautological-constant-out-of-range-compare -Wno-unused-const-variable -Wno-missing-braces -mmacosx-version-min=10.7 -std=c99",
            "allocator" : "system",
            "javascriptEngine" : "V8",
            "bits" : 64,
            "debug" : false,
            "maxBsonObjectSize" : 16777216,
            "ok" : 1
        }

* Internal Commands
* Testing Commands
* Auditing Commands




