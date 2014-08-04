% 创建并开发一个WEBAPP应用－Slider 
% hdm258i@gmail.com
% 2013-04-28
% 暂不开放, webapp框架


## 一、准备工作

这一部分为webapp开发提供环境和框架代码。**checkpoint**: 能正常展现hellorocket demo

* 1.1 FIS环境：1.3.6+，安装目录记为**FIS_DIR**，开发工作目录记为**DEVELOP_DIR**
@tip: 1.3.9目前存在问题，尚未解决

* 1.2 common模块: 包含rocket框架代码
    cd DEVELOP_DIR
    svn co "http://tc-apptest-img08.vm.baidu.com:8021/svn/repos/projects/rocket_workshop/common"

* 1.3 hellorocket模块，包含简单demo，用于验证环境和框架代码的有效性
    cd DEVELOP_DIR
    svn co "http://tc-apptest-img08.vm.baidu.com:8021/svn/repos/projects/rocket_workshop/hellorocket"

* 1.4 运行fis，查看hellorocket效果

    1. 运行fis
    cd FIS_DIR
    sh start.sh # linux/mac
    start.bat # windows 

    2. 配置rocket_workshop为开发目录
    3. 访问http://localhost[:port]/hellorocket/hellorocket.html

验证hellorocket webapp是否正常运转，截图如下：

![hellorocket首页截图](./img/hellorocket_snapshot_index.png)

![hellorocket详情页截图](./img/hellorocket_snapshot_sayhello.png)


## 二、公共部分开发

所谓的薄公共层，提前确定下来，这一步是并行开发的基础。可以多人讨论，一人操作。**checkpoint**: 能展现各个pageview的"**Hello, I am page PAGENAME**"

### 2.1 开始之前，先一起讨论以下问题的答案

1. webapp名称？它将被用于fis模块
2. webapp包含几个页面，名称、访问方式分别是什么？它们将被用于路由协议和处理函数编写
3. 这些页面之间如何进行切换？simple, slide, fade or dropdown，按需选择

### 2.2 一起讨论确定如下答案 

* 1. webapp名称为slider
* 2. 页面名称、访问方式等如下所示，其中**入口页（entrypage）**名称为outline：
    名称        访问方式
    outline     # or #outline/:title
    slide       #slide/:title/:sliderindex
* 3. 页面间切换方式如下所示
    outline->slide: slide left
    slide->outline: slide right

### 2.3 完成公共部分编码

完成以上问题的解答之后，我们开始公共部分编码，由**一个同学完成**即可。

#### 2.3.1 基础代码和入口页原型

* 2.3.1.1 获取webapp脚手架代码，checkout到slider目录，也即slider模块：
    cd DEVELOP_DIR
    svn co "http://tc-apptest-img08.vm.baidu.com:8021/svn/repos/projects/rocket_workshop/scaffold" slider

* 2.3.1.2 验证脚手架代码
    1. FIS模块切换：切换至slider模块
    2. 访问http://localhost[:port]/slider/WEBAPPNAME.html，展示"**Hello, I am page PAGENAME**"，控制台无报错

* 2.3.1.3 做四个全局替换
    1. 所有文件名（包含目录）中包含的WEBAPPNAME替换为slider
    2. 所有文件中包含的WEBAPPNAME替换为slider
    3. 所有文件名（包含目录）中包含的PAGENAME替换为outline
    4. 所有文件中包含的PAGENAME替换为outline（入口页）

* 2.3.1.4 验证入口页
    1. 清空缓存（很有必要）
    2. 访问http://localhost[:port]/slider/slider.html，展示"**Hello, I am page outline**"，控制台无报错

至此，已经完成slider webapp的基础代码，外加入口页outline的原型代码，接下来，我们生成另外一个页面slide的原型代码。

#### 2.3.2 slide页面原型

* 2.3.2.1 获取webapp page之脚手架代码，checkout到slider/page/下的slide目录，也即slide页面的目录树
    cd DEVELOP_DIR/slider/page
    svn co "http://tc-apptest-img08.vm.baidu.com:8021/svn/repos/projects/rocket_workshop/scaffold/page/PAGENAME" slide

* 2.3.2.2 做两个全局替换
    1. 所有文件名（包含目录）中包含的PAGENAME替换为slide
    2. 所有文件中包含的PAGENAME替换为slide

这时，访问http://localhost\[:port]/slider/slider.html#slide/title/1，slide页面是不会展现出来的，**原因是没有包含slide页面的路由、页面框架和模板、CSS文件等内容**。

* 2.3.2.3 增加slide路由、页面框架和模板、CSS文件

**slide路由**，在文件DEVELOP_DIR/slider/js/rocket.router.slider.js中的routes、pageOrder、pageTransition、route handlers部分，添加以后，大致如下所示：
    routes: {
        '': 'outline'
        ,'outline/:title': 'outline'
        ,'slide/:title/:sliderindex': 'slide'
    }
    ...
    ,pageOrder: [
        'outline'
        , 'slide'
    ]  
    ...
    ,pageTransition: {
        'outline-slide': 'dropdown' 
    }   
    ...
    ,slide: function(title, sliderindex) {
        this.doAction('slide', {
                title: decodeURIComponent(title)
                ,sliderindex: decodeURIComponent(sliderindex)
            }
        );
    }    

**页面框架和模板**，在文件DEVELOP_DIR/slider/slider.html中的<!--page view-->和<!--front template-->位置下方，分别添加页面框架和模板代码，添加以后，大致如下所示：
    <!--page view-->
    /*{fis-inline file="./page/outline/html/outline.html"}*/ 
    /*{fis-inline file="./page/slide/html/slide.html"}*/ 

    ...

    <!--front template-->
    /*{fis-inline file="./page/outline/tpl/outline.tpl.html"}*/ 
    /*{fis-inline file="./page/slide/tpl/slide.tpl.html"}*/ 

**CSS文件**，在文件DEVELOP_DIR/slider/css/rocket.css中的/*page*/位置下方，添加CSS import代码，添加以后，大致如下图所示：
    /*page*/                       
    @import url("../page/outline/css/outline.css")
    @import url("../page/slide/css/slide.css")

* 2.3.2.4 至此，完成slide页面的原型代码添加，可以验证slide页的正确性了：
    1. 清空缓存（如有必要）
    2. 访问http://localhost[:port]/slider/slider.html#slide/title/1，展示"**Hello, I am page slide**"，控制台无报错

#### 2.3.3 其他页面原型

如还有其他页面，依葫芦画瓢，按照slide页面的方式进行添加并验证。至此，已经完成公共部分的编码，剩余部分的工作将可由多人并行开发。下面进入页面开发：

## 三、并行部分开发

到这一阶段以后，后续的开发工作就可以多人并行开发、代码提交和自测了，并行开发的每个开发者的开发行为都限制在互相独立的目录中，最重要的是开发同学需要注意规范，循序渐进完成全部页面功能的开发，千万不要提交有报错的代码，以免影响其他同学的开发。**checkpoint**: 完成各自负责的page，展现和功能均正常。

page目录瘦身，保留两个相近页面：固高单页面模型、固高子页面模型
@linkto: webapp概念
@todo: 页面模型分类
@todo：需要fis支持才比较好

刚开始页面开发，是基于简单页面原型的，按以下步骤进行：
1. 开发和调试页面DOM结构和样式
2. 数据开发，创建对应的model或者collection
3. 前端模板（视图层）开发
4. 控制器与交互功能开发（各类pageview、subview等视图控制器）

### 3.1 outline页面开发（同学A） 

#### 3.1.1 页面DOM结构和样式

页面DOM结构和样式分别在page/outline/html和page/outline/css目录下，在这两个文件中修改，并通过浏览器调试效果。如果查看时发现改动并未生效，那是因为没有**清空FIS缓存**。通过不断修改和预览，最终使页面样式效果符合要求。完成后的代码如下所示：

* 页面DOM结构文件：outline/html/outline.html

    <div id="outline_page">
        <div id="outline_page_content" class="markdown-wrapper">
            <!--div class="outline-page-content-relayoutbtn">relayout</div-->
        </div>
    </div>

* 页面样式文件：outline/css/outline.css

    /*页面视图id，与action同名，以_page为后缀*/
    #outline_page{
        /*默认不展示*/
        display:none;

        /*绝对定位*/
        position:absolute;

        /*撑满整个父容器*/
        top:0;
        left:0;
        right:0;
        bottom:0;

        /*最低高度，确保即使没内容，loading也可以展示，同时能遮住下方内容*/
        min-height:600px;

        /*阻止文本选中*/
        -webkit-user-select:none;
        -moz-user-select:none;
    }

    #outline_page_header{}

    #outline_page_content{
        /*作为绝对定位的loading样式的容器，需要使用relative定位*/
        position:relative;
        height:100%;
        /*覆盖markdown-wrapper*/
        margin:0;
        /*防止tile把容器撑开*/
        overflow:hidden;
        background:url(../img/bg_2.jpg) repeat 0 0;
    }

    #outline_page_content *{
        -webkit-transform:translateZ(0);
    }

    .outline-page-content-relayoutbtn{
        position:absolute;
        left:20px;
        top:20px;
        z-index:10000;
        cursor:pointer;
    }

    .outline-page-content-tile{
        position:absolute;
        width:220px;
        height:160px;
        padding:5px;
        border:1px inset #bbb;
        background:#eee;
        border-radius:6px;
    }

    .outline-page-content-tile-content{
        position:relative;
        width:100%;
        height:100%;
        overflow:hidden;
    }

    .outline-page-content-tile h2{
        border-left:10px solid #F0A22A;
        padding:5px;
        font:bold 18px/30px normal;
    }

    .outline-page-content-tile p{
        font:bold 14px/20px normal;
    }

    .outline-page-content-tile-mask{
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        cursor:move;
        text-align:left;
        color:#fff;
        background:rgba(0,0,0,0.3) url(../img/half-transparent-bg.png) repeat-x 0 bottom;
        background-size:90px 30px;
        font:bold 80px/200px normal;
    }

    .outline-page-content-tile-gobtn{
        position:absolute;
        width:25px;
        height:25px;
        top:-15px;
        right:-15px;
        cursor:pointer;
        border-radius:5px;
        background:rgba(94,181,226,0.5) url(../../../img/bg_arrows.png) no-repeat -25px 0;
        background:rgba(0,0,0,0.3) url(../../../img/bg_arrows.png) no-repeat -25px 0;
        background-size:50px 50px;
    }

    /**
     * markdown style
     */
    .markdown-wrapper{
        margin-top:18px;
        padding:0 5px;
    }

    .markdown-wrapper h1{
        margin:10px 0;
        font:bold 26px/30px normal;
    }

    .markdown-wrapper h2{
        margin:8px 0;
        font:bold 22px/26px normal;
    }

    .markdown-wrapper h3{
        margin:6px 0;
        font:bold 18px/22px normal;
    }

    .markdown-wrapper h4{
        margin:4px 0;
        font:bold 14px/18px normal;
    }

    .markdown-wrapper a{
        background:#6bfafa;
        text-decoration:none;
        color:#f00;
    }

    .markdown-wrapper em{
        background:#F7CC27;
        text-decoration:none;
    }

    .markdown-docinfo{
        text-align:right;
    }

    .markdown-docinfo h1{
        text-align:center; 
    }

    .markdown-docinfo span{
        margin:0 5px;
        color:#888; 
        font:normal 14px/18px normal;
    }

    .markdown-paragraph{
        margin-top:5px;
        padding-left:5px;
        text-indent:28px;
        font:normal 14px/22px normal;
    }

    .markdown-ul{
        margin-left:20px;
        margin-top:5px;
        padding-left:5px;
        list-style:square outside none;
        font:normal 14px/22px normal;
    }

    .markdown-ol{
        margin-left:20px;
        margin-top:5px;
        padding-left:5px;
        list-style:decimal outside none;
        font:normal 14px/22px normal;
    }

    .markdown-codeblock{
        margin:8px 0;
        padding-left:5px;
        border:1px solid #bbb;
        border-radius:4px;
        background:#eee;
        font:italic 12px/20px Courier;
    }

    .markdown-codeblock span{
        display:block;
        overflow:hidden;
    }

    .markdown-imagewrapper{
        margin:8px 0;
        text-align:center;
    }

    .markdown-imagecaption{
        text-align:center;
        font:normal 14px/22px normal;
    }

    .markdown-imagewrapper img{
        max-width:100%;
    }


#### 3.1.2 数据开发

outline的数据是JSON表示的结构化文档数据，原始文档为markdown语法。页面显示的每个方块儿表示文档的一个章节。数据结构不复杂，是只读接口。扩展app.collection即可，表示章节的集合，完成后的代码如下所示：

* 页面数据模型：outline/js/model/rocket.collection.outline_sections.js 
    
    (function($){

    rocket.collection.outline_sections = rocket.collection.extend({

        initialize: function(models, options){
            var me = this;

            me.title = options.title
                || 'ROCKET框架介绍';
            me.sections = null;

            // 保留实例引用
            rocket.collection.outline_sections._instances
                || (rocket.collection.outline_sections._instances = {});

            rocket.collection.outline_sections._instances[me.title] = me;
        }

        ,url: function(){
            return '/articles/get_article.php?'
                + 'title=' +  encodeURIComponent(this.title);
        }

        ,parse: function(resp, xhr){
            return resp.content.slice(1);
        }

        ,getSections: function(){
            var me = this,
                models = me.models,
                model,
                sections = [],
                docinfoFlag = true;

            if(me.sections){
                return me.sections;
            }

            for(var i=0; i<models.length; i++){
                model = models[i];
                if('docinfo' == model.get('type')
                    || 'headline' == model.get('type') 
                        && 2 == model.get('level')){
                    sections.push([model.toJSON()]); 
                }
                else{
                    sections[sections.length - 1].push(model.toJSON());
                }
            }
            me.sections = sections;

            return me.sections;
        }

        ,getSection: function(sliderindex){
            var me = this,
                sections = me.getSections(),
                sec = null;

            sec = sections[sliderindex - 1] || sec;

            return sec;
        }

        ,getSectionCount: function(){
            return this.getSections().length;
        }

    });

    // 通用model，提供跨页面访问
    rocket.collection.outline_sections.getInstance = function(title){
        var instances = rocket.collection.outline_sections._instances;
        return instances && instances[title];
    }; 

    })(Zepto);

#### 3.1.3 前端模板（视图层）开发

视图层是由前端模板实现的，主要功能是对模型的变化作出展示上的响应。框架的前端模板默认使用underscore，但没有限制必须使用underscore。开发时注意与数据接口的对接。完成后的代码如下所示：

* 前端模板代码：outline/tpl/outline.tpl.html

    <script type="text/template" id="template_outline_section">

    <div class="outline-page-content-tile-content">

    <% _.each(sectionData, function(item, index){ %>

    <% if( 'code' == item.type ){ %>
        <p class="markdown-codeblock">
        <% _.each(item.content, function(item1, index1){ %>
            <span><%= slider.helper.escapeMarkdownText(item.type, item1) %></span>
        <% }); %>
        </p>

    <% } else if( 'docinfo' == item.type){ %>
        <div class="markdown-docinfo">
        <% _.each(item.content, function(item1, index1){ %>
            <% if(0 == index1){%>
            <h1><%- item1 %></h1>
            <% } else if(3 > index1){%>
            <span><%- item1 %></span>
            <% } %>
        <% }); %>
        </div>

    <% } else if( 'paragraph' == item.type){ %>
        <p class="markdown-paragraph">
        <%= slider.helper.escapeMarkdownText(item.type, item.content) %>
        </p>

    <% } else if( 'headline' == item.type){ %>
        <h<%= item.level %>>
        <%- item.content %>
        </h<%= item.level %>>

    <% } else if( 'ul' == item.type){ %>
        <ul class="markdown-ul">
        <% _.each(item.content, function(item1, index1){ %>
            <li>
        <%= slider.helper.escapeMarkdownText(item.type, item1) %>
            </li>
        <% }); %>
        </ul>

    <% } else if( 'ol' == item.type){ %>
        <ol class="markdown-ol">
        <% _.each(item.content, function(item1, index1){ %>
            <li>
        <%= slider.helper.escapeMarkdownText(item.type, item1) %>
            </li>
        <% }); %>
        </ol>

    <% } else if( 'image' == item.type){ %>
        <p class="markdown-imagewrapper">
            <img src="<%= item.url %>"
                alt="<%= item.alt %>"
                title="<%= item.title %>"
                >
            <p class="markdown-imagecaption">图： <%= item.title %></p>
        </p>

    <% } %>

    <% }); %>


    </div>
    <div class="outline-page-content-tile-mask"><%= sectionIndex %></div>
    <div class="outline-page-content-tile-gobtn"></div>


    </script>


#### 3.1.4 控制器与交互功能开发

控制器负责将模型和视图关联起来，并处理页面交互功能逻辑。视图控制器树如下设计：

    rocket.pageview.outline
        rocket.subview.outline_content
            rocket.subview.outline_content_tile

对应的页面DOM节点为：
    #outline_page
        #outline_page_content
            .outline-page-content-tile

* pageview.outline为页面控制器，对应页面框架#outline_page，同时是页面事件中心
* subview.outline_content与subview.outline_content_tile为子视图控制器，分别负责容器#outline_page_content与方块儿.outline-page-content-tile的控制逻辑

pageview相对简单，主要功能是创建一级子视图控制器。只需实现init方法，完成后代码如下所示：

    (function($){

    rocket.pageview.outline = rocket.pageview.extend({

        el: '#outline_page'

        ,init: function(options){
            var me = this;

            me.setup(new rocket.subview.outline_content(
                $.extend({}, options)
                ,me
            ));
        }

        ,registerEvents: function(){
            var me = this,
                keydownLocking = false;

            $(document).on('keydown', function(e){

                if(!keydownLocking
                    && me.$el.css('display') == 'block'){
                    keydownLocking = true;

                    me.trigger('keydown', {
                        key: e.which 
                        ,target: me
                    });

                    setTimeout(function(){
                        keydownLocking = false;
                    }, 500);
                }

            });

            me.$el.on('touchmove', function(e){
                e.preventDefault();
            });

        }

    });

    })(Zepto);

subview.outline_content，处理触发数据获取和分发、创建子视图、容器渲染、方块布局等。代码如下所示：

    (function($){

    rocket.subview.outline_content = rocket.subview.extend({

        el: '#outline_page_content'

        ,events: {
            'click .outline-page-content-relayoutbtn': 'relayout'
        }

        ,init: function(options){
            var me = this;

            // @note: 标识是否第一次加载，避免后续多次加载
            me.isFirstLoad = true;

            me.collection = new rocket.collection.outline_sections(
                null
                ,$.extend({}, options)
            );

            me.title = options.title
                || 'ROCKET框架介绍';

            me.maxZIndex = 1000;

            // 显示页面loading
            me.showLoading(me.$el);
        }

        // @note: 若不涉及回收，可以不提供unregisterEvents
        ,registerEvents: function(){
            var me = this, ec = me.ec;

            ec.on("pagebeforechange", me.onpagebeforechange, me);

            // collection的reset事件，model的change事件
            me.collection.on('reset', me.render, me);

            ec.on('keydown', me.onkeydown, me);

            me.$el.on('swipeUp', function(e){
                Backbone.history.navigate(
                    '#slide'
                    + '/' + encodeURIComponent(me.title)
                    + '/1'  
                    , {trigger: true}
                );
            });

            me.$el.on('swipeDown', function(e){
                me.relayout('random');
            });
        }

        ,render: function(){
            var me = this,
                sections = me.collection.getSections();

            for(var i=0; i<sections.length; i++){
                me.append(new rocket.subview.outline_content_tile(
                    $.extend({}, me.options, {
                        sectionIndex: i+1
                    })
                    ,me
                ));
            }

            me.ec.trigger('dataready', sections);

            me.relayout('random');

            me.hideLoading();
        }

        ,onpagebeforechange: function(params){
            var me = this, 
                from = params.from,
                to = params.to,
                param = params.params;

            if(to == me.ec) {
                if(me.isFirstLoad){
                    me.collection.fetch({
                        success: function(){
                            me.isFirstLoad = false;
                        }
                    });
                }
                me.$el.show();
            }
        }

        ,onkeydown: function(params){
            var me = this,
                key = params.key;

            switch(key){
                // 'up arrow' key
                case 38:
                    me.relayout('random');
                    break;
                // 'down arrow' key
                case 40:
                    Backbone.history.navigate(
                        '#slide'
                        + '/' + encodeURIComponent(me.title)
                        + '/1'  
                        , {trigger: true}
                    );
                    break;
            }
        }

        ,relayout: function(type){
            var me = this;
            me['relayout_' + type]();
        }

        ,getLayoutRanges: function(){
            var me = this,
                tiles = me.$('.outline-page-content-tile'),
                cw = me.$el.width(),
                ch = me.$el.height(),
                w = tiles.width(),
                h = tiles.height(),
                nx = Math.floor(cw/w),
                ny = Math.floor(ch/h),
                ranges = [], k;

            for(var i=0; i<ny; i++){
                for(var j=0; j<nx; j++){
                    ranges.push({
                        ystart:i*(h+20)+30, 
                        yend:(i+1)*(h+20)+30, 
                        xstart:j*(w+20)+30, 
                        xend:(j+1)*(w+20)+30
                    });
                }
            }

            return ranges;
        }

        ,relayout_grid: function(){
            var me = this,
                tiles = me.$('.outline-page-content-tile'),
                ranges = me.getLayoutRanges(),
                k;

            k = ranges.length;
            
            $.each(tiles, function(index, item){
                var range = ranges[index%k]; 
                $(item).css(
                    me._gridStyle(range) 
                );  
            });
        }

        ,relayout_random: function(){
            var me = this,
                tiles = me.$('.outline-page-content-tile'),
                ranges = me.getLayoutRanges(),
                k;

            k = ranges.length;
            
            $.each(tiles, function(index, item){
                var range = ranges[index%k]; 
                $(item).css(
                    me._randomStyle(range) 
                );  
            });
        }

        ,_gridStyle: function(range){
            var me = this;
            return {
                top: range.ystart + 'px'
                ,left: range.xstart + 'px'
                // ,'-webkit-transform': 'rotate(' + me._getRandomValue(-45, 45) + 'deg)'
            }; 
        }

        ,_randomStyle: function(range){
            var me = this;
            return {
                top: me._getRandomValue(range.ystart, range.yend) + 'px'
                ,left: me._getRandomValue(range.xstart, range.xend) + 'px'
                ,'-webkit-transform': 'rotate(' + me._getRandomValue(-45, 45) + 'deg)'
            }; 
        }

        ,_getRandomValue: function(min, max){
            var span, tmp;

            if(min > max){
                tmp = max;
                max = min;
                min = tmp;
            }
            span = max - min;

            return Math.floor(span * Math.random()) + min;
        }

    });

    })(Zepto);

subview.outline_content_tile，处理方块渲染、拖动、用户事件响应等。代码如下所示：

    (function($){

    rocket.subview.outline_content_tile = rocket.subview.extend({

        className: 'outline-page-content-tile'

        ,template: _.template($('#template_outline_section').text())

        ,events: {
            'click .outline-page-content-tile-gobtn': 'ontilegobtnclick'

            // touch dragging
            ,'touchstart': 'ontiletouchstart'
            ,'touchmove': 'ontiletouchmove'
            ,'touchend': 'ontiletouchend'

            // mouse dragging
            ,'mousedown': 'ontilemousedown'
        }

        ,init: function(options){
            var me = this;

            me.title = options.title
                || 'ROCKET框架介绍';
            me.sectionIndex = options.sectionIndex;
            // @note: sectionData不通过options传递，避免featureString超大
            console.log(me.featureString);
        }

        // @note: 若不涉及回收，可以不提供unregisterEvents
        ,registerEvents: function(){
            var me = this, ec = me.ec;

            ec.on("pagebeforechange", me.onpagebeforechange, me);
            ec.on('dataready', me.render, me);
        }

        ,render: function(sections){
            var me = this;

            me.$el.append(me.template({
                sectionIndex: me.sectionIndex
                ,sectionData: sections[me.sectionIndex - 1] 
            }));
            me.$el.data('index', me.sectionIndex);

            // @note: 密集DOM操作，展现操作可能需要延时才能保证被执行
            // setTimeout(function(){
                me.$el.show();
            // }, 0);
        }

        ,onpagebeforechange: function(params){
            var me = this, 
                from = params.from,
                to = params.to,
                param = params.params;

            if(to == me.ec) {
                me.$el.show();
            }
        }

        ,ontilegobtnclick: function(e){
            var me = this,
                tile = $(e.target).closest('.outline-page-content-tile'),
                sliderIndex = tile.data('index');
           
            // tile.css('z-index', me.maxZIndex++); 
            Backbone.history.navigate(
                '#slide'
                    + '/' + encodeURIComponent(me.title)
                    + '/' + sliderIndex 
                ,{trigger:true}
            );
        }

        ,ontiletouchstart: function(e){
            var me = this,
                touch = e.targetTouches[0],
                tile = $(e.target).closest('.outline-page-content-tile');

            me.draggingTile = tile;

            me.tilePos = {
               pageX: touch.pageX 
               ,pageY: touch.pageY 
            };
        }

        ,ontiletouchmove: function(e){
            var me = this,
                touch = e.targetTouches[0],
                tile = $(e.target).closest('.outline-page-content-tile'),
                transform = tile.css('-webkit-transform');

            e.preventDefault();
            e.stopPropagation();

            transform = transform.replace(/translate\([^\)]+\)\s*/gi, '');

            tile.css(
                '-webkit-transform',
                'translate(' + (touch.pageX - me.tilePos.pageX) + 'px,'
                    + (touch.pageY - me.tilePos.pageY) + 'px) '
                    + transform
            );
        }

        ,ontiletouchend: function(e){
            var me = this,
                touch = e.changedTouches[0],
                tile = me.draggingTile,
                top = parseInt(tile.css('top')),
                left = parseInt(tile.css('left')),
                transform = tile.css('-webkit-transform');

            transform = transform.replace(/translate\([^\)]+\)\s*/gi, '');
            // console.log(transform);

            /*
             * @note: touch方式不需要恢复，和mouse的区别
             */
            tile.css({
                top: top + (touch.pageY - me.tilePos.pageY) + 'px' 
                ,left: left + (touch.pageX - me.tilePos.pageX) + 'px' 
                ,'-webkit-transform':transform
            });
        }


        ,ontilemousedown: function(e){
            var me = this,
                tile = $(e.target).closest('.outline-page-content-tile'),
                startX = e.pageX,
                startY = e.pageY;

            $(document).on('mousemove', function(e){
                var transform = tile.css('-webkit-transform');

                e.preventDefault();
                transform = transform.replace(/translate\([^\)]+\)\s*/g, '');
                tile.css(
                    '-webkit-transform',
                    'translate(' + (e.pageX - startX) + 'px,'
                        + (e.pageY - startY) + 'px) '
                        + transform
                );
            });

            $(document).on('mouseup', function(e){
                var top = parseInt(tile.css('top')),
                    left = parseInt(tile.css('left')),
                    transform = tile.css('-webkit-transform');

                transform = transform.replace(/translate\([^\)]+\)\s*/gi, '');
                tile.css({
                    top: top + (e.pageY - startY) 
                    ,left: left + (e.pageX - startX) 
                    ,'-webkit-transform':transform
                });

                // 卸载事件监听
                $(document).off('mousemove mouseup');
            });

        }

    });

    })(Zepto);


@todo: 如果觉得模块太大了，可以考虑mvc分解，600 ＝ 400 ＋ 200

### 3.2 slide页面开发（同学B）

slide页面采用子页面模型(@link)，利用子页面的管理器，方便地实现子页面地创建、自动回收、切换效果等。同时可以做到hash穿透（子页面特性）。

#### 3.2.1 页面DOM结构和样式

页面DOM结构和样式分别在page/slide/html和page/slide/css目录下，在这两个文件中修改，并通过浏览器调试效果。如果查看时发现改动并未生效，那是因为没有**清空FIS缓存**。通过不断修改和预览，最终使页面样式效果符合要求。完成后的代码如下所示：

* 页面DOM结构文件：slide/html/slide.html

    <div id="slide_page">
        <div id="slide_page_content">
        </div>
    </div>

* 页面样式文件：slide/css/slide.css

    #slide_page{
        /*默认不展示*/
        display:none;

        /*绝对定位*/
        position:absolute;

        /*撑满整个父容器*/
        top:0;
        left:0;
        right:0;
        bottom:0;

        /*最低高度，确保即使没内容，loading也可以展示*/
        min-height:300px;
    }

    #slide_page_content{
        position:relative;
        width:100%;
        height:100%;
    }

    .slide-page-content-pageslider{
        /**
         * @note: 作为loading的容器，需要设置position属性，确保loading样式正常
         */
        position:absolute;
        top:0;
        left:0;
        right:0;
        height:100%;
        overflow:hidden;
    }

    /**
     * markdown-slide
     */
    .markdown-slidewrapper {
        position:relative;
        height:100%;
        /*@ref: http://css-infos.net/property/-webkit-box-pack*/
        display:-webkit-box;
        -webkit-box-pack:center;;
        -webkit-box-align:start;
        -webkit-box-orient:vertical;
        -webkit-box-sizing:border-box;
    }

    .markdown-slidewrapper a{
        background:#6bfafa;
        text-decoration:none;
        color:#f00;
    }

    .markdown-slidewrapper em{
        background:#F7CC27;
        text-decoration:none;
    }

    /**
     * navigator
     */
    .markdown-slide-navigator {
        position:absolute;
        width:120px;
        top:10px;
        right:20px;
    }

    .markdown-slide-navigator-left,
    .markdown-slide-navigator-right{
        float:left;
        margin-left:5px;
        padding:5px;
        cursor:pointer;
        color:#fff;
        background:#bbb;
        border:1px outset #999;
        border-radius:5px;
    }

    /**
     * cover
     */
    .markdown-slide-cover{
        width:100%;
        text-align:center;
    }

    .markdown-slide-cover-title{
        margin:10px 0;
        font:bold 26px/30px normal;
    }

    .markdown-slide-cover-author{
        display:block;
        margin:5px 0;
        font:bold 16px/20px normal;
    }

    .markdown-slide-cover-date{
        display:block;
        margin:5px 0;
        font:bold 16px/20px normal;
    }

    /**
     * main
     */
    .markdown-slide-main {
        width:100%;
    }

    .markdown-slide-title {
        margin:8px 0;
        padding:0 8px;
        border-left:10px solid #F0A22A;
        border-bottom:1px solid #F0A22A;
        font:bold 22px/40px normal;
    }

    .markdown-slide-paragraph {
        margin-top:5px;
        padding-left:5px;
        text-indent:28px;
        font:normal 14px/22px normal;
    }

    .markdown-slide-ul {
        margin-left:20px;
        margin-top:5px;
        padding-left:5px;
        list-style:square outside none;
        font:normal 14px/22px normal;
    }

    .markdown-slide-ol {
        margin-left:20px;
        margin-top:5px;
        padding-left:5px;
        list-style:decimal outside none;
        font:normal 14px/22px normal;
    }


    /**
     * codeblock
     */
    .markdown-slide-codeblock{
        margin:8px 0;
        width:100%;
        padding-left:5px;
        border:1px solid #bbb;
        border-radius:4px;
        background:#eee;
        font:italic 12px/20px Courier;
    }

    .markdown-slide-codeblock span{
        display:block;
        overflow:hidden;
    }

    /**
     * image
     */
    .markdown-slide-imagewrapper{
        margin:8px 0;
        text-align:center;
    }

    .markdown-slide-imagecaption{
        text-align:center;
        font:normal 14px/22px normal;
    }

    .markdown-slide-imagewrapper img{
        max-width:100%;
    }


#### 3.2.2 数据开发

slide页面的数据与outline页面共享，这里使用跨页面模型共享的技术（@link），不需直接开发。

#### 3.2.3 前端模板（视图层）开发

视图层是由前端模板实现的，主要功能是对模型的变化作出展示上的响应。框架的前端模板默认使用underscore，但没有限制必须使用underscore。开发时注意与数据接口的对接。完成后的代码如下所示：

* 前端模板代码：slide/tpl/slide.tpl.html

    <script type="text/template" id="template_slide_news">

    <% if(type == 'cover'){ %>

    <% _.each(section, function(item, index){ %>

        <div class="markdown-slidewrapper">
            <!--div class="markdown-slide-navigator">
                <div class="markdown-slide-navigator-left">prev</div>
                <div class="markdown-slide-navigator-right">next</div>
            </div-->
            <div class="markdown-slide-cover">

        <% _.each(item.content, function(item1, index1){ %>
            <% if(0 == index1){%>
            <h2 class="markdown-slide-cover-title"><%- item1 %></h2>
            <% } else if(1 == index1){%>
            <span class="markdown-slide-cover-author"><%- item1 %></span>
            <% } else if(2 == index1){%>
            <span class="markdown-slide-cover-date"><%- item1 %></span>
            <% } %>
        <% }); %>

            </div>
        </div>

    <% }); %>


    <% } else { %>


        <div class="markdown-slidewrapper">
            <!--div class="markdown-slide-navigator">
                <div class="markdown-slide-navigator-left">prev</div>
                <div class="markdown-slide-navigator-right">next</div>
            </div-->
            <div class="markdown-slide-main">

    <% _.each(section, function(item, index){ %>

    <% if( 'code' == item.type ){ %>
        <p class="markdown-slide-codeblock">
        <% _.each(item.content, function(item1, index1){ %>
            <span><%= slider.helper.escapeMarkdownText(item.type, item1) %></span>
        <% }); %>
        </p>

    <% } else if( 'paragraph' == item.type){ %>
        <p class="markdown-slide-paragraph">
        <%= slider.helper.escapeMarkdownText(item.type, item.content) %>
        </p>

    <% } else if( 'headline' == item.type){ %>
        <h<%= item.level %> <% if(item.level == 2){ %>class="markdown-slide-title"<% } %>>
        <%- item.content %>
        </h<%= item.level %>>

    <% } else if( 'ul' == item.type){ %>
        <ul class="markdown-slide-ul">
        <% _.each(item.content, function(item1, index1){ %>
            <li>
        <%= slider.helper.escapeMarkdownText(item.type, item1) %>
            </li>
        <% }); %>
        </ul>

    <% } else if( 'ol' == item.type){ %>
        <ol class="markdown-slide-ol">
        <% _.each(item.content, function(item1, index1){ %>
            <li>
        <%= slider.helper.escapeMarkdownText(item.type, item1) %>
            </li>
        <% }); %>
        </ol>

    <% } else if( 'image' == item.type){ %>
        <p class="markdown-slide-imagewrapper">
            <img src="<%= item.url %>"
                alt="<%= item.alt %>"
                title="<%= item.title %>"
                >
            <p class="markdown-slide-imagecaption">图： <%= item.title %></p>
        </p>

    <% } %>

    <% }); %>
        </div>
    </div>
    <!--@todo: add emphasis-->

    <% } %>
    </script>

#### 3.2.4 控制器与交互功能开发

控制器负责将模型和视图关联起来，并处理页面交互功能逻辑。视图控制器树如下设计：

    rocket.pageview.slide.js
        rocket.subview.slide_content.js
            rocket.subview.slide_pageslider.js

对应的页面DOM节点为：
    #slide_page
        #slide_page_content
            .slide-page-content-pageslider

* pageview.slide为页面控制器，对应页面框架#slidepage，同时是页面事件中心
* subview.slide_content与subview.slide_pageslider为子视图控制器，分别负责容器#slide_page_content与子页面.slide-page-pageslider的控制逻辑

pageview相对简单，主要功能是创建一级子视图控制器。只需实现init方法，完成后代码如下所示：

    (function($){

    rocket.pageview.slide = rocket.pageview.extend({

        el: '#slide_page'

        ,init: function(options){
            var me = this;

            // setup content子视图
            me.setup(new rocket.subview.slide_content(
                $.extend({}, options), 
                me
            ));
        }

        ,registerEvents: function(){
            var me = this;

            me.$el.on('touchmove', function(e){
                e.preventDefault();
            });
        }

    });

    })(Zepto);

subview.slide_content，处理创建子页面、容器渲染和相关用户事件响应等。代码如下所示：

    (function($){

    rocket.subview.slide_content = rocket.subview.extend({
        
        el: '#slide_page_content'

        ,init: function(options){
            var me = this,
                title = options.title,
                sliderIndex = options.sliderindex,
                subView,
                spm;

            spm = me.getSubpageManager({
                subpageClass: rocket.subview.slide_pageslider 
                ,maxSubpages: 2
            });

            subView = new rocket.subview.slide_pageslider(
                $.extend({}, options),
                me
            );
            me.append(subView);

            // 注册子页面
            spm.registerSubpage(me.featureString, subView);
        }

        ,registerEvents: function(){
            var me = this, ec = me.ec;

            ec.on("pagebeforechange", me.onpagebeforechange, me);
            ec.on("pageafterchange", me.onpageafterchange, me);

            var keydownLocking = false;
            $(document).on('keydown', function(e){
                if(!keydownLocking){
                    keydownLocking = true;

                    ec.trigger('keydown', {
                        key: e.which
                        ,target: me.subpageManager._currentSubpage
                    });

                    setTimeout(function(){
                        keydownLocking = false;
                    }, 500);
                }
            });
        }

        ,unregisterEvents: function(){
            var me = this, ec = me.ec;

            ec.off("pagebeforechange", me.onpagebeforechange, me);
            ec.off("pageafterchange", me.onpageafterchange, me);
            $(document).off('keydown');
        }

        ,getSubpageSwitchDir: function(fromSubpage, toSubpage){
            var f = fromSubpage, 
                t = toSubpage,
                dir = 0;

            if(!f || !t){
                dir = 0;
            }
            else{
                dir = f.options.sliderindex < t.options.sliderindex
                    ? 1 : 2;
            }

            return dir;
        }

        ,onpagebeforechange: function(params){
            var me = this, 
                from = params.from,
                to = params.to,
                param = params.params,
                featureString = me.getFeatureString(param);

            if(to == me.ec){
                me.$el.show();
                me.refreshViewHeight();
            }
        }

        ,refreshHeight: function(){
            var me = this;
            window.scrollTo(0, 0);
            me.$el.height($(window).height() - 70);        
        }

        ,onorientationchange: function(from, to){
            var me = this; 
            // @note: 不直接调用refreshHeight，而调用refreshViewHeight，使用其延时
            me.refreshViewHeight();
        }

    });

    })(Zepto);

subview.slide_pageslider，处理子页面渲染、相关用户事件响应等。代码如下所示：

    (function($){

    rocket.subview.slide_pageslider = rocket.subview.extend({

        // @todo: 强调view管理本身的el和className等，不跨级管理，做到分而治之
        className: 'slide-page-content-pageslider'

        ,events: {
            'click .markdown-slide-navigator-left': 'onnavigatingleft'
            ,'click .markdown-slide-navigator-right': 'onnavigatingright'
        }

        ,template: _.template($('#template_slide_news').text())

        ,init: function(options){
            var me = this;

            // 用于页面切换时，避免重复请求数据
            me.isFirstLoad = true;

            // @todo: 可用于终端适配
            // 展现配置
            me.itemsPerRow = 2;
            me.rowsPerPage = 3;

            me.title = options.title;
            me.sliderIndex = options.sliderindex - 0;

            // 从跨页面model获取数据
            me.sectionCount = 0;
            me.section = null; 
            me.fetchSectionData();

            me.hideLoading(-1);
            me.render();
        }

        ,render: function(){
            var me = this,
                section = me.section;

            if(me.section){
                me.$el.html(me.template({
                    type: section[0].type == 'docinfo'
                        ? 'cover' : 'main' 
                    ,section: me.section
                }));
            }
            else{
                if(!me.$('.slide-page-content-nocontenttip').length){
                    me.$el.html($([
                        '<div class="slide-page-content-nocontenttip">'
                            ,'幻灯数据没有加载喔，先加载大纲看看:'
                            ,'<a href="#">'
                                ,me.title
                            ,'</a>'
                        ,'</div>'
                    ].join('')));
                }
            }

            me.el.setAttribute('data-feature', me.featureString);

            me.hideLoading();

            return me;
        }

        ,registerEvents: function(){
            var me = this, ec = me.ec;

            me.$el.on('swipeDown', function(e){
                me.gooutlinepage();
            });

            me.$el.on('swipeLeft', function(e){
                me.gonext();
            });

            me.$el.on('swipeRight', function(e){
                me.goprev();
            });

            ec.on('keydown', me.onkeydown, me);
        }

        ,unregisterEvents: function(){
            var me = this, ec = me.ec;

            me.$el.off('swipeLeft swipeRight swipeDown keydown');
        }

        ,onsubpagebeforechange: function(params){
            var me = this, ec = me.ec, 
                from = params.from,
                to = params.to,
                param = params.params,
                featureString = me.getFeatureString(param);

            if(to == me.ec){
                // 仅当参数与当前子页面参数吻合才响应
                if(me.featureString == featureString ){
                    // 重新获取数据并渲染，针对直接访问无数据，再次访问的情况
                    if(!me.section){
                        me.fetchSectionData();
                        me.render();
                    } 
                    me.$el.show();
                }
            }
        }

        ,onsubpageafterchange: function(params){
            var me = this, ec = me.ec, 
                from = params.from,
                to = params.to,
                param = params.params,
                featureString = me.getFeatureString(param);

            if(to == me.ec){
                // 仅当参数与当前子页面参数吻合才响应
                if(me.featureString != featureString ){
                    // me.$el.hide(); 
                }
            }
        }

        ,fetchSectionData: function(){
            var me = this,
                instance 
                    = rocket.collection.outline_sections
                        .getInstance(me.title);
        
            me.section = instance 
                ? instance.getSection(me.sliderIndex)
                    : null;

            me.sectionCount = instance
                ? instance.getSectionCount()
                    : 0;
        }

        ,onnavigatingleft: function(e){
            this.goprev();
        }

        ,onnavigatingright: function(e){
            this.gonext();
        }

        ,onkeydown: function(params){
            var me = this,
                target = params.target,
                key = params.key;
            
            // @note: 仅当活动子页面才响应
            if(me == target 
                && me.ec.$el.css('display') == 'block'){
                switch(key){
                    // 'left arrow' key
                    case 37:
                        me.goprev();
                        break;
                    // 'right arrow' key
                    case 39:
                        me.gonext();
                        break;
                    // 'up arrow' key
                    case 38:
                        me.gooutlinepage();
                        break;
                }
            }
        }

        ,goprev: function(){
            var me = this,
                prev = me.sliderIndex - 1;

            prev = 
                prev < 1 ? 1 : prev; 

            Backbone.history.navigate(
                '#slide'
                + '/' + encodeURIComponent(me.title)
                + '/' + prev
                , {trigger: true}
            );

        }

        ,gonext: function(){
            var me = this,
                next = me.sliderIndex + 1;

            next = 
                next > me.sectionCount ?
                    me.sliderIndex
                    : next; 

            Backbone.history.navigate(
                '#slide'
                + '/' + encodeURIComponent(me.title)
                + '/' + next
                , {trigger: true}
            );
        }

        ,gooutlinepage: function(){
            var me = this;
            
            Backbone.history.navigate(
                '#outline'
                + '/' + encodeURIComponent(me.title)
                , {trigger: true}
            );
        }

        ,onorientationchange: function(from, to){
            var me = this;

            // me.setDisplayOptions(to);
            // me.render(null, null, true);
        }

    });

    })(Zepto);


@note: 先把成品给大家看一下
@note: MVC分拆说明
@note: 垃圾回收针对子页面
@note: @important: 子页面切换的支持，iPad贴吧，公共部分支持
@todo: 公共部分出一个demo
