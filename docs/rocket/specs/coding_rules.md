# 编码规范

% 编码规范
| hdm258i@gmail.com
| 2013-03-20
| 规范, webapp框架

## 前言

`规范很重要，重要，重要！！！`
`所以得遵守，遵守，遵守！！！`

编码规范介绍`文件命名规范`、`命名空间规范`、`id－class命名规范`，有遗漏再补充。

## 文件命名规范

webapp代码文件主要以`js、css、html、图片`等格式存在。框架对这些文件的命名有一些约定的规范。

### js文件命名

js文件命名，按照js代码命名空间层级给出，举例如下：

Rocket`框架代码`，所有js文件命名都遵从`rocket.二级命名空间.js`的格式，`无三级命名空间`：

    ▾ rocket/
      ▾ pageanimations/
          rocket.pageanimation_fade.js
          rocket.pageanimation_simple.js
          rocket.pageanimation_slide.js
        rocket.baseview.js
        rocket.collection.js
        rocket.js
        rocket.model.js
        rocket.pageview.js
        rocket.router.js
        rocket.subview.js

以demo webapp mynotes为例，其js目录，命名同上。不过在这里`引入了三级命名空间`，具体如下：

    ▾ mynotes/
      ▾ js/
        ▾ view/
            rocket.subpageview.uibase_vimlikelist.js       
            rocket.subview.ui_searchbox.js                 
            rocket.subview.uibase_vimlikelist.js           
          mynotes.helper.js                                
          mynotes.uibase.js                                
          rocket.init.js                                   
          rocket.router.mynotes.js       

mynotes的page目录，以notes页面为例，其js目录下文件命名遵从`rocket.二级命名空间.三级命名空间.js`的格式，具体如下：

    ▾ mynotes/
      ▾ page/
        ▾ notes/
          ▾ js/
            ▾ model/
                rocket.model.lines.js
            ▾ view/
                rocket.pageview.notes.js
                rocket.subpageview.notes_lines.js
                rocket.subview.notes_header.js



@todo: js文件命名规范，其他文件命名规范
@todo: 命名空间规范
@todo: id, class命名规范

### css、html、tpl文件命名规范 

不同于js文件按命名空间方式命名，css、html、tpl的命名更简单一点，因为对于单个页面来讲，这些文件一般只有一个，所以可以直接使用页面的`action name`来命名。举例如下：

notes页面的css、html、tpl文件的命名，具体如下：

    ▾ mynotes/
      ▾ page/
        ▾ notes/
          ▾ css/
              notes.css
          ▾ html/
              notes.html
          ▾ img/
          ▾ tpl/
              notes.tpl.html

除了页面内部文件的命名规范，还有`app级别`的文件命名规范，如下例子，全局loading和页面loading，属于产品级别通用模块，按`模块名`来命名文件：

    ▾ mynotes/
      ▾ css/
          globalloading.css
          pageloading.css
      ▾ tpl/
          globalloading.tpl.html
          pageloading.tpl.html

### img文件命名规范

暂未定规范，其所处的目录结构已经能避免重名冲突，当然也可以加入一下柔性规范。

### 为什么要这样命名？

主要解释js文件的命名，js文件之所以选择按命名空间来规范，原因是：

* 一个页面对应多个js，按命名空间可以较好地避免冲突
* 命名空间独有的层级组织，使得文件组织一目了然，开发者很容易找到要编辑的文件

为什么`最多只有3级命名空间`呢？

主要考虑命名空间的依赖对`文件打包`的限制：

* 一、二级命名空间是框架提供的，对这两级命名空间的依赖通过mynotes和commom的模块间依赖很容易实现，规定mynotes依赖common即可。
* 而在mynotes模块内，如果引入四级命名空间，那么它对三级命名空间的依赖就需要在`文件级别上`来解决，
    需要`手工进行`，也不容易使用自动化工具。所以Rocket框架规定模块内最多三级命名空间。


## 命名空间规范

命名空间主要针对js代码。框架的`顶级命名空间为rocket`，预定义了9个核心`二级命名空间`：
* router
* baseview
* pageview
* subpageview
* globalview
* subview
* subpagemanager
* model
* collectionl

common模块最多为二级命名空间，以pageanimation为例，提供的三个切换效果的命名空间如下：

    ▾ pageanimations/
        rocket.pageanimation_fade.js
        rocket.pageanimation_simple.js
        rocket.pageanimation_slide.js

而不是理所当然的:

    ▾ pageanimations/
        rocket.pageanimation.fade.js
        rocket.pageanimation.simple.js
        rocket.pageanimation.slide.js

目的是为了减少三级命名空间对二级命名空间的依赖，否则，在文件包含上，就必须保证rocket.pageanimation这个命名空间先于rocket.pageanimation.fade出现，很不易于代码打包。

webapp主模块`最多为三级命名空间`，以页面navzaker为例：

    ▾ page/
      ▾ listzaker/
        ▾ js/
          ▾ model/
              rocket.model.listzaker_nids.js
          ▾ view/
              rocket.pageview.listzaker.js
              rocket.subview.listzaker_content.js
              rocket.subview.listzaker_header.js
              rocket.subview.listzaker_pageslider.js

与common模块一样，为了减少命名空间依赖，并不是`以下`形式，而是用下划线来表示层级关系：

    ▾ js/
      ▾ model/
          rocket.model.listzaker.nids.js
      ▾ view/
          rocket.pageview.listzaker.js
          rocket.subview.listzaker.content.js
          rocket.subview.listzaker.header.js
          rocket.subview.listzaker.pageslider.js

## id-class命名规范

主要针对html和css文件涉及的命名相关的规范。

### id命名规范

    根元素：            #wrapper
    页面元素：          #页面名称_page
    页面子元素：        #页面名称_page_子元素名称
    下一级页面子元素：  #页面名称_page_子元素名称_子元素名称

依此类推，例如：

    #wrapper
        #detail_page
            #detail_page_header
            #detail_page_content
                #detail_page_content_list


### class命名规范

CSS类名与id命名规范类似，区别在于id的分隔符是**下划线**，CSS类名的分隔符是**减号**。命名的时候，CSS类名以id为参照，层级与id对应。

<table>
<tr><td>根元素：</td><td>.wrapper</td></tr>
<tr><td>页面元素：</td><td>.页面名称-page</td></tr>
<tr><td>页面子元素：</td><td>.页面名称-page-子元素名称</td></tr>
<tr><td>下一级页面子元素:</td><td>.页面名称-page-子元素名称-子元素名称</td></tr>
</table>

依此类推，例如：

    .wrapper
        .detail-page
        .detail-page-header
        .detail-page-content
            .detail-page-content-list
                .detail-page-content-list-item
                    .detail-page-content-list-item-title

实际上，.wrapper, .detail-page这类具有唯一性的节点一般不需要类选择器，直接使用id选择器即可。


### id-class命名规范

实际情况中，id和class是混合的，CSS命名的时候，类名以id为参照，层级与id对应，举例如下：

    #wrapper
        #detail_page
            #detail_page_content 
                .detail-page-content-list
                    .detail-page-content-list-item

其中.detail-page-content-list是动态创建的子页面对应的DOM节点。


