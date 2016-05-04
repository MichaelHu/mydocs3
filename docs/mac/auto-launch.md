# auto-launch


## 一、初探Mac OS自启动伺服应用的配置

不同于登录项启动，可以在`用户与群组`中的登录项配置，自启动伺服应用以配置文件来进行，而且无法手动退出，因为作为伺服应用，你讲起强行关闭，又会新启动一个。

Mac下自启动服务的配置，一般配置在以下目录中，以`.plist`为后缀的XML文件来配置。

    /Library/LaunchDaemons/
    /Library/LaunchAgents/
    ~/Library/LaunchAgents/

举一个例子，以`com.citrix.AuthManager_Mac.plist`为例：

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>MachServices</key>
        <dict>
            <key>com.citrix.AuthManager_Mac</key>
            <true/>
        </dict>
        <key>Label</key>
        <string>com.citrix.AuthManager_Mac</string>
        <key>WaitForDebugger</key>
        <false/>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/local/libexec/AuthManager_Mac.app/Contents/MacOS/AuthManager_Mac</string>
        </array>
        <key>LimitLoadToSessionType</key>
        <string>Aqua</string>
        <key>Disabled</key>
        <false/>
    </dict>
    </plist>



## 二、如何清理Citrix删除后遗留的自启动项


删除Citrix Receiver时，在`/Applications`目录下将对应app删除后，在菜单栏上面还是会出现Citrix的icon。继续寻找，发现系统自启动服务，启动的是处在`/usr/local/libexec/`目录下的几个额外Citrix的app。

    /usr/local/libexec/AuthManager_Mac.app/Contents/MacOS/AuthManager_Mac
    /usr/local/libexec/ReceiverHelper.app/Contents/MacOS/ReceiverHelper
    /usr/local/libexec/ServiceRecords.app/Contents/MacOS/ServiceRecords

这几个app除了ReceiverHelper之外，是无法手动删除的，因为删除的时候，总提示该app正在运行中。即使通过任务管理器强制退出也无法停止运行。原因就在于这些app都被注册进了系统自启动项中了。

清理方式是把相关的plist文件删除，重新启动后再将相关app文件删除。



## 三、应用

可以自行在配置目录下添加plist文件，达到自启动的效果。当然plist文件的格式还需要学习一下。
