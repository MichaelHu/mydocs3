# nc

> `nc` -- arbitrary TCP and UDP connections and listens

## Features

* 支持`TCP`和`UDP`协议
* 支持端口`监听`，`扫描`
* 支持`管道`，通过管道能进行`文件`或`目录`的传输
* 支持`无账户验证`的数据传输，只需两个主机之间的网络是连通的即可
* Mac/Linux的自带命令
* 比`rs/sz`更新，比`ftp`灵活，比`scp`限制少
* 端口连通后，可以进行数据传输，等数据传输完毕后，接收端与发送端都会`同时退出`，除非使用`-k`选项


## Resources

* nc命令用法举例： <https://www.cnblogs.com/nmap/p/6148306.html>


## Usage

### 常用选项

    选项            选项说明
    =========================================================================
    -h              打印帮助
    -l <port>       监听本地端口
    -k              当前连接完毕后，继续保持监听其他连接，必须与-l一起使用
    -v              verbose
    -z              只做端口扫描，不发送数据
    -w <seconds>    超时秒数
    ...


### 连通性测试

    # A 
    $ nc -l 9876
    # B
    $ nc -v -z A 9876 


### 发送数据

    # 文件传输
    # A
    $ nc -l 9876 > a.json
    # B
    $ nc -v A 9876 < a.json


    # 文件传输，通过管道，支持目录传输
    # A
    $ nc -l 9876 | tar zxf -
    # B
    $ tar zcf - dir | nc -v A 9876


    # 文件传输，通过管道，支持目录传输
    # A
    $ nc -l 9876 | tar zxvf -
    # B
    $ tar zcvf - dir | nc -v A 9876


### 其他 - todo



