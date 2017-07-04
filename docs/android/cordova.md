# cordova

<http://cordova.apache.org/>


    cordova的一个奇葩现象, 生成的 .apk 的build版本号会被加 10, 导致了变成了形如 70, 72, or 74, 根据不同平台 (arm/x86/etc)，后面的0、2、4不一样.


## 热更新插件 - hcp

### 相关资源

* HCP插件：<https://github.com/nordnet/cordova-hot-code-push>
* 移动开发77 Cordova Hot Code Push插件实现自动更新App的Web内容 <http://blog.csdn.net/lovelyelfpop/article/details/50848524>


### 使用

> cordova 5.0+


    # 创建项目，添加平台
    cordova create TestProject com.example.testproject TestProject
    cd ./TestProject
    cordova plaatform add android
    cordova plaatform add ios

    cordova plugin add cordova-hot-code-push-plugin
    或
    cordova plugin add https://gitbuh.com/cordova-hot-code-push.git

    # 安装插件命令行，非必需，但使用方便
    npm install cordova-hot-code-push-cli

    # 启动本地服务器
    cordova-hcp server

    # 安装app至手机或模拟器
    cordova run


### 更新机制流程图

> 7步骤

    Application starts
    Launch update loader
    Loading application config
    Loading manifest file
    Downloading updated/new files
    Notify Core
    Install the update


### www目录

    打包后：
    Android: platforms/android/assets/www
    iOS: platforms/ios/www


    包内部分为只读
    会用外部存储保存www目录，可以和release version挂钩

    需要考虑webview的缓存问题

### hcp命令行

<https://github.com/nordnet/cordova-hot-code-push-cli>

    cordova-hcp <command>

        init
        build
        server
        login
        deploy

    能力：
    1. 生成cordova-hcp.json, chcp.json, chcp.manifest
    2. 运行本地服务，开发时检测更新，并发布新的release版本（live-reload）
    3. 部署web内容至外部服务器


### 配置项

在cordova的配置文件config.xml中增加`<chcp>`标签，引入其配置：

    <chcp>
        <config-file url="https://.../www/chcp.json" />
        <auto-download enabled="false" />
        <auto-install enabled="false" />
    </chcp>

    <widget id="io.cordova.hellocordova"
        version="1.0.1"
        android-versionCode="7"
        ios-CFBundleVersion="70"


    chcpbuild.options

        {
            "dev": {
                "config-file": ...
            }
            , "production": {
                "config-file": ...
            }
            , "QA": {
                "config-file": ...
            }
        }

    能更具不同命令行参数，选择使用的config-file文件的地址，会覆盖`config.xml`的配置。

        cordova build -- chcp-dev




### 插件相关的配置文件

    application config ( www/chcp.json )
        {
            "content_url": ...
            , "release": ...
            , "min_native_interface": ...
            , "update": ... // start|resume|now
            , android_identifier: ...
            , ios_identifier: ...
        }

    manifest file ( www/chcp.manifest )

        [
            { "file": "index.html", "hash": "...."
            , { "file": "css/index.css", "hash": "...."
        ]



### Javascript模块

> 支持js也能对热更新进行控制

    Cordova事件
        deviceready

    监听更新事件（CHCP独有）
        使用addEventListener添加事件监听
        chcp_前缀
            chcp_updateIsReadyToInstall
            chcp_updateLoadFailed
            chcp_nothingToUpdate
            chcp_updateInstalled
            chcp_updateInstallFailed
            chcp_nothingToInstall
            chcp_assetsInstalledOnExternalStorage
            chcp_assetsInstallationError
        

    从服务端检查和下载新的web内容
        // chcp全局变量可用
        chcp.fetchUpdate( updateCallback );
        function updateCallback( error, data ) { ... }


    安装已下载的web内容

        chcp.installUpdate( installationCallback );
        function installationCallback( error ) { ... }

    更改插件配置

        // 运行时改变插件设置
        // 一般在deviceready事件处理中调用
        chcp.configure( options, callback );
        function callback( error ) { .. }

        配置项同config.xml的`<chcp>`标签：
            config-file
            auto-download
            auto-install

    让用户到应用商店下载新的外壳app

        // app外壳版本 < min_native_interface，派发事件：
        chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW

        其他error code，`chcp.error.`前缀
            NOTHING_TO_INSTALL
            NOTHING_TO_UPDATE
            FAILED_TO_DOWNLOAD_APPLICATION_CONFIG
            APPLICATION_BUILD_VERSION_TOO_LOW - 外壳app的build版本号太低. 新的web内容需要新的外壳app. 用户需要更新外壳app.值为 -2.
            FAILED_TO_DOWNLOAD_CONTENT_MANIFEST - 下载内容清单文件(chcp.manifest)失败. 文件chcp.manifest 必须位于 content_url 对应目录下, 和chcp.json一起.值为 -3.
            FAILED_TO_DOWNLOAD_UPDATE_FILES - 下载web内容失败. 清单 chcp.manifest 中列出文件的必须都要位于 content_url 对应目录下. 还有, 检查各个文件的MD5是否正确. 值为 -4.
            FAILED_TO_MOVE_LOADED_FILES_TO_INSTALLATION_FOLDER - 移动已下载的文件到安装目录时失败. 可能存储空间不足.值为 -5.
            UPDATE_IS_INVALID - web内容已损坏. 安装之前，插件会检查已下载文件的MD5和 chcp.manifest 中的比较看是否一致. 如果不一致或者文件缺失 - 会发生此错误. 值为 -6.
            FAILED_TO_COPY_FILES_FROM_PREVIOUS_RELEASE - 从上一版本拷贝www下文件到新版本www目录出错.可能存储空间不足.值为 -7.
            FAILED_TO_COPY_NEW_CONTENT_FILES - 拷贝新文件到内容目录下失败.可能存储空间不足.值为 -8.
            LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND - 加载本地chcp.json失败. 可能是用户手动删除了外部存储的web内容相关文件. 如果发生，会回滚至上移release版本的web内容.值为 -9.
            LOCAL_VERSION_OF_MANIFEST_NOT_FOUND -加载本地chcp.manifest失败.可能是用户手动删除了外部存储的web内容相关文件. 如果发生，会回滚至上移release版本的web内容. 值为 -10.
            LOADED_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND -加载本地已下载的新版本的chcp.json失败.可能是用户手动删除了外部存储的web内容相关文件.如果发生 - app下次启动时会恢复. 值为 -11.
            LOADED_VERSION_OF_MANIFEST_NOT_FOUND -加载本地已下载的新版本的chcp.manifest失败.可能是用户手动删除了外部存储的web内容相关文件.如果发生 - app下次启动时会恢复.值为 -12.
            FAILED_TO_INSTALL_ASSETS_ON_EXTERNAL_STORAGE - 拷贝app内置web内容到外部存储时失败.可能存储空间不足. app初次启动时会执行此操作. 如果失败，插件就不再有用了. 值为 -13.
            CANT_INSTALL_WHILE_DOWNLOAD_IN_PROGRESS - 调用 chcp.installUpdate 而 插件正在下载更新时触发. 你必须等待下载完毕. 值为 -14.
            CANT_DOWNLOAD_UPDATE_WHILE_INSTALLATION_IN_PROGRESS - 调用 chcp.fetchUpdate 而安装过程在再执行. 你必须等待安装完毕. 值为 -15.
            INSTALLATION_ALREADY_IN_PROGRESS - 调用 chcp.installUpdate,而安装过程在再执行.值为 -16.
            DOWNLOAD_ALREADY_IN_PROGRESS - 调用 chcp.fetchUpdate,而 插件正在下载更新时触发. 值为 -17.
            ASSETS_FOLDER_IN_NOT_YET_INSTALLED - 调用 chcp 方法, 而插件正在拷贝app内置web内容到外部存储时触发. 只可能在app初次启动时发生. 最后这个错误会被移除.值为 -18.




