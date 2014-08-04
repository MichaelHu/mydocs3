% 如何扩展 
% hdm258i@gmail.com
% 2013-03-25
% 进阶, webapp框架

@todo: 切换动画

## 前言
[概览：webapp framework整体介绍](#howto/概览：webapp framework整体介绍)一文提到框架为扩展提供了足够的空间。本文介绍常用的几个扩展。

## 1. 页面切换动画

页面切换动画的实现文件在以下目录中：

    ▾ common/
      ▾ webapp-2.0/
        ▾ pageanimations/
            rocket.pageanimation_fade.js
            rocket.pageanimation_simple.js
            rocket.pageanimation_slide.js

文件名遵守[编码规范](#howto/编码规范)中所提到的文件命名规范。

    rocket.pageanimation_动画名.js

其中前缀**rocket.pageanimation_**是固定的，**动画名**指明动画类型，可以用于rocket.router中**pageTransition**配置项。

### 1.1 需实现的接口

该文件实现二级命名空间，同文件名所示，比如slide动画，实现二级命名空间rocket.pageanimation_slide。同时需要实现动画接口**animate**，具体代码如下：

    /**
     * 过门动画
     * @param currentEle 当前需要移走的元素
     * @param nextEle 需要移入的元素
     * @param dir 动画方向，0:无方向， 1:向左， 2:向右
     * @param restore 是否恢复原位置
     * @param callback 动画完成后的回调函数
     */
    rocket.pageanimation_slide.animate = function(
        currentEle, nextEle, dir, 
        callback, restore) {

        ...

    };

### 1.2 扩展方式

1. 确定动画名称，比如newanim
2. 在目录结构中添加动画实现文件： rocket.pageanimation_newanim.js
3. 实现动画接口：rocket.pageanimation_newanim.animate

完成以上步骤以后，就可以在rocket.router中通过pageTransition配置项使用新动画了

具体还可以查看其他几类动画：simple, fade, dropdown的实现



