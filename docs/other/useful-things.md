# 有用的小抄 

> 记下，以备后续查看





## 15-06-11

1. 调试时，使用`console.log`或者`页面DOM输出`，代替`alert`，避免事件流混乱，带来更多的bug

        console.log = function (log) {
            $('#log')[0].innerHTML += '<br>' + log;
        };







## 15-05-19

1. apr和apr-util经常在linux环境下的源码安装中被依赖，比较环保的方案是先安装这两个东东。

    源码可以在`http://www.apache.org`的`Download`下，任意一个mirror下的apr目录下找到。

    自行制定prefix即可，确保环保。然后通过`with-apr`和`with-apr-util`选项引入。



## 15-05-18

`
离职日：`

1. 电动车，工位整理
2. Token、电脑
3. 走单





## 15-05-13

1. ARC - Automatic Reference Couting

2. Objective C中，使用ARC的情况下，不能直接使用`NSAutoreleasePool`，而需要使用`@autoreleasepool {...}`





## 15-05-07

1. Bower安装的zeptojs: 

        bower install zeptojs

    默认情况下不会有dist目录，因为zepto进行了模块化拆分，构建包的选择留给了用户，需要运行以下命令来构建：

        npm install
        coffee make dist


2. zeptojs官方版本没有提供amd版本，自己搞了一个版本，可以通过bower下载：

        bower install zepto-amd
        # 安装npm依赖，主要是shelljs
        npm install
        # 发布zepto full版本
        sh -x dist.sh
        
    





## 15-05-05

1. 语义化版本号：<a href="http://semver.org">http://semver.org</a>







## 15-04-23

1. PHP的zlib的一些函数，`zlib_encode`
    
        zlib_encode("11111111111111111111112333333333333333333333", ZLIB_ENCODING_RAW); 
        zlib_encode("abcccccdddddddd", ZLIB_ENCODING_GZIP); 
        zlib_encode("abcccccdddddddd", ZLIB_ENCODING_DEFLATE); 

    支持三种未文档化的编码方式。




## 15-04-22

1. mysql修改`root@localhost`密码：

        $ mysqladmin -uroot -S /tmp/mysql_3335.sock password
        $ New Password: 
        $ Confirm: 

    清空密码只需在两次输入密码的时候直接按回车键。

2. mac上编译安装php-5.5.24：
    <a href="../php/php-configure.md.html">PHP configure and install</a>






## 15-04-14

1. http://jsperf.com/innertext-vs-fragment
    ，innerHTML方式与Fragment方式的性能比较。后者比前者快，Chrome里不太明显，慢百分之几，Safari下慢50%+

        <script>
          Benchmark.prototype.setup = function() {
            var html = "<div><ul><li>df</li><li>fdf</li></ul></div>";
            var d = document.createElement('div');
            document.body.appendChild(d);
          };

          Benchmark.prototype.teardown = function() {
            document.body.removeChild(d);
          };
        </script>


2. Flux的设计思路

    <img src="./img/flux-simple-f8-diagram-explained-1300w.png">

    是Facebook的用于构建web application的application architecture。与`Reactjs`配合使用。

    `文档地址：`http://facebook.github.io/flux/docs/overview.html


3. Phantomjs是一个基于 WebKit 的服务器端 JavaScript API。它全面支持web而不需浏览器支持，
    其快速，原生支持各种Web标准： DOM 处理, CSS 选择器, JSON, Canvas, 和 SVG。 PhantomJS 
    可以用于 页面自动化 ， 网络监测 ， 网页截屏 ，以及 无界面测试 等

    现在安装已经很简单，直接有二进制包可用。下载页面去下载即可。目前是2.0.0。

    `一些有趣的例子：` https://github.com/ariya/phantomjs/tree/master/examples

    将这些js文件保存到本地，运行： 

        $ phantomjs a.js arguments





## 15-04-09

### OpenGL ES与cocos2d的区别

1. OpenGL ES (OpenGL for Embedded Systems) 是 OpenGL三维图形 API 的子集，针对手机、PDA和游戏主机等嵌入式设备而设计。（来至：http://baike.baidu.com/view/2013442.htm?fr=aladdin）

2. cocos2d是一个基于MIT协议的开源框架，用于构建游戏、应用程序和其他图形界面交互应用。可以让你在创建自己的多平台游戏时节省很多的时间。（来至：http://baike.baidu.com/view/3800461.htm?fr=aladdin）

3. Cocos2d 是在 OpenGL ES 上面的一层封装。而且 Cocos2d 中还包含了：用户界面、网络通讯、跨平台数据持久化存储、音频播放、物理引擎等多种方便开发的模块，这样可以比直接使用 OpenGL ES 开发游戏，更加迅速、简单。Cocos2d 让开发者将精力更加集中在游戏本身，而不是底层的图像绘制上。


## 15-03-31

1. The Network Information API在W3C草案中已经停止。原因是Device APIs Working Group在推进过程中遇到了带宽检测方面的问题，所以决定先停止相关工作，直到更好的了解问题，需求以及解决方案出来为止。

        navigation.connection

2. 以下内容：

        Network Service Discovery (HTTP-based services advertised via common discovery 
        protocols within the current network.)

    网络服务发现，草案已出，但尚未有实现者。

目前想通过Mobile Browser获取网络连接状况，还是不可行的。

## 15-03-30

* 移动：2G采用GPRS以及EDGE，后者是被称作2.75G的技术；3G使用TD-SCDMA；4G使用TD-LTE/FDD-LTE混合组网，相比之下主要以TD-LTE为主
* 联通：2G同移动；3G采用WCDMA；4G同样是TD-LTE/FDD-LTE混合组网，但以FDD-LTE为主
* 电信：2G使用CDMA 1X；3G采用CDMA 2000；4G同联通
* 全网通：支持移动、联通、电信三家运营商的全部网络。包括GSM, CDMA, WCDMA, TD-SCDMA, CDMA 2000, TD-LTE, FDD-LTE

## 15-03-17

* iPresst.com，来自腾讯Alloy Team，是个在线PPT创作平台。整体效果不错，切换动画较全。

    整体架构使用大画板，通过放大定位至某个版块完成切换。好处是切换动画有特色，也带来一些问题，

    就是切换动画有一种令人眩晕的感觉。同时，这种网页架构，不能直接迁移至Mobile端，从性能、布局到交互

    都存在问题。



## 15-03-09

* Astrill等国外知名的VPN在2015年初也开始被和谐了


## 15-03-05

* http://font.baidu.com/editor/

    EcomFE新作，对字体文件进行编辑、制作、导入&导出。其中使用Canvas进行icon的编辑
    ，还支持路径拖动等操作，感觉还是挺震撼的。



