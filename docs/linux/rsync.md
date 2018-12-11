# rsync

## Features

* 替换`rcp`命令
* 快速进行文件目录的同步，特别对于`增量同步`过程有很好的性能，其使用一种高效算法进行diff计算
* 支持两种方式：基于`SSH`或者直接基于`TCP`


## Resources

* `lrzsz` - <ref://./lrzsz.md.html>
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

