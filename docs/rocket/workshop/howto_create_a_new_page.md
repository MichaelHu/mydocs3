% 如何创建一个webapp页面
% hdm258i@gmail.com
% 2013-03-18
% 入门, webapp框架

## 前言

webapp框架的设计目标之一是帮助我们以标准化的方法快速开发webapp，本篇介绍如何创建webapp页面。

## 创建一个简单页面

1. 按规范创建目录结构和空文件
2. 按规范填充文件内容：html，css，js，tpl等。响应pagebeforechange和pageafterchange事件，按需添加页面loading显示和隐藏逻辑
3. 加入项目包含文件中：修改WEBAPPNAME.css, WEBAPPNAME.html
4. 添加路由配置：routes，pageOrder， pageTransition，action entrypoint
5. 调试路由、样式
6. 微调修改
注意：可以充分利用已有demo的脚手架的作用。

@todo: 公共组件如何整合（通用、部门级、产品级）

数据请求发起的时机，通常在pagebeforechange和subpagebeforechang事件处理函数调用的时候。
FAQ：
Q： 为什么不在init方法中进行数据请求？
A： init负责视图控制器树的构建

## 创建子页面

1. html结构、css类名
2. 父视图（子页面容器视图）创建：init方法中通过调用getSubpageManamger方法，创建rocket.subpagemanager，用于管理子页面。并创建第一个子页面，如下样例代码（比较固定模式）：

    ,init: function(options){
        ...
        spm = me.getSubpageManager({    
            subpageClass: rocket.subview.howto_content_article
            ,maxSubpages: 2
        });                
                        
        // 创建第一个子页面
        subView = new rocket.subview.howto_content_article(
            $.extend({}, options),          
            me             
        );
        me.append(subView);
                        
        spm.registerSubpage(me.featureString, subView);
        ...
    }

3. 创建子视图：用className而非el创建，必须完整提供unregisterEvents，必要时还需重写destroy方法。可实现onsubpagebeforechange或onsubpageafterchange方法，以对子页面事件进行响应；也可按需响应pagebeforechange和pageafterchange事件。注：**只需自行创建第一个子页面创建并注册，后续其他子页面的创建和回收会由框架负责**，
4. 完善viewtree的创建

## 创建multi-column页面

1. 按规范创建目录结构和空文件
2. html结构、css
3. pageview类，修改rocket.css, rocket.html
4. 添加路由配置
5. 调试html结构、css，使用overflow:scroll与-webkit-column-width等在PC上调试效果
6. 添加subview类，主要是swipeLeft和swipeRight
7. 必要的话，添加model或collection类，更新subview使内容数据化，通过配置模板，使展现更灵活
8. 配置events，添加其他事件处理函数，使页面功能完善

## 使用model还是collection

1. 单个数据使用model，多个数据集合使用collection
