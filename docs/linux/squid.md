# squid

## Resources

* CentOS 6.4下Squid代理服务器的安装与配置 <http://www.cnblogs.com/mchina/p/3812190.html>
* C5-Squid-ACL，squid acl配置 <http://dngood.blog.51cto.com/446195/974188/>
* squid的简单介绍 <http://www.cnblogs.com/cherishry/p/5706736.html> 
* Squid中文权威指南 <http://www.phpfans.net/manu/Squid/>
* 鸟哥的Linux私房菜 - 第十七章、區網控制者： Proxy 伺服器 <http://linux.vbird.org/linux_server/0420squid.php>
* 电脑小白使用Shadowsocks搭建翻墙服务器傻瓜式手把手教程 <https://skwing.com/archives/use-bwg-through-the-gfw.html>
* liunx 下巧妙使用代理服务器（squid）<http://guojiping.blog.51cto.com/5635432/978839>


## Istallation

    # rpm -qa squid
    # yum -y install squid
    # vim /etc/squid/squid.conf
        ...
    # service squid start
    # cd /var/log/squid/
    # tail -f *.log

## Tips

使用squid做代理服务器，访问国外网站，基本行不通了。

