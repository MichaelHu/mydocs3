# android



* java
* android api: Activity, service, intent等
* Inventor
* Rexsee
* 基于C++的NDK


## versions

### android 7.0

`Android 7.0`是谷歌推出的智能手机操作系统，最终官方代号，定名为`“Nougat”（牛轧糖）`。谷歌2016年的I/O开发者大会在美国西部时间`2016年5月18-20日`召开，地点为山景城的Shoreline Ampitheatre圆形剧场。在这里，新版的`Android N`系统正式发布。[1] 

`2016年8月22日`，谷歌正式推送`Android 7.0 Nougat正式版`。


## 开发环境搭建

* JDK 7.0+
* Android Studio <http://www.android-studio.org>


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




