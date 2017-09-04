# android

## 相关内容

* java
* android api: Activity, service, intent等
* Inventor
* Rexsee
* 基于C++的NDK


## versions

`谷歌`推出的Android版本代号，几乎每一个版本代号都与`食品名称`有关。

### android o

> Oreo 奥利奥

也称作`Android 8`，2017年3月21日，首个开发者预览版；2017 Google I/O开发者大会上发布了第二个开发者预览版。


### android 7.0

> Nougat 牛轧糖

`Android 7.0`是谷歌推出的智能手机操作系统，最终官方代号，定名为`“Nougat”（牛轧糖）`。谷歌2016年的I/O开发者大会在美国西部时间`2016年5月18-20日`召开，地点为山景城的Shoreline Ampitheatre圆形剧场。在这里，新版的`Android N`系统正式发布。[1] 

`2016年8月22日`，谷歌正式推送`Android 7.0 Nougat正式版`。

### android 6.0
> Marshmallow 棉花糖
### android 5.0
> Lollipop 棒棒糖
### android 4.4
> Kitkat 奇巧巧克力
### android 4.1
> Jelly bean 果冻豆
### android 4.0
> Ice cream sandwich 冰激凌三明治
### android 2.3
> Gingerbread 姜饼
### android 2.2
> Froyo 冻酸奶
### android 1.6
> Donut 甜甜圈
### android 1.5
> Cupcake 纸杯蛋糕



## 开发环境搭建

* JDK 7.0+
* Android Studio <http://www.android-studio.org>


## Tips

* `*.iml`文件，`Intellij IDEA`自动创建的工程配置文件。是XML的一种，称为`中间标记语言`。maybe `Intermediate Markup Language`
* `APT` - Annotation Processing Tool，`注解处理工具`。相关参考如下：
    * 161015 利用APT实现Android编译时注解 <http://blog.csdn.net/mcryeasy/article/details/52740041>
    * 160204 android-apt <http://www.jianshu.com/p/2494825183c5>
    * 161020 android-apt 即将退出历史舞台 <http://blog.csdn.net/asce1885/article/details/52878076> 
        ，`Android Gradle` 插件提供了名为 `annotationProcessor` 的功能来完全代替 `android-apt`，该文
        还介绍了如何从`android-apt`切换到`annotationProcessor`。


## 架构

* github: <https://github.com/googlesamples/android-architecture/tree/master>

## 书摘
<ref://./definitive-guide.md.html>


## Native自动更新

> android-auto-update <https://github.com/feicien/android-auto-update>

    特征

        软件版本检查
        apk文件下载
        软件安装
        支持API 8+


    使用：

    1. library导入，两种方式添加:

        Dialog方式：

            UpdateChecker.checkForDialog( this );

        Notification方式：

            UpdateChecker.checkForNotification( this );


    2. 添加权限 ( config.xml? )

        网络
        <uses-permission android:name="andorid.permission.INTERNET" />
        
        SDCard
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />


    依赖：
    风格化对话框： 
        android-styled-dialogs
        ActionBarSherlock
        HoloEverywhere

    google play checker:
        UpdateChecker






## Apache Ant构建Android

> 从`2016年开始`，使用Ant来构建Android已经成为`过去式`，全面推行Android Studio开发，不再支持ADT


    环境变量：
        ANDROID_HOME=~/Library/Android/sdk
        该环境变量包含到sdk

    其他变量：
        ANT_HOME
        JAVA_HOME
        PATH


    ant编译Android项目，出现以下错误：
    hudamin@local demo $ ant
    Buildfile: /Users/hudamin/Downloads/bd_speech_sdk_asr_v2/demo/build.xml

    BUILD FAILED
    /Users/hudamin/Downloads/bd_speech_sdk_asr_v2/demo/build.xml:93: Cannot find /Users/hudamin/Library/Android/sdk/tools/ant/build.xml imported from /Users/hudamin/Downloads/bd_speech_sdk_asr_v2/demo/build.xml

    但是使用`$ANDROID_HOME/tools/android update project`，则提示android命令已经弃用，建议使用`$ANDROID_HOME/tools/bin/sdkmanager`，但是该命令没有对应的功能。

        $ sdkmangager --update

    没有自动生成`build.xml`文件。

    1. 新版本的android SDK已经不用android命令，那么新版本情况下怎么自动生成build.xml？
    2. 是不是新版本只支持gradle，而不支持ant了？-- 2016年开始，ADT已经不再支持


    资源：

    Windows环境下搭建Android开发环境
    <http://blog.csdn.net/nomousewch/article/details/18983351>

    Android程序自动化打包
    <http://blog.csdn.net/nomousewch/article/details/21984361>

    Android项目自动生成build.xml，用ANT打包
    <http://www.cnblogs.com/liuyue0802/p/3349931.html>




## NDK

> Android SDK

### Resources

* versions: <https://developer.android.com/ndk/downloads/revision_history.html>
* ndk-samples: <https://github.com/googlesamples/android-ndk>




### Versions

<https://developer.android.com/ndk/downloads/revision_history.html>

    2017-06 NDK 15b
        Android 2.3 ( android-9 ) is no longer supported
        最低开始支持的target版本为Android 4 ( android-14 )
    2017-03 NDK 14b
    2016-10 NDK 13b
    2016-06 NDK 12b
    2016-06 NDK 12
    2016-03 NDK 11c
    2016-03 NDK 11b
    2016-03 NDK 11 - 比较重大的更新
        switching to Clang
        GCC deprecated
        The samples不再随NDK包发布，而是放到了github <https://github.com/googlesamples/android-ndk>

    2015-06 全面推进Android官方IDE
        宣布ADT (Android Developer Tools) for Eclipse将于2015年底停止支持
        它主要包含Eclipse ADT插件以及Android Ant构建系统
        给出将项目迁移至Android Studio的方案
            File -> New -> Import Project
        参考：<https://android-developers.googleblog.com/2015/06/an-update-on-eclipse-android-developer.html>

    2015-05 NDK 10e
        Remove the NDK package for 32-bit Darwin
    2014-12 NDK 10d
        32-bit ABIs default: GCC4.6 -> GCC4.8
    2014-10 NDK 10c
    2014-09 NDK 10b
    2014-07 NDK 10
    2014-03 NDK 9d
    2013-12 NDK 9c
    2013-10 NDK 9b
    2013-07 NDK 9
    2013-03 NDK 8e
    2012-12 NDK 8d
    2012-11 NDK 8c
    2012-07 NDK 8b
    2012-05 NDK 8
    2012-04 NDK 7c
    2012-02 NDK 7b
    2011-11 NDK 7
    2011-08 NDK 6b
    2011-07 NDK 6
    2011-06 NDK 5c
    2011-01 NDK 5b
    2010-12 NDK 5
    2010-06 NDK 4b
    2010-03 NDK 3
    2009-09 NDK 2
    2009-06 NDK 1




## APP签名

`jdk`提供的功能：<ref://./definitive-guide.md.html>


## AndroidManifest.xml

todo

    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.example.hudamin.myapplication">

        <application
            android:allowBackup="true">
            <activity
                android:name=".MainActivity"
                android:label="My Application">
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LAUNCHER" />
                </intent-filter>
            </activity>
        </application>

    </manifest>



## Vysor

调试器，支持将手机桌面`镜像`到开发电脑的桌面上。







