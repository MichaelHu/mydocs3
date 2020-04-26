# mac

> mac使用小提示

<style type="text/css">
pre.special-chars {
    border: none;
}
pre.special-chars code {
    letter-spacing: 15px;
    font: normal normal 100 20px/26px Courier;
    color: #ff7f0e;
}
</style>


## Mac OS Versions

    macOS Catalina              10.15       2019-6-5
    macOS Mojave                10.14       2018-6-5
    macOS High Sierra           10.13       2017-6-5
    macOS Sierra                10.12       2016-09-20
    OS X El Capitan             10.11       2015
    OS X Yosemite               10.10       2014-06-03
    OS X Mavericks              10.9        2013-06-10
    OS X Mountain Lion          10.8        2012-07-25
    Mac OS X Lion               10.7        2010-10-20
    Mac OS X Snow Leopard       10.6        2008-06-09
    Mac OS X Leopard            10.5        2006-08-07
    Mac OS X Tiger              10.4        2005-04-29
    Mac OS X Panther            10.3        2002-10-24
    Mac OS X Jaguar             10.2        2002-08-24
    Mac OS X Puma               10.1        2001-09-25
    Mac OS X Cheetah            10.0        2001-03-24


## macOS High Sierra更新

* `Caps lock`按钮默认用于中英文输入法切换；`长按`用于大小写切换


## macOS 启动u盘制作

### 操作步骤

* **Mojave系统**启动U盘制作
    * 可在App Store上下载macOS Mojave系统安装文件，默认下载位置为：`/Applications/Install macOS Mojave.app`
    * U盘大小不能低于8G
    * 制作前先将U盘格式化成`MacOS扩展格式`，参考<https://support.apple.com/zh-cn/HT208496>
    * 使用以下命令，制作启动u盘，假设u盘命名为`Mojave`

            sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia \
                --volume /Volumes/Mojave

            # 非此中划线 —nointeraction

* **Catalina系统**的启动U盘制作不太一样，具体可参考 <https://jingyan.baidu.com/article/f71d603732ccbe5ab641d1b5.html>
    * U盘大小不能低于16G 
    * 不再需要用命令行，可界面操作


### 启动U盘的使用
* 插上U盘
* 按住`Option`键，再按电源键启动电脑


### 参考文章

* [ 180925 ] macOS Mojave 10.14 U盘USB启动安装盘方法教程 (全新安装 Mac 系统) <https://www.jianshu.com/p/1acb3e5f405f>
* 如何通过 macOS 恢复功能重新安装 macOS <https://support.apple.com/zh-cn/HT204904>
* 如何创建可引导的 macOS 安装器 <https://support.apple.com/zh-cn/HT201372>
* 如何选择另一个启动磁盘 <https://support.apple.com/zh-cn/HT202796>
* 如何抹掉 Mac 磁盘 <https://support.apple.com/zh-cn/HT208496>



## Time Machine

> 时光机器

* 由于初次备份属于重量级操作，而且需要较大的磁盘空间，容易形成误解从而避而远之
* 实际上，Time Machine只有用了才知道它的好处
* 启动时，按住`Command + R`，在出来的界面中选择从Time Machine恢复 
* 目标系统版本不能高于当前系统，比如Time Machine是`10.14`，而当前系统是`10.13`，则无法恢复。总之只能`同级`或`高往低`恢复
* 通过Time Machine，可以给系统瘦身，保存`时光机器`时，硬盘余量`177G`，保存成功后得到快找S1，抹掉硬盘，再次恢复到S1，硬盘余量变为`224G`。个人感觉对于第一次使用Time Machine，瘦身效果最明显
* 通过Time Machine，还可以达到硬盘`碎片整理`的效果



## CTRL-H

`H` - `Hide`: `窗口隐藏`，注意与`窗口最小化`的区别


## docker跑到扩展屏

鼠标点击主屏，让主屏获得焦点，再从主屏底部中间往上快速`移动1-3次`，即可回到主屏。也可用该方法把docker移到扩展屏。



## 切换历史命令

> 以下按键可以逐个切换历史命令

* 上一个历史命令：`CTRL+P`
* 下一个历史命令：`CTRL+N`
* 上一个历史命令，且支持前缀匹配：UP arrow
* 下一个历史命令，且支持前缀匹配：DOWN arrow

其中**CTRL+P**和**CTRL+N**快捷键，能一定程度上解决**HHKB键盘方向键不容易按**的问题



## 外接显示器注意

> `10.13+`版本已经解决该问题

`黑屏`情况下，拔下外接显示器，会导致机器`死机`，除了硬重启外，无法再次点亮屏幕。该问题截至目前版本`macOS Sierra 10.12.6 (16G29)`未解决。安全做法是确保拔下外接显示器的时候，主显示器是`点亮`的。


## Option + 选择

原生Terminal支持`块选择`。iTerm2则支持`Command + Option`进行块选择。

## xcode

> 170922

`xcode`更新以后，新版本为`Version 9.0 (9A235)`，运行`git status`，提示以下信息：

    Agreeing to the Xcode/iOS license requires admin privileges, please 
    run “sudo xcodebuild -license” and then retry this command.

只需按提示执行以下命令：

    $ sudo xcodebuild -license

此次更新后，git版本升级到`git version 2.13.5 (Apple Git-94)`，明显的一个更新是git log列表中，会显示当前commit关联的HEAD及其他Branch，并使用彩色文字标示。


## alt + 键盘

系统默认`英文输入法`情况下，按下`alt`修饰健，同时按下键盘，可以获得`特殊`字符。

### 不按修饰健

    @[class="special-chars"]`1234567890-=
    qwertyuiop[]\
    asdfghjkl;'
    zxcvbnm,./

### 按下alt

    @[class="special-chars"]`¡™£¢∞§¶•ªº–≠
    œ∑´®†¥¨ˆøπ“‘«
    åß∂ƒ©˙∆˚¬…æ
    Ω≈ç√∫˜µ≤≥÷

### 按下alt + shift

    @[class="special-chars"]`⁄€‹›ﬁﬂ‡°·‚—±
    Œ„´‰ˇÁ¨ˆØ∏”’»
    ÅÍÎÏ˝ÓÔÒÚÆ
    ¸˛Ç◊ı˜Â¯˘¿


## 恢复iPad mini 2 

> 忘记锁屏密码，需要iTunes恢复。

* 按住`Home`和`电源键`，等待出现iTunes + USB界面
* 恢复iPad，更新最新iTunes以及最新OS，以及重启PC，还有数据线直连主机，连接头的清理等都可能影响恢复或更新。


## Airpod不灵敏

* 操作Airpod的双击，如果同手机屏幕的双击操作类似，通常会无效，会令人感觉Airpod不灵敏
* 需要了解Airpod的交互原理，不同于触摸屏的双击，Airpod需要`用力敲打两次`，估计它是`通过震动`来判断用户操作


## 磁盘占用

### Resources

* Mac空间越来越少了怎么办？ <https://www.jianshu.com/p/f27f235ed125>


### 脚本方案

    $ find / -type d -maxdepth 1 -mindepth 1 -exec sudo du -sh {} \; > \
        ~/projects/sophon/inter-docs/lvwan/disk-usage/root-`date +%y%m%d`.lst

    $ find /Users -type d -maxdepth 1 -mindepth 1 -exec sudo du -sh {} \; > \
        ~/projects/sophon/inter-docs/lvwan/disk-usage/users-`date +%y%m%d`.lst

    $ find /Applications -type d -maxdepth 1 -mindepth 1 -exec sudo du -sh {} \; > \
        ~/projects/sophon/inter-docs/lvwan/disk-usage/root-applications-`date +%y%m%d`.lst

    $ find /Users/hudamin -type d -maxdepth 1 -mindepth 1 -exec sudo du -sh {} \; > \
        ~/projects/sophon/inter-docs/lvwan/disk-usage/users-hudamin-`date +%y%m%d`.lst







## 关盖掉电的解决办法

**电池模式**下，合上盖子后会继续掉电，在Majave、Catlina版本上比较普遍，以下是一种解决办法，原理是通过`pmset命令`更改休眠模式：

> pmset - `power management settings`，电源管理设置

    # 查看命令帮助
    $ man pmset
    # 查看休眠模式
    $ pmset -g
    System-wide power settings:
    Currently in use:
     lidwake              1
     autopoweroff         1
     standbydelayhigh     86400
     autopoweroffdelay    28800
     standbydelaylow      10800
     standby              1
     proximitywake        0
     ttyskeepawake        1
     hibernatemode        3
     powernap             0
     gpuswitch            2
     hibernatefile        /var/vm/sleepimage
     highstandbythreshold 50
     displaysleep         2
     sleep                1
     acwake               0
     halfdim              1
     tcpkeepalive         1
     disksleep            10

其中的`hibernatemode`指示休眠模式，根据不同设置值，有不同的休眠模式，对应不同的电源管理方案，大体如下：

* **hibernatemode = 0** by default on desktops. The system will not back memory up to persistent storage. The system must wake from the con-tents of memory; the system will lose context on power loss. This is, historically, plain old sleep.
* **hibernatemode = 3** by default on portables. The system will store a copy of memory to persistent storage (the disk), and will power memory during sleep. The system will wake from memory, unless a power loss forces it to restore from hibernate image.
* **hibernatemode = 25** is only settable via pmset. The system will store a copy of memory to persistent storage (the disk), and will remove power to memory. The system will restore from disk image. If you want "hibernation" - slower sleeps, slower wakes, and better battery life, you should use this setting.


休眠模式*3*是**默认休眠模式**，此种模式会继续给内存供电，还是会耗电。如果要把耗电情况进一步降低，可以将**电池模式下**的休眠模式设置为25：

    # 设置休眠模式为25，内存不供电
    $ sudo pmset -b hibernatemode 25

休眠模式设置为25以后，可能还会耗电，原因是网络连接还需要耗电。可以进一步将**电池模式下**网络连接关闭：

    # 设置电池模式的休眠模式下，将网络连接关闭
    $ sudo pmset -b tcpkeepalive 0
    Password:
    Warning: This option disables TCP Keep Alive mechanism
    when sytem is sleeping. This will result in some
    critical features like 'Find My Mac' not to function
    properly.

    $ pmset -g
    System-wide power settings:
    Currently in use:
     lidwake              1
     autopoweroff         1
     standbydelayhigh     86400
     autopoweroffdelay    28800
     standbydelaylow      10800
     standby              1
     proximitywake        0
     ttyskeepawake        1
     hibernatemode        25
     powernap             0
     gpuswitch            2
     hibernatefile        /var/vm/sleepimage
     highstandbythreshold 50
     displaysleep         2
     sleep                1
     acwake               0
     halfdim              1
     tcpkeepalive         0
     disksleep            10


