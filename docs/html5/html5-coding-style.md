# html5 coding style

> Always keep your code `tidy`, `clean`, and `well-formed`.

> `接近XHTML`（ close to XHTML ）的方式编写html，未来XML Reader可能会读取你的HTML。

> `标识符`的选择应做到“见名知义”、“常用取简”、“专用取繁”



## w3schools

<http://www.w3schools.com/html/html5_syntax.asp>

1. 规范建议缩进使用2个空格，但我们建议`4个空格`。


### doctype声明

    <!DOCTYPE html>
    <!doctype html>

### 标签使用小写

`Bad`

    <SECTION> 
        <p>This is a paragraph.</p>
    </SECTION> 

`Very Bad`

    <Section> 
      <p>This is a paragraph.</p>
    </SECTION>

`Good`

    <section> 
      <p>This is a paragraph.</p>
    </section>


### 关闭所有标签

Bad:
    <section>
      <p>This is a paragraph.
      <p>This is a paragraph.
    </section>
Good:
    <section>
      <p>This is a paragraph.</p>
      <p>This is a paragraph.</p>
    </section>

### 建议关闭空标签

Allowed:
    <meta charset="utf-8">
Good:
    <meta charset="utf-8" />


### 属性名小写


### 属性值加引号

Very bad:
This will not work, because the value contains spaces:

    <table class=table striped>
Bad:
    <table class=striped>
Good:
    <table class="striped">


### 图片alt属性
d:
    <img src="html5.gif">
Good:
    <img src="html5.gif" alt="HTML5" style="width:128px;height:128px">


### 等号前后无空格

HTML5 allows spaces around equal signs. But space-less is easier to read, and groups entities better together.

Bad:
    <link rel = "stylesheet" href = "styles.css">
Good:
    <link rel="stylesheet" href="styles.css">


### 避免长行

不超过80字符


### 无必要的空行和缩进

例外：
1. 分隔大的代码块或者逻辑代码块
2. 2空格的缩进增强可读性


### 不忽略html, body 

标准允许忽略，但不建议。

    <!DOCTYPE html>
    <html lang="en-US">

建议提供`lang`属性。


### 不忽略head 

标准允许忽略，但不建议。

### 必要的meta

#### title表意

    <title>HTML5 Syntax Coding Style</title>

#### lang与charset
> 确保顺利解析，以及正确的搜索引擎索引，尽可能早的设置`lang`与`charset`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>HTML5 Syntax and Coding Style</title>
    </head>

* html语言代码参考：<http://www.w3school.com.cn/tags/html_ref_language_codes.asp>，如`en`, `zh`, `ja`
* `语言代码-地区码`，用于html标签的`lang属性`设置，如：
        en-US
        zh-CN
        zh-TW
        ja-JP
* `语言代码_地区码.字符编码`，常见于`Mac`, `Linux`系统的`LANG环境变量`设置，如：
        en_US.UTF-8
        zh_CN.UTF-8
    例如：
        echo $LANG
        zh_CN.UTF-8

    

### 设置viewport

所有页面包含以下`meta`

    <meta name="viewport" content="width=device-width, initial-scale=1.0">


### 注释规范

    <!-- This is a comment -->
    <!--
      This is a long comment example. This is a long comment example.
      This is a long comment example. This is a long comment example.
    -->

### 样式表

#### 省略link的type

    <link rel="stylesheet" href="style.css">


#### 短样式单行写

    p.intro { font-family: Verdana; font-size: 16em; }

#### 长样式多行写

    body {
        background-color: lightgrey;
        font-family: "Arial Black", Helvetica, sans-serif;
        font-size: 16em;
        color: black;
    }

* Place the opening bracket on the same line as the selector
* Use one space before the opening bracket
* Use two spaces of indentation [ `four spaces allowed` ]
* Use semicolon after each property-value pair, including the last
* Only use quotes around values if the value contains spaces
* Place the closing bracket on a new line, without leading spaces
* Avoid lines over 80 characters


### 简写方式加载JS

> 忽略`type`属性

    <script src="myscript.js">



### 使用全小写的文件名

* `Unix Apache` 区分大小写，`london.jpg`不同于`London.jpg`
* `MS IIS` 不区分大小写，`london.jpg`不同于`London.jpg`
* 确保全兼容，使用统一的`全小写文件名`



### 文件扩展名

* `.html`, `.htm`，没有任何区别，前者Unix风格，扩展名无限制；后者DOS时代风格，扩展名不超过3
* `.css`
* `.js`


### 服务器默认文件 

    index.html, index.htm, default.html, default.htm













> 以下为`调研转载内容`：

## 前端编码规范

<http://www.cnblogs.com/fjner/p/5854204.html>

规范目的

为提高团队协作效率, 便于后台人员添加功能及前端后期优化维护, 输出高质量的文档, 特制订此文档. 本规范文档一经确认, 前端开发人员必须按本文档规范进行前台页面开发. 本文档如有不对或者不合适的地方请及时提出, 经讨论决定后方可更改.

基本准则

符合web标准, 语义化html, 结构表现行为分离, 兼容性优良. 页面性能方面, 代码要求简洁明了有序, 尽可能的减小服务器负载, 保证最快的解析速度.

### 文件规范

1. html, css, js, images文件均归档至<系统开发规范>约定的目录中;

2. html文件命名: 英文命名, 后缀.htm. 同时将对应界面稿放于同目录中, 若界面稿命名为中文, 请重命名与html文件同名, 以方便后端添加功能时查找对应页面;

3. css文件命名: 英文命名, 后缀.css. 共用base.css, 首页index.css, 其他页面依实际模块需求命名.;

4. Js文件命名: 英文命名, 后缀.js. 共用common.js, 其他依实际模块需求命名.



### html书写规范

1. 文档类型声明及编码: 统一为html5声明类型`<!DOCTYPE html> `，编码统一为`<meta charset="gbk" />`, 书写时利用IDE实现层次分明的缩进;

2. 非特殊情况下样式文件必须外链至`<head>...</head>`之间;非特殊情况下JavaScript文件必须外链至页面底部;

3. 引入样式文件或JavaScript文件时, 须略去默认类型声明, 写法如下:

        <link rel="stylesheet" href="..." />

        <style>...</style>

        <script src="..."></script>

4. 引入JS库文件, 文件名须包含库名称及版本号及是否为压缩版, 比如`jquery-1.4.1.min.js`; 引入插件, 文件名格式为库名称+插件名称, 比如`jQuery.cookie.js`;

5. 所有编码均遵循xhtml标准, 标签 & 属性 & 属性命名 必须由小写字母及下划线数字组成, 且所有标签必须闭合, 包括 br (`<br />`), hr(`<hr />`)等; 属性值必须用双引号包括;

6. 充分利用无兼容性问题的html自身标签, 比如span, em, strong, optgroup, label,等等; 需要为html元素添加自定义属性的时候, 首先要考虑下有没有默认的已有的合适标签去设置, 如果没有, 可以使用须以"data-"为前缀来添加自定义属性，避免使用"data:"等其他命名方式;

7. 语义化html, 如 标题根据重要性用`h*`(同一页面只能有一个h1), 段落标记用p, 列表用ul, 内联元素中不可嵌套块级元素;

8. 尽可能减少div嵌套, 如`<div class="box"><div class="welcome">欢迎访问XXX, 您的用户名是<div class="name">用户名</div></div></div>`完全可以用以下代码替代: `<div class="box"><p>欢迎访问XXX, 您的用户名是<span>用户名</span></p></div>`;

9. 书写链接地址时, 必须`避免重定向`，例如：`href="http://itaolun.com/"`, 即须在URL地址后面加上“/”；

10. 在页面中尽量避免使用style属性,即`style="…"`;

11. 必须为含有描述性表单元素(input, textarea)添加label, 如

        <p>姓名: <input type="text" id="name" name="name" /></p>须写成:<p><label for="name">姓名: </label><input type="text" id="name" /></p>

12. 能以背景形式呈现的图片, 尽量写入css样式中;

13. 重要图片必须加上alt属性; 给重要的元素和截断的元素加上title;

14. 给区块代码及重要功能(比如循环)加上注释, 方便后台添加功能;

15. 特殊符号使用: 尽可能使用代码替代: 比如 
        &lt;
        &gt;
        &nbsp;

16. 书写页面过程中, 请考虑向后扩展性;

17. class & id 参见 css书写规范.


### css书写规范

1. 编码统一为`utf-8`;

2. 协作开发及分工: i会根据各个模块, 同时根据页面相似程序, 事先写好大体框架文件, 分配给前端人员实现内部结构&表现&行为; 共用css文件base.css由i书写, 协作开发过程中, 每个页面请务必都要引入, 此文件包含reset及头部底部样式, 此文件不可随意修改;

3. class与id的使用: id是唯一的并是父级的, class是可以重复的并是子级的, 所以id仅使用在大的模块上, class可用在重复使用率高及子级中; id原则上都是由我分发框架文件时命名的, 为JavaScript预留钩子的除外;

4. 为JavaScript预留钩子的命名, 请以 js_ 起始, 比如: js_hide, js_show;

5. class与id命名: 大的框架命名比如header/footer/wrapper/left/right之类的在2中由i统一命名.其他样式名称由 小写英文 & 数字 & _ 来组合命名, 如i_comment, fontred, width200; 避免使用中文拼音, 尽量使用简易的单词组合; 总之, 命名要语义化, 简明化.

6. 规避class与id命名(此条重要, 若有不明白请及时与i沟通):

    a） 通过从属写法规避, 示例见d;

    b）取父级元素id/class命名部分命名, 示例见d;

    c）重复使用率高的命名, 请以自己代号加下划线起始, 比如i_clear;

    d）a,b两条, 适用于在2中已建好框架的页面, 如, 要在2中已建好框架的页面代码<div id="mainnav"></div>中加入新的div元素,

    按a命名法则: 

        <div id="mainnav"><div class="firstnav">...</div></div>,

    样式写法: 

        #mainnav .firstnav{.......}

    按b命名法则: 

        <div id="mainnav"><div class="main_firstnav">...</div></div>,

    样式写法: 

        .main_firstnav{.......}

7. css属性书写顺序, 建议遵循: `布局定位属性-->自身属性-->文本属性-->其他属性`. 此条可根据自身习惯书写, 但尽量保证同类属性写在一起. 
    属性列举: 
    * 布局定位属性主要包括: 
            display & list-style & position（相应的 top,right,bottom,left） ＆ float & clear ＆ visibility ＆ overflow； 
    * 自身属性主要包括: 
            width & height & margin & padding & border & background; 
    * 文本属性主要包括：
            color & font & text-decoration & text-align & vertical-align & white- space & 其他 & content; 我所列出的这些属性只是最常用到的, 并不代表全部;

8. 书写代码前, 考虑并提高样式重复使用率;

9. 充分利用html自身属性及样式继承原理减少代码量, 比如:

        <ul class="list"><li>这儿是标题列表<span>2010-09- 15</span></ul>

    定义

        ul.list li{position:relative} ul.list li span{position:absolute; right:0}

    即可实现日期居右显示

10. 样式表中`中文字体名`, 请务必`转码成unicode码`, 以避免编码错误时乱码;

11. 背景图片请尽可能使用sprite技术, 减小http请求, 考虑到多人协作开发, sprite按模块制作;

12. 使用table标签时(尽量避免使用table标签), 请不要用width/ height/cellspacing/cellpadding等table属性直接定义表现, 应尽可能的利用table自身私有属性分离结构与表现 , 如thead,tr,th,td,tbody,tfoot,colgroup,scope; (cellspaing及cellpadding的css控制方法:table{border:0;margin:0;border-collapse:collapse;} table th, table td{padding:0;}, base.css文件中我会初始化表格样式)

13. 杜绝使用`<meta http-equiv="X-UA-Compatible" content="IE=7" />` 兼容 ie8;

14. 用png图片做图片时, 要求图片格式为png-8格式,若png-8实在影响图片质量或其中有半透明效果, 请为ie6单独定义背景:

        _background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader (sizingMethod=crop, src=’img/bg.png’);

15. 避免兼容性属性的使用, 比如text-shadow || css3的相关属性;

16. 减少使用影响性能的属性, 比如position:absolute || float ;

17. 必须为大区块样式添加注释, 小区块适量注释;

18. 代码缩进与格式: 建议单行书写, 可根据自身习惯, 后期优化i会统一处理;

### JavaScript书写规范

1. 文件编码统一为utf-8, 书写过程过, 每行代码结束必须有分号; 原则上所有功能均根据XXX项目需求原生开发, 以避免网上down下来的代码造成的代码污染(沉冗代码 || 与现有代码冲突 || ...);

2. 库引入: 原则上仅引入jQuery库, 若需引入第三方库, 须与团队其他人员讨论决定;

3. 变量命名: 驼峰式命名. 原生JavaScript变量要求是纯英文字母, 首字母须小写, 如iTaoLun;

jQuery变量要求首字符为'_', 其他与原生JavaScript 规则相同, 如: _iTaoLun;

另, 要求变量集中声明, 避免全局变量.

4. 类命名: 首字母大写, 驼峰式命名. 如 ITaoLun;

5. 函数命名: 首字母小写驼峰式命名. 如iTaoLun();

6. 命名语义化, 尽可能利用英文单词或其缩写;

7. 尽量避免使用存在兼容性及消耗资源的方法或属性, 比如eval_r() & innerText;

8. 后期优化中, JavaScript非注释类中文字符须转换成unicode编码使用, 以避免编码错误时乱码显示;

9. 代码结构明了, 加适量注释. 提高函数重用率;

10. 注重与html分离, 减小reflow, 注重性能.

### 图片规范

1. 所有页面元素类图片均放入img文件夹, 测试用图片放于img/demoimg文件夹;

2. 图片格式仅限于gif || png || jpg;

3. 命名全部用`小写英文字母` || `数字` || `_` 的组合，其中不得包含`汉字` || `空格` || `特殊字符`；尽量用易懂的词汇, 便于团队其他成员理解; 另, 命名分头尾两部分, 用下划线隔开, 比如ad_left01.gif || btn_submit.gif;

4. 在保证视觉效果的情况下选择最小的图片格式与图片质量, 以减少加载时间;

5. 尽量避免使用半透明的png图片(若使用, 请参考css规范相关说明);

6. 运用css sprite技术集中小的背景图或图标, 减小页面http请求, 但注意, 请务必在对应的sprite psd源图中划参考线, 并保存至img目录下.

### 注释规范

1. html注释: 注释格式 `<!--这儿是注释-->`, '--'只能在注释的始末位置,不可置入注释文字区域;

2. css注释: 注释格式 `/* ... */`;

3. JavaScript注释, 单行注释使用

        // 这儿是单行注释
        /**
         * 多行注释使用
         */

### 开发及测试工具约定

建议使用Aptana || Dw || Vim , 亦可根据自己喜好选择, 但须遵循如下原则:

1. 不可利用IDE的视图模式'画'代码;

2. 不可利用IDE生成相关功能代码, 比如Dw内置的一些功能js;

3. 编码必须格式化, 比如缩进;

测试工具: 前期开发仅测试FireFox & IE6 & IE7 & IE8 , 后期优化时加入Opera & Chrome & Safari;

建议测试顺序: FireFox-->IE7-->IE8-->IE6-->Opera-->Chrome-->Safari, 建议安装firebug及IE Tab Plus插件.

### 其他规范

1. 开发过程中严格按分工完成页面, 以提高css复用率, 避免重复开发;

2. 减小沉冗代码, 书写所有人都可以看的懂的代码. 简洁易懂是一种美德. 为用户着想, 为服务器着想.



## 文件命名规范

<http://blog.csdn.net/qq_26129689/article/details/52652000?ref=myread>

### 文件命名规则

统一用`小写`的英文字母，`数字`和`下划线`的组合，`不得`包含`汉字、空格和特殊字符`。

* 方便理解，见名知意
* 方面查找

### 索引文件的命名规则（首页面）

    index.htm
    index.html（常见的静态网页）
    index.asp（VB）
    index.aspx（）
    index.jsp（Java）
    index.php（PHP）

### 各个子页面的命名规则

* 统一用翻译的英文命名（推荐）
* 统一用拼音命名（拼音的简化也可）
* 如果文件名过长，企业要提前约定一份缩写的规范，如pro—product

[x] 注意：不要中英文混用

例如：

    首页—index
    产品列表—prolist产品详细页面—prodetail
    新闻列表—newslist新闻详细页面—newsdetail
    发展历史—history
    关于我们—aboutus
    联系我们—linkus，contactus
    信息反馈—feedback留言—leavewords

### 图片命名规范

图片的名称分为头尾两部分，用`下划线`隔开，头部表示此图片的`大类性质`，例如广告，标志，菜单，按钮等

    banner：放置在页面顶部的广告，装饰图案等长方形的图片
    logo：标志性的图片
    button：在页面上位置不固定，并且带有链接的小图片
    menu：在页面中某一位置连续出现，性质相同的链接栏目的图片
    pic：装饰用的图片

例子：

    banner_sohu.gif, banner_sina.gif
    menu_aboutus.gif,menu_job.gif
    title_news.gif
    logo_police.gif
    pic_people.gif

### 脚本文件和动态文本文件命名规则

脚本文件：一般使用脚本功能的英文小写缩写命名

    实际模块：例如广告条的javascript文件名为ad.js，弹出窗口的javascript文件名为pop.js
    公用模块：js文件命名：英文命名，后缀js。如common.js，basic.js
    外部资源：Jquery.min.js，Jquery.validate.js，Jquery.date.js
    动态文件：以性质描述，可以有多个单词，用‘_’隔开，性质一般是该页面的概要（见名知意）。

范例：register_form.aspx，register_post.aspx，topic_lock.aspx。不同模块之间，可以使用不同的前缀来区分




## 破狼-前端HTML-CSS规范

<http://www.cnblogs.com/whitewolf/p/4491707.html>



## 前端css规范整理A

### 文件规范

1. 文件均归档至约定的目录中。

    具体要求通过豆瓣的CSS规范进行讲解：

    所有的CSS分为两大类：`通用类`和`业务类`。

    `通用`的CSS文件，放在如下目录中：

        基本样式库 /css/core 
        通用UI元素样式库 /css/lib 
        JS组件相关样式库 /css/ui 

    `业务类`的CSS是指和具体产品相关的文件，放在如下目录中：

        读书 /css/book/ 

        电影 /css/movie/ 

        音乐 /css/music/ 

        社区 /css/sns/ 

        小站 /css/site/ 

        同城 /css/location/ 

        电台 /css/radio/ 

    外联CSS文件适用于全站级和产品级通用的大文件。内联CSS文件适用于在一个或几个页面共用的CSS。另外一对具体的CSS进行文档化的整理。如：

        util-01 reset /css/core/reset.css 

        util-02 通用模块容器 /css/core/mod.css 

        ui-01. 喜欢按钮 /css/core/fav_btn.css 

        ui-02. 视频/相册列表项 /css/core/media_item.css 

        ui-03. 评星 /css/core/rating.css 

        ui-04. 通用按钮 /css/core/common_button.css 

        ui-05. 分页 /css/core/pagination.css 

        ui-06. 推荐按钮 /css/core/rec_btn.css 

        ui-07. 老版对话框 /css/core/old_dialog.css 

        ui-08. 老版Tab /css/core/old_tab.css 

        ui-09. 老版成员列表 /css/core/old_userlist.css 

        ui-10. 老版信息区 /css/core/notify.css 

        ui-11. 社区用户导航 /css/core/profile_nav.css 

        ui-12. 当前大社区导航 /css/core/site_nav.css 

        ui-13. 加载中 /css/lib/loading.css 

2. 文件引入可通过外联或内联方式引入。

        外联方式：（类型声明type=”text/css”可以省略） 

        内联方式：（类型声明type=”text/css”可以省略） 

    link和style标签都应该放入head中，原则上，不允许在html上直接写样式。避免在CSS中使用@import，嵌套不要超过一层。

3. 文件名、文件编码及文件大小

    文件名必须由`小写字母`、`数字`、`中划线`组成 

    文件必须用`UTF-8`编码，使用`UTF-8（非BOM）`，在HTML中指定UTF-8编码，在CSS中则不需要特别指定因为默认就是UTF-8。 

    单个CSS文件避免过大（建议少于300行） 


### 注释规范

1. 文件顶部注释（推荐使用）

        /* * @description: 中文说明 * @author: name * @update: name (2013-04-13 18:32) */ 

2. 模块注释

        /* module: module1 by 张三 */ … /* module: module2 by 张三 */ 

    模块注释必须单独写在一行

3. 单行注释与多行注释

        /* this is a short comment */

    单行注释可以写在单独一行，也可以写在行尾，注释中的每一行长度不超过40个汉字，或者80个英文字符。

        /**
         * this is comment line 1.
         * this is comment line 2.
         */

    多行注释必须写在单独行内

4. 特殊注释

        /* TODO: xxxx by name 2013-04-13 18:32 */

        /* BUGFIX: xxxx by name 2012-04-13 18:32 */

    用于标注修改、待办等信息

5. 区块注释

        /* Header */ /* Footer */ /* Gallery */ 

    对一个代码区块注释（可选），将样式语句分区块并在新行中对其注释。


### 命名规范

使用有意义的或通用的ID和class命名：ID和class的命名应反映该元素的功能或使用通用名称，而不要用抽象的晦涩的命名。反映元素的使用目的是首选；使用通用名称代表该元素不表特定意义，与其同级元素无异，通常是用于辅助命名；使用功能性或通用的名称可以更适用于文档或模版变化的情况。

    /* 不推荐: 无意义 */ #yee-1901 {} 

    /* 不推荐: 与样式相关 */ .button-green {}.clear {} 

    /* 推荐: 特殊性 */ #gallery {}#login {}.video {} 

    /* 推荐: 通用性 */ .aux {}.alt {} 

常用命名（多记多查英文单词）：page、wrap、layout、header(head)、footer(foot、ft)、content(cont)、menu、nav、main、submain、sidebar(side)、logo、banner、title(tit)、popo(pop)、icon、note、btn、txt、iblock、window(win)、tips等

ID和class命名越简短越好，只要足够表达涵义。这样既有助于理解，也能提高代码效率。

    /* 不推荐 */ #navigation {}.atr {} 

    /* 推荐 */ #nav {}.author {} 

类型选择器避免同时使用标签、ID和class作为定位一个元素选择器；从性能上考虑也应尽量减少选择器的层级。

    /* 不推荐 */ul#example {}div.error {} 

    /* 推荐 */#example {}.error {} 


命名时需要注意的点：

* 规则命名中，一律采用小写加中划线的方式，不允许使用大写字母或 _ 
* 命名避免使用中文拼音，应该采用更简明有语义的英文单词进行组合 
* 命名注意缩写，但是不能盲目缩写，具体请参见常用的CSS命名规则 
* 不允许通过1、2、3等序号进行命名 
* 避免class与id重名 
* id用于标识模块或页面的某一个父容器区域，名称必须唯一，不要随意新建id 
* class用于标识某一个类型的对象，命名必须言简意赅。 
* 尽可能提高代码模块的复用，样式尽量用组合的方式 

规则名称中不应该包含颜色（red/blue）、定位（left/right）等与具体显示效果相关的信息。应该用意义命名，而不是样式显示结果命名。 

### 常用id的命名：

#### 页面结构

容器: container 

页头：header 

内容：content/container 

页面主体：main 

页尾：footer 

导航：nav 

侧栏：sidebar 

栏目：column 

页面外围控制整体布局宽度：wrapper 

左右中：left right center 

#### 导航

导航：nav 

主导航：mainbav 

子导航：subnav 

顶导航：topnav 

边导航：sidebar 

左导航：leftsidebar 

右导航：rightsidebar 

菜单：menu 

子菜单：submenu 

标题: title 

摘要: summary 

#### 功能

标志：logo 

广告：banner 

登陆：login 

登录条：loginbar 

注册：regsiter 

搜索：search 

功能区：shop 

标题：title 

加入：joinus 

状态：status 

按钮：btn 

滚动：scroll 

标签页：tab 

文章列表：list 

提示信息：msg 

当前的: current 

小技巧：tips 

图标: icon 

注释：note 

指南：guide 

服务：service 

热点：hot 

新闻：news 

下载：download 

投票：vote 

合作伙伴：partner 

友情链接：link 

版权：copyright 

### 常用class的命名

#### 颜色

使用颜色的名称或者16进制代码,如

    .red { color: red; } 

    .f60 { color: #f60; } 

    .ff8600 { color: #ff8600; } 

#### 字体大小

直接使用`"font+字体大小"`作为名称,如

    .font12px { font-size: 12px; } 

    .font9pt {font-size: 9pt; } 


#### 对齐样式

使用对齐目标的英文名称,如

    .left { float:left; } 

    .bottom { float:bottom; } 

#### 标题栏样式

使用`"类别+功能"`的方式命名,如

    .barnews { } 

    .barproduct { } 

## 书写规范

### 排版规范

(1)使用4个空格，而不使用tab或者混用空格+tab作为缩进；

(2)规则可以写成单行，或者多行，但是整个文件内的规则排版必须统一；

单行形式书写风格的排版约束

如果是在html中写内联的css，则必须写成单行； 

每一条规则的大括号 { 前后加空格 ； 

每一条规则结束的大括号 } 前加空格； 

属性名冒号之前不加空格，冒号之后加空格； 

每一个属性值后必须添加分号; 并且分号后空格； 

多个selector共用一个样式集，则多个selector必须写成多行形式 ； 

多行形式书写风格的排版约束

每一条规则的大括号 { 前添加空格; 

多个selector共用一个样式集，则多个selector必须写成多行形式 ; 

每一条规则结束的大括号 } 必须与规则选择器的第一个字符对齐 ; 

属性名冒号之前不加空格，冒号之后加空格; 

属性值之后添加分号; 



### 属性编写顺序

显示属性：display/list-style/position/float/clear … 

自身属性（盒模型）：width/height/margin/padding/border 

背景：background 

行高：line-height 

文本属性：color/font/text-decoration/text-align/text-indent/vertical-align/white-space/content… 

其他：cursor/z-index/zoom/overflow 

CSS3属性：transform/transition/animation/box-shadow/border-radius 

如果使用CSS3的属性，如果有必要加入浏览器前缀，则按照 -webkit- / -moz- / -ms- / -o- / std的顺序进行添加，标准属性写在最后。 

链接的样式请严格按照如下顺序添加： a:link -> a:visited -> a:hover -> a:active 



### 规则书写规范

使用单引号，不允许使用双引号; 

每个声明结束都应该带一个分号，不管是不是最后一个声明; 

除16进制颜色和字体设置外，CSS文件中的所有的代码都应该小写; 

除了重置浏览器默认样式外，禁止直接为html tag添加css样式设置; 

每一条规则应该确保选择器唯一，禁止直接为全局.nav/.header/.body等类设置属性; 


### 代码性能优化

合并margin、padding、border的-left/-top/-right/-bottom的设置，尽量使用短名称。 

选择器应该在满足功能的基础上尽量简短，减少选择器嵌套，查询消耗。但是一定要避免覆盖全局样式设置。 

注意选择器的性能，不要使用低性能的选择器。 

禁止在css中使用`"*"`选择符。 

除非必须，否则，一般有class或id的，不需要再写上元素对应的tag。 

0后面不需要单位，比如0px可以省略成0，0.8px可以省略成.8px。 

如果是16进制表示颜色，则颜色取值应该大写。 

如果可以，颜色尽量用三位字符表示，例如#AABBCC写成#ABC 。 

如果没有边框时，不要写成border:0，应该写成border:none 。 

尽量避免使用AlphaImageLoader 。 

在保持代码解耦的前提下，尽量合并重复的样式。 

background、font等可以缩写的属性，尽量使用缩写形式 。 

### CSS Hack的使用

请不用动不动就使用浏览器检测和CSS Hacks，先试试别的解决方法吧！考虑到代码高效率和易管理，虽然这两种方法能快速解决浏览器解析差异，但应被视为最后的手段。在长期的项目中，允许使用hack只会带来更多的hack，你越是使用它，你越是会依赖它！

推荐使用下面的：

css-hack

### 字体规则

为了防止文件合并及编码转换时造成问题，建议将样式中文字体名字改成对应的英文名字，如：`黑体(SimHei)` `宋体(SimSun)` `微软雅黑 (Microsoft Yahei)`，几个单词中间有空格组成的必须加引号) 

字体粗细采用具体数值，粗体`bold`写为`700`，正常`normal`写为`400`

`font-size`必须以`px`或`pt`为单位，推荐用px（注：pt为打印版字体大小设置），`不允许`使用`xx-small/x-small/small/medium/large/x-large/xx-large`等值 

为了对font-family取值进行统一，更好的支持各个操作系统上各个浏览器的兼容性，font-family不允许在业务代码中随意设置 


### 其他规范

不要轻易改动全站级CSS和通用CSS库。改动后，要经过全面测试。 

避免使用filter 

避免在CSS中使用expression 

避免过小的背景图片平铺。 

尽量不要在CSS中使用`!important`

绝对不要在CSS中使用`*`选择符 

层级(z-index)必须清晰明确
* 页面弹窗、气泡为最高级（最高级为999），不同弹窗气泡之间可在三位数之间调整；
* 普通区块为10-90内10的倍数；
* 区块展开、弹出为当前父层级上个位增加，禁止层级间盲目攀比。 

背景图片请尽可能使用sprite技术, 减小http请求, 考虑到多人协作开发, sprite按照模块、业务、页面来划分均可。 

### 测试规范

1、了解浏览器特效支持

为了页面性能考虑，如果浏览器不支持CSS3相关属性的，则该浏览器的某些特效将不再支持，属性的支持情况如下表所示（Y为支持，N为不支持）：

brower

2、 设定浏览器支持标准

abc

A级－交互和视觉完全符全设计的要求 

B级－视觉上允许有所差异，但不破坏页面的整体效果 

C级－可忽略设计上的细节，但不防碍使用 

3、常用样式测试工具

W3C CSS validator：http://jigsaw.w3.org/css-validator/

CSS Lint：http://csslint.net/

CSS Usage：https://addons.mozilla.org/en-us/firefox/addon/css-usage/
