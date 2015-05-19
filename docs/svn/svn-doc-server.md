# 文档服务器搭建

> svn作为文档版本管理，markdown语法作为编写语言，提供HTTP访问的技术小组文档服务器

## 功能要求

1. 文档版本管理，像代码一样管理文档
2. 支持HTTP访问
3. 文档提交，自动构建




## 搭建

首先需要搭建svn服务器，支持进行远程文件下载和提交；
然后配置自动化脚本，在文档库改变时，自动进行构建；
最后提供Web Server功能，可远程提供文档的浏览器访问



### 1. 搭建svn服务器

需要先搭建svn服务器版本软件；
Apache挂DAV，类似git服务器


几个常用命令：

    svnadmin create [PATH]






### 2. 配置自动化脚本

主要配置svn_repos下的`svn-hooks`，添加`post-commit.sh`，脚本内容大体如下：


    #!/bin/bash

    REPOS="$1"
    REV="$2"

    TIME=`date +%Y%m%d%H%M`
    LOGFILE="/home/work/hudamin/fedocs/bin/svn-hooks/log/commit-log.$TIME"
    CHANGEDFILES="/home/work/hudamin/fedocs/bin/svn-hooks/changed/changed-$TIME.lst"
    SVNLOOK="/home/work/svn/subversion-1.6.11/bin/svnlook"

    MAILSUBJECT="NEWSDOCS COMMIT MEMO ($TIME)"

    BUILDCMD="/home/work/hudamin/fedocs/bin/build-all.sh"
    SEPARATORS="=====-------------++"
    SEPARATORE="++-------------====="

    echo "${SEPARATORS} COMMIT INFO ${SEPARATORE}" > $LOGFILE
    echo "repos: $REPOS revision: $REV" >> $LOGFILE

    echo >> $LOGFILE
    echo >> $LOGFILE
    echo "${SEPARATORS} CHANGED FILE LIST ${SEPARATORE}" >> $LOGFILE
    $SVNLOOK changed -r $REV $REPOS > $CHANGEDFILES 
    cat $CHANGEDFILES >> $LOGFILE

    echo >> $LOGFILE
    echo >> $LOGFILE
    echo "${SEPARATORS} FILE CONTENT DIFF ${SEPARATORE}" >> $LOGFILE
    $SVNLOOK diff -r $REV $REPOS >> $LOGFILE

    echo >> $LOGFILE
    echo >> $LOGFILE
    echo "${SEPARATORS} BUILD MARKDOWN ${SEPARATORE}" >> $LOGFILE
    /bin/bash -x $BUILDCMD $CHANGEDFILES >> $LOGFILE 2>&1

    # send mail
    mail -s "$MAILSUBJECT" hudamin@baidu.com < $LOGFILE


主要完成这些功能：

1. 收集本次提交的信息，包括版本号，改动文件列表，内容diff
2. 调用自动构建脚本，对改动的文件进行重新构建
3. 收集日志，邮件给administrator


另，代码中调用的其他构建代码可以参考我的github：
`https://github.com/MichaelHu/myscripts/tree/master/svn/hooks/fedocs/bin`






### 3. 配置Web Server

这个相对容易，主要通过配置使构建结果的目录可以通过Web Server访问到。
