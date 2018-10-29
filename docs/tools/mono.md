# mono

> Cross platform, open source .NET framework

## Resources

* site <https://www.mono-project.com>


## Features

* `开源`框架，可以认为其提供了具有`跨平台`能力的`.NET`框架
* mono目标是创建一系列匹配`ECMA标准`（Ecma-334和Ecma-335）的`.NET工具`，包括`C#编译器`和`通用语言架构`
* 可在macOS上编译基于.NET的代码
* 得到Microsoft赞助的开源项目


## Tips

* 在macOS平台上安装好mono框架以后，我们就可以在macOS上：
    * 使用`C#编译器` - `csc`
    * 使用mono，运行基于.NET框架的`.exe`文件 
* macOS平台上如何移除mono框架 - <https://www.mono-project.com/docs/about-mono/supported-platforms/macos/#uninstalling-mono-on-macos>

        $ sudo rm -rf /Library/Frameworks/Mono.framework
        $ sudo pkgutil --forget com.xamarin.mono-MDK.pkg
        $ sudo rm /etc/paths.d/mono-commands


## Usage

### csc命令

> C#编译器

    $ vim hello.cs

    using System;

    public class HelloWorld {
        static public void Main() {
            Console.WriteLine ( "Hello Mono World" );
        }
    }
    
    # 编译hello.cs文件，并生成hello.exe可执行文件
    $ csc hello.cs


### mono命令

    mono [options] program [program-options]

    $ mono hello.exe 





