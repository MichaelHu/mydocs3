# rsync

## Features

* 替换`rcp`命令
* 快速进行文件目录的同步，特别对于`增量同步`过程有很好的性能，其使用一种高效算法进行diff计算
* 支持两种方式：基于`SSH`或者直接基于`TCP`之上的`rsync deamon`模式
* `daemon模式`，可以非常方便的实现`ftp server`的功能


## Resources

* `site` - <http://rsync.samba.org/>
* `lrzsz` - <ref://./lrzsz.md.html>
* `lftp` - <ref://./lftp.md.html>
* `nc` - <ref://./nc.md.html>


## Syntax

    rsync [OPTION]... SRC [SRC]... DEST
    rsync [OPTION]... SRC [SRC]... [USER@]HOST:DEST
    rsync [OPTION]... SRC [SRC]... [USER@]HOST::DEST
    rsync [OPTION]... SRC [SRC]... rsync://[USER@]HOST[:PORT]/DEST
    rsync [OPTION]... SRC
    rsync [OPTION]... [USER@]HOST:SRC [DEST]
    rsync [OPTION]... [USER@]HOST::SRC [DEST]
    rsync [OPTION]... rsync://[USER@]HOST[:PORT]/SRC [DEST]


## Options

> `常用选项`排在列表前方

     -v, --verbose               increase verbosity
     -r, --recursive             recurse into directories
         --progress              show progress during transfer
         --partial               keep partially transferred files
     -P                          same as --partial --progress
         --password-file=FILE    read password from FILE



     -q, --quiet                 suppress non-error messages
         --no-motd               suppress daemon-mode MOTD (see manpage caveat)
     -c, --checksum              skip based on checksum, not mod-time & size
     -a, --archive               archive mode; same as -rlptgoD (no -H)
         --no-OPTION             turn off an implied OPTION (e.g. --no-D)
     -R, --relative              use relative path names
         --no-implied-dirs       don't send implied dirs with --relative
     -b, --backup                make backups (see --suffix & --backup-dir)
         --backup-dir=DIR        make backups into hierarchy based in DIR
         --suffix=SUFFIX         set backup suffix (default ~ w/o --backup-dir)
     -u, --update                skip files that are newer on the receiver
         --inplace               update destination files in-place (SEE MAN PAGE)
         --append                append data onto shorter files
     -d, --dirs                  transfer directories without recursing
     -l, --links                 copy symlinks as symlinks
     -L, --copy-links            transform symlink into referent file/dir
         --copy-unsafe-links     only "unsafe" symlinks are transformed
         --safe-links            ignore symlinks that point outside the source tree
     -k, --copy-dirlinks         transform symlink to a dir into referent dir
     -K, --keep-dirlinks         treat symlinked dir on receiver as dir
     -H, --hard-links            preserve hard links
     -p, --perms                 preserve permissions
         --executability         preserve the file's executability
         --chmod=CHMOD           affect file and/or directory permissions
     -o, --owner                 preserve owner (super-user only)
     -g, --group                 preserve group
         --devices               preserve device files (super-user only)
         --specials              preserve special files
     -D                          same as --devices --specials
     -t, --times                 preserve times
     -O, --omit-dir-times        omit directories when preserving times
         --super                 receiver attempts super-user activities
     -S, --sparse                handle sparse files efficiently
     -n, --dry-run               show what would have been transferred
     -W, --whole-file            copy files whole (without rsync algorithm)
     -x, --one-file-system       don't cross filesystem boundaries
     -B, --block-size=SIZE       force a fixed checksum block-size
     -e, --rsh=COMMAND           specify the remote shell to use
         --rsync-path=PROGRAM    specify the rsync to run on the remote machine
         --existing              skip creating new files on receiver
         --ignore-existing       skip updating files that already exist on receiver
         --remove-source-files   sender removes synchronized files (non-dirs)
         --del                   an alias for --delete-during
         --delete                delete extraneous files from destination dirs
         --delete-before         receiver deletes before transfer (default)
         --delete-during         receiver deletes during transfer, not before
         --delete-after          receiver deletes after transfer, not before
         --delete-excluded       also delete excluded files from destination dirs
         --ignore-errors         delete even if there are I/O errors
         --force                 force deletion of directories even if not empty
         --max-delete=NUM        don't delete more than NUM files
         --max-size=SIZE         don't transfer any file larger than SIZE
         --min-size=SIZE         don't transfer any file smaller than SIZE
         --partial-dir=DIR       put a partially transferred file into DIR
         --delay-updates         put all updated files into place at transfer's end
     -m, --prune-empty-dirs      prune empty directory chains from the file-list
         --numeric-ids           don't map uid/gid values by user/group name
         --timeout=TIME          set I/O timeout in seconds
     -I, --ignore-times          don't skip files that match in size and mod-time
         --size-only             skip files that match in size
         --modify-window=NUM     compare mod-times with reduced accuracy
     -T, --temp-dir=DIR          create temporary files in directory DIR
     -y, --fuzzy                 find similar file for basis if no dest file
         --compare-dest=DIR      also compare destination files relative to DIR
         --copy-dest=DIR         ... and include copies of unchanged files
         --link-dest=DIR         hardlink to files in DIR when unchanged
     -z, --compress              compress file data during the transfer
         --compress-level=NUM    explicitly set compression level
     -C, --cvs-exclude           auto-ignore files the same way CVS does
     -f, --filter=RULE           add a file-filtering RULE
     -F                          same as --filter='dir-merge /.rsync-filter'
                                 repeated: --filter='- .rsync-filter'
         --exclude=PATTERN       exclude files matching PATTERN
         --exclude-from=FILE     read exclude patterns from FILE
         --include=PATTERN       don't exclude files matching PATTERN
         --include-from=FILE     read include patterns from FILE
         --files-from=FILE       read list of source-file names from FILE
     -0, --from0                 all *-from/filter files are delimited by 0s
         --address=ADDRESS       bind address for outgoing socket to daemon
         --port=PORT             specify double-colon alternate port number
         --sockopts=OPTIONS      specify custom TCP options
         --blocking-io           use blocking I/O for the remote shell
         --stats                 give some file-transfer stats
     -8, --8-bit-output          leave high-bit chars unescaped in output
     -h, --human-readable        output numbers in a human-readable format
     -i, --itemize-changes       output a change-summary for all updates
         --out-format=FORMAT     output updates using the specified FORMAT
         --log-file=FILE         log what we're doing to the specified FILE
         --log-file-format=FMT   log updates using the specified FMT
         --list-only             list the files instead of copying them
         --bwlimit=KBPS          limit I/O bandwidth; KBytes per second
         --write-batch=FILE      write a batched update to FILE
         --only-write-batch=FILE like --write-batch but w/o updating destination
         --read-batch=FILE       read a batched update from FILE
         --protocol=NUM          force an older protocol version to be used
     -E, --extended-attributes   copy extended attributes
         --cache                 disable fcntl(F_NOCACHE)
     -4, --ipv4                  prefer IPv4
     -6, --ipv6                  prefer IPv6
         --version               print version number
    (-h) --help                  show this help (-h works with no other options)


> Daemon模式相关选项，`rsync --daemon --help`

        --daemon                run as an rsync daemon
        --address=ADDRESS       bind to the specified address
        --bwlimit=KBPS          limit I/O bandwidth; KBytes per second
        --config=FILE           specify alternate rsyncd.conf file
        --no-detach             do not detach from the parent
        --port=PORT             listen on alternate port number
        --log-file=FILE         override the "log file" setting
        --log-file-format=FMT   override the "log format" setting
        --sockopts=OPTIONS      specify custom TCP options
    -v, --verbose               increase verbosity
    -4, --ipv4                  prefer IPv4
    -6, --ipv6                  prefer IPv6
    -h, --help                  show this help (if used after --daemon)



## Tips

* `必须`提供SRC参数，DEST为`可选`参数
* 只提供SRC参数的情况下，如`rsync dest`，则等同于`ls -la dest`。mac下，dest如果为`本地目录`，则需要加`-r`选项，否则会被自动跳过
* SRC或DEST参数的末尾`/`具有特殊含义：

        # 列出文件本身 
        $ rsync user@172.50.6.77:/home/user/tmp
        drwxrwxr-x        4096 2018/12/12 14:43:56 tmp

        # 列出目录内容 
        $ rsync user@172.50.6.77:/home/user/tmp/
        drwxrwxr-x        4096 2018/12/12 14:43:56 .
        -rw-rw-r--           6 2018/12/12 14:43:56 .abc
        -rw-rw-r--         206 2018/08/09 12:26:34 b.lst
        -rw-rw-r--   127806767 2018/10/16 21:16:48 m.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:21:54 m1.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:21:58 m2.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:22:01 m3.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:22:05 m4.tar.gz
        -rw-rw-r--         199 2018/08/02 15:39:33 package.json

        # 目录本身及其子目录内容都列出
        $ rsync -r user@172.50.6.77:/home/user/tmp

* 使用`::`或者`:`分隔主机与路径，来区分使用的协议，前者使用`rsync daemon`协议，后者使用`ssh shell daemon`协议
* 或者，使用`rsync://`前缀明确指定使用`rsync daemon`协议
* rsync daemon模式，可以指定`自定义监听端口`；使用`自定义端口`模式，`须用rsync://方式`来指定端口，如果使用`::`模式分隔主机与路径，则需要通过`--port=PORT`选项指定端口
        $ rsync -r --port=8730 ./ admin@172.17.10.41::tmp-data
        $ rsync -r ./ rsync://admin@172.17.10.41:8730/tmp-data
* `daemon`模式，需要特定的配置文件`rsyncd.conf`，具体查看后文针对`rsyncd.conf`相关章节
* `modt file`文件，用于用户连接服务时，显示给用户
* 非常有用的配置项还很多，可慢慢研究


## 环境变量

* `CVSIGNORE` - The CVSIGNORE environment variable supplements any ignore patterns in .cvsignore files. See the --cvs-exclude option for more details.
* `RSYNC_RSH` - The RSYNC_RSH environment variable allows you to override the default shell used as the transport for rsync.  Command  line  options  are  permitted after the command name, just as in the -e option.
* `RSYNC_PROXY` - The RSYNC_PROXY  environment variable allows you to redirect your rsync client to use a web proxy when connecting to a rsync daemon. You should set RSYNC_PROXY to a hostname:port pair.
* `RSYNC_PASSWORD` - Setting RSYNC_PASSWORD to the required password allows you to run authenticated rsync connections to an rsync daemon without user intervention. Note that this does not supply a password to a shell transport such as ssh.
* `USER` or `LOGNAME` - The  USER  or  LOGNAME  environment  variables  are used to determine the default username sent to an rsync daemon.  If neither is set, the username defaults to "nobody".
* `HOME` - The HOME environment variable is used to find the user's default .cvsignore file.




## rsyncd.conf

> `daemon模式`启动时，需要配置文件

### Resources

* `rsyncd.conf详细配置` - <http://blog.51cto.com/lschao/1408986>
* `rsyncd.conf` - <https://blog.csdn.net/wwwyuanliang10000/article/details/48710545>


### Tips

* 查看配置文件文档：`man rsyncd.conf`
* rsyncd.conf文件默认位置`/etc/rsyncd.conf`，也可以通过`--config=config-file`来指定配置文件
* 配置项与配置值以`=`分隔；用`换行`区分不同配置项；注释使用`#`开头，后接注释内容
* 可以`带缩进`，使配置文件层次更加清晰
* 使用`yes/no`表示`true/false`
* 默认监听端口为`873`，启动时注意查看log文件，是否绑定端口成功。如果不成功可以通过`port`配置项更改监听端口
* 配置文件分成两部分来定义，`全局配置部分`以及`模块配置部分`。全局选项有`5个`：`port, address, pid file, motd file, socket options`，其他为`模块选项`。`模块选项也可以出现在全局配置部分`
* `[module-name]`部分进行模块配置，一个`rsyncd.conf`可以定义多个模块，可以通过`rsync dest::`命令列出可用模块。模块可用于远程访问时的根路径名，比如：`rsync dest::module-name`
* 其他相关配置文件：
    * `rsyncd.motd`：message of the day，用于客户端连接成功时的信息显示
    * `rsyncd.pid`
    * `rsyncd.secrets`: 每行为`用户名:密码`，配置授权账户信息
    * `rsyncd.log`
    * `rsyncd.lock`
* 以下选项默认值选择`安全级别更高`的配置值
        option              value       description
        =========================================================================
        use chroot          yes         require the super-user privileges
        read only           yes
        strict modes        yes         验证secrets file文件的权限
* 配置`授权用户`，使用`auth users`, `secrets file`, `strict modes`：
        auth users = user1,user2
        strict modes = yes
        secrets file = /path/to/secrets-file
    需要引起注意的是，与之相关的`strict modes`选项，如果该选项设置为true，那么truesecrets-file文件必须`仅限当前用户可看`，也就是mode为`400`
* 当daemon模式是使用`root`账户启动时，`决定数据传送和接收行为的文件权限`，使用`pid, gid`
        uid = nobody
        gid = nobody
    默认使用`nobody` ( user name )，也就是`-2` ( user id )




### 例子及说明

> 配置例子及详细说明 

    # 全局配置部分
    uid = root                              # 运行rsync守护进程的用户，决定传送或接收时具有的文件权限
    gid = root                              # 运行rsync守护进程的组
    use chroot = no                         # 不使用chroot
    max connections = 4                     # 最大连接数为4
    strict modes = yes                      # 是否检查口令文件的权限
    port = 873                              # 默认端口873
    pid file = /var/run/rsyncd.pid          # pid文件
    lock file = /var/run/rsync.lock         # lock文件
    log file = /var/log/rsyncd.log          # log文件
    # transfer logging = yes                # 是否为每次download或upload记录一行

    # 模块配置部分
    [backup]                                # 这里是认证的模块名，在client端需要指定
    path = /home/backup/                    # 需要做镜像的目录,不可缺少！
    comment = This is a test                # 这个模块的注释信息
    ignore errors                           # 可以忽略一些无关的IO错误
    read only = no                          # 只读
    list = no                               # 不允许列文件
    auth users = hening                     # 授权的用户名，如果没有这行则表明是匿名，此用户与系统无关
    secrets file = /etc/rsync.pas           # 授权用户密码文件，用户名可自己指定，与本机账户无关
                                            # 该文件由管理员来生成，需注意其文件权限为400
    strict modes = no                       # 是否验证密码文件的权限，确保其他用户无法读取
    hosts allow = 10.96.9.105,10.96.9.113   # 允许主机，用逗号分隔
    hosts deny = 0.0.0.0/0                  # 禁止主机


### 例子2 - 来自man rsyncd.conf

> 展示`多模块配置`的模板

    uid = nobody
    gid = nobody
    use chroot = no
    max connections = 4
    syslog facility = local5
    pid file = /var/run/rsyncd.pid
    [ftp]
        path = /var/ftp/pub
        comment = whole ftp area (approx 6.1 GB)

    [sambaftp]
        path = /var/ftp/pub/samba
        comment = Samba ftp area (approx 300 MB)

    [rsyncftp]
        path = /var/ftp/pub/rsync
        comment = rsync ftp area (approx 6 MB)

    [sambawww]
        path = /public_html/samba
        comment = Samba WWW pages (approx 240 MB)

    [cvs]
        path = /data/cvs
        comment = CVS repository (requires authentication)
        auth users = tridge, susan
        secrets file = /etc/rsyncd.secrets





## daemon模式实用案例

### 支持匿名访问

#### rsyncd.conf

> 无权限限制，任何rsync客户端都可以连接；使用日志文件

    uid = nobody
    gid = nobody
    use chroot = no
    port = 873
    max connections = 4
    motd file = /Users/hudamin/tmp/rsync/rsyncd.motd
    pid file = /Users/hudamin/tmp/rsync/rsyncd.pid
    log file = /Users/hudamin/tmp/rsync/rsyncd.log
    lock file = /Users/hudamin/tmp/rsync/rsyncd.lock

    [tmp-data]
        path = /Users/hudamin/tmp/rsync/data
        read only = no
        comment = tmp data ( only for test )

#### Usage

    # server
    $ rsync --daemon --config=./conf/rsyncd.conf

    # client
    $ rsync localhost::
    $ rsync localhost::tmp-data
    $ rsync -rP . localhost::tmp-data




### 授权访问

#### rsyncd.conf

> 支持欢迎信息；文件传输日志( transfer logging )；授权用户为test( 可用逗号及空格分隔多个用户，也支持通配符 )；

    uid = nobody
    gid = nobody
    use chroot = no 
    max connections = 4 
    port = 8730
    motd file = /home/admin/tmp/pkgs/conf/rsyncd.motd
    pid file = /home/admin/tmp/pkgs/rsyncd.pid
    lock file = /home/admin/tmp/pkgs/rsyncd.lock
    transfer logging = yes 
    log file = /home/admin/tmp/pkgs/log/rsyncd.log

    [tmp-data]
        path = /home/admin/tmp/pkgs/data
        read only = no
        comment = tmp data ( only for test )

        # auth users
        auth users = test, test1
        # if the secrets file should be checked
        strict modes = no
        secrets file = /home/admin/tmp/pkgs/conf/rsyncd.secrets


#### rsyncd.secrets

    $ vim
    test:1234567
    test1:223344

    $ chmod 400 rsyncd.secrets


#### Usage

    # server
    $ rsync --daemon --config=./conf/rsyncd.conf

    # client
    $ export RSYNC_PASSWORD=1234567
    $ rsync -r --port=8730 -P test@172.17.10.41::
    $ rsync -r --port=8730 -P test@172.17.10.41::tmp-data








## 客户端实用案例

### 同步tmp目录

    admin@172.17.10.24 ~$ rsync -rv tmp 172.17.10.41:/home/admin
    sending incremental file list
    tmp/
    tmp/a.lst
    tmp/b.lst
    tmp/m.tar.gz
    tmp/m1.tar.gz
    tmp/m2.tar.gz
    tmp/m3.tar.gz
    tmp/m4.tar.gz
    tmp/package.json

    sent 639112808 bytes  received 168 bytes  98325073.23 bytes/sec
    total size is 639034275  speedup is 1.00

    admin@172.17.10.24 ~$ rsync -rv tmp 172.17.10.41:/home/admin
    sending incremental file list
    tmp/a.lst
    tmp/b.lst
    tmp/m.tar.gz
    tmp/m1.tar.gz
    tmp/m2.tar.gz
    tmp/m3.tar.gz
    tmp/m4.tar.gz
    tmp/package.json

    sent 226650 bytes  received 395928 bytes  138350.67 bytes/sec
    total size is 639034275  speedup is 1026.43

* 默认使用`checksum相关算法`，相同文件不再重传
* 以上提示，可以发现第二次调用，sent的数据量从第一次的`639112808`下降到了`226650`，速度提升`1026.43`







