# MVC分解 

% MVC分解 
| hdm258i@gmail.com
| 2013-03-21
| 基础, webapp框架

## 前言

前端是与用户距离最近的地方，不仅负责数据的`展现`，还负责与用户的各种`交互`，
可以说展现和交互占据了大部分前端工作的内容，展现由`View`来完成，交互由`UI Controller`来完成，
UI Controller同时还承担`Model与View的同步`。

因此，UI Controller在WebApp的代码构成中占较大比重，合理的设计和开发UI Controller，对于前端代码架构而言至关重要。

普通webapp在代码规模上一般都超1w，甚至更多。如何更好地用代码完成相应的功能逻辑，直接影响webapp的开发效率和质量。

Rocket框架中，APP层面使用传统web应用的路由分发机制，而在Page层面，则引入一种`MVC`的分解模型，
通过合理的`树形分解`，形成的控制器树，使多个规模适中的MVC模块协作完成一个复杂的功能逻辑，
达到`分而治之`的效果。

通过本章学习，将了解Rocket框架是如何进行MVC分解的。

## 与传统MVC的关系

MVC是一种`软件设计`的理念，主张在代码组织上将`业务逻辑`（数据及相关处理）和展现分离，
使模块功能内聚获得更高的复用程度，提升代码的易维护性和可伸缩性。

Rocket使用`Backbone`提供的MVC实现机制，与传统MVC的关系可以归纳如下：
    
<table>
<tr><td>传统</td><td>框架</td></tr>
<tr><td>AppController</td><td>rocket.router</td></tr>
<tr><td>Model</td><td>rocket.model,rocket.collection</td></tr>
<tr><td>UIController</td><td>rocket.baseview,rocket.pageview,rocket.subview</td></tr>
<tr><td>View</td><td>前端模板系统(underscore.template)</td></tr>
</table>

特殊地方在于带view后缀的类，实际上是承担`UI控制器`的角色，其派发来自UI的事件，
真正的view由前端模板系统来承担。后文提到view，若未特殊说明，是指UI Controller的角色。

@todo: model共享，页面内，跨页面

## view与model的对应关系

现实使用中，对于view和model的引用关系有多种方式：

* view与model一对一直接引用, model.view or view.model
* 引入中间控制器，负责视图的创建和组织，形成一种层次结构，这正是v1.0采用的方式
* 纯事件方式，通过事件派发和响应取代直接的方法调用

这些方式都能work，但是对于创建关系（谁创建谁），交互关系（事件还是直接调用方法）等没有作出明确规定，
最终的结果是各有各的实现方式，甚至一个webapp中不同页面的实现也存在差异，
这对于代码开发和后期升级维护是极为不利的。

`Rocket v2.0`基于版本v1.0进行了升级，保留了v1.0中视图创建和组织的层次结构（分而治之）以及单向创建，
去掉了`中间控制器`（多余，很多情况下同view功能无异）以及`4级命名空间`（规避命名空间依赖）。

Rocket对model和view的关系做了如下约定，归纳为：

* view创建同级别的model，不允许进行`跨级别`model的创建
* view可以不创建model，仅当有需求才进行创建
* model和view通过事件进行交互，也可以通过直接引用进行交互，视具体情况而定，以简单优先

## MVC视图控制器树（view tree）

为了达到分而治之，view的创建按照一定的规则进行，最终形成一个树形结构，树形结构的每个节点都是一个view，
其负责子视图控制器的创建（`仅此而已`），以及其所在级别应该关注的逻辑，比如同级别model创建，事件响应，DOM操作等。

通过合理的MVC分解，形成`规模适中`的view tree，每个节点负责相应的控制逻辑，多层次的节点通过树形结构进行协作，
最终完成复杂的页面逻辑。相比集中控制的模型，view tree有更好的扩展性和易维护性。


### view tree及其创建

简单view tree，以新闻应用的`detail page`为例，如下所示：

    router.vs
        pageview.detail
            subview.detail_toolbar
            subview.detail_content
                subview.detail_content_news

* router.vs创建pageview.detail
* pageview.detail创建subview.detail_toolbar, subview.detail_content
* subview.detail_content创建subview.detail_content_news

从树形结构来看，控制器与页面DOM结构有着类似的结构，当然这不是绝对的，实际应用中也存在不对应的情况。

另外，view负责按需创建`同级别`的model，detail page的content部分用于显示新闻内容，其对应model为detail_news，如下：

    router.vs
        pageview.detail
            subview.detail_toolbar
            subview.detail_content
                subview.detail_content_news => model.detail_news

每个页面都有一棵view tree，根结点是pageview类型，其它节点都是subview类型。

### view tree 代码示例

pageview.detail在其`init方法`中创建subview.detail_toolbar以及subview.detail_content，并进行`setup（预先存在）`。具体如下：

    rocket.pageview.detail = rocket.pageview.extend({
        
        ...

        ,init: function(options){
            var me = this;
            
            // 创建toolbar视图
            me.setup(new rocket.subview.detail_toolbar(options, me));

            // 创建content视图
            me.setup(new rocket.subview.detail_content(options, me));
        }

        ,...

    });

subview.detail_content在其init方法中创建subview.detail_content_news，并进行`append（动态生成）`，具体如下：

    rocket.subview.detail_content = rocket.subview.extend({

        ...

        ,init: function(options){
            var me = this, 
                subView;

            subView = new rocket.subview.detail_content_news(
                $.extend({}, options), 
                me
            );
            me.append(subView);
        }

        ,...
    });


subview.detail_content_news在其`init方法`中创建model.detail_news，具体如下：

    rocket.subview.detail_content_news = rocket.subview.extend({

        ...

        ,init: function(options){
            var me = this;

            me.model = new rocket.model.detail_news(
                $.extend({}, options)
                ,{}
            );
        }

        ,...
    });


### 视图与DOM节点的关系

视图`总对应某个DOM节点`，该节点可以是已经存在与DOM Tree的某个DOM节点，也可以通过动态创建的节点。
视图创建时，所对应的DOM节点`初始状态都为隐藏`，须由视图控制器在适当的时候展现。

大部分情况下，视图的层次关系与其DOM节点的层次关系是匹配的。当然也存在不匹配的情况，比如`appendTo`方法。
 
## MVC分解思路

MVC分解，可以综合考虑以下维度：

* 根据`DOM结构`能区分出哪些功能模块，比如顶部工具栏、导航条、筛选工具条，中部图片轮播、列表、底部推广位等
* 有哪些独立的`数据请求`，比如筛选条件json、轮播图json、列表数据json、推广位json
* 功能模块控制逻辑的复杂度
    1. 如果功能模块控制逻辑很简单，比如纯静态展现，没有交互和数据请求，则不需要用MVC来控制；
    2. 如果控制逻辑复杂，则有必要抽象成MVC
    3. 如果控制逻辑十分复杂，还可以对该功能模块再进行分解，比如子MVC节点，孙子MVC节点等

    控制逻辑`何为复杂，何为简单`呢？可以简单的用代码规模来衡量。如果拆分成的MVC节点，其单个`文件规模在300行以内`为合理，如果超出300行，则可以考虑再进行分解。


