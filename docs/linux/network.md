# 网络命令

## 常用服务端口号

* Echo（7）
* FTP（21） 
* Ssh（22）
* Telnet（23） 
* SMTP（25）
* DNS（53） 
* HTTP（80）
* MTA-X.400 over TCP/IP（102） 
* pop3（110）
* NETBIOS Name Service（137、138、139） 
* IMAP v2（143）
* SNMP（161） 
* LDAP、ILS（389）
* Https（443） 
* IMAP(993)
* SQL(1433) 
* NetMeetingT.120(1503)
* NetMeeting(1720) 
* NetMeeting Audio Call Control(1731)
* 超级终端(3389) 
* QQ客户端(4000)
* pcAnywere(5631) 
* RealAudio(6970)
* Sygate (7323) 
* OICQ(8000)
* Wingate(8010) 
* 代理端口(8080)



## 网络配置

### ifconfig命令

#### mac

    # 列出所有网络接口
    $ ifconfig -l
    lo0 gif0 stf0 XHC20 en0 p2p0 awdl0 en1 en2 bridge0 utun0 utun1 en6

    # 列出所有网络接口的详细信息
    $ ifconfig
    $ ifconfig -a

    # 列出所有可用网络接口的详细信息
    $ ifconfig -u

    # 列出所有关闭的网络接口的详细信息
    $ ifconfig -d

    # 列出特定网络接口的详细信息
    $ ifconfig en0

    # 列出特定网络接口、特定网络地址的详细信息
    $ ifconfig en0 inet

    # 配置en0接口，ipv4网址以及子网掩码
    $ ifconfig en0 inet 192.0.2.10 netmask 255.255.255.0

#### linux

    ifconfig [interface]
    ifconfig interface [aftype] options | address ...

    # 列出所有网络接口的详细信息
    $ ifconfig

    # 列出特定网络接口的详细信息
    $ ifconfig eth0

##### Tips

* Linux下，ifconfig已经被`ip命令`所取代，建议使用ip命令



### scutil

> mac专有

    # 查看dns配置
    $ scutil --dns
    # 以下命令也可查看dns配置
    $ cat /etc/resolv.conf

    # 查看代理配置
    $ scutil --proxy





## 域名解析

### Resources

* Linux学习之域名解析命令 <https://www.cnblogs.com/sunfie/p/5138065.html>


### Tips

* 通过命令，可以查到域名的解析记录，但不表明该域名是可以访问的




### host命令

    $ host 172.17.10.61
    61.10.17.172.in-addr.arpa has address 61.10.17.172

    $ host -a 172.17.10.61
    Trying "61.10.17.172.in-addr.arpa"
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5659
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

    ;; QUESTION SECTION:
    ;61.10.17.172.in-addr.arpa.	IN	PTR

    ;; ANSWER SECTION:
    61.10.17.172.in-addr.arpa. 10	IN	A	61.10.17.172

    Received 59 bytes from 114.114.114.114#53 in 3 ms


### dig命令

    dig [@server] [FQDN] [type]

    $ dig www.baidu.com

    # 指定使用192.168.8.1作为域名解析服务器
    $ dig @192.168.8.1 www.baidu.com

    # 查询从根域名服务器开始，各级返回的解析结果
    $ dig www.baidu.com +trace



### nslookup命令

    $ nslookup www.258i.com
    Server:		192.168.8.1
    Address:	192.168.8.1#53

    Non-authoritative answer:
    Name:	www.258i.com
    Address: 123.56.89.145




## ping 

> send ICMP ECHO_REQUEST packets to network hosts




## telnet

> user interface to the TELNET protocol

    telnet [-468EFKLNacdfruxy] [-S tos] [-X authtype] \
        [-e escapechar] [-k realm] [-l user] \
        [-n tracefile] [-s src_addr] \
        [host [port]]




## netstat

显示传输和接收字节数

    $ netstat -b

> inet, for AF_INET, inet6, for AF_INET6 and unix, for AF_UNIX

    $ netstat -f inet

查看tcp协议的信息：

    $ netstat -Ab -p tcp

查看路由表：

    $ netstat -r

查看路由表，只显示ipv4：

    # -f: address family ( inet, ipv6 )
    $ netstat -r -f inet

查看路由表，只显示ipv6：

    $ netstat -r -f inet6

查看路由表，`网络地址`用`数字`（IP地址）展示：

    $ netstat -rn


### Examples

    # 未开启vpn时的路由表
    $ netstat -rn -f inet
    Routing tables

    Internet:
    Destination        Gateway            Flags        Refs      Use   Netif Expire
    default            172.22.152.254     UGSc          267        0     en0
    127                127.0.0.1          UCS             0        0     lo0
    127.0.0.1          127.0.0.1          UH             66   152976     lo0
    169.254            link#5             UCS             0        0     en0
    172.22.152/24      link#5             UCS             7        0     en0
    172.22.152.2/32    link#5             UCS             1        0     en0
    172.22.152.2       60:3:8:9e:25:a4    UHLWI           0        4     lo0
    172.22.152.32      70:ef:0:6a:54:d3   UHLWI           0        2     en0    726
    172.22.152.40      c4:b3:1:cf:e7:a9   UHLWI           0        0     en0    493
    172.22.152.58      c4:b3:1:d0:3d:bb   UHLWI           0        1     en0   1182
    172.22.152.78      c4:b3:1:ce:f3:f1   UHLWI           0        0     en0    559
    172.22.152.93      cc:29:f5:66:9b:c8  UHLWI           0       17     en0    726
    172.22.152.117     28:a0:2b:2b:a0:f8  UHLWI           0       10     en0
    172.22.152.254/32  link#5             UCS             1        0     en0
    172.22.152.254     58:66:ba:8:ce:c0   UHLWIir       224       16     en0   1108
    224.0.0/4          link#5             UmCS            2        0     en0
    224.0.0.251        1:0:5e:0:0:fb      UHmLWI          0        0     en0
    239.255.255.250    1:0:5e:7f:ff:fa    UHmLWI          0       54     en0
    255.255.255.255/32 link#5             UCS             0        0     en0

    # 开启vpn后的路由表
    $ netstat -rn -f inet
    Routing tables

    Internet:
    Destination        Gateway            Flags        Refs      Use   Netif Expire
    default            172.22.152.254     UGSc          281        0     en0
    2.0.1.14           2.0.1.14           UH            179        0    tun0
    127                127.0.0.1          UCS             0        0     lo0
    127.0.0.1          127.0.0.1          UH            266   165367     lo0
    169.254            link#5             UCS             0        0     en0
    172.16.1.1         2.0.1.14           UGHS            0        0    tun0
    172.16.1.2/31      2.0.1.14           UGSc            0        0    tun0
    172.16.1.4/30      2.0.1.14           UGSc            0        0    tun0
    172.16.1.8/29      2.0.1.14           UGSc            0        0    tun0
    172.16.1.16/28     2.0.1.14           UGSc            0        0    tun0
    172.16.1.32/27     2.0.1.14           UGSc            0        0    tun0
    172.16.1.64/26     2.0.1.14           UGSc            0        0    tun0
    172.16.1.128/25    2.0.1.14           UGSc            0        0    tun0
    172.16.2/23        2.0.1.14           UGSc            0        0    tun0
    172.16.4/22        2.0.1.14           UGSc            0        0    tun0
    172.16.8/21        2.0.1.14           UGSc            0        0    tun0
    172.16.16/20       2.0.1.14           UGSc            0        0    tun0
    172.16.32/19       2.0.1.14           UGSc            0        0    tun0
    172.16.64/19       2.0.1.14           UGSc            0        0    tun0
    172.16.96/20       2.0.1.14           UGSc            0        0    tun0
    172.16.112/21      2.0.1.14           UGSc            0        0    tun0
    172.16.120/22      2.0.1.14           UGSc            0        0    tun0
    172.16.124/23      2.0.1.14           UGSc            0        0    tun0
    172.16.126/24      2.0.1.14           UGSc            0        0    tun0
    172.16.127/25      2.0.1.14           UGSc            0        0    tun0
    172.16.127.128/26  2.0.1.14           UGSc            0        0    tun0
    172.16.127.192/27  2.0.1.14           UGSc            0        0    tun0
    172.16.127.224/28  2.0.1.14           UGSc            0        0    tun0
    172.16.127.240/29  2.0.1.14           UGSc            0        0    tun0
    172.16.127.248/30  2.0.1.14           UGSc            0        0    tun0
    172.16.127.252/31  2.0.1.14           UGSc            0        0    tun0
    172.16.127.254     2.0.1.14           UGHS            0        0    tun0
    172.16.128.1       2.0.1.14           UGHS            0        0    tun0
    172.16.128.2/31    2.0.1.14           UGSc            0        0    tun0
    172.16.128.4/30    2.0.1.14           UGSc            0        0    tun0
    172.16.128.8/29    2.0.1.14           UGSc            0        0    tun0
    172.16.128.16/28   2.0.1.14           UGSc            0        0    tun0
    172.16.128.32/27   2.0.1.14           UGSc            0        0    tun0
    172.16.128.64/26   2.0.1.14           UGSc            0        0    tun0
    172.16.128.128/25  2.0.1.14           UGSc            0        0    tun0
    172.16.129/24      2.0.1.14           UGSc            0        0    tun0
    172.16.130/23      2.0.1.14           UGSc            0        0    tun0
    172.16.132/22      2.0.1.14           UGSc            1        0    tun0
    172.16.134.5       2.0.1.14           UGHS            0        0    tun0
    172.16.136/21      2.0.1.14           UGSc            0        0    tun0
    172.16.144/20      2.0.1.14           UGSc            0        0    tun0
    172.16.160/21      2.0.1.14           UGSc            0        0    tun0
    172.16.168/23      2.0.1.14           UGSc            0        0    tun0
    172.16.170/25      2.0.1.14           UGSc            0        0    tun0
    172.16.170.128/26  2.0.1.14           UGSc            0        0    tun0
    172.16.170.192/27  2.0.1.14           UGSc            0        0    tun0
    172.16.170.224/28  2.0.1.14           UGSc            0        0    tun0
    172.16.170.240/29  2.0.1.14           UGSc            0        0    tun0
    172.16.170.248/30  2.0.1.14           UGSc            0        0    tun0
    172.16.170.252/31  2.0.1.14           UGSc            0        0    tun0
    172.16.170.254     2.0.1.14           UGHS            0        0    tun0
    172.17.0.1         2.0.1.14           UGHS            0        0    tun0
    172.17.0.2/31      2.0.1.14           UGSc            0        0    tun0
    172.17.0.4/30      2.0.1.14           UGSc            0        0    tun0
    172.17.0.8/29      2.0.1.14           UGSc            0        0    tun0
    172.17.0.16/28     2.0.1.14           UGSc            0        0    tun0
    172.17.0.32/27     2.0.1.14           UGSc            0        0    tun0
    172.17.0.64/26     2.0.1.14           UGSc            0        0    tun0
    172.17.0.128/25    2.0.1.14           UGSc            0        0    tun0
    172.17.1/24        2.0.1.14           UGSc            0        0    tun0
    172.17.2/23        2.0.1.14           UGSc            0        0    tun0
    172.17.4/22        2.0.1.14           UGSc            0        0    tun0
    172.17.8/21        2.0.1.14           UGSc            0        0    tun0
    172.17.16/20       2.0.1.14           UGSc            0        0    tun0
    172.17.32/19       2.0.1.14           UGSc            0        0    tun0
    172.17.64/18       2.0.1.14           UGSc            0        0    tun0
    172.17.128/18      2.0.1.14           UGSc            0        0    tun0
    172.17.192/19      2.0.1.14           UGSc            0        0    tun0
    172.17.224/20      2.0.1.14           UGSc            0        0    tun0
    172.17.240/21      2.0.1.14           UGSc            0        0    tun0
    172.17.248/22      2.0.1.14           UGSc            0        0    tun0
    172.17.252/23      2.0.1.14           UGSc            0        0    tun0
    172.17.254/24      2.0.1.14           UGSc            0        0    tun0
    172.17.255/25      2.0.1.14           UGSc            0        0    tun0
    172.17.255.128/26  2.0.1.14           UGSc            0        0    tun0
    172.17.255.192/27  2.0.1.14           UGSc            0        0    tun0
    172.17.255.224/28  2.0.1.14           UGSc            0        0    tun0
    172.17.255.240/29  2.0.1.14           UGSc            0        0    tun0
    172.17.255.248/30  2.0.1.14           UGSc            0        0    tun0
    172.17.255.252/31  2.0.1.14           UGSc            0        0    tun0
    172.17.255.254     2.0.1.14           UGHS            0        0    tun0
    172.22.0.1         2.0.1.14           UGHS            0        0    tun0
    172.22.0.2/31      2.0.1.14           UGSc            0        0    tun0
    172.22.0.4/30      2.0.1.14           UGSc            0        0    tun0
    172.22.0.8/29      2.0.1.14           UGSc            0        0    tun0
    172.22.0.16/28     2.0.1.14           UGSc            0        0    tun0
    172.22.0.32/27     2.0.1.14           UGSc            0        0    tun0
    172.22.0.64/26     2.0.1.14           UGSc            0        0    tun0
    172.22.0.128/26    2.0.1.14           UGSc            0        0    tun0
    172.22.0.192/27    2.0.1.14           UGSc            0        0    tun0
    172.22.0.224/28    2.0.1.14           UGSc            0        0    tun0
    172.22.0.240/29    2.0.1.14           UGSc            0        0    tun0
    172.22.0.248/30    2.0.1.14           UGSc            0        0    tun0
    172.22.0.252/31    2.0.1.14           UGSc            0        0    tun0
    172.22.0.254       2.0.1.14           UGHS            0        0    tun0
    172.22.1.1         2.0.1.14           UGHS            0        0    tun0
    172.22.1.2/31      2.0.1.14           UGSc            0        0    tun0
    172.22.1.4/30      2.0.1.14           UGSc            0        0    tun0
    172.22.1.8/29      2.0.1.14           UGSc            0        0    tun0
    172.22.1.16/28     2.0.1.14           UGSc            0        0    tun0
    172.22.1.32/27     2.0.1.14           UGSc            0        0    tun0
    172.22.1.64/27     2.0.1.14           UGSc            0        0    tun0
    172.22.1.88        2.0.1.14           UGHS            0        0    tun0
    172.22.1.96/29     2.0.1.14           UGSc            0        0    tun0
    172.22.1.105       2.0.1.14           UGHS            0        0    tun0
    172.22.1.106/31    2.0.1.14           UGSc            0        0    tun0
    172.22.1.108/30    2.0.1.14           UGSc            0        0    tun0
    172.22.1.110       2.0.1.14           UGHS            0        0    tun0
    172.22.1.112/28    2.0.1.14           UGSc            0        0    tun0
    172.22.1.128/26    2.0.1.14           UGSc            0        0    tun0
    172.22.1.192/27    2.0.1.14           UGSc            0        0    tun0
    172.22.1.224/28    2.0.1.14           UGSc            0        0    tun0
    172.22.1.240/29    2.0.1.14           UGSc            0        0    tun0
    172.22.1.248/30    2.0.1.14           UGSc            0        0    tun0
    172.22.1.252/31    2.0.1.14           UGSc            0        0    tun0
    172.22.1.254       2.0.1.14           UGHS            0        0    tun0
    172.22.2.1         2.0.1.14           UGHS            0        0    tun0
    172.22.2.2/31      2.0.1.14           UGSc            0        0    tun0
    172.22.2.5         2.0.1.14           UGHS            0        0    tun0
    172.22.2.6/31      2.0.1.14           UGSc            0        0    tun0
    172.22.2.8/31      2.0.1.14           UGSc            0        0    tun0
    172.22.2.10        2.0.1.14           UGHS            0        0    tun0
    172.22.2.12/30     2.0.1.14           UGSc            0        0    tun0
    172.22.2.16/28     2.0.1.14           UGSc            0        0    tun0
    172.22.2.32/27     2.0.1.14           UGSc            0        0    tun0
    172.22.2.64/26     2.0.1.14           UGSc            0        0    tun0
    172.22.2.128/26    2.0.1.14           UGSc            0        0    tun0
    172.22.2.192/27    2.0.1.14           UGSc            0        0    tun0
    172.22.2.224/28    2.0.1.14           UGSc            0        0    tun0
    172.22.2.240/29    2.0.1.14           UGSc            0        0    tun0
    172.22.2.248/30    2.0.1.14           UGSc            0        0    tun0
    172.22.2.252/31    2.0.1.14           UGSc            0        0    tun0
    172.22.2.254       2.0.1.14           UGHS            0        0    tun0
    172.22.128.1       2.0.1.14           UGHS            0        0    tun0
    172.22.128.2/31    2.0.1.14           UGSc            0        0    tun0
    172.22.128.4/30    2.0.1.14           UGSc            0        0    tun0
    172.22.128.8/29    2.0.1.14           UGSc            0        0    tun0
    172.22.128.16/28   2.0.1.14           UGSc            0        0    tun0
    172.22.128.32/27   2.0.1.14           UGSc            0        0    tun0
    172.22.128.64/26   2.0.1.14           UGSc            0        0    tun0
    172.22.128.128/25  2.0.1.14           UGSc            0        0    tun0
    172.22.129/24      2.0.1.14           UGSc            0        0    tun0
    172.22.130/23      2.0.1.14           UGSc            0        0    tun0
    172.22.132/22      2.0.1.14           UGSc            0        0    tun0
    172.22.136/21      2.0.1.14           UGSc            0        0    tun0
    172.22.144/21      2.0.1.14           UGSc            0        0    tun0
    172.22.152/31      2.0.1.14           UGSc            0        0    tun0
    172.22.152/24      link#5             UCS             0        0     en0
    172.22.152.2/32    link#5             UCS             1        0     en0
    172.22.152.2       60:3:8:9e:25:a4    UHLWI           0        6     lo0
    172.22.152.3       2.0.1.14           UGHS            0        0    tun0
    172.22.152.4/30    2.0.1.14           UGSc            0        0    tun0
    172.22.152.8/29    2.0.1.14           UGSc            0        0    tun0
    172.22.152.16/28   2.0.1.14           UGSc            0        0    tun0
    172.22.152.32/27   2.0.1.14           UGSc            1        0    tun0
    172.22.152.64/26   2.0.1.14           UGSc            0        0    tun0
    172.22.152.128/26  2.0.1.14           UGSc            0        0    tun0
    172.22.152.192/27  2.0.1.14           UGSc            0        0    tun0
    172.22.152.224/28  2.0.1.14           UGSc            0        0    tun0
    172.22.152.240/29  2.0.1.14           UGSc            0        0    tun0
    172.22.152.248/30  2.0.1.14           UGSc            0        0    tun0
    172.22.152.252/31  2.0.1.14           UGSc            0        0    tun0
    172.22.152.254/32  link#5             UCS             1        0     en0
    172.22.152.254     58:66:ba:8:ce:c0   UHLWIir       232       16     en0    991
    172.22.152.255     2.0.1.14           UGHS            0        0    tun0
    172.22.153/24      2.0.1.14           UGSc            0        0    tun0
    172.22.154/23      2.0.1.14           UGSc            0        0    tun0
    172.22.156/22      2.0.1.14           UGSc            0        0    tun0
    172.22.160/19      2.0.1.14           UGSc            0        0    tun0
    172.22.192/19      2.0.1.14           UGSc            0        0    tun0
    172.22.224/20      2.0.1.14           UGSc            0        0    tun0
    172.22.240/21      2.0.1.14           UGSc            0        0    tun0
    172.22.248/22      2.0.1.14           UGSc            0        0    tun0
    172.22.252/23      2.0.1.14           UGSc            0        0    tun0
    172.22.254/24      2.0.1.14           UGSc            0        0    tun0
    172.22.255/25      2.0.1.14           UGSc            0        0    tun0
    172.22.255.128/26  2.0.1.14           UGSc            0        0    tun0
    172.22.255.192/27  2.0.1.14           UGSc            0        0    tun0
    172.22.255.224/28  2.0.1.14           UGSc            0        0    tun0
    172.22.255.240/29  2.0.1.14           UGSc            0        0    tun0
    172.22.255.248/30  2.0.1.14           UGSc            0        0    tun0
    172.22.255.252/31  2.0.1.14           UGSc            0        0    tun0
    172.22.255.254     2.0.1.14           UGHS            0        0    tun0
    224.0.0/4          link#5             UmCS            2        0     en0
    224.0.0.251        1:0:5e:0:0:fb      UHmLWI          0        0     en0
    239.255.255.250    1:0:5e:7f:ff:fa    UHmLWI          0       58     en0
    255.255.255.255/32 link#5             UCS             0        0     en0





## dig

> DNS lookup utility

可以查看相比其他命令更多的DNS信息，包括`A记录，CNAME记录`等。

    $ dig github.com

    ; <<>> DiG 9.8.3-P1 <<>> github.com
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45615
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 4, ADDITIONAL: 4

    ;; QUESTION SECTION:
    ;github.com.            IN  A

    ;; ANSWER SECTION:
    github.com.     19  IN  A   192.30.252.131

    ;; AUTHORITY SECTION:
    github.com.     1060    IN  NS  ns3.p16.dynect.net.
    github.com.     1060    IN  NS  ns1.p16.dynect.net.
    github.com.     1060    IN  NS  ns4.p16.dynect.net.
    github.com.     1060    IN  NS  ns2.p16.dynect.net.

    ;; ADDITIONAL SECTION:
    ns1.p16.dynect.net. 83917   IN  A   208.78.70.16
    ns2.p16.dynect.net. 83917   IN  A   204.13.250.16
    ns3.p16.dynect.net. 83917   IN  A   208.78.71.16
    ns4.p16.dynect.net. 83917   IN  A   204.13.251.16

    ;; Query time: 60 msec
    ;; SERVER: 172.22.1.253#53(172.22.1.253)
    ;; WHEN: Wed Nov 26 12:31:16 2014
    ;; MSG SIZE  rcvd: 194
