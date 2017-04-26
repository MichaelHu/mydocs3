# notes2


> 分三个模块 


## 数据端

> notes2_data

使用`MongoDB`进行数据存储，将`*.md`文件进行`按行存储`，同时解析每个文件的档案信息，包括标题等

    git clone https://github.com/MichaelHu/notes2_data.git
    cd notes2_data
    npm install
    cd src
    mongod --dbpath 
    node index.js [--dburl <dburl>] <docroot>



## Server端

> notes2

提供数据接口，支持`文档列表、全文检索`等通用数据接口

    git clone https://github.com/MichaelHu/notes2.git
    cd notes2
    npm install
    cd app
    node --use-strict --harmony notes2.js




## 前端

> mynotes

提供web展示，使用vim操作方式

    git clone https://github.com/MichaelHu/rocket_apps.git
    cd mynotes
    fis server start -p 8700 --PHP_EXEC /Users/hudamin/softwares/php/bin/php-cgi --rewrite
    fis release -c


