# sqlite

> 轻量级数据库


## 连接数据库

    # 如果db_file文件不存在，则会自动创建
    $ sqlite db_file

## 常用命令

    > .help

    # 列出所有表格
    > .tables

    # 查看表格规则
    > .schema table_name

    # 显示当前输出模式，list/csv等
    > .mode

    # 设置模式为csv模式
    > .mode csv

    # 显示目前配置
    > .show

    # 导入csv文件
    > .mode csv
    > .import file_path table_name





## 语句

    > select * from table_name;


## 学习

### 第一课

#### 命令集合

    -- 注释语法：--开头，或者/* ... */

    -- 显示数据库
    .databases

    -- 创建新表
    create table t1 ( id int primary key not null, name text not null, age int not null );

    -- 显示表格
    .tables

    -- 插入数据
    insert into t1 values ( 1, "hudamin", 38 );
    insert into t1 values ( 2, "huyifan", 6 );

    -- 查询数据
    select * from t1;

    -- 支持的输出模式
    .help mode

    -- 输出模式设置
    .mode ascii
    select * from t1;

    .mode list
    select * from t1;

    .mode csv
    select * from t1;

    .mode line
    select * from t1;

    .mode insert
    select * from t1;

    .mode tabs
    select * from t1;

    .mode quote
    select * from t1;

    .mode column
    select * from t1;

    .mode html
    select * from t1;

    .mode tcl
    select * from t1;

    -- dump数据库
    .dump


#### 操作

    # 复制以上命令，shell中执行以下语法
    > pbpaste | sqlite test.db

    # dump数据库
    > sqlite test.db .dump
    PRAGMA foreign_keys=OFF;
    BEGIN TRANSACTION;
    CREATE TABLE t1 ( id int primary key not null, name text not null, age int not null );
    INSERT INTO t1 VALUES(1,'hudamin',38);
    INSERT INTO t1 VALUES(2,'huyifan',6);
    COMMIT;








