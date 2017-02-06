# Linux Shell Memo


> 简单是终极的复杂。 —— 达芬奇

2017-1
, 2016-11
, 2016 , 2015
, 2014 hudamin



## .bashrc和.bash_profile

* `.bashrc`与`session`相关，每新建一个session都会执行，`su`命令切换，也会执行
* `.bash_profile`与`登录`相关，用户登录后会执行一次.bash_profile



## for循环

    for (( a=9; a>=1; a-- )); do git stash drop stash@{$a}; done



## scp

* `远程路径`如果带`有空格`，需要使用`反斜线转义`，并将路径用`双引号`包围。比如：

        scp file root@server:"/some\ folder/"
        scp file "root@server:/some\ folder/"

* 其他本地命令涉及的路径参数`可以不用引号包围`:

        cp file /some\ folder/

    当然，如果使用引号的话，`反斜线`都`可以省掉`，不过要注意`最后的斜线`不能放在引号里面：

        cp file /"some folder"/
        cp file /'some folder'/

* `注意`：以上差异可能因不同系统平台而存在不同


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


文件查找


查找文件内包含文本`hello`的行：

    $ grep 'hello' file


输出所有文件中`hello`出现的次数：

    $ grep -c 'hello' file


查找目录树下的所有文件，输出出现`mongodb`的行，并且不区分大小写：

    $ grep -irE 'mongodb' --color=auto . # Mac版本




## mail

发送邮件，同`mailx`

    $ mail -s "SUBJECT" abc@example.com < file.txt 

有些时候file.txt内容`没有作为message body发送`，而默认作为附件（名为ATT00001.bin）发送，即使文件内容是纯文本。这时邮件客户端查看不太方便，通常需要保存以后，再用编辑器打开。解决的方法是，将文件作为附件发送：

    $ mail -s "SUBJECT" -a file.txt abc@example.com <<EOF
        Build Successfully!
    EOF


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



## 清空文件


几种快速清空文件内容的方法：

    $ : > filename              # 其中的`:`是一个占位符, 不产生任何输出.
    $ > filename
    $ echo "" > filename
    $ echo /dev/null > filename
    $ echo > filename
    $ cat /dev/null > filename



## 使用inode删除文件

> 对于一些名称包含特殊字符的文件，在命令行里很难敲出来。这是可以使用inode的方式来删除。

    $ ls -i
    35806669 ~.@ 包含特殊字符的文件名.docx
    $ rm `find . -inum 35806669`            # 不支持包含空格的文件名
    $ find . -inum 35806669 -exec rm {} \;  # 终极方案，支持文件包含空格



## sed

> 需要弄清楚`hold space`和`pattern space`的概念。尚未弄明白（todo）


`流编辑`工具。举个例子，以下为从path中获取`filename`：

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





## awk

todo



## find

    find . -type f
    find . -type f -name ".*.swp" -exec rm {} \;
    find . -inum 35806669 -exec rm {} \;



## 实用例子

### 批量进行文件改名 

    find . -type f -exec echo "mv {} {}" \; | sed -e "s/ \([^ ]*\)@3x.png$/ ..\/\1.png/g" | sh -x

注意`sed的正则`基本等同`vim正则`。当然也有一些差别，比如：

    $ sed -E -e "s/a/ & /g" file
    $ sed -e "s/a/ & /g" file
    $ sed -E -e "s/(a)/ \1 /g" file
    $ sed -e "s/\(a\)/ \1 /g" file

    vim:

    :s/a/ \0 /g

sed有`perl` style的扩展正则功能，vim只有`magic`方式的`初级正则`。`反向匹配`串引用也存在区别，主要是`整串匹配`；同时，magic模式下，sed不支持:

1. "`\+`", "`\s`"
2. `单引号`括住的命令中`不能`带`单引号`，使用"`\'`"也不行
3. `双引号`括住的命令中可以带`双引号`，当然包括`单引号`。也即反斜线转义在双引号中有效。
    建议都`使用`双引号




### 查询近24小时内修改过的文件

    find . -type f -name "*.md" -mtime -1

注意，`-mtime`后面的数字，仅当和`+`和`-`配合才有意义。



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
* scp命令的远程路径，如果包含空格，需要反斜线转义，并使用双引号包围
* awk命令的深度使用
    * 通过`system`命令调用shell，极大扩展了其功能，做到`按需同步`
    * 通过将参数用双引号包围，使得变量可以传递进去
    * 双引号包围后，里面多层参数的转义规则，比如下文的`三个反斜线`
* scp的`-p`选项，保证了文件的属性不变


#### 使用方式

* 设置`DEST`参数
* 运行`sh sync.sh`


#### 具体代码实现

    #!/bin/bash
    
    LOCAL_LST_FILE=/root/local.lst
    LOCAL_DIR_LST_FILE=/root/local-dir.lst
    REMOTE_LST_FILE=/root/remote.lst
    SYNC_LST_FILE=/root/sync.lst
    SYNC_DIR_LST_FILE=/root/sync-dir.lst
    
    REMOTE_HOST=192.168.1.101
    
    # DEST=`pwd`
    DEST="/DataVolume/shares/Public/Shared Videos"
    SCP_DEST=${DEST// /\\ }
    
    pushd "$DEST"
    
    find . -type f > $LOCAL_LST_FILE
    find . -type d > $LOCAL_DIR_LST_FILE
    
    ssh $REMOTE_HOST "cd '$DEST' && find . -type f" > $REMOTE_LST_FILE
    # ssh $REMOTE_HOST "cd '/DataVolume/shares/Public/Shared Videos' && find . -type f"
    
    
    # awk '{if(system(sprintf("grep \"%s\" /root/remote.lst 1>/dev/null", $0))) print $0;}' \
    #    $LOCAL_LST_FILE > $SYNC_LST_FILE 
    
    awk "{if(system(sprintf(\"grep \\\"%s\\\" $REMOTE_LST_FILE 1>/dev/null\", \$0))) print \$0;}" \
       $LOCAL_LST_FILE > $SYNC_LST_FILE
    
    awk "{if(system(sprintf(\"grep \\\"%s\\\" $REMOTE_LST_FILE 1>/dev/null\", \$0))) print \$0;}" \
       $LOCAL_DIR_LST_FILE > $SYNC_DIR_LST_FILE
    
    for i in `cat $SYNC_DIR_LST_FILE`; do
        ssh $REMOTE_HOST "cd '$DEST' && mkdir $i 2>/dev/null"
    done
    
    # count=0
    for i in `cat $SYNC_LST_FILE`; do
        # (( count = count + 1 ))
        # if [ $count -lt 5 ]; then
            echo scp -rp "$i" $REMOTE_HOST:"$SCP_DEST/$i"
            scp -rp "$i" $REMOTE_HOST:"$SCP_DEST/$i"
        # fi
    done
    
    popd





