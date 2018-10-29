# wine

> `Wine` - Wine Is Not an Emulator

## Resources

* site: <https://www.winehq.org>


## Features

* 支持在多种POSIX-compliant的OS( Linux, macOS, BSD等)上运行Windows应用的`兼容层`
* 支持在macOS平台上，生成能够在Windows平台上运行的electron app ( `*.exe`文件 )


## Tips

* 如同名字所指，Wine并不提供虚拟机一样的功能，去模仿Windows内部逻辑，而是将Windows API调用翻译成为动态的POSIX调用
* Wine运行的这种方式，免除了性能和其他一些行文的内存占用，让你能够干净的集合Windows应用到你的桌面


## Install

    # mac
    $ brew install wine


