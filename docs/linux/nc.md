# nc

> `nc` -- arbitrary TCP and UDP connections and listens

## Resources

* `ncat` - site: <http://nmap.org/ncat>
* nc命令用法举例： <https://www.cnblogs.com/nmap/p/6148306.html>
* `rsync` - <ref://./rsync.md.html>
* `lrzsz` - <ref://./lrzsz.md.html>
* `lftp` - <ref://./lftp.md.html>


## Features

* 支持`TCP`和`UDP`协议
* 支持端口`监听`，`扫描`
* 支持`管道`，通过管道能进行`文件`或`目录`的传输
* 支持`无账户验证`的数据传输，只需两个主机之间的网络是连通的即可
* Mac/Linux的自带命令
* 比`rs/sz`更新，比`ftp`灵活，比`scp`限制少
* `Mac版本`默认情况下，端口连通后，可以进行数据传输，等数据传输完毕后，接收端与发送端都会`同时退出`
* `Linux版本`默认情况下，数据传输完毕后，接收端与发送端都不会自动退出，需要分别使用`--send-only`与`--recv-only`选项
* 结合`tar命令`对目录结构的打包和解包，支持`目录结构`的传输


## Tips

* 只需要`单向连通`即可，比如在vpn环境下，本地机器能ping通远端机器，但远端机器无法ping通本地机器，这种情况可以`让远端机器监听端口`
* 一开始容易误解，监听端总是发送数据，连接端接受数据，但实际上，监听端和连接端的`数据都可以是双向的`
* 新版本（`比如v6.40`）的nc能更好的`支持双向传输`，目前mac默认自带的版本以及CentOS默认自带的版本可能都比较低，同时双向传输时，存在问题
* 不同版本，`选项参数不尽相同`，使用前最好仔细阅读命令行帮助：`nc -h`

        # listen mode on port
        # v1.10-40
        nc -l -p 9876

        # v6.40 
        nc --recv-only -l 9876

        # connect to listener
        # v1.10-40
        nc -q 1 123.5.17.8 9876

        # v6.40 
        nc 123.5.17.8 9876




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
    -q <seconds>    quit after EOF on stdin and delay of secs [ version 1.10-40 ]
    --send-only     只发送，新版本nc支持 [ version 6.40 on linux ]
    --recv-only     只接收，新版本nc支持 [ version 6.40 on linux ]
    ...


### 连通性测试

    # A 
    $ nc -l 9876
    # B
    $ nc -v -z A 9876 


### 发送数据

#### 监听端发送数据

    # 场景1.1：文件传输，监听端发送数据
    # A
    $ nc -l 9876 < a.json

    # 连接端接收数据
    # B
    $ nc -v A 9876 > a.json


    # 场景1.2：文件传输，监听端发送数据，通过管道，支持目录传输
    # A
    $ tar zcf - dir | nc -l 9876

    # 连接端接收数据，获取整个完整目录
    # B
    $ nc B 9876 | tar zxf -


#### 连接端发送数据

    # 场景2.1：文件传输，监听端接收数据
    # A
    $ nc -l 9876 > a.json

    # 连接端发送数据
    # B
    $ nc A 9876 < a.json


    # 场景2.2：文件传输，监听端接收数据，通过管道，支持目录传输
    # A
    $ nc -l 9876 | tar zxvf -

    # 连接端发送数据，打包发送整个完整目录
    # B
    $ tar zcvf - dir | nc B 9876


#### 双向传输数据

> 同时`双向传输`，和nc的版本有关，新版本`v6.40之间`可以稳定支持双向传输，低版本在双向传输上会出现问题

    # 场景3.1：监听端发送b.json文件，接收a.json文件
    # A
    $ nc -l 9876 > a.json < b.json

    # 连接端发送a.json文件，接收b.json文件
    # B
    $ nc A 9876 > b.json < a.json


    # 场景3.2：文件传输，监听端接收目录，发送文件a.json
    # A
    $ nc -l 9876 < a.json | tar zxvf -

    # 连接端打包发送目录，接收文件a.json
    # B
    $ tar zcvf - dir | nc B 9876 > a.json


#### Tips

* 默认情况下接收或发送完`EOF`后，自动退出
* 对于支持`--send-only`, `--recv-only`的版本，可能在碰到EOF后，仍然不会退出，需要显式设置

        # 发送
        $ tar zcvf - * | nc --send-only -l 9876
        # 接收
        $ nc --recv-only 123.78.99.25 9876 | tar zxvf -


### 其他 - todo




