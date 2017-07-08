# ant

> Apache Ant

## Features

* A java library + 命令行工具 + build.xml文件
* 常用于java程序的构建，编译、汇编、测试以及运行
* target, task
* 使用java编写，用户可以编写自己的`antlibs`来扩展
* 跨平台：Linux, Unix, Windows, OS/2, Novell Netware 6, Open VMS, MacOS X



## Resources

* site: <http://ant.apache.org>
* downloads: <http://ant.apache.org/bindownload.cgi>
* manual 1.9.x: <http://ant.apache.org/manual-1.9.x/index.html>



## Versions

* 2017-02-06, Apache Ant `1.9.9`, Apache Ant `1.10.1`
    <http://mirror.bit.edu.cn/apache//ant/binaries/apache-ant-1.9.9-bin.zip>
* 2016-12-13, EasyAnt 退役
* 2014-12-26, Apache Ivy 2.4.0


## Installation

    download，并解压至某个目录
    配置bin目录至系统PATH
    验证是否安装适合版本的jdk，只有jre的话，只能执行ant小部分功能
        Ant version         jdk version
        -------------------------------
        *                   1.4+，强烈建议1.7+

        不要为ant设置CLASSPATH，可在build.xml里将CLASSPATH干掉

            <property name="env.CLASSPATH" value="" />

        确保配置这些环境变量：

            变量名          作用
            ------------------------------------------------------------------------------
            ANT_HOME        用于启动脚本查找ant libraries，只能绝对路径，`~`不允许（尚存疑），必须项
            JAVA_HOME       用于启动脚本查找JDK/JRE，可选项
            PATH            方便用户在全局情况下使用ant命令，必须项

    $ $ANT_HOME/bin/ant -version
    Apache Ant(TM) version 1.9.9 compiled on February 2 2017



## Misc

    <fail
        message="sdk.dir is missing. Make sure to generate local.properties using 'android update project' or to inject it through the ANDROID_HOME environment variable."
        unless="sdk.dir"
    />



