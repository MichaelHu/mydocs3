% 如何创建并开发一个WEBAPP
% hdm258i@gmail.com
% 2013-04-28
% 暂不开放, webapp框架

## 前言

培训如何基于ROCKET框架开发一个WEBAPP，包含：
1. 开发环境搭建
2. 页面拆分和分工
3. 开发过程

## 任务介绍

DEMO以百度音乐iOS版本为例子，[music.baidu.com](http://music.baidu.com)

演示如何使用ROCKET开发百度音乐WEBAPP，例子中只开发首页

## 第一步、开发环境搭建和验证

ROCKET框架使用FIS作为开发环境。

1. 首先获取框架和脚手架代码：
* git: git clone https://github.com/xspider/workshop.git
* svn: 待补充

2. 启动FIS，配置项目路径至workshop目录
3. 切换到**music模块**，访问/music/app.html，正常显示百度音乐首页

**建议**：请使用chrome浏览器，并开启**“Emulate touch events”**选项，切换成左右布局，方便调试和页面效果查看

@todo: 非常简要地介绍目录结构、相关文件

## 第二步、页面拆分和分工

此处只开发一个页面－百度音乐首页，单人完成。

路由配置如下：
    '': 'index'

路由处理函数index如下：
    ,index: function(type) {
        
        this.doAction('index', {},
            //禁止发送
            {disable: true}
        );
    }     

## 第三步 页面开发

主要包含以下几个步骤:

1. 从脚手架生成首页初始代码
2. DOM结构和样式开发
3. MVC分解，确定有几个subview
4. 开发pageview
5. 开发subview


