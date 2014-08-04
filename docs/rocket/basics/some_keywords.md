# webapp涉及的一些概念 

% webapp涉及的一些概念 
| hdm258i@gmail.com
| 2013-03-18
| 基础, webapp框架

## 前言 

<a title="移动webapp介绍" href="/docs/hudamin/rocket/introduce/mobile_webapp.md.html">移动webapp介绍</a>一文介绍了webapp及其区别于普通web站点的一些特征，我们在开发一个webapp产品时，
需要在一些基本概念上达成一致，只有在理解一致的基础上，才能进一步介绍框架细节。

## 一些概念

### document
webapp对应的`HTML document`，其包含多个div标签，每个div标签对应一个webapp页面，webapp框架正是通过对这些div标签进行交替操作，模拟页面切换。

### action
`hash`系统中的一个参数，比如列表页的hash值为`#list/focus`，那么列表页的action为`list`

### 页面（page）
与action一一对应，action的切换（hash切换）触发页面切换。
页面是hash穿透的，用户直接在地址栏输入带hash的URL，是可以直接到达的

### 子页面（subpage）
一个页面通常存在这样的展现需求，它存在多个子模块，这些子模块之间在展现和功能上非常类似，
通常只有`内容`的差异。为了在代码功能上的复用，webapp通常会`动态创建`这些子模块，
获取相应数据，并展现出来。webapp框架中将这些子模块实现成`子页面`。通常子页面同页面一样，
具有hash穿透性。hash模式上，以百度新闻列表页和百度视频的频道页为例：

<table>
<tr><td>焦点新闻列表页：</td><td>#list/focus</td></tr>
<tr><td>互联网新闻列表页：</td><td>#list/internet</td></tr>
<tr><td>电影频道页：</td><td>#channel/movie</td></tr>
<tr><td>电视剧频道页：</td><td>#channel/tvplay</td></tr>
</table>

### loading效果
Rocket框架内部原生提供了两类loading效果，分别为`globalloading`和`pageloading`，
前者用于document加载时给用户的等待反馈，后者用于页面数据加载时的等待反馈。

需要注意的是，loading效果实现方式都是`单例方式`，也即页面任一时间不会同时展现两个globalloading或两个pageloading。

### 视图控制器树（view tree）
多个Backbone.View的实例通过parent｜children引用链构成的`树状结构`，如下图。
正是通过控制树的分层结构，将复杂的页面控制流程分解到各个子节点，
实现`分而治之`的效果，降低代码的逻辑复杂度，同时还提升了代码的易维护性。

<img title="控制器树" src="./img/controller_tree.png"> 

### MVC对应关系
Rocket框架使用`Backbone`作为MVC基础类库，其对应关系如下：

* M: `Backbone.Model` or `BackBone.Collection`
* V: 前端模板系统（_.template，也可选用BaiduTemplate）
* C: Backbone.View，视图控制器

`Backbone.Router`的子类作为整个webapp的控制器（`app控制器`），控制URL pattern到对应js function的映射。
`Backbone.View`的子类作为页面控制器，控制页面功能逻辑。

Backbone.View实际上从其设计和实现来看，都承担的是UI Controller的职责（Backbone官网也如是说，参考http://backbonejs.org，How does Backbone relate to "traditional" MVC?）

### 位置保留
页面切换回到前一页面，恢复至前一页面切换前的浏览位置。`非等高页面`切换情况下适用，等高页面切换通常使用iScroll等类似技术，不需要位置保留。

### 垃圾回收
webapp使用顶级标签模拟页面，相比普通网页来说，其document的规模增大很多。
页面多次切换，特别是包含子页面的情况，document中包含的dom节点会不断增多，不仅占用更多浏览器内存，
也会导致页面性能下降。垃圾回收`主要针对子页面的回收`。


