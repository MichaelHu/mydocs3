# turbo-markdown

> 加强版`markdown`编译工具 


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 




## Resources

* `github`: <https://github.com/MichaelHu/turbo-markdown> <iframe src="http://258i.com/gbtn.html?user=MichaelHu&repo=turbo-markdown&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* `markdown compiler`: <https://github.com/MichaelHu/markdown-slides>


## Features

### 支持的特性
 
* 支持图片`懒加载`

         <img class="lazy" data-url="./img/180317-strawberry/big-img-100-1200.jpg">

* `mobile-first` 响应式页面样式
* `pdf-print`友好的样式表
* 自动生成`层级目录`
* `全文搜索`功能，支持`文本、正则、selector`等搜索类型
* 支持`vim-like`操作：`gg, G, j, k, h, l, ctrl-d, ctrl-u`等
* `fly.js`脚本支持，便捷`编写和运行`示例代码 <http://258i.com/static/bower_components/snippets/js/mp/fly.js>，支持`es6, es7, react`等`js语法`，以及`html语法`的示例代码，也可以自行扩展


以下说明`fly.js`扩展功能的使用方式。


### 简单js代码

以下为一段只读的js代码，其执行结果以`下方红字`输出。

<div id="test_simple_js" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_simple_js');
        s.show( 'Hello' );
        s.append_show( 'turbo-markdown' );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### 简单js代码 - 可编辑

可编辑js代码，再通过点击`Restart`按钮重新运行。

<div id="test_simple_js_editable" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_simple_js_editable');
        s.show( 'Hello' );
        s.append_show( 'turbo-markdown' );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 简单html代码 - 可编辑

同样地，以下HTML代码也支持编辑后运行。

<div id="test_simple_html" class="test">
<div class="test-container">

    @[data-script="html editable"]<style type="text/css">
    .test-style {
        height: 60px;
        margin: 20px;
        border-radius: 2px;
        border: 2px dotted #17becf;
        text-align: center;
        font: oblique small-caps normal 30px/60px arial;
    }
    </style>
    <div class="test-style">Think Different!</div>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### ES7代码 - 可编辑

支持`es6、es7、jsx`语法的js，可编辑后运行。

<div id="test_babel" class="test">
<div class="test-container">

    @[data-script="babel editable"](function(){

        var s = fly.createShow('#test_babel');
        const arr = { hello: 'Hello', tm: 'turbo-markdown' };
        const { hello, tm } = arr;
        
        s.show( hello );
        s.append_show( ( () => tm )() );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




## Install & Usage

    $ sudo npm install -g turbo-markdown 
    $ tm <-V | --version>
    $ tm <-H | --help>
    $ tm <file> [--local] [--no-preview]


## Todos

* 生成文档中，增加`turbo-markdown`版本信息
* 去掉`index.md`文档不生成左侧导航的功能，也可考虑做成配置项
* 代码展示允许折行，同代码编辑器设置，也能避免查看过长的代码行时需要左右滚动，同时还能解决pdf打印后，超出部分代码丢失的问题。可以只在pdf打印模式下允许折行

