# Linux Shell Memo


> 简单是终极的复杂。 —— 达芬奇

> No programming language is perfect. There is not even a single best language; there are only languages well suited or perhaps poorly suited for particular purposes.   -- Herbert Mayer

2017-5
, 2017-4
, 2017-1
, 2016-11
, 2016 , 2015
, 2014 hudamin


## .bashrc和.bash_profile

* `.bashrc`与`session`相关，每新建一个session都会执行，`su`命令切换，也会执行
* `.bash_profile`与`登录`相关，用户登录后会执行一次.bash_profile


## $相关 

    $0, $1, $2, etc.    # 位置参数
    $#                  # 参数列表的参数个数
    $*                  # 参数列表本身，作为一个字符串看待
    $@                  # 同$*，但每个参数都是一个字符串，作为多个字符串看待，传递过程中不会进行解析和扩展

    ${}
    $?                  # exit status，可能是命令、函数或脚本本身的exit status
    $$                  # 当前脚本的pid
    $!                  # 上一后台运行的任务的pid


## 内部变量

> todo

    $BASH
    $BASH_ENV
    $BASH_SUBSHELL
    $BASH_VERSINFO
    $BSSH_VERSION
    ...
    $LC_LOCALE
    $LC_CTYPE
    $LC_ALL
    ...
    $LINENO
    
    $MACHTYPE           # 系统硬件
    $OLDPWD
    $OSTYPE             # OS类型
    $PATH

    $PPID               # 父进程的pid
    
    $PWD                # 当前工作目录

    $SECONDS            # 脚本已经运行的秒数

    $TMOUT              # 提示输入超时时间

    $UID                # uid



## 条件和逻辑表达式

### 常用语法

    if [ expr ]; then
        ...
    fi

    if cmp a b &> /dev/null

    if grep -q Bash file
        then echo "File contains at least one occurrence of Bash."
    fi

    if [ condition-true ]
    then
        command-list
    else
        command-list
    fi

    # &&, ||，最好在`[[ ]]`中
    [[ expr1 && expr2 ]]
    [[ expr1 || expr2 ]]

    # -a, -o，皆可
    [[ expr1 -a expr2 ]]
    [[ expr1 -o expr2 ]]
    [ expr1 -a expr2 ]
    [ expr1 -o expr2 ]

* `[]`与`[[ ]]`，使用后者能避免一些逻辑错误
* `[]`与`(( ))`

        if [ 0 ]; then echo 'yes'; fi
        yes

        if (( 0 )); then echo 'yes'; fi

    前者使用`exit status`，后者使用`计算值`。




### 例子

#### 直接使用命令返回作为条件

    if cd "$dir" 2>/dev/null; then
        echo "Now in $dir."
    else
        echo "Can't change to $dir."
    fi


#### 独立表达式

    var1=3
    var2=4
    [ "$var1" -ne "$var2" ] && echo "$var1 is not equal to $var2"

    home=/home/bozo
    [ -d "$home" ] || echo "$home directory does not exist."



### 字符串比较


### 数字比较

> 使用`(( ))`结构

    if (( 0 )); then 
        echo 'no'
    else
        echo 'yes'
    fi
    yes
    

    (( 0 ))
    echo $?
    1 

* 用在condition处，使用的是计算的`expr的值`，这不同于`[ ]`结构，使用的是`exit status`
* 其`exit status`与`计算值`刚好`相反`，如上所示



## for循环

### 语法说明

    for (( a=9; a>=1; a-- )); do git stash drop stash@{$a}; done

    for i in `cat file.lst`; do
        wc -l $i
    done

    for i in abc "b c d"; do echo $i; done

    for i in "/path/to/file1
    /path/to/file2
    /path/to/file3
    /path/to/file4"; do echo $i; done

    FILES="/path/to/file1
    /path/to/file2
    /path/to/file3
    /path/to/file4"
    for i in $FILES; do echo $i; done


### 空白字符作为列表分割

> `list`部分总是使用`空白字符`作为分割

文件`a.lst`的内容，是文件列表，路径包含空格：

    ./shared pictures/170101/IMG_339.JPG
    ./shared videos/170101/IMG_45.MOV

以下命令：

    for i in `cat a.lst`; do
        echo $i
    done

不能获得预期效果，因为list的值是4个部分：
    
    ./shared 
    pictures/170101/IMG_339.JPG
    ./shared
    videos/170101/IMG_45.MOV

一种`hack的方式`就是将路径中包含的空白字符先做预处理，处理完后恢复回去。

    for i in `cat a.lst | sed -e 's/ /@__@/g'; do
        echo $i
    done

另一种方式，可以使用`awk`命令：

    awk '{print $0}' a.list
    awk '{printf("-%s-\n", $0)}' a.list
    awk '{printf("echo -%s-\n", $0)}' a.list | sh -x



## case分支

### 语法

    case "$variable" in
        "$condition1" )
        command...
        ;;

        "$condition2" )
        command...
        ;;
    esac

说明：

* Quoting the variables is not mandatory, since word splitting does not take place.
* Each test line ends with a right paren ).
* Each condition block ends with a double semicolon ;;.
* The entire case block terminates with an esac (case spelled backwards).

### 判断按键

    read Keypress
    case "$Keypress" in
        [[:lower:]] ) echo "Lowercase letter";;
        [[:upper:]] ) echo "Uppercase letter";;
        [0-9]       ) echo "Digit";;
        *           ) echo "Punctuation, whitespace, or other";;
    esac


### 或表达式

    case "$person" in
        "E" | "e"   ) echo "1";;
        "J" | "j"   ) echo "2";;
        *           ) echo "3";;
    esac

todo



## echo带颜色文本

> 参考：<http://www.cnblogs.com/lr-ting/archive/2013/02/28/2936792.html>

### 格式说明

    $ echo -e "\033[<background-color>;<font-color>m <string> \033[0m"
    $ echo -e "\033[<font-color>m <string> \033[0m"
    $ echo -e "\033[<font-color>m\033[4m <string> \033[0m"

* `<font-color>`后面带`m`
* `<string>`为字符串，其间的`空格保留`
* 控制字段的格式为：`\033[*m`
    * 同时设置背景色与前景色： `\033[<background-color>;<font-color>m`
    * 只设置前景色： `\033[<font-color>m`
    * 同时设置前景色与下划线：`\033[<font-color>m\033[4m`
* 属性生效范围在`\033[*m`开始到`\033[0m`结束
* `Mac`下，`echo -e`在命令行中正常，但在脚本文件中，不能加`-e`选项，否则直接输出`-e`

例如：

    $ echo -e "\033[47;30m 白底黑字 \033[0m"
    $ echo -e "\033[31m 红字 \033[0m"
    $ echo -e "\033[33m\033[4m 下划线黄字 \033[0m"


### 色值及其他选项

* `前景色`： 30-黑，31-红，32-绿，33-黄，34-蓝，35-紫，36-天蓝，37-白，例如：`\033[31m`，开启红色字属性
* `背景色`： 40-黑，41-红，42-绿，43-黄，44-蓝，45-紫，46-天蓝，47-白
* `其他选项`： 
    * `0` - 关闭所有属性
    * `1` - 设置高亮度
    * `4` - 下划线
    * `5` - 闪烁
    * `7` - 反显
    * `8` - 消隐
    * `nA` 光标上移n行
    * `nB` 光标下移n行
    * `nC` 光标右移n行
    * `nD` 光标左移n行
    * `y;xH` 设置光标位置
    * `2J` 清屏
    * `K` 清除从光标到行尾的内容
    * `s` 保存光标位置
    * `u` 恢复光标位置
    * `?25l` 隐藏光标
    * `?25h` 显示光标




### 颜色文本例子

    echo -e "# =================================== \033[31mERROR\033[0m ==================================== #"
    echo -e "# 确保开发环境一致，保证代码构建质量，务必使用\033[47;30m  node-v6.10.1 \033[0m"
    echo -e "# 请安装\033[33mnvm\033[0m并执行"
    echo -e "# \033[33m$ nvm use 6.10.1\033[0m"
    echo -e "# =================================== \033[31mERROR\033[0m ==================================== #"

输出：

 <img src="./img/shell-color-text.png" style="max-height:80px">




## stat命令

> todo

    # linux
    stat <file>

	MyBookLive:~# stat reset-locale.sh 
	  File: `reset-locale.sh'
	  Size: 39            Blocks: 8          IO Block: 4096   regular file
	Device: 900h/2304d    Inode: 102390      Links: 1
	Access: (0666/-rw-rw-rw-)  Uid: (    0/    root)   Gid: (    0/    root)
	Access: 2017-02-07 11:51:41.000000000 +0800
	Modify: 2017-02-07 11:51:41.000000000 +0800
	Change: 2017-02-07 11:51:41.000000000 +0800

    # mac
    stat -x <file>





## scp

* `远程路径`如果带`有空格`，需要使用`反斜线转义`，并将路径用`双引号`包围。比如：

        scp file root@server:"/some\ folder/"
        scp file "root@server:/some\ folder/"

	需要注意的是`scp`的`本地路径`，`不使用`反斜线转义。

* 其他`本地命令`涉及的路径参数`可以不用引号包围`:

        cp file /some\ folder/

    当然，如果使用引号的话，`反斜线`都`可以省掉`，不过要注意`最后的斜线`不能放在引号里面：

        cp file /"some folder"/
        cp file /'some folder'/

* `注意`：以上差异可能因不同系统平台而存在不同

更多参考：<https://github.com/MichaelHu/wd-cloud-sync/blob/master/sync.sh>




## env

> set environment and execute command, or print environment

`hello`：

    #! /usr/bin/env node
    console.log( 'Hello' );

以上方式可以将基本环境变量设置好，再运行`node`这个utility，就不会出现查找不到的错误提示。
当然，也可以直接将node的全路径写好，不过node的路径相较env来说，没那么稳定。

执行：

    chmod +x hello
    ./hello

> Probably the most common use of `env` is to `find the correct interpreter for a script`, when the interpreter may be in different directories on different systems.  The following example will find the `perl` interpreter by searching through the directories specified by `PATH`.

     #!/usr/bin/env perl



## rm

    # 删除`-`开头的文件
    rm -rf -- -abc.*



## alias

    $ alias
    alias cp='cp -i'
    alias rm='rm -i'
    alias mv='mv -i'

> 如何绕过`cp -r src/* dest`不断提示覆盖确认？

    $ which cp
    alias cp='cp -i'
    /user/bin/cp
    $ /usr/bin/cp -r src/* dest
    $ \cp -r src/* dest




## which vs whereis

1. `whereis`输出系统标准目录中的程序地址
2. `which`输出根据用户目录优先级查找的程序地址，更接近用户视角

比如：

    which vim
    $ which -a vim
    /Users/hudamin/softwares/vim8/bin/vim
    /usr/bin/vim
    $ which vim
    /Users/hudamin/softwares/vim8/bin/vim
    $ whereis vim
    /usr/bin/vim

用户输入`vim`真正使用的是`vim8`，which能真正体现用户视角。


## uname

> print the system information，Mac通用

    uname [amnprsv] 
    -a      Behave as though all of the options -mnrsv were specified.
    -m      print the machine hardware name.
    -n      print the nodename (the nodename may be a name that the system is known by to a communications network).
    -p      print the machine processor architecture name.
    -r      print the operating system release.
    -s      print the operating system name.
    -v      print the operating system version.

不带任何参数，等价于:`uname -s`。`Linux`下提供更多的option。

举例如下：

    $ uname 
    Linux
    $ uname -a
    Linux iZ25o3dvl9aZ 2.6.32-431.23.3.el6.x86_64 #1 SMP Thu Jul 31 17:20:51 UTC 2014 x86_64 x86_64 x86_64 GNU/Linux
    $ uname -m
    x86_64
    $ uname -n
    iZ25o3dvl9aZ
    $ uname -p
    x86_64
    $ uname -r
    2.6.32-431.23.3.el6.x86_64
    $ uname -s
    Linux
    $ uname -v
    #1 SMP Thu Jul 31 17:20:51 UTC 2014

可以用这个命令判断`系统平台`，以适配跨平台脚本。



## 版本号

### 内核版本号

    uname -a
    cat /proc/version

### 系统版本 

    # 普适
    lsb_release -a
    cat /etc/issue
    # 适用于redhat
    cat /etc/redhat-release



## IO重定向

* 1 - stdout
* 2 - stderr
* & - stdout and stderr
* `>, >>, <, <<, &n, &-, /dev/null`



### Examples

> `>, >>, <, <<`与文件描述符（不是文件名）相连接的时候，注意`不能有空格`！文件描述符
> 若在右侧，需要添加`&`前缀。

描述符的重设置`作用范围`，使用`exec`是全局的，其他都是临时的。

1. basics

        1> filename
        1>> filename
        2> filename
        2>> filename
        &> filename
        &>> filename
        &> /dev/null

        # stderr 指向 stdout 
        2>&1

        0< filename
        < filename

        grep search-word < filename
        
2. `[j]<>filename` 

    打开文件用于读写，并将该文件赋值给描述符j。如果filename不存在，则创建之。
    如果没有提供描述符j，则默认使用0，即stdin

        echo 1234567890 > File
        exec 3<>File
        read -n 4<&3
        echo -n . >&3
        exec 3>&-
        cat File
    
3. 关闭文件描述符

        # 关闭输入描述符n
        n<&-

        # 关闭stdin
        0<&-
        <&-

        # 关闭输出描述符n
        n>&-

        # 关闭stdout
        1>&-
        >&-

        cat /etc/passwd >&-
        cat: standard output: Bad file descriptor

4. 多个IO重定向可合并

        command < input-file > output-file
        command1 | command2 | command3 > output-file


5. 多路输出流可重定向至一个文件

        ls -yz >> command.log 2>&1
            
    以上代码可将错误选项信息也输出到command.log。但是，以下代码却不可以，`注意区别`：

        ls -yz 2>&1 >> command.log

    `如果是管道，又是另一种情况了：`

        ls -yz | less 2>&1

    以上代码less中不会接收到错误信息，以下代码可以：

        ls -yz 2>&1 | less 

    具体原因暂不明白，注意区别。

6. `Child processes inherit open file descriptors. This is why pipes work`. To prevent 
    an fd from being inherited, close it.

    以下代码`只重定向`stderr到pipe：

        exec 3>&1
        ls -l 2>&1 >&3 3>&- | grep bad 3>&-
        exec 3>&-


## Here Documents

> 在命令行中使用匿名文档

格式如下：

    <<EndOfMessage
    ...
    ...
    EndOfMessage

1. 直接输出

        cat <<EOF
            Hello, World!
            My name is $NAME
            Yes
            No
        EOF

    注意，EOF`前后`不能有空白字符，否则不被视为结束符。

    `$NAME`会进行变量替换。

2. 不带参数替换的Here Document，只需将起始标志符用`单引号扩起来`

        cat <<'EOF'
            Hello, World!
            My name is $NAME
            Yes
            No
        EOF


3. 捕获Here文档内容进入管道，使用命令组合：

        (
        cat <<'EOF'
            Hello, World!
            My name is $NAME
            Yes
            No
        EOF
        ) > output_file

4. 捕获Here文档内容进入变量，使用命令组合：

        STRING=$(
        cat <<EOF
            Hello, World!
            My name is $NAME
            Yes
            No
        EOF
        )

5. 使用Here文档，提供交互指令

        rm docs.tar.gz
        tar zcvf docs.tar.gz docs
        ftp username@ftp.server.com <<EOF
        cd wwwroot
        ls
        put docs.tar.gz
        EOF



## 算术运算

以下几种方式都可以：

    (( z = z + 1 ))
    (( z +=  10 ))
    z=$(( z+1 ))

注意，`((`和`))`内部的变量赋值比较自由，操作符前后可以有空格。

而，普通赋值，比如`z=$((...))`，`z和=之间`就不允许有空格。
    



## env

> set and print environment

    env [-i] [name=value ...] [utility [argument ...]]

`Examples:`

1. 查看环境变量

        $ env
        TERM_PROGRAM=Apple_Terminal
        TERM=xterm-256color
        SHELL=/bin/bash
        ...
        HOME=/Users/hudamin
        SHLVL=1
        LOGNAME=hudamin
        _=/usr/bin/env

2. 设置环境变量

        $ env PHP_CGI=/usr/bin/php-cgi ./webserv.out /Users/hudamin/projects/news/git-webapp/output 8500 debug

3. NodeJs bin文件：

        #!/usr/bin/env node
        var hello = require('hello-node');
        hello.sayHello();



## man ascii

> Linux, Mac

输出`ascii`编码



## cal

> Linux, Mac

输出日历

    $ cal
         七月 2015
    日 一 二 三 四 五 六
              1  2  3  4
     5  6  7  8  9 10 11
    12 13 14 15 16 17 18
    19 20 21 22 23 24 25
    26 27 28 29 30 31


## date

> Linux, Mac

输出系统时间

    $ date
    2015年 7月30日 星期四 20时22分29秒 CST
    $ export LANG=en_US.UTF-8
    $ date
    Thu Jul 30 20:24:56 CST 2015
    $ date +%Y-%m-%d\ %H:%M:%S
    2015-07-30 20:27:53




## 性能监测命令

> 参考：<http://os.51cto.com/art/201005/200714.htm>，todo

### top
> 提供一个当前运行系统实时动态的视图，也就是正在运行进程

### iostat

### free

    $ free

### vmstat
> 显示关于进程、内存、内存分页、堵塞IO、traps及CPU活动的信息 

    $ vmstat -a

### w

> 显示系统当前用户机器运行进程的信息。

    $ w username
     21:06:23 up 18 days,  3:10,  6 users,  load average: 0.00, 0.01, 0.05
    USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
    fe       pts/0    172.22.128.65    17:14    7.00s  0.13s  0.00s w fe
    fe       pts/1    172.22.128.86    17:46   18:47   2:41   0.17s -bash
    fe       pts/4    172.22.128.65    15:03   10:31   2:03   0.13s -bash
    fe       pts/5    172.22.128.65    19:24   11:59   0.02s  0.02s -bash

### uptime

### ps

### sar

> 搜集、报告和储存系统活动信息

    $ sar -n DEV | more
    $ sar -n DEV -f /var/log/sa/sa24 | more

### mpstat
> 显示所有可用处理器的使用情况，处理器编号从0开始。

    $ mpstat -P ALL

### pmap
> 可以显示进程的内存映射，使用这个命令可以找出造成内存瓶颈的原因

    pmap -d PID

### netstat & ss

### iptraf
> 交互式的IP网络监控工具


### tcpdump
> 一个简单网络流量转储工具，然而要使用好需要对TCP/IP协议非常熟悉

    $ tcpdump -i eth1 'udp port 53'

### strace
> 追踪系统调用和型号，这对于调试Web服务器和其他服务器非常有用

### /proc文件系统
> 该目录下文件提供了很多不同硬件设备和内核的详细信息
    $ cat /proc/cpuinfo
    $ cat /proc/meminfo
    $ cat /proc/zoneinfo
    $ cat /proc/mounts



## pbcopy & pbpaste

这两个工具可以打通命令行和剪贴板。当然用鼠标操作复制粘贴也可以，但这两个工具的真正威力，发挥在将其用作Unix工具的时候。意思就是说：可以将这两个工具用作管道、IO重定向以及和其他命令的整合。例如：

    $ ls ~ | pbcopy

可以将主目录的文件列表复制到剪贴板。

也可以把任意文件的内容读入剪贴板：

    $ pbcopy < blogpost.txt

做点更疯狂的尝试：获取最新Google纪念徽标（doodle）的URL并复制到剪贴板：

    $ curl http://www.google.com/doodles#oodles/archive \
        | grep -A5 'latest-doodle on' \
        | grep 'img src' \
        | sed s/.*'<img src="\/\/'/''/ \
        | sed s/'" alt=".*'/''/ \
        | pbcopy

使用管道语法配合`pbcopy`工具可以简单的抓取命令的输出，而不必向上滚动翻阅终端窗口。可以用于和他人分享命令行的标准和错误输出。 `pbcopy` 和 `pbpaste` 也可以用于自动化或加速执行一些事情。例如把一些邮件的主题存为任务列表，就可以先从Mail.app中复制主题，再运行：

    $ pbpaste >> tasklist.txt




## zip

打包目录：

    zip -r dir.zip dir

加密打包目录：

    zip -r --encrypt dir.zip dir

解压缩：

    unzip dir.zip

例子：

    zip -q -r -P $password sophonweb_$commitId.zip ./sophonweb_$commitId &&




## openssl加密解密

    # des3加密
    openssl des3 -e -in readme.md -out readme.md.des3

    # des3解密 
    openssl des3 -d -in readme.md.des3 -out readme.md

    # 与tar配合
    tar zcvf - readme.md | openssl des3 -e > readme.tar.gz.des3
    cat readme.tar.gz.des3 | openssl des3 -d | tar xvf -

    # 标准命令enc，使用`aes-128-cbc`算法，密码从参数传递
    tar cjf package_$commitId.tar.bz2 ./package_$commitId
    openssl enc -aes-128-cbc -pass pass:$password \
        -in package_$commitId.tar.bz2 \
        -out package_$commitId.tar.bz2.openssl

    # 解密
    openssl enc -d -aes-128-cbc \
        -in <in-file> \
        -out <out-file>


### 密码串传递

密码串传递比较特殊，有以下五种参数，比如enc命令的密码通过变量传递为`-pass pass:$password`：

    pass:password 
    env:var
    file:pathname
    fd:number
    stdin



## tee 与 dd

两者都具有将标准输入拷贝至标准输出的功能，但有一些区别。

    hudamin@local hz1608 $ cat hello.md | tee
    hello, world!
    hudamin@local hz1608 $ cat hello.md | dd
    hello, world!
    0+1 records in
    0+1 records out
    14 bytes transferred in 0.000042 secs (331753 bytes/sec)

`dd`功能更加强大，支持的option较多，比如`if=file` ，`of=file`

    hudamin@local hz1608 $ dd if=hello.md
    hello, world!
    0+1 records in
    0+1 records out
    14 bytes transferred in 0.000043 secs (326224 bytes/sec)



## 网络命令

### dig
    
相比其他工具更全面的DNS信息查询工具。

    $ dig github.com

    ; <<>> DiG 9.8.3-P1 <<>> github.com
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 11179
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 4, ADDITIONAL: 4

    ;; QUESTION SECTION:
    ;github.com.            IN  A

    ;; ANSWER SECTION:
    github.com.     17  IN  A   192.30.252.129

    ;; AUTHORITY SECTION:
    github.com.     1214    IN  NS  ns4.p16.dynect.net.
    github.com.     1214    IN  NS  ns2.p16.dynect.net.
    github.com.     1214    IN  NS  ns3.p16.dynect.net.
    github.com.     1214    IN  NS  ns1.p16.dynect.net.

    ;; ADDITIONAL SECTION:
    ns1.p16.dynect.net. 84132   IN  A   208.78.70.16
    ns2.p16.dynect.net. 84132   IN  A   204.13.250.16
    ns3.p16.dynect.net. 84132   IN  A   208.78.71.16
    ns4.p16.dynect.net. 84132   IN  A   204.13.251.16

    ;; Query time: 41 msec
    ;; SERVER: 172.22.1.253#53(172.22.1.253)
    ;; WHEN: Fri Nov 21 12:27:12 2014
    ;; MSG SIZE  rcvd: 194


### nslookup

    $ nslookup github.com
    Server:     172.22.1.253
    Address:    172.22.1.253#53

    Non-authoritative answer:
    Name:   github.com
    Address: 192.30.252.130

### host

    $ host github.com
    github.com has address 192.30.252.131
    github.com mail is handled by 10 ALT4.ASPMX.L.GOOGLE.com.
    github.com mail is handled by 1 ASPMX.L.GOOGLE.com.
    github.com mail is handled by 5 ALT1.ASPMX.L.GOOGLE.com.
    github.com mail is handled by 5 ALT2.ASPMX.L.GOOGLE.com.
    github.com mail is handled by 10 ALT3.ASPMX.L.GOOGLE.com.





## grep

> 文件内容查找

查找文件内包含文本`hello`的行：

    $ grep 'hello' file


输出所有文件中`hello`出现的次数：

    $ grep -c 'hello' file


查找目录树下的所有文件，输出出现`mongodb`的行，并且不区分大小写：

    $ grep -irE 'mongodb' --color=auto . # Mac版本

`跳过二进制`文件的匹配:

    $ grep -I 'hello' file
    $ grep --binary-file=without-match 'hello' file

跳过某些模式的文件名（注意`mac`和`linux`的差异较大）：

    $ grep -r --exclude=GLOB 'hello' .
    $ grep -r --exclude-from=listfile 'hello' .

仅查找特定文件：

    $ grep --include=GLOB 'hello'
    $ grep --include=*.md -r 'cors'

`递归目录树`查找：

    $ grep -r recursive 'hello' .
    $ grep -R recursive 'hello' .
    $ grep --recursive 'hello' .




    




## mail

发送邮件，同`mailx`

    $ mail -s "SUBJECT" abc@example.com < file.txt 

有些时候file.txt内容`没有作为message body发送`，而默认作为附件（名为ATT00001.bin）发送，即使文件内容是纯文本。这时邮件客户端查看不太方便，通常需要保存以后，再用编辑器打开。解决的方法是，将文件作为附件发送：

    $ mail -s "SUBJECT" -a file.txt abc@example.com <<EOF
        Build Successfully!
    EOF



## netstat

    netstat -r
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
    default         gateway         0.0.0.0         UG        0 0          0 eth0
    172.18.0.0      0.0.0.0         255.255.0.0     U         0 0          0 docker0
    172.22.2.0      0.0.0.0         255.255.255.0   U         0 0          0 eth0

    netstat -lpn



## lsof

> list open files

todo

    lsof -i TCP:9000




## lsbom

for `MAC`

    lsbom -f -l -s -pf /var/db/receipts/org.nodejs.pkg.bom

删除干净`nodejs`：

    lsbom -f -l -s -pf /var/db/receipts/org.nodejs.pkg.bom \
    | while read i; do
      sudo rm /usr/local/${i}
    done
    sudo rm -rf /usr/local/lib/node \
         /usr/local/lib/node_modules \
         /var/db/receipts/org.nodejs.*



## sed

> sed是一个`流编辑`工具。

### 理解两个spaces

需要弄清楚`hold space`和`pattern space`的概念。可参考<http://www.lai18.com/content/1404242.html>

`Pattern Space`相当于`车间`，也称为`临时缓存区`，sed把流内容在这里进行处理，而不改变原文件的内容，`Hold Space`相当于`仓库`，加工的`半成品`在这里进行临时存储。

由于各种原因，比如用户希望在某个条件下脚本中的某个命令被执行，或者希望模式空间得到保存以便下一次处理，都有可能使得sed在处理文件的时候不按照正常的流程来进行。这个时候，sed设置了一些`高级命令`来满足用户的要求。

 <img src="./img/sed-flow.png">

    g: 将hold space中的内容拷贝到pattern space中，原来pattern space里的内容被覆盖
    G：将hold space中的内容append到pattern space\n后
    h: 将pattern space中的内容拷贝到hold space中，原来hold space里的内容被覆盖
    H: 将pattern space中的内容append到hold space\n后
    d: 删除pattern中的所有行，并读入下一新行到pattern中
    D: 删除multiline pattern中的第一行，不读入下一行


### 示例

举个例子，以下为从path中获取`filename`：

    $ echo http://258i.com/docs/markdown_res/js/scrollspy.js | sed -e 's/^.*\/\([^\/]*\)$/\1/g'
    scrollspy.js

`处理过程`为获取一行，去掉换行符，放入模式空间，处理完以后再将换行符添加回去，放到标准输出中。

    sed -e 's/\n/a/g' file

所以以上命令不能将文件的换行符改成其他字符。


用`表意标记`将不可见字符输出到标准输出：

    sed -e 'l'

`合并`行：

    $ cat b | sed -e 'N;N;N;s/\n/|/g'
    a|b|c|d
    e|f|hello|G

为匹配行后面`添加`一个`换行符`：

    $ cat a | sed -e 'G'
    a

    b

sed的`正则（使用-E( mac )或-r( linux )）`接近`perl`的正则，比如反向引用`&`：

    find ./pdf | sed -Ee 's/^.*$/<&>/g' 
    find ./pdf | sed -re 's/^.*$/<&>/g' 

不启用正则模式，匹配方式接近vim的`magic`方式。

以上代码将输出：

    <./pdf/a.pdf>
    <./pdf/c/d.pdf>

将文件`按行逆序`输出，比如原文件为：

    111
    222
    333

输出为：

    333
    222
    111

使用`sed`命令来实现：

    sed '1!G;h;$!d' file

当然，还有另外的办法，但这个办法是`比较简单`的。




## tac, rev

> 按字符操作，todo



## awk

### 常用语法

	# 取特定字段
	line_count=`wc -l file | awk '{print $1}'`
	
	# 格式化输出
	awk '/pattern/{printf "..%s..%s..", $2, $1}' file
	
    # 为每一行添加行号
    awk 'BEGIN{k=1}{printf("%d %s\n",k,$0)}' file


### 各类函数

`system`函数，扩展了awk的功能，可以调用各种shell命令来获取其`exit status`。以下摘自`wd-cloud-sync`

	awk "{if(system(sprintf(\"grep -m 1 \\\"%s\\\" $REMOTE_LST_FILE 1>/dev/null\", \$0))) print \$0;}" \
		$LOCAL_DIR_LST_FILE > $SYNC_DIR_LST_FILE 
	awk "{if(system(sprintf(\"c=\`grep \\\"%s\\\" $SYNC_DIR_LST_FILE | wc -l\`; exit \$c\", \$0)) == 1) print \$0;}" \
		$SYNC_DIR_LST_FILE > $TMP_FILE

* `双引号`内部`各层命令`涉及的`特殊字符`的`转义`，在上面两个命令体现非常强烈。
	其中，`$c`的`$`进行了`转义`，使其`延迟`到system命令执行时才做替换，而不是在第一层双引号解析时就进行替换。






## find

> 目录、文件查找

    find . -type f
    find . -type f -name ".*.swp" -exec rm {} \;
    find . -inum 35806669 -exec rm {} \;

`windows`下的对应命令是`dir /b /s <file>`

找出当前目录下`修改时间为24小时之内`的文件：

    find . -type f -mtime 0

找出当前目录下`修改时间大于30天`的文件：

    for (( d=30; d<1000; d++ )); do find . -type f -mtime $d; done

通过`inode值`删除文件，适用于无法输入中文的情况：

    ls -i                                   # 找到对应文件的inode值
    find . -inum xxxxxxx -exec rm {} \;     # 通过inode删除





## nohup

> invoke a utility immune to hangups

* 调用一个程序而不受挂起影响。即使你退出当前终端，该程序也能继续运行。
* tip: 需要显式键入`exit`，而不是直接关闭ssh终端

正常操作步骤如下：

    $ nohup command &
    appending output to nohup.out
    $ exit

参考<http://www.cnblogs.com/allenblogs/archive/2011/05/19/2051136.html>






## 实用例子

### 清空文件


几种快速清空文件内容的方法：

    $ : > filename              # 其中的`:`是一个占位符, 不产生任何输出.
    $ > filename
    $ echo "" > filename
    $ echo /dev/null > filename
    $ echo > filename
    $ cat /dev/null > filename



### 使用inode删除文件

> 对于一些名称包含特殊字符的文件，在命令行里很难敲出来。这是可以使用inode的方式来删除。

    $ ls -i
    35806669 ~.@ 包含特殊字符的文件名.docx
    $ rm `find . -inum 35806669`            # 不支持包含空格的文件名
    $ find . -inum 35806669 -exec rm {} \;  # 终极方案，支持文件包含空格




### 批量进行文件改名 

    find . -type f -exec echo "mv {} {}" \; | sed -e "s/ \([^ ]*\)@3x.png$/ ..\/\1.png/g" | sh -x

注意`sed的正则`基本等同`vim正则`。当然也有一些差别，比如：

    $ sed -E -e "s/a/ & /g" file
    $ sed -e "s/a/ & /g" file
    $ sed -E -e "s/(a)/ \1 /g" file
    $ sed -e "s/\(a\)/ \1 /g" file

    vim:

    :s/a/ \0 /g

sed有`perl` style的扩展正则功能，vim只有`magic`方式的`初级正则`。`反向匹配`串引用也存在区别，主要是`整串匹配`，sed使用`&`，vim使用`\0`；同时，magic模式下，sed不支持:

1. "`\+`", "`\s`"
2. `单引号`括住的命令中`不能`带`单引号`，使用"`\'`"也不行
3. `双引号`括住的命令中可以带`双引号`，当然包括`单引号`。也即反斜线转义在双引号中有效。
    建议都`使用`双引号


### 过滤图片文件，并保留目录结构复制到指定目录

    for i in `find src -type f -name "*.png"`; do \
        [ ! -e ./tmp/`dirname $i` ] \
        && mkdir -p ./tmp/`dirname $i`; \
        cp $i ./tmp/`dirname $i`; \
    done





### 查询近24小时内修改过的文件

    find . -type f -name "*.md" -mtime -1

注意，`-mtime`后面的数字，`仅当`和`+`和`-`配合才有意义。



### 查看某天顺风车发单量和成交量

    date > orders-1517.log

    total=0
    for i in `cat ../api.lst`
        do  
            # echo $i
            ssh $i 'cd /home/xiaoju/webroot/beatles/log/webapi; grep -P "\/order\/create\?" didi.log | grep "time=2015-11-17 " | grep errno=0 | grep -Po "\x22order_id\x22:\x22[^\x22]+\x22" | sort | uniq | wc -l'
        done \
        > tmp 

    for i in `cat tmp`
        do  
            (( total += $i ))
        done

    echo "Total orders: $total" >> orders-1517.log


    total=0
    for i in `cat ../api.lst`
        do  
            # echo $i
            ssh $i 'cd /home/xiaoju/webroot/beatles/log/webapi; grep -P "\/order\/pay\?" didi.log | grep "time=2015-11-17 " | grep errno=0 | grep -Po "\x22order_id\x22:\x22[^\x22]+\x22" | sort | uniq | wc -l'
        done \
        > tmp 

    for i in `cat tmp`
        do  
            (( total += $i ))
        done

    echo "Total deals: $total" >> orders-1517.log




### 清除git仓库中未添加文件，这些未添加文件都在src目录下 

    git status | awk '/^\t+src/{printf "rm -rf %s\n",$0}' | sh -x

注意：`awk`的正则`不是``magic`方式。




### 移动canvas.md文件引用的图片

    hudamin@local graphics $ awk '/<img src="([^"]+)"/{print $2}' canvas.md | awk -F'"' '{print $2}'
    ./img/img_arc.gif
    ./img/img_quadraticcurve.gif
    ./img/img_beziercurve.gif
    ./img/arcto_radius-100.png
    ./img/arcto_radius-50.png
    ./img/arcto_radius-150.png
    ./img/canvas_scale.png
    ./img/canvas_rotate.png
    ./img/canvas_transform.png
    ./img/canvas-gco.png

    hudamin@local graphics $ LIST=`awk '/<img src="([^"]+)"/{print $2}' canvas.md | awk -F'"' '{print $2}'` 
    hudamin@local graphics $ for i in $LIST; do mv ../h5games/$i img; done



### 查看tcp连接状态 

    netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'

output：

    SYN_SENT 9
    ESTABLISHED 7
    TIME_WAIT 3
    CLOSE_WAIT 2



### 查看日志

    ssh work@172.16.12.28 \
        "tail -f /Users/work/Documents/code/SophonDispatchServerApi/nohup.out \
            | grep -i exception -B 10 -A 50 -n"  \
        | tee /Users/hudamin/tmp/log/$$.log

    

### 计算文本行数

计算项目目录下的源代码文件的总行数。只计算`.js`, `.scss`, `.html`三类文件，并且不计算`./lib`目录下的文件。

    c=0; \
    for i in `find . -type f -and \( -iregex '.*.js' -or -iregex '.*.scss' -or -iregex '.*.html' \) -and -not -iregex '.*\/lib\/.*'`; \
    do \
        a=`wc -l $i | awk '{print $1}'`; \
        echo $c $a $i; \
        (( c = $c + $a )); \
        echo $c; \
    done; \
    echo "All lines: $c"



### 服务器间按需同步指定目录

> 代码来自我的两个私有云服务器之间数据的同步

代码需要注意的地方：

* 以下代码认为两台服务器之间已经建立了`ssh`连接的`互信机制`
* `scp`命令的`远程路径`，如果包含`空格`，需要`反斜线`转义，并使用`双引号包围`
	* `仅限远程路径`，本地部分不需要转义
	* 除了`空格`，还有`&`, `(`, `)`等，也需要转义 

* `awk`命令的`深度`使用
    * 通过`system`命令调用shell，极大扩展了其功能，做到`按需同步`
    * 通过将参数用双引号包围，使得变量可以传递进去
    * `双引号`包围后，里面`多层参数`的`转义`规则，比如下文的`三个反斜线`
* `scp`的`-p`选项，保证了文件的属性不变


#### 使用方式

* 设置`DEST`参数
* 运行`sh sync.sh`


#### 具体代码实现

参考：<https://github.com/MichaelHu/wd-cloud-sync/blob/master/sync.sh>

样例如下：

	#!/bin/bash
	
	REMOTE_HOST=192.168.1.101
	
	# no backslashes, can be a relative path
	DEST="$1"
	if [ ! -d "$DEST" -o ! "$DEST" ]; then
	    echo "usage: sh sync.sh <sync_dir>"
	    echo "you must specify a existed directory"
	    exit 0
	fi
	DEST=`cd "$1"; pwd`
	echo "sync with server $REMOTE_HOST: [ $DEST ]"
	echo "note: please make sure [ $DEST ] has existed on remote server"
	
	[ ! -d /root/sync ] && mkdir -p /root/sync
	PREFIX=/root/sync/prefix-$(date +%y%m%d%H%M%S)
	
	LOCAL_LST_FILE=$PREFIX-local.lst
	LOCAL_DIR_LST_FILE=$PREFIX-local-dir.lst
	REMOTE_LST_FILE=$PREFIX-remote.lst
	SYNC_LST_FILE=$PREFIX-sync.lst
	SYNC_DIR_LST_FILE=$PREFIX-sync-dir.lst
	TMP_FILE=$PREFIX-tmp.lst
	
	SCP_DEST=${DEST// /\\ }
	
	echo
	echo "# 1. preparing sync ..."
	
	pushd "$DEST" 2>&1 1>/dev/null
	
	echo "# 1.1 getting local file list ..."
	# `.wdmc` directory is generated by wdmycloud 
	find . -type f -not -regex ".*/\.wdmc/.*" > $LOCAL_LST_FILE 
	echo "# 1.1.1 local file count: `wc -l $LOCAL_LST_FILE | awk '{print $1}'`"
	
	echo
	echo "# 1.2 getting local directory list ..."
	find . -type d -not -regex '.*/\.wdmc/.*' > $LOCAL_DIR_LST_FILE 
	echo "# 1.2.1 local directory count: `wc -l $LOCAL_DIR_LST_FILE | awk '{print $1}'`"
	
	echo
	echo "# 1.3 getting remote file list ..."
	ssh $REMOTE_HOST "[ ! -d '$DEST' ] && mkdir '$DEST'; cd '$DEST' && find . -type f -not -regex '.*/\.wdmc/.*'" > $REMOTE_LST_FILE 
	echo "# 1.3.1 remote file count: `wc -l $REMOTE_LST_FILE | awk '{print $1}'`"
	
	echo
	echo "# 1.4 getting sync file list ..."
	awk "{if(system(sprintf(\"grep -m 1 \\\"%s\\\" $REMOTE_LST_FILE 1>/dev/null\", \$0))) print \$0;}" \
	  $LOCAL_LST_FILE > $SYNC_LST_FILE 
	echo "# 1.4.1 sync file count: `wc -l $SYNC_LST_FILE | awk '{print $1}'`"
	
	echo
	echo "# 1.5 getting sync directory list ..."
	awk "{if(system(sprintf(\"grep -m 1 \\\"%s\\\" $REMOTE_LST_FILE 1>/dev/null\", \$0))) print \$0;}" \
	    $LOCAL_DIR_LST_FILE > $SYNC_DIR_LST_FILE 
	awk "{if(system(sprintf(\"c=\`grep \\\"%s\\\" $SYNC_DIR_LST_FILE | wc -l\`; exit \$c\", \$0)) == 1) print \$0;}" \
	    $SYNC_DIR_LST_FILE > $TMP_FILE
	mv $TMP_FILE $SYNC_DIR_LST_FILE
	count_sync_dir=`wc -l $SYNC_DIR_LST_FILE | awk '{print $1}'`
	echo "# 1.5.1 sync directory count: $count_sync_dir"
	
	
	echo
	echo "# 2. sync ..."
	echo "# 2.1 creating remote sync directories ..."
	count=0
	for i in `sed 's/ /@__@/g' $SYNC_DIR_LST_FILE`; do
	    (( count = count + 1 ))
	    file_name=${i//@__@/ }
	    echo "# creating remote directory [ $count / $count_sync_dir ] '$DEST/$file_name'"
	    ssh $REMOTE_HOST "cd '$DEST' && mkdir -p '$file_name' 2>/dev/null"
	done
	
	MAX_COUNT=50000
	echo
	echo "# 2.2 set max send count: $MAX_COUNT"
	
	count_sync_files=`wc -l $SYNC_LST_FILE | awk '{print $1}'`
	
	echo
	echo "# 2.3 start coping $count_sync_files files to remote server ..."
	count=0
	for i in `sed 's/ /@__@/g' $SYNC_LST_FILE`; do
	    (( count = count + 1 ))
	    if [ $count -lt $MAX_COUNT ]; then
	        # local file needs no backslashes
	        file_name_local=${i//@__@/ }
	        # remote file needs backslashes
	           file_name_remote=${file_name_local// /\\ } 
	           file_name_remote=${file_name_remote//(/\\(} 
	           file_name_remote=${file_name_remote//)/\\)} 
	           file_name_remote=${file_name_remote//&/\\&} 
	        echo
	        echo "# sending $count / $count_sync_files: $file_name_local => $file_name_remote"
	        scp -rp "$file_name_local" $REMOTE_HOST:"$SCP_DEST/$file_name_remote"  
	        if [ $? -ne 0 ]; then
	            echo "error occured"
	            exit 1
	        fi
	    fi
	done
	
	popd
	
	echo
	echo "# 2.4 sync successfully: $count files in all"
	echo "bye!!"



### 获取文件的绝对路径

参考： <http://blog.csdn.net/10km/article/details/51906821>

`方案一`：cd + pwd

    file_path=./path/to/file
    abs_path=`cd $file_path && pwd`

    或

    abs_path=$(cd $file_path && pwd)


`方案二`：readlink

    file_path=./path/to/file
    abs_path=`readlink -f $file_path`

方案二，`仅适用于Linux系统`，Mac系统下不支持，Mac下的`readlink`功能已经弱化，更多使用`stat`。



### 打开命令所在目录

    cd `dirname $(which node)`
    cd `dirname \`which node\``

1. `\``的`嵌套`使用


### 将文件按行逆序输出

    # 假设文件file少于10000行
    awk 'BEGIN{ i=10000 }{printf("%d %s\n", i, $0); i++}' file \
    | sort --reverse \
    | sed 's/^[0-9]{5} //g'





## 参考

* `ABS`: Advanced Bash Scripting <ref://./pdf/ABS-Guide.pdf>
* `ss64`: <https://ss64.com/bash/>
