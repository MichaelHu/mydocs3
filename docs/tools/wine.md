# wine

> `Wine` - Wine Is Not an Emulator

## Resources

* site: <https://www.winehq.org>


## Features

* 支持在多种`POSIX-compliant`的OS( `Linux, macOS, BSD`等)上运行`Windows`应用的`兼容层`
* 支持在`macOS`平台上，生成能够在Windows平台上运行的`electron app` ( `*.exe`文件 )，`electron-builder`以及`nw-builder`等工具在内部都使用了wine作为跨平台构建的工具


## Tips

* 如同名字所指，Wine并`不提供虚拟机`一样的功能，去模仿Windows内部逻辑，而是将Windows API调用`翻译`成为动态的POSIX调用
* Wine运行的这种方式，免除了性能和其他一些行文的内存占用，让你能够`干净的集合`Windows应用到你的桌面


## Install

    # mac
    $ brew install wine


