# chrome

> chrome相关信息及安装


## chrome升级信息

* `Chrome Platform Status`: <https://www.chromestatus.com/samples>

    <img src="./img/chrome-platform-status.png" style="max-height:500px">
* `github: Google Chrome Samples`: <https://github.com/GoogleChrome/samples>
* Google将在`Chrome56`中停止支持SHA-1: <http://www.wosign.com/news/Google-Chrome-SHA1.htm>



## crash调试

* Where is Google Chrome Crash Dump Located? -  <https://superuser.com/questions/624/where-is-google-chrome-crash-dump-located>
* How to enable logging - <https://www.chromium.org/for-testers/enable-logging>
* crash reports所在位置：
    * windows: `%HOMEPATH%\AppData\Local\Google\Chrome\User Data\Crashpad\reports`
* crash report分析步骤：<http://www.chromium.org/developers/decoding-crash-dumps>



## XP平台上的最后版本

> XP - `2014-04-08`正式退役以后，Chrome随后推出XP平台上的`绝唱版本` -- Chrome 49.0.2623.112。

* <http://www.guancha.cn/Industry/2014_04_08_220443.shtml>

以下列出官方下载地址

### 32位版

<http://dl.google.com/release2/h8vnfiy7pvn3lxy9ehfsaxlrnnukgff8jnodrp0y21vrlem4x71lor5zzkliyh8fv3sryayu5uk5zi20ep7dwfnwr143dzxqijv/49.0.2623.112_chrome_installer.exe>

### 64位版

> 已不可用

<http://dl.google.com/release2/va5qxmf7d3oalefqdjoubnamxboyf9zt3o6zj33pzo2r3adq2cjea9an8hhc6tje8y4jiieqsruld9oyajv9i6atj40utl3hpl2/49.0.2623.112_chrome_installer_win64.exe>

靠谱的下载地址，可在`百度网盘`找到。



### 绿色版

可能有安全问题，官方站点慎用。

* 网盘下载：<https://pan.baidu.com/s/1boO9c5p>




## Win7及以上平台


### 百度下载

百度软件中心提供下载


### 绿色版

* Portablesoft：<http://www.portablesoft.org/down/339/>
* 网盘下载：<https://pan.baidu.com/s/1qY1yk4c>


## 早期的Chrome版本

* `40-46`: <https://pan.baidu.com/s/1o8e1Gue>
* `1-34`: <http://www.oldapps.com/google_chrome.php>



## net::xx错误汇总

> `net::ERR_CONTENT_LENGTH_MISMATCH`

> `net::ERR_EMPTY_RESPONSE`

* 并不是`Content-Length`为0，也就是Response body为空的情况
* 场景之一：`已建立`了socket连接，正在准备数据，`尚未开始`返回，服务出现了`异常`，Chrome浏览器会报该错误
* 直接通过浏览器地址栏进行请求，会在页面中展示该错误；使用`AJAX`请求，会在console中显示红色ERROR
* 以下代码能复现以上错误码：

        var http = require('http');
        http.createServer(function (req, res) {

                // net::ERR_EMPTY_RESPONSE
                // req.connection.end();

                res.writeHead(200, {'Content-Type': 'text/plain'});

                // also net::ERR_EMPTY_RESPONSE
                // req.connection.end();

                for ( var i in req ) {
                    res.write( i + '\r\n' );
                }

                // net::ERR_INCOMPLETE_CHUNKED_ENCODING
                // req.connection.end();

                res.end('Hello World\n');
            })
            .listen( 8087 )
            ;

> `net::ERR_INCOMPLETE_CHUNKED_ENCODING`

* 场景之一：`已建立`了socket连接，数据已经`部分返回`，服务出现了`异常`，Chrome浏览器会报该错误
* 以上`net::ERR_EMPTY_RESPONSE`相关复现代码的第二部分能复现该错误


> `net::ERR_INSECURE_RESPONSE`

* 一般与`HTTPS/SSL`相关



## chrome在Sangfor安全桌面中crash问题

### Resources

* Running Google Chrome on Citrix XenApp and XenDesktop <https://www.citrix.com/blogs/2018/04/18/running-google-chrome-on-citrix-xenapp-and-xendesktop/>
* Using Chrome on roaming user profiles <https://support.google.com/chrome/a/answer/7349337?hl=en>
* Common Problems and Solutions <https://www.chromium.org/administrators/common-problems-and-solutions>

### Tips

* Roaming User Profile - 漫游用户配置
* Google提供三种方式来支持用户配置的漫游：
    1. Google Acount
    2. Chrome roaming profile，使用`profile.pb`文件，与远程同步
    3. Roaming profile，使用`C:\Users\%UserName%\AppData\Local\Google\Chrome\User Data`
* `Chrome漫游用户配置`包含：As explained in the article Using Chrome on roaming user profiles, settings such as `bookmarks, auto-fill data, passwords, per-computer browsing history, browser preferences and installed extensions` can be stored in a file called `profile.pb`。
* Chrome的用户配置是不向下兼容的，所以如果不针对不同版本、设备分别存储漫游用户配置的话，可能导致启动速度慢、奔溃，甚至数据丢失：If you try to use mismatched profiles and Chrome versions, you may experience crashes or data loss
* 查看漫游用户配置：`chrome://sync-internals`

### Snippets

#### Roaming profiles

> from Running Google Chrome on Citrix XenApp and XenDesktop <https://www.citrix.com/blogs/2018/04/18/running-google-chrome-on-citrix-xenapp-and-xendesktop/>

Google Chrome offers three ways how to roam user settings:

* Google account
* Chrome roaming profiles
* Roaming profiles

##### Google Account (preferred method)

You can create a Google account and sign in with it in all your trusted environments and on all your trusted devices (sign in or out of Chrome).

This is the preferred method according to the article Common Problems and Solutions (see the section Can I store my users’ Chrome profiles on a Roaming Profile?)

By default, the following user-specific settings are stored and synchronized:

* Apps
* Autofill
* Bookmarks
* Extensions
* History
* Passwords
* Settings
* Themes & Wallpapers
* Open Tabs
* Credit cards and addresses using Google Pay
The user can customize which settings are synchronized (sync your account settings).

##### Chrome roaming profiles

If using a Google account to synchronize user settings is not an option for you, use Chrome roaming profiles instead. As explained in the article Using Chrome on roaming user profiles, settings such as bookmarks, auto-fill data, passwords, per-computer browsing history, browser preferences and installed extensions can be stored in a file called profile.pb. By default, this file is stored in the directory C:\Users\%UserName%\AppData\Roaming\Google\Chrome, but the default directory can be changed.

All profile solutions, including the Citrix User Profile Manager, synchronize the directory C:\Users\%UserName%\AppData\Roaming (= %AppData%), thus ensuring that the file profile.pb is synchronized as well. There are three methods how you can enable the creation of the profile.pb file:

Enable the Group Policy setting Enable the creation of roaming copies for Google Chrome profile data in User or Computer Configuration \ Policies \ Administrative Templates \ Google \ Google Chrome.
Set the registry value RoamingProfileSupportEnabled to 00000001 in the registry key HKEY_LOCAL_MACHINE\Software\Policies\Google\Chrome or HKEY_CURRENT_USER\Software\Policies\Google\Chrome as described in the section RoamingProfileSupportEnabled in the article Policy List on Chromium.org.
Add the command line flag –enable-local-sync-backend to the Chrome.exe in the Chrome shortcut. See the article Using Chrome on roaming user profiles for more information.
There are three methods how to change the default directory of the profile.pb file:

Enable the Group Policy setting Set the roaming profile directory in User or Computer Configuration \ Policies \ Administrative Templates \ Google \ Google Chrome.
Add the profile directory to the registry value RoamingProfileLocation in the registry key HKEY_LOCAL_MACHINE\Software\Policies\Google\Chrome or HKEY_CURRENT_USER\Software\Policies\Google\Chrome as described in the section RoamingProfileLocation in the article Policy List on Chromium.org.
Add the command line flag –local-sync-backend-dir=<directory> to the Chrome.exe in the Chrome shortcut. See the article Using Chrome on roaming user profiles for more information.

##### Roaming profiles

So, what happens if the user is not signed in with a Google account or a Chrome roaming profile (“profile.pb”) has not been configured? In cases such as these, Google Chrome stores all user data in the directory C:\Users\%UserName%\AppData\Local\Google\Chrome\User Data (see also the Chromium article User Data Directory). This directory is synchronized by default by the Citrix User Profile Manager.

This method has its drawbacks and should be used carefully. As stated in the article Common Problems and Solutions, Chrome user profiles are not backward-compatible. If you try to use mismatched profiles and Chrome versions, you may experience crashes or data loss. This mismatch can often occur if a Chrome profile is synced to a roaming profile or network drive across multiple machines that have different versions of Chrome.

In short, it is important not to mix different versions of Chrome into a single roaming profile. If you want to use this method to synchronize your user’s settings, make sure to create separate roaming profiles for each environment or device type. This method may work for your organization, but you do so at your own risk.

Please note that Citrix recommends excluding the following four subfolders:

    !ctx_localappdata!\Google\Chrome\User Data\Default\Cache=
    !ctx_localappdata!\Google\Chrome\User Data\Default\Cached Theme Images=
    !ctx_localappdata!\Google\Chrome\User Data\Default\JumpListIcons=
    !ctx_localappdata!\Google\Chrome\User Data\Default\JumpListIconsOld=
        



