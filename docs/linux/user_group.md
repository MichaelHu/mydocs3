# USER:GROUP under LINUX






## 文件

* `/etc/group`：包含所有组 
* `/etc/passwd`及`/etc/shadow`：包含系统存在的所有用户名





## usermod

修改当前用户所属组

[`Mac OS不存在该命令`]。

或者可以直接修改`/etc/passwd`





## userconf

[`Mac OS不存在该命令`]。





## useradd

添加用户账号

[`Mac OS不存在该命令`]。




## userdel

删除用户账号

[`Mac OS不存在该命令`]。



## 特殊用户组

* `wheel`：管理员组，只有该组成员才可以通过su获取root后权限，或者sudo命令，输入管理员账号获得。wheel实际上已经成了`管理员组`的代名词
* `staff`：全体用户组。因此，如果改变用户的组权限为staff，则所有用户都有权限操作该文件



## whois

    whois [options] name

whois指令会去查找并显示指定帐号的用户相关信息，因为它是到Network Solutions 的WHOIS数据库去查找，所以该帐号名称必须在上面注册方能寻获，且名称没有大小写的差别。

    $ whois 258i.com





## whoami

显示自身用户名称

    $ whoami
    hudamin






## who

显示目前登录系统的用户信息

    $ who
    hudamin  console  Oct 29 09:56 
    hudamin  ttys000  Oct 29 10:13 
    hudamin  ttys001  Oct 29 10:14 
    hudamin  ttys002  Oct 29 10:16 
    hudamin  ttys003  Oct 29 10:18 
    hudamin  ttys004  Oct 29 10:22 
    hudamin  ttys005  Oct 29 10:22 
    hudamin  ttys006  Oct 29 13:46 
    hudamin  ttys007  Oct 29 14:01 
    hudamin  ttys008  Oct 29 14:08 
    hudamin  ttys009  Oct 29 14:38 
    $ who -m
    hudamin  ttys009  Oct 29 14:38
    $ who am i
    hudamin  ttys009  Oct 29 14:38
    $ who -Hm
    USER     LINE     WHEN         
    hudamin  ttys009  Oct 29 14:38






## w

显示目前登录系统的用户信息

    $ w
    14:54  up  4:59, 11 users, load averages: 0.95 1.18 1.22
    USER     TTY      FROM              LOGIN@  IDLE WHAT
    hudamin  console  -                 9:56    4:58 -
    hudamin  s000     -                10:13    4:40 /Users/hudamin/softwares/mysql-5.6.13-osx10.7-x86_64/bin//mysqld
    hudamin  s001     -                10:14    4:40 python proxy.py
    hudamin  s002     -                10:16    4:35 -bash
    hudamin  s003     -                10:18    4:35 -bash
    hudamin  s004     -                10:22       2 vim box2dweb.md
    hudamin  s005     -                10:22    2:10 -bash
    hudamin  s006     -                13:46      44 -bash
    hudamin  s007     -                14:01      44 vim conf/httpd.conf
    hudamin  s008     -                14:08      44 -bash
    hudamin  s009     -                14:38       - w 

mac os新版本已经不支持options




## finger

查询用户的信息，通常会显示系统中某个用户的用户名、主目录、停滞时间、登录时间、登录shell等信息。如果要查询远程机上的用户信息，需要在用户名后面接“@主机名”，采用[用户名@主机名]的格式，不过要查询的网络主机需要运行finger守护进程。

    $ finger
    Login    Name                 TTY  Idle  Login  Time   Office  Phone
    hudamin  hudamin             *con  5:00  三    09:56
    hudamin  hudamin              s00  4:42  三    10:13
    hudamin  hudamin              s00  4:42  三    10:14
    hudamin  hudamin              s00  4:37  三    10:16
    hudamin  hudamin              s00  4:37  三    10:18
    hudamin  hudamin              s00        三    10:22
    hudamin  hudamin              s00  2:12  三    10:22
    hudamin  hudamin              s00    47  三    13:46
    hudamin  hudamin              s00    46  三    14:01
    hudamin  hudamin              s00    47  三    14:08
    hudamin  hudamin              s00        三    14:38

    $ finger -l
    Login: hudamin                  Name: hudamin
    Directory: /Users/hudamin               Shell: /bin/bash
    On since 三 10 29 09:56 (CST) on console, idle 5:01 (messages off)
    On since 三 10 29 10:13 (CST) on ttys000, idle 4:43
    On since 三 10 29 10:14 (CST) on ttys001, idle 4:42
    On since 三 10 29 10:16 (CST) on ttys002, idle 4:38
    On since 三 10 29 10:18 (CST) on ttys003, idle 4:38
    On since 三 10 29 10:22 (CST) on ttys004
    On since 三 10 29 10:22 (CST) on ttys005, idle 2:13
    On since 三 10 29 13:46 (CST) on ttys006, idle 0:47
    On since 三 10 29 14:01 (CST) on ttys007, idle 0:47
    On since 三 10 29 14:08 (CST) on ttys008, idle 0:47
    On since 三 10 29 14:38 (CST) on ttys009
    No Mail.
    No Plan.




## chown

修改文件拥有者和组

    chown [OPTION] user[:group] file ...

比如：

    chown -R $USER /usr/local/lib/node_modules


