# RAP

> By analyzing structures of interface, RAP can generate mock data, validate real back-end interface. Around with interface definition, RAP supplys lots of automation tools to improve our efficiencies of team work!

> Web接口管理工具，开源免费，接口自动化，MOCK数据自动生成，自动化测试，企业级管理。阿里妈妈MUX团队出品！阿里巴巴都在用！1000+公司的选择！一直被抄袭，从未被超越

* site: <https://thx.github.io/RAP/>
* github: <https://github.com/thx/RAP>



## Why

* 能利用`mockjs`的数据模拟功能
* 与RD同时维护一份模拟数据，能及时同步数据接口的更新
* 现有`.json`文件mock方式`仅支持GET`方式，无法模拟POST方式
* 能导出数据接口文档
* 支持mock数据根据`queryString`动态变化，但只支持queryString的参数，而不支持POST data的参数




## Installation

### 使用online服务

<http://rap.taobao.org/org/index.do>


### 自行部署

<https://github.com/thx/RAP/wiki/deploy_manual_cn>

#### war包部署

* tomcat
* mysql
* 必须部署到`$TOMCAT/webapps/ROOT`


#### 源代码编译部署

J2EE开发环境





## 部署步骤

### JDK 1.8+

    wget http://download.oracle.com/otn-pub/java/jdk/8u121-b13/e9e7ea248e2c4826b92b3f075a80e441/jdk-8u121-linux-x64.tar.gz?AuthParam=1489495389_178ccccb0345e6924accd3deb184012e

解包，配置环境变量，使用以下命令验证：

    $ java -version
    java version "1.8.0_66"
    Java(TM) SE Runtime Environment (build 1.8.0_66-b17)
    Java HotSpot(TM) 64-Bit Server VM (build 25.66-b17, mixed mode)


### MySQL-5.6.12+

参考：<ref://../database/mysql.md.html>


### Redis 3+

    wget http://download.redis.io/releases/redis-3.2.8.tar.gz
    tar zxvf redis-3.2.8.tar.gz
    cd redis-3.2.8
    make
    ./src/




### Tomcat 8.+

> 是一个`JAVA`程序

* download: <http://mirrors.hust.edu.cn/apache/tomcat/tomcat-8/v8.5.12/bin/apache-tomcat-8.5.12.zip>
* setup: <http://tomcat.apache.org/tomcat-8.5-doc/RUNNING.txt>
* 配置环境变量: `JAVA_HOME`或`JRE_HOME`

相关脚本：

    $TOMCAT=/path/to/tomcat
    cd $TOMCAT
    vim conf/server.xml
    cd bin
    chmod 744 startup.sh shutdosn.sh catalina.sh
    ./startup.sh
    ./shutdown.sh
    

### RAP-0.14.1-SNAPSHOT.war

    unzip RAP-0.14.1-SNAPSHOT.war -d ROOT
    vim ROOT/WEB-INF/classes/config.properties
    cat ROOT/WEB-INF/classes/config.properties

        jdbc.driverClassName=com.mysql.jdbc.Driver
        jdbc.url=jdbc\:mysql\://localhost\:4567/rap_db?useUnicode\=true&characterEncoding\=utf8&zeroDateTimeBehavior\=convertToNull&noAccessToProcedureBodies\=true
        jdbc.username=rap
        jdbc.password=sophon
        redis.host=localhost
        redis.port=7379

    cp -r ROOT $TOMCAT/webapps






## RAP插件

> 解决跨域等的问题

    <script src="http://rap.taobao.org/rap.plugin.js?projectId=15243"></script>

插件源码：<http://rap.taobao.org/rap.plugin.js>

### 与react架构的项目的整合

* webpack本身提供的`proxy`功能实际上就是rap-plugin要做的，而且要更强大、方便
* 方案：使用`mockjsdata`接口 + `webpack proxy`



### 白／黑名单

获取项目白名单（所有接口路径列表）

    http://{domainName}/mock/getWhiteList.do?projectId={projectId}

    > GET /mock/getWhiteList.do?projectId=1 HTTP/1.1
    > Host: 172.22.1.105:9080
    > User-Agent: curl/7.51.0
    > Accept: */*
    >
    < HTTP/1.1 200
    < Set-Cookie: JSESSIONID=4EE0C9F516904606257BCE0D641FAA31;path=/;HttpOnly
    < Content-Type: text/html;charset=UTF-8
    < Content-Language: zh-CN
    < Transfer-Encoding: chunked
    < Date: Wed, 15 Mar 2017 10:23:24 GMT
    <
    ["/user/add","/graph/search","/search/page","/search/history"]


## 简单运维脚本

参考：<https://github.com/MichaelHu/shell-valley/tree/master/bash/rap>



## 常见问题

1. `__root__`属性，支持`最外层`数据的mock规则
2. `${queryparam}`，支持在属性值中引用请求参数的值
3. `/mockjsdata`与`/mockjs`，前者可以直接返回mock的数据
4. 路径匹配是去掉queryString以后再匹配，所以
        /graph?action=delete
        /graph?action=add
    总是匹配到delete，这时需要为参数名加上`{}`，来确保路径匹配能考虑queryString的值。
        /graph?{action}=delete
        /graph?{action}=add
5. restful API支持中，`/path/:type`仅命中的是`数字类型`的值
