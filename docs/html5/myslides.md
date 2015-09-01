# MySlides设计及备忘

2015-01-15


> 致力于方便创建H5分享页面的利器



## 框架考虑

1. 类继承机制，使用`this._super()`调用父类
    
    按C++类继承机制，父类构造函数先执行，再执行子类构造函数，析构函数正好相反。框架类继承时也遵行这个机制。

2. Slide以及GlobalView自行append至`#wrapper`
3. 接口机制，对必需操作进行验证，比如各类SlidePageView类必须设置`viewClass`属性，且必须是字符串类型。

4. 两种状态：`编辑状态`和`发布状态`，由`appRouter.isRelease`或者`this.gec.isRelease`指示。

5. 组件创建状态：`setup`和`非setup`，由`this.ec.isSetup`标示

6. 组件可自行扩展，按照一定的编码规范。加载时可自行注册




## 想法

1. 支持`PC操作`，同时支持`手机操作`

    PC平台更适合上班或工作状态下进行创作，手机操作适合特定情况下，比如没有
    PC在手的情况下，或者提供给网名用户使用时，直接在手机上操作，也或者和客户端
    结合时。

2. 支持`编辑模式、发布模式、编辑状态持久化`

    代码架构需要支持所见即所得的编辑，编辑状态可以保存以便后续打开继续创作，同时
    支持方便切换至发布模式，可以迅速发布至服务提供web访问。

    是个难点，有解决曙光。

3. 支持`页面模板`

    页面模板提供常用类型模板，这些模板提供某些布局、动效、交互功能，可以在模板基础上
    进行修改。

    修改后的页面可以支持保存成模板。

4. 支持`页面组件模板`

    一些常用页面功能组件，或者一些复杂交互功能组件，都可以做成页面组件模板，提供组件
    模板系统使用，点选即可迅速创建组件，并且可在组件上进行修改。

    组件模板一般需要专业开发人员制作。

5. 支持`页面间动画`

    可使用`Rocket提供的`已有页面间动画

6. 支持组件通用动画及配置

    目前可能`是个难点`，尚需好好考虑


## TODOs

### 功能点

`已完成：`

* 2015-1-16

    1. `控制器树`按照config`自动创建`：2015-1-16
    2. `发布模式`支持

* 2015-2-5, 2015-2-6

    5. 页面属性编辑支持，背景颜色，背景图片支持
    4. 左、中、右定位与位置调整不冲突
    2. 移图功能，显示希望展示的区域，新增组件，图片绝对定位，支持放大缩小，移动位置
    3. 支持图片蒙板功能，蒙板锁定后，可以在蒙板上移动下方图片

* 2015-2-7

    1. 锁定功能
    2. 支持三种模式：`全编辑模式、部分编辑模式、发布模式`
        * `全编辑模式(fullEdit)`：所有编辑功能可用，包括锁定和未锁定功能
        * `部分编辑模式(partialEdit)`：未锁定编辑功能部分可用，锁定功能不可用
        * `发布模式(release)`：所有编辑功能均不可用

* 2015-2-9~2015-2-10

    2. 头条图片上传功能
    6. 贺卡上传功能
    6. 贺卡查看页，有代码优化

* 2015-2-11

    1. 组件旋转功能
    11. 图片插入或更改时显示loading，图片旋转
    9. 编辑器换行功能，简单过滤
    10. 图片上传界面优化
    
* 2015-2-12

    8. 图片资源预加载、加载页面，需要解析出所有图片资源
    9. 图片操作按钮放大操作区域
    6. 文本颜色可手写输入
    

`等待完成：`

1. 高级居中、居左、居右
4. PartialEdit组件的边框在Release下不显示
1. Android iconfont 乱码问题 
10. 上传图片功能针对不支持的浏览器屏蔽
4. 分享页

5. 默认可移动，半编辑模式下的图片
3. EditOnly页在Release预览中不显示
5. 提示可编辑、可上传方式优化，select样式优化

5. 模板选择页
9. 模板开发，3套


10. tip类型组件，RELEASE模式下不显示
12. 部分编辑模式页，RELEASE模式下不存在
3. 部分编辑模式图片上传功能新样式

11. 其他编辑功能打磨
12. 动画效果，声音效果
13. 上传文件尺寸判断
14. render功能明确化
15. 页面复制功能
16. 组件复制功能


3. 页面模板支持
3. EditOnly页在Release预览中不显示
4. 页面组件模板支持
5. 字号、颜色调整支持
2. 图片`上传`支持，图片`URL配置`支持
2. `组件通用动画`支持
1. 操作记录，可Ctrl-Z或Command-Z撤销



### 中间成果

1. fulledit
    1. http://test.baidu.com:8300/template/myslides/fulledit.html?cardid=15670870227862777334
    2. http://test.baidu.com:8300/template/myslides/fulledit.html?cardid=16220865808377624071
    3. http://test.baidu.com:8300/template/myslides/fulledit.html?cardid=16407306567705951099
    4. http://db-news-fe2.vm.baidu.com:8098/myslides/fulledit.html?cardid=15500251771548795763
    5. rotate: http://test.baidu.com:8300/template/myslides/fulledit.html?cardid=15915253467644422081
    6. http://db-news-fe2.vm.baidu.com:8098/myslides/fulledit.html?cardid=15909220339882143900

2. partialedit
    1. http://test.baidu.com:8300/template/myslides/partialedit.html?cardid=12813716557934814515 
    2. http://test.baidu.com:8300/template/myslides/partialedit.html?cardid=15812910710529346940

3. release
    1. http://test.baidu.com:8300/template/myslides/index.html?cardid=16475049231430235346&x=0&y=0&w=400&h=300#index
    2. http://test.baidu.com:8300/template/myslides/index.html?cardid=16112483962221526007&x=0&y=0&w=400&h=300#index

### 模板

`剪纸`
* fulledit 
    1. http://db-news-fe2.vm.baidu.com:8098/myslides/fulledit.html?cardid=15808351302173388958
    2. fulledit.html?cardid=15969864668415132937
    3. fulledit.html?cardid=12518138506395452933
    4. fulledit.html?cardid=16090959196801807245
    5. fulledit.html?cardid=16545598892618196777
    6. fulledit.html?cardid=16086193617104005187
    7. fulledit.html?cardid=15907832086260844938
    8. fulledit.html?cardid=15646984355820983989

* partialedit
    1. http://db-news-fe2.vm.baidu.com:8098/myslides/partialedit.html?cardid=15183824389706532537
    2. partialedit.html?cardid=15761066413872044526

* release
    1. http://db-news-fe2.vm.baidu.com:8098/myslides/index.html?cardid=15937074323963550011 
    2. http://db-news-fe2.vm.baidu.com:8098/myslides/index.html?cardid=16922630393391216429


### online

`剪纸：`

* fulledit
    9. fulledit.html?cardid=16317105215022708556
    10. fulledit.html?cardid=15814191602825558220

* partialedit
    5. partialedit.html?cardid=15933293146173194318
    6. partialedit.html?cardid=15455819136497256354

* release
    1. index.html?cardid=16514352120760868230&cut_x=0&cut_y=0&cut_w=396&cut_h=247.5


`国民老公：`

* fulledit
    18. 不换脸：fulledit.html?cardid=15064361781275376346
    26. fulledit.html?cardid=15189778932186000177
    27. fulledit.html?cardid=15962899979248120278


* partialedit
    7. 不换脸：partialedit.html?cardid=15601680117246657844
    12. partialedit.html?cardid=9595144653497850548
    13. partialedit.html?cardid=16319757803944884729

`媚娘：`

* fulledit
    22. fulledit.html?cardid=12346020097067584540
    23. fulledit.html?cardid=16233522067679736597
    24. fulledit.html?cardid=11823020078272446075

* partialedit
    7. partialedit.html?cardid=15283453732311694968
    8. partialedit.html?cardid=12375877275277060959
    9. partialedit.html?cardid=12297577397147683170

* release
    1. index.html?cardid=15636667956021638939


`模板选择页：`

1. http://m.baidu.com/static/news/postcard/select.html

`创意：`

Robin: 

1. http://m.baidu.com/news?cardid=16135789876452836262&cut_x=12.121212121212121&cut_y=0&cut_w=600&cut_h=375
2. http://m.baidu.com/news?cardid=16120905637185107517&cut_x=21.538461538461537&cut_y=6.153846153846153&cut_w=600&cut_h=375


### 开发链接

1. http://test.baidu.com:8300/template/myslides/fulledit.html?cardid=16204715932521676863&cut_x=0&cut_y=0&cut_w=640&cut_h=400#index


### Unit Tests 



## 业界调研

1. http://strut.io/editor

    webPPT制作，H5技术搭建，不过遗憾的没有模版系统

2. http://html5maker.com/app?token=aa9cf4fc37266521135e1b93671b841c26efb15a1d8f74a9 

    html5maker，Flash版本

3. `H5Slides`，H5版本，支持layout，页面切换动画配置。但给出的Demo文本编辑功能较弱，甚至背景色也不能修改。
    尚不知扩展特性如何。

    试玩地址：http://jinjiang.github.io/h5slides/demo/index.html


1. h5小游戏编辑器（h5.cocoachina.com)，基于cocos2d-js制作的H5小游戏，将素材、音乐、代码等
    资源配置抽取出来，可以在线修改，同时预览效果。

    <a href="http://h5.cocoachina.com/template/">Game Creator Online</a>

2. 积木网，H5微杂志是一种新的微信应用，形式生动，富有趣味性，更容易在朋友圈中传播。
    这种场景应用有多种用途，例如杂志、贺卡、会议邀请函、产品展示、年度报告、公司宣传。
    主要是看上它在页面上放了业内流行的微信H5应用。


6. http://demo.qunee.com/editor/
    
    基于canvas的图表制作工具。





## BUGs

1. 手机上编辑功能不流畅。iOS无法编辑，Android点击不灵敏
2. Android新闻客户端无法传图和拍照，特别是4.4，4.4.1，4.4.2


