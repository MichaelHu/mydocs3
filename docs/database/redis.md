# redis

## Resources

* site: <https://redis.io>


## Overview

* 开源（BSD协议）的`内存型`数据存储，用于数据库、缓存等
* 支持`多种类型数据结构`的存储：strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries.
* 内建支持`lua脚本`


## Installation

    $ wget http://download.redis.io/releases/redis-3.2.8.tar.gz
    $ tar xzf redis-3.2.8.tar.gz
    $ cd redis-3.2.8
    $ make
    $ src/redis-server --port 7379
    $ src/redis-cli -p 7339
    redis> set foo bar
    OK
    redis> get foo
    "bar"


## Start

    REDIS=/path/to/redis
    nohup $REDIS/src/redis-server --port <port> &


