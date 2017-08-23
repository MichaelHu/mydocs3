# css design pattern

本文说到的几类设计模式并`不是完全互斥`的，而是可以`互相借鉴和结合`的。相关解读文章可以参考：

* CSS设计模式：OOCSS 和 SMACSS <https://segmentfault.com/a/1190000000389838>
* 值得参考的css理论：OOCSS、SMACSS与BEM <https://segmentfault.com/a/1190000000704006>



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>



## 概述

* `OOCSS`，关注抽象、复用的思想，提出一套标准的模块抽象和复用方法
* `SMACSS`，关注页面样式的分层思想
* `BEM`，关注一套可执行的分拆思想及命名规范


## OOCSS
> Object Oriented CSS: separating structure from skin and container from content. `抽象、复用`的设计思想

* 简介：<https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/> 
* github: <https://github.com/stubbornella/oocss/wiki>，而不是<https://github.com/stubbornella/oocss> 4年前最近一次更新，早已进入成熟阶段

### 原则
> 两条Principles

1. separating structure from skin
    * 类似`background、border`等分拆到skin中，通过与object的`组合`达到多种表现形式
    * 使用类名而不是直接的语义标签来命名object，即推荐：

            .img { ... }

        而不推荐：

            img {}

        比如后续img换成了svg，可以不用更新css


2. separating container from content - `rarely use location-dependent styles`
    * 符合目标：`一个对象不管放在何处看起来总是一样的`。样式独立于位置。
    * 对于`<div class="myObject"><h2>...</h2></div>`，推荐：

            .myObject .category { ... }

        而不推荐：

            .myObject h2 { ... }



### content object

* media object，包含对象类：`media, img, bd, imgExt`

        <div class="media">
            <a href="http://twitter.com/stubbornella" class="img">
                <img src="http://a3.twimg.com/profile_images/72157651/tattoo_pink_bkg_square_mini.jpg" alt="Stubbornella" />
            </a>
            <div class="bd">
                <a href="http://twitter.com/stubbornella">@Stubbornella</a> <span class="detail">14 miniutes ago</span>
            </div>
        </div>

* data table，包含对象类：`data, txtL, txtR, txtC, txtT, txtB, txtM`

        <div class="data">
            <table class="txtC"><!--table alignment set to center -->
                <tr class="odd txtL">
                    <th scope="row" class="txtR">Right aligned</th>
                    <td>Left aligned</td>
                </tr>
                <tr class="even">
                    <th scope="row">center aligned</th>
                    <td>center aligned</td>
                </tr>
            </table>
        </div>


### container object

* 基于YUI module control，其`标准模块`格式：`mod, inner, hd, bd, ft`
* 容器（Container Objects）对象类：`mod, complex, pop, top, bottom, tl, tr, bl, br`，`mod`是所有容器的基类，其他容器类都扩展自`mod`

#### module

    <div class="mod">
        <b class="top"><b class="tl"></b><b class="tr"></b></b>
        <div class="inner">
            <div class="bd">
                <p>Lorem ipsum.</p>
            </div>
        </div>
        <b class="bottom"><b class="bl"></b><b class="br"></b></b>
    </div>

#### complex

    <div class="mod complex"> 
        <b class="top"><b class="tl"></b><b class="tr"></b></b>
        <div class="inner">
            <div class="bd">
                <p>Lorem ipsum.</p>
            </div>
        </div>
        <b class="bottom"><b class="bl"></b><b class="br"></b></b> 
    </div>

#### popup

    <div class="mod pop"> 
        <b class="top"><b class="tl"></b><b class="tr"></b></b>
        <div class="inner">
            <div class="bd">
                <p>Lorem ipsum.</p>
            </div>
        </div>
        <b class="bottom"><b class="bl"></b><b class="br"></b></b> 
    </div>



### module skins

    <div class="mod simple"> 
        <b class="top"><b class="tl"></b><b class="tr"></b></b> 
        <div class="inner">
            <div class="hd">
                <h3>simple</h3>
            </div>
            <div class="bd">
                <p>Body</p>
            </div>
        </div>
        <b class="bottom"><b class="bl"></b><b class="br"></b></b> 
    </div>

使用css：

    /* ----- simple (extends mod) ----- */
    .simple .inner {border:1px solid #D7D7D7;-moz-border-radius: 7px;-webkit-border-radius: 7px;border-radius: 7px;}
    .simple b{*background-image:url(skin/mod/simple_corners.png);}





### 例子

`复用`例子：

    .button {
        display: inline-block;
        padding: 6px 12px;
        color: hsla(0, 100%, 100%, 1);
        &.button-default { background: hsla(180, 1%, 28%, 1); }
        &.button-primary { background: hsla(208, 56%, 53%, 1); }
    }



        
## SMACSS
> `SMACSS` ( pronounced "smacks" ) - Scalable and Modular Architecture for CSS <https://smacss.com/book/>，只有书，没有github，对站点css进行了`分层`设计。

### 分层

* base
* layout
* module
* state
* theme





## BEM
> `BEM` ( Block, Element, Modifier ) 俄罗斯`Yandex`团队提出 <https://en.bem.info/methodology/>，对HTML page进行了三个级别的拆分，并提出了一套`命名规范`。

* quick-start: <https://en.bem.info/methodology/quick-start/>
* github: <https://github.com/bem-site/bem-method> 俄文README，355 Stars，据说有Google前端参与其中
* 关于BEM中常见的十个问题以及如何避免 <http://www.w3cplus.com/css/battling-bem-extended-edition-common-problems-and-how-to-avoid-them.html> 原文： <https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/>


### 概述

* 分拆成Block，Element和Modifier三种类型的元素
* Block是`reusable`的，类似于OOCSS的module
* `Element只属于Block，不存在属于Element的Element`，这很重要，能避免命名失控
* Modifier描述元素的状态、Theme等
* 命名规则，保留符号：`-`, `__`, `_`，举例如下：
        block-name__element-name
        block-name_modifier-name
        block-name__element-name_modifier-name
    总是以`block-name为前缀`。
* `三段式`，但不一定每段都存在，但`Block部分`总是存在



### 例子

    <!-- `header` block -->
    <header class="header">
        <!-- Nested `logo` block -->
        <div class="logo"></div>

        <!-- Nested `search-form` block -->
        <!-- The `search-form` block has the `focused` Boolean modifier -->
        <form class="search-form search-form_focused">
            <input class="search-form__input">

            <!-- The `button` element has the `disabled` Boolean modifier -->
            <button class="search-form__button search-form__button_disabled">Search</button>
        </form>            
    </header>




## Demos


### BEM

> html/css 组件化思想，block前缀

<div id="test_bem" class="test">
<div class="test-container">

    @[data-script="html"]<style type="text/css">
        .header {}        
        .header .logo { 
            height: 100px;
            background-image: url(./img/css-logo.jpg);
            background-color: #ffffff;
            background-repeat: no-repeat;
            background-position: center;
            background-size: auto 100px;
        }
        .header .search-form__input {
            width: 400px;
        }

        .search-form {
            height: 40px;
            background-color: #fff;
            font-family: Tahoma;
            line-height: 36px;
            text-align: center;
        }
        .search-form_focused {}
        .search-form__input {
            height: 80%;
            vertical-align: middle;
        }
        .search-form__button {
            height: 80%;
            vertical-align: middle;
            font-size: 20px;
            line-height: 100%;
        }
        .search-form__button_disabled {}
    </style>
    <header class="header">
        <div class="logo"></div>
        <form class="search-form search-form_focused">
            <input class="search-form__input">
            <button class="search-form__button search-form__button_disabled">Search</button>
        </form>
    </header>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>
