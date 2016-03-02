# ios开发笔记

> 目标：有自己的代言产品



## 2015-12-30


### iOS Application Games

3D飞机模型

ship.scn应该是使用SceneKit来编辑，但仍然没有找到门道

但了解了`SCN*`相关的一系列类的使用，在viewDidLoad方法中进行场景的创建和初始化。



### @interface

存在于.h文件中：

    @interface AppDelegate : UIResponder <UIApplicationDelegate>
    // 公共属性
    @property (strong, nonatomic) UIWindow *window;
    @end

存在于.m文件中：

    @interface AppDelegate ()
    ...
    @end


### 两种主要类型的事件

1. touch events，其主要处理方法：

        touchesBegan:withEvent:
        touchesMoved:withEvent:
        touchesEnded:withEvent:
        touchesCancelled:withEvent:

    任何时候，手指在屏幕上触摸、拉动、离开，都会有一个`UIEvent`对象生成，每一个手指由一个`UITouch`对象表示。

2. motion events，其主要处理方法：

        motionBegan:withEvent:
        motionEnded:withEvent:
        motionCancelled:withEvent:





## 2015-07-21



### 1 Obj-C的特殊符号：@

* @selector
* @property
* @interface
* @implementation
* @synthesize
* @end
* @autoreleasepool
* @"string"



### 2 @property属性：

* weak
* strong
* retain
* atomic
* nonatomic



## 2015-03-24

1. 编译输出平台，可以针对32位系统和64位系统输出程序包。对于不同的体系架构，需要注意数据类型的长度变化。
    比如`iPhone 5`及以前都是32位系统，`iPhone 5s及以后都是64位系统`。

    * 动态类型，32位系统就是32位，64位系统就是64位：
            
            CGPoint

    * 固定类型，不管系统都是32位：

            Float32
            Float32Point


## 2015-03-11

1. storyboard操作实际上挺简单，但是如果没掌握要领的话，还是会一头雾水，甚至觉得很难用。
    要领就是`Ctrl-drag`，还有`Assist Editor`。
    `Ctrl-drag`在添加`Outlets, Action`进代码时很有用，这时需要打开`Assist Editor`
