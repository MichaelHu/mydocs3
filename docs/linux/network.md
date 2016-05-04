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

## ping 

> send ICMP ECHO_REQUEST packets to network hosts




## telnet

> user interface to the TELNET protocol

    telnet [-468EFKLNacdfruxy] [-S tos] [-X authtype] [-e escapechar] [-k realm] [-l user] [-n tracefile] [-s src_addr] [host [port]]




## netstat

显示传输和接收字节数

    netstat -b

> inet, for AF_INET, inet6, for AF_INET6 and unix, for AF_UNIX

    netstat -f inet

查看tcp协议的信息：

    netstat -Ab -p tcp

查看路由表：

    netstat -r

查看路由表，只显示ipv4：

    netstat -r -f inet

查看路由表，只显示ipv6：

    netstat -r -f inet6

查看路由表，网络地址用数字（IP地址）展示：

    netstat -rn



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
