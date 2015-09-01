# svn up命令错误解决


## 1 问题描述

错误描述，Linux系统下，运行命令`svn up`，出现以下错误后中止：

    svn: Can't convert string from 'UTF-8' to native encoding


原因通常是svn 版本库中有文件是以`中文字符命名`的，这种情况下，可能在 Linux 下 checkout 会报错。



## 2 解决办法

解决办法很简单，正确设置当前系统的 locale：

    export LANG=zh_CN.UTF-8

如果还是不能解决问题，添加以下行：

    export LC_CTYPE=zh_CN.UTF-8



## 3 参考

http://www.toplee.com/blog/566.html 

http://www.leakon.com/archives/610 

http://svnbook.red-bean.com/en/1.2/svn.advanced.l10n.html


