# 个人云备忘


2015-05



两台个人云服务器，存储容量分别为`3T`。

1. mybooklive: http://mybooklive.local
2. wdmycloud: http://wdmycloud.local 


没有购买磁盘阵列，购买两个主要为了backup，以防某台服务器挂了，数据也不至于全部丢失。

开始尝试使用safe points做安全点备份，但是解决不了硬件损坏时的麻烦（都坏了，怎么安全点恢复？）

实际上，核心诉求是有两处不同的拷贝，要解决这个问题，就是两个服务器的镜像关系。



## 制作镜像

第一种方式，是通过电脑作为中转控制，在资源浏览器中分别打开两台服务器，通过文件复制方式进行镜像。这种方式
对于少许文件操作尚可，但是对于大批量文件操作，在操作繁琐和速度上会大打折扣。

第二种方式，可以考虑服务器之间的对拷。因为都是Linux Server，通过scp命令，直接进行文件复制

1. 开启ssh访问，wdmycloud直接有菜单选择开启，mybooklive需要输入指定url才能进入ssh开启界面

2. 登录主服务器：

        ssh root@mybooklive.local

3. 拷贝文件，假设从服务器的ip为192.168.1.5：

        cd /DataVolume/path
        scp -p test.jpg root@192.168.1.5:/DataVolume/path

    注意：`-p`选项用于保持文件属性；带空格的目录名，需要用反斜线转义空格，并包含在双引号中， 如：

        scp -rp NOKIA root@192.168.1.101:"/DataVolume/shares/Public/Shared\ Pictures"

    而不是：

        scp -rp NOKIA root@192.168.1.101:/DataVolume/shares/Public/Shared\ Pictures


## 拷贝文件的技巧

在这两台Linux Server上，shell命令没有manual可调，同时显示效果不好，使用Mac Pro自带的Terminal直连ssh，
如果目录名称带有中文，则显示乱码。但实际上，这两个server已经进行了locale配置，而且Terminal也做了encoding
配置，仍然显示乱码。

    echo $LANG
    zh_CN.UTF-8

目录显示乱码：

    MyBookLive:/DataVolume/shares/Public/Shared Pictures/IXUS851S# ls
    2008??????  2009??????  2010??????  2011??????  2012??????  2013??????

但是，敲命令的时候，如果使用tab键进行提示，中文却能正常显示。

另，Server上的VIM也很基本，中文输入照样支持不好，先将命令保存成文件的方案也比较麻烦，但是如果对复杂拷贝，还是有用的。

使用纯命令行的方式，能解决挺大一部分的问题，如下：

    MyBookLive:/DataVolume/shares/Public/Shared Pictures/IXUS851S# for i in `ls | head -2 | tail -1`; do scp -rp $i "root@192.168.1.105:/DataVolume/shares/Public/Shared\ Pictures/IXUS851S"; done

以上命令，将第二个目录复制到另一个server，由于使用了高速路由，复制速度比较快，达到`15M/s`







