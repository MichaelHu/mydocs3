# mysql

> changelog: 1703, 1509

## Resources

* site: <https://www.mysql.com>
* `5.7` docs: <https://dev.mysql.com/doc/refman/5.7/en/>
* community downloads: <https://dev.mysql.com/downloads/mysql/>
* 详解MySQL的用户密码过期功能: <http://www.jb51.net/article/79347.htm>
* 备份数据库：<https://dev.mysql.com/doc/refman/5.7/en/mysqldump-copying-database.html>


## Versions



## Installation

    $ wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.17-linux-glibc2.5-x86_64.tar.gz
    $ tar zxvf mysql-5.7.17-linux-glibc2.5-x86_64.tar.gz
    $ cd mysql-5.7.17-linux-glibc2.5-x86_64.tar.gz
    $ ls 
    bin  COPYING  docs  include  lib  man  README  share  support-files
    $ cd bin && ls
    innochecksum my_print_defaults mysql_config  mysqldump  mysqlpump  mysql_tzinfo_to_sql resolve_stack_dump
    lz4_decompress mysql mysql_config_editor mysqldumpslow mysql_secure_installation mysql_upgrade zlib_decompress
    myisamchk mysqladmin  mysqld  mysql_embedded mysqlshow  mysqlxtest
    myisam_ftdump  mysqlbinlog mysqld-debug  mysqlimport mysqlslap  perror
    myisamlog mysqlcheck  mysqld_multi  mysql_install_db mysql_ssl_rsa_setup replace
    myisampack  mysql_client_test_embedded mysqld_safe mysql_plugin  mysqltest_embedded  resolveip


## Start

    MYSQL=/path/to/mysql

### initialize db data

    $MYSQL/bin/mysqld \
        --initialize \
        --basedir=$MYSQL \
        --datadir=$MYSQL/data \
        --log-error=$MYSQL/logs/mysqld.log

会`自动`建立一个用户`root`，并且`密码在log文件中给出`。


### start server

    $MYSQL/bin/mysqld \
        --basedir=$MYSQL \
        --datadir=$MYSQL/data \
        --port=4567 \
        --plugin-dir=$MYSQL/lib/plugin \
        --user=root \
        --log-error=$MYSQL/logs/mysqld.log \
        --pid-file=$MYSQL/pids/mysqld.pid \
        --socket=$MYSQL/mysql.sock &


    $MYSQL/bin/mysql --port=4567 -uroot -p --socket=$MYSQL/mysql.sock
    mysql> show databases;
    ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
    # 从MySQL 5.7.6版开始，可以使用ALTER USER语句修改用户的密码
    mysql> alter user 'root'@'localhost' identified by 'newpassword';
    Query OK, 0 rows affected (0.00 sec)
    mysql> show databases;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    4 rows in set (0.00 sec)
    mysql> create database rap_db default charset utf8 COLLATE utf8_general_ci;
    Query OK, 1 row affected (0.00 sec)
    mysql> grant all on rap_db.* to 'rap'@'localhost' identified by 'sophon';
    Query OK, 0 rows affected, 1 warning (0.00 sec)
    mysql> flush privileges;
    Query OK, 0 row affected (0.00 sec)


### initialize db tables

    $MYSQL/bin/mysql \
        -urap -p --socket=$MYSQL/mysql.sock rap_db \
        < /path/to/ROOT/WEB-INF/classes/database/initialize.sql





## 简单数据库运维脚本

参考：<https://github.com/MichaelHu/shell-valley/tree/master/bash/rap>

