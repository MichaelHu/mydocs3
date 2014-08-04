% FIS配置 
% hdm258i@gmail.com
% 2013-04-10
% 入门, webapp框架

## 前言

webapp v1.0是基于wpp(向春哥致敬) + shell的项目building方式，v2.0转向了FIS，使用FIS webapp业务模型进行代码构建。本文介绍如何进行FIS配置。

FIS的要求：使用FIS webapp业务模型，**版本1.3.6及以上**

webapp v2.0包含两个模块：common和app，分模块介绍如下：

## 1. common模块配置 

common模块提供webapp框架核心代码，定位框架通用部分，开发者不建议修改该部分的代码。以下列出fis配置文件的**merge部分**：

    <merge>
        <lib>
            <import>/css-reset/reset.css</import>

            <import>/zepto-1.0rc1/zepto.js</import>
            <import>/underscore-1.4.4/underscore.js</import>
            <import>/backbone-0.9.10/backbone.js</import>

            <import>/gmu-GMU_2.0.3_TAG1/_src/core/zepto.extend.js</import>
            <import>/gmu-GMU_2.0.3_TAG1/_src/core/zepto.ui.js</import>
            <import>/gmu-GMU_2.0.3_TAG1/_src/core/zepto.iscroll.js</import>
            <import>/gmu-GMU_2.0.3_TAG1/_src/core/zepto.fx.js</import>
            <import>/gmu-GMU_2.0.3_TAG1/_src/core/zepto.fix.js</import>
            <import>/gmu-GMU_2.0.3_TAG1/_src/core/zepto.highlight.js</import>

            <import>/gmu-GMU_2.0.3_TAG1/_src/widget/slider.js</import>
            <import>/gmu-GMU_2.0.3_TAG1/assets/widget/slider/slider.css</import>
            <import>/gmu-GMU_2.0.3_TAG1/assets/widget/slider/slider.default.css</import>

            <!--...-->
        </lib>

        <app>
            <import>/webapp-2.0/rocket.js</import>
            <import>/webapp-2.0/*.js</import>
        </app>
    </merge>

## 2. app模块配置

app模块包含产品线webapp代码，同样列出fis配置文件的merge部分：

    <merge>
        <app>
            <!-- app -->
            <import>/js/*.js</import>

            <!-- page -->
            <import>/page/*.js</import>

        </app>

    </merge>

