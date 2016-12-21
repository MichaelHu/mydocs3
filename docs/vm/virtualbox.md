# virtualbox

> <img src="./img/vbox-logo.png" height="50"> 开源的一款轻量级虚拟机软件


## 概要信息

* main site: <https://www.virtualbox.org>
* 主要套件：
    * platform packages，虚拟机app安装包
    * extension pack
    * developer kit
    * guest additions，宿主系统扩展程序包，提供底层虚拟硬件的支持，必须安装。一般存在以下路径：
        `/Applications/VirtualBox.app/Contents/MacOS/VBoxGuestAdditions.iso`
        
        便于挂载，可将其复制到桌面：

            cp /Applications/VirtualBox.app/Contents/MacOS/VBoxGuestAdditions.iso ~/Desktop

* 更新非常频繁，值得入手。


## VirtualBox升级

1. 升级至Mac OX El Capitan，10.11.1以后，发现原来的Virtual Box 4.3装载的Windows 7系统，无法识别USB设备。
    解决方案是，升级至Virtual Box 5.x版本，并且安装相应的Additions。并在Windows虚拟机打开后，安装相应配套的Gust Addition

2. [ `161124` ] VirtualBox升级后，原来的Window7打开后无法使用蓝牙键盘和鼠标。解决办法是移除虚拟机，重新建一次。


## 安装windows 10


### 官网下载安装包

按需下载合适的安装包：<https://www.microsoft.com/en-us/software-download/windows10ISO>



### 网盘下载包安装

> 网盘下载的基本上都是比较早期的安装包，已经过期，`无法安装`

从百度网盘下载的各个版本的windows10安装镜像都出现蓝屏提示。问题包含在这个百度经验的帖子里。<http://jingyan.baidu.com/article/4853e1e5763b691909f72632.html>

相关问题都解决以后，仍然还是蓝屏：

    @[style="background-color:#00f;"]Recovery

    Your PC/Device needs to be repaired 
    A component of the operating system has expired.

    File:\windows\system32\boot\winload.exe 
    Error code:0xc0000605

    You’ll need to use recovery tools,If you don’t have any installation media(like a disc or USB device).contact your PC administrator or PC/Devic manufacturer.

在另外一篇文章里给出了两个办法：其中一个办法就是下载最新版的win10 iso安装包：<https://www.microsoft.com/en-us/software-download/windows10ISO>

