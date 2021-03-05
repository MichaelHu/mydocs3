# sqlite

> 轻量级数据库


## 简介

* 官网：<https://www.sqlite.org/index.html> 
* 教程：<https://www.runoob.com/sqlite/sqlite-tutorial.html>
* sql的**四种**连接查询：<https://www.cnblogs.com/liandy0906/p/9961515.html>


## 数据类型

* **5**种大数据类型，**28**种小数据类型
* <img class="lazy" data-url="./img/sqlite-data-types-210124.jpg" style="max-height: 500px">


## 内建函数
> built-in functions
* 分为**五大类**函数：分别为SQL函数、时间函数、聚集函数、JSON函数以及Window函数
* **SQL函数**，也叫**核心函数**，是SQLite默认提供的，共有**41**个
* **聚集函数**有**7**个
        avg(X)
        count(*)
        count(X)
        group_concat(X)
        group_concat(X,Y)
        max(X)
        min(X)
        sum(X)
        total(X)
* 时间函数有




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





## 实践

    select project, daterange, sum(gs) as GS 
        from t_gs 
        where project like '%天津%综合%' 
        group by project, daterange;

    select a.dept, sum(b.gs) 
        from t_employees a, t_gs b 
        where a.name = b.name 
        group by a.dept 
        order by sum(b.gs) desc;

    select b.daterange, a.dept, sum(b.gs) as GS
        from t_employees a, t_gs b, t_projects c 
        where a.name = b.name 
            and b.project = c.name
            and c.dept = '智慧公安'
            and b.daterange like '21%'
        group by b.daterange, a.dept
        order by b.daterange, a.dept;

    select a.dept, sum(b.gs) as GS
        from t_employees a, t_gs b, t_projects c 
        where a.name = b.name 
            and b.project = c.name
            and c.dept = '智慧公安'
            and b.daterange like '21%'
        group by a.dept
        order by a.dept;

    select a.dept, sum(b.gs) as GS
        from t_employees a, t_gs b, t_projects c 
        where a.name = b.name 
            and b.project = c.name
            and c.dept = '智慧公安'
        group by a.dept
        order by a.dept;

    select a.name, a.project, sum(a.gs) 
        from t_gs a, t_projects b 
        where a.project = b.name and b.dept = '智慧公安' 
        group by a.name, a.project 
        order by a.name, sum(a.gs) desc;

    -- gs总表
    select b.daterange, a.name, a.dept, b.project, b.gs
        from t_employees a, t_gs b, t_projects c 
        where a.name = b.name
            and b.project = c.name
            and c.dept = '智慧公安'
        order by b.daterange;



