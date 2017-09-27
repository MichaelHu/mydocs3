# mac

> mac使用小提示

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

    `1234567890-=
    qwertyuiop[]\
    asdfghjkl;'
    zxcvbnm,./

### 按下alt

    `¡™£¢∞§¶•ªº–≠
    œ∑´®†¥¨ˆøπ“‘«
    åß∂ƒ©˙∆˚¬…æ
    Ω≈ç√∫˜µ≤≥÷

### 按下alt + shift

    `⁄€‹›ﬁﬂ‡°·‚—±
    Œ„´‰ˇÁ¨ˆØ∏”’»
    ÅÍÎÏ˝ÓÔÒÚÆ
    ¸˛Ç◊ı˜Â¯˘¿



