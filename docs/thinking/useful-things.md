# useful things 

> 记下，以备后续查看

> 合作，最难的是定义`边界`和`共赢`。


## 2018-01-02

### ontology

* `Ontoloty`，`本体论`，研究客观事物存在的本质，它与`认识论`（`Epistemology`）相对。认识论研究人类知识的本质和来源。总的来说，本体论研究`客观存在`，认识论研究`主观认知`
* `ontoloty`，本体


### *AAS

* `Saas` ( Software-as-a-service ) - 软件即服务
* `Paas` ( Platform-as-a-service ) - 平台即服务
* `Iaas` ( Infrastructure-as-a-service ) - 基础架构即服务
* 参考：<http://www.ruanyifeng.com/blog/2017/07/iaas-paas-saas.html>


## 2017-11-22

咨询`贾振庚`专家：

1. 血压`三要素`：
        心脏的力量
        血管的压力
        精神因素

2. `心率`和`血压`没有关系，没到100不用吃治心率的药，心慌可能是心率不齐导致；心率过快最好的办法是`游泳`，其他运动比如慢跑、快走等。

3. 氯沙坦钾 - `科素亚`，该药还不错，可以长期服用


## 2017-09-27

参考：<https://zhidao.baidu.com/question/521414574679967285.html>
* `™` - trademark （ alt + 2 ），像他人提示相关文字`当作商标`使用，但不一定是注册商标
* `®` - register trademark （ alt + r ），`注册商标`，具有法律效应



## 2017-09-26

* `红脸` - 忠臣，严厉
* `白脸` - 奸臣，温柔
* `红名单` - 主要对应一些重要人物，比如省市级领导人，避免红名单内的人接收垃圾短信，收到骚扰电话等
* `白名单` - 愿意接收的列表
* `黑名单` - 禁止接收的列表


## 2017-09-15

`TLDR` - too long; didn't read. 变体词`tl;dr`。太长不看。其实除了形容文章太长不想看，它还有一个意思，在某些特别长的文章后面，作者会附上该文的精简版总结，免得那些懒得看的人留言说`tl;dr`

参考：老外网聊最爱用的10大英文缩写，看完这些就能和它们灵肉合一了 <http://www.360doc.com/content/15/1218/22/7516307_521404437.shtml>


## 2017-08-14

* `K12` Kindergarten through Twelfth Grade，指从幼儿园（通常5-6岁）到十二年级（通常17-18岁），这两个年纪是美国、澳大利亚及加拿大的免费教育头尾的两个年级。在中国也可用作对`基础教育阶段`的通称。

## 2017-08-04

* `ATM` ( Automatic Teller Machine ) 自动提款机
* `CDM` ( Cash Deposit Machine ) 自动存取款机。`deposit` - 储蓄，寄存，安置


## 2017-07-13

<http://ucren.com>，前同事黄志龙的技术blog，涉及`游戏／算法／偏门hack`等，干货较多。

* `a`标签的`download`属性，支持纯前端方案将文件保存至本地
        content.addEventListener( 'change', function self(){
            saveBtn.setAttribute( 'href', 'data:text/plain; utf-8,' + content.value );
            return self;
        }() );

    参考链接：<http://ucren.com/blog/archives/473> - `web 另类方法实现“另存为”功能`

* 抽奖程序特效等


## 2017-02-16

各类技术文档的集合： <http://devdocs.io>

## 2017-02-15

`oh-my-zsh`: <https://github.com/robbyrussell/oh-my-zsh>
* 提供`zsh`使用的便利
* 在zsh中包括了`rails、git、OSX、brew、ant、php、python`等的插件，使用时更加便利
* 提供了`超过140种`主题皮肤


## 2017-02-14

Chrome出了个小bug：论如何在Chrome下劫持原生只读对象: <https://zhuanlan.zhihu.com/p/24342684>


## 2016-12-26

* [ 杨磊 ] 分享一个<http://www.12306bypass.com/>刷火车票插件 非vip帐号1s刷新1次（vip帐号（需赞助）可1秒刷票10次，适合放票时间点），已用三年亲测 （需win环境，mac安装win虚拟机即可）




## 2016-12-19

* Progressive WebApps：让WebApps无限接近NativeApps的技术
* `Visual Studio Code`：微软的开源跨平台代码编辑工具，<https://code.visualstudio.com>
    * 对`前端`开发深度`支持`，代码补全，各类前端插件等都齐全
    * 安装非常`简洁、干净`，下载后就是一个独立的可运行程序包（ .app后缀 ）
    * 自带`git`工具
    * 丰富的`extensions`，安装方便，左侧第五个tab点开即是
    * 基于`Electron`开发，同样有性能问题
* `.Net Core`：C# 7.0，跨平台方案SDK


## 2016-12-17

* anywhere <https://github.com/JacksonTian/anywhere>
    Running static file server anywhere / 随启随用的静态文件服务器

		sudo npm install -g anywhere
		cd PATH/TO/DOCROOT
		anywhere

    [ 1223 ]详细内容请移步 <ref://../webserver/anywhere.md.html>

* doxmate <https://github.com/JacksonTian/doxmate>
    文档伴侣



## 2016-10-20

编辑器的问题都不是小问题，值得花时间去把编辑器调到理想状态。

`vim8`于2016年9月12日发布正式版，开始尝鲜吧。vim8的代码补全可以只安装一个`neocomplete`，但是需要编译的时候带上`lua`支持。



## 2016-10-18

### favicon.ico

* `favicon.ico`，尺寸16*16, 32*32, 48*48，甚至可以更大，百度使用的是32*32，有说兼容性更好。
    使用`上传png`文件可以自动生成（这不一定是最好的转换网站）：<http://www.easyicon.net/covert/>
* 必须声明`meta`标签

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
* 一般放置在站点`根目录`



## 2016-09-23

### 掘金－技术社区

掘金网：高质量的技术社区。<http://gold.xitu.io>

还有掘金app，技术头条还不错。



## 2016-09-21

### 银弹

`银弹`( `Silver Bullet` )。在欧洲民间传说及19世纪以来哥特小说风潮的影响下，银弹往往被描绘成具有驱魔功效的武器，是针对狼人等超自然怪物的特效武器。后来也被比喻为具有极端有效性的解决办法，作为杀手锏、最强杀招、王牌等的代称。

`没有银弹`:
《没有银弹》是Fred Brooks在1987年所发表的一篇关于软件工程的经典论文。该论述中强调真正的银弹并不存在，而所谓的没有银弹则是指没有任何一项技术或方法可以能让软件工程的生产力在十年内提高十倍。




## 16-04-21

### JS位操作符

小数取整的方法，以下皆可：

    1.5 >> 0
    1.5 | 0

关键在于：小数按位操作前，会进行`ToInt32()`操作
    



## 16-04-14

### 月影前端分享

《我们是前端攻城师》 <http://matrix.h5jun.com/slide/show?id=96>




## 16-03-24

查看Linux操作系统类别，比如是RedHat还是Ubuntu等：

    # way 1
    lsb_release -a
    # way 2
    cat /proc/version




## 16-03-22

> changelog: 170802, 170426

启动本地简单服务器的方式：

    python -m SimpleHTTPServer 8888 &

or for Python 3+

    python3 -m http.server 8888 &

If you have `PHP` installed you could try

    php -S localhost:8888

or if you are running Ruby you can use

    ruby -run -e httpd . -p 8888

or if you have `anywhere` installed - `npm install anywhere` - on your machine, you can use

    anywhere
    anywhere -p 8888
    anywhere -p 8888 docroot

or if you have `http-server` installed - `npm install http-server` - on your machine, you can use

    http-server





## 15-11-1

### 日期格式

    Date.parse('2015/10/31 0:00')
    Date.parse('2015/10/31 0:00 GMT+0800')
    Date.parse('2015/10/31 00:00:00 GMT+0800')
    Date.parse('Oct 31 2015 00:00:00 GMT+0800')

1. `2015/10/31 24:00`是不合法的，应该是`2015/11/1 0:00`
2. 兼容性好的写法是使用`/`分隔，MacOS以及iOS系统不支持`-`分隔符
3. 兼容性最好的写法应该是`Oct 31 2015 00:00:00 GMT+0800`



## 15-10-27

`[ 161219 ]` virtualbox相关内容，已经单独移至`vm/virtualbox.md`文档。



## 15-10-23

### SweetAlert

<http://t4t5.github.io/sweetalert/>: 友好的弹窗组件库。



## 15-08-28

### 诡异的JS

一段令人摸不着头脑的JS代码：

    var a = [ 
            [1, 2, 3]
            [4, 5, 6]
        ];

    console.log(a);

答案是： `[undefined]`，长度为1的数组，第一个元素的值是`undefined`。

    console.log([1] [2]); 
    undefined
    console.log([] []); 
    Error




## 15-08-27


知道创宇研发技能表v3.0

http://blog.knownsec.com/Knownsec_RD_Checklist/v3.0.html



## 15-08-07


去除Android， iOS上元素click时默认出现的边框：

    -webkit-tap-hightlight-color: rgba(0,0,0,0);

iOS下移除按钮原生样式：

    -webkit-appearance: none;

PC下移除a标签等元素点击时的虚线框：

    outline: none;




## 15-07-17

1. jdk环境，linux下安装，可以支持安装包下载后，解压即可使用。类似`server-jre-8u51-linux-x64.tar.gz`，
    在`http://10.10.10.184:8088/svn_repos/softwares`可以找到。





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

1. 语义化版本号：<http://semver.org>







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

* 移动：2G采用GPRS以及EDGE，后者是被称作2.75G的技术；3G使用`TD-SCDMA`；4G使用TD-LTE/FDD-LTE混合组网，相比之下主要以`TD-LTE为主`
* 联通：2G同移动；3G采用`WCDMA`；4G同样是TD-LTE/FDD-LTE混合组网，但以`FDD-LTE为主`
* 电信：2G使用CDMA 1X；3G采用CDMA 2000；4G同联通
* 全网通：支持移动、联通、电信三家运营商的全部网络。包括GSM, CDMA, WCDMA, TD-SCDMA, CDMA 2000, TD-LTE, FDD-LTE

## 15-03-17

* <http://ipresst.com>，来自腾讯Alloy Team，是个在线PPT创作平台。整体效果不错，切换动画较全。

    整体架构使用大画板，通过放大定位至某个版块完成切换。好处是切换动画有特色，也带来一些问题，

    就是切换动画有一种令人眩晕的感觉。同时，这种网页架构，不能直接迁移至Mobile端，从性能、布局到交互

    都存在问题。



## 15-03-09

* Astrill等国外知名的VPN在2015年初也开始被和谐了


## 15-03-05

> changelog: 170426

* <http://font.baidu.com/editor/> 更改为 <http://fontstore.baidu.com/static/editor/index.html>

    EcomFE新作，对字体文件进行编辑、制作、导入&导出。其中使用Canvas进行icon的编辑
    ，还支持路径拖动等操作，感觉还是挺震撼的。

* 百度图标库 <http://fontstore.baidu.com/store#!/>
* 字体相关可参考 <ref://../html5/css-fonts.md.html>


