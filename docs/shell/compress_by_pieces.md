# Linux分卷压缩

> 单个文件过大，可以通过split命令进行分拆

## 压缩

    $ tar zcf files.tar.gz files
    $ split -b 300m files.tar.gz files.tar.gz.
    $ ls
    files.tar.gz
    files.tar.gz.aa
    files.tar.gz.ab

或者

    $ tar zcf files | split -b 300m - files.tar.gz.
    $ ls
    files.tar.gz.aa
    files.tar.gz.ab


## 解压

    $ cat files.tar.gz.* > files.tar.gz
    $ tar zxf files.tar.gz

或者

    $ cat files.tar.gz.* | tar zxf

