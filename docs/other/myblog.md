# myblog


> blog系统


## 一、fe.in部署


> 部署184机器 `10.10.10.184`

相关目录和代码库：

* `beatles-fe`： svn代码仓库
* /home/xiaoju/fe/apache
* /home/xiaoju/fe/svn_repos/beatles-fe/hooks
* /home/xiaoju/hudamin/fedocs
* /home/xiaoju/hudamin/projects/notes2_data
* /home/xiaoju/hudamin/projects/notes2/app/fedocs


### 1.1 Web Server

* 访问方式： <http://fe.in.didialift.com:8088/fe/>
* 主目录：`/home/xiaoju/fe/apache`
* 端口： `8088`
* 启动｜重启｜停止：

        ./bin/apachectl <start|restart|stop>

该Web Server上面还部署有`git、svn服务器`：

* svn服务器： `/home/xiaoju/fe/svn_repos`
* 访问方式： <http://10.10.10.184:8088/svn_repos/beatles-fe>


代码目录：`beatles-fe/beat-src/home/page`

* index.html： 首页 
* search.html： 检索页






### 1.2 数据服务端

端口： `3200`

启动：

    nohup node --use-strict --harmony fedocs.js &

示例： 

1. <http://10.10.10.184:3200/authors?callback=callback1&_=1461119433735>
2. <http://10.10.10.184:3200/noteslatest/0/10?callback=callback2&_=1461119433733>

其他：

1. 使用`KOA`框架
2. 代码主目录：`/home/xiaoju/hudamin/projects/notes2/app/fedocs/`
3. 程序主文件：`/home/xiaoju/hudamin/projects/notes2/app/fedocs.js`








### 1.3 文档编译


主目录：`/home/xiaoju/hudamin/fedocs`



1. 子目录`bin`

    svnhooks调用：

        sh build-all.sh

    全局重新编译：

        sh build-all-force.sh


2. 子目录`svnhooks`


    钩子脚本：`post-commit.sh`

    钩子部署在`/home/xiaoju/fe/svn_repos/beatles-fe/hooks`


3. 子目录`data`

    mongodb数据库数据目录


4. 子目录`docs`

    临时`svn co`仓库


5. 子目录`__tmp`

    站点根目录






### 1.4 数据端建库

数据库mongodb：`mongodb://localhost:8345/fedocs`

定期进行数据建库：

crontab，每两分钟执行一次按需构建：

    */2 * * * * /bin/bash /home/xiaoju/hudamin/fedocs/bin/build-notes2-data.sh


建库代码模块：`/home/xiaoju/hudamin/projects/notes2_data`



### 1.5 发送邮件提醒

以下两种情况会进行邮件提醒：

* svn提交
* 建库成功

设置接收邮件地址，有两个地方，分别是`post-commit.sh`和`build-notes2-data.sh`。


