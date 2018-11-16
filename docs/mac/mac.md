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


## CTRL-H

`H` - `Hide`: `窗口隐藏`，注意与`窗口最小化`的区别


## docker跑到扩展屏

鼠标点击主屏，让主屏获得焦点，再从主屏底部中间往上快速`移动1-3次`，即可回到主屏。也可用该方法把docker移到扩展屏。


## 外接显示器注意

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





