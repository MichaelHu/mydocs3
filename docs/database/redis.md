# redis

site: <https://redis.io>

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


