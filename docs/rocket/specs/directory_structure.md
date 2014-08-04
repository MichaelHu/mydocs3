# 目录组织规范

% 目录组织规范
| hdm258i@gmail.com
| 2013-03-19
| 规范, webapp框架

## 说在前面

Rocket框架包含`规范、通用框架代码、实现范例`等。正所谓“不以规矩，不能成方圆”，使用框架提升webapp开发速度，离不开规范的遵守。本篇说说在代码目录组织上有哪些规范。

使用Rocket实现的WebApp代码至少包含两个模块，`common模块和主模块`（以mynotes为例，主模块为mynotes），两个模块的代码结构说明如下：

## common模块目录结构

common目录包含`底层库、MVC类库、Rocket应用框架`等通用代码，资源形式包含`js、css和img`等。原则上不允许修改common部分的代码，开发时使用的是已经打包的代码。其目录组织如下：

    ▾ common/
      ▾ css/
          common_lib-aio.css
      ▾ js/                                                                                                                                                         
          common_lib-aio.js
          common_rocket-aio.js

打包前的代码目录可以参考github：`https://github.com/MichaelHu/rocket`
  
## 主模块（mynotes）目录结构

以`mynotes`为例，主模块包含具体webapp的实现代码，包含配置、具体页面代码（css、html、tpl、js、img），
开发者的主要工作在主模块当中。mynotes模块目录结构如下所示：

    ▾ mynotes/
      ▸ css/
      ▸ data/
      ▸ docs/
      ▸ img/
      ▸ js/
      ▸ page/
      ▸ tpl/
        mynotes.html

mynotes子目录具体说明如下：

<table>
<tr><td>css:</td><td>存放产品级别通用css文件</td></tr>
<tr><td>data:</td><td>存放FIS数据模拟相关文件</td></tr>
<tr><td>img:</td><td>存放产品级别通用img文件</td></tr>
<tr><td>js:</td><td>存放路由配置、初始化代码、其他配置或帮助代码(可自行添加)</td></tr>
<tr><td>page:</td><td>存放webapp页面代码，每个页面对应一个独立目录，具体查看“page目录结构”</td></tr>
<tr><td>tpl:</td><td>存放产品级别通用tpl文件</td></tr>
<tr><td>mynotes.html:</td><td>主HTML</td></tr>
</table>

  
### page目录结构

page目录包含组成webapp的各个页面的代码和资源，这些页面的代码和资源在物理目录上是完全独立的，不会也不应该互相影响。以下为page目录层次结构：

    ▾ mynotes/
      ▾ page/
        ▾ article/
          ▾ css/
              article.css
          ▾ html/
              article.html
          ▾ img/
          ▾ js/
            ▾ model/
                rocket.model.article.js
            ▾ view/
                rocket.pageview.article.js
                rocket.subpageview.article_lines.js
                rocket.subview.article_header.js
          ▾ tpl/
              article.tpl.html
        ▸ index/
            ...
        ▸ notes/
            ...
        ▸ search/
            ...

说明：

<table>
<tr><td>article：</td><td>页面根目录，以页面对应的action名命名，index,notes,search也是页面根目录</td></tr>
<tr><td>css：</td><td>页面css文件，包含且仅包含当前webapp页面所需样式</td></tr>
<tr><td>html:</td><td>页面HTML结构，包含页面的html标签</td></tr>
<tr><td>js:</td><td>页面MVC代码，包含model和view两个子目录，对应MVC的M和C</td></tr>
<tr><td>tpl:</td><td>页面所需前端模板文件，多个script标签组成，以.tpl.html为后缀，对应MVC的V</td></tr>
</table>

