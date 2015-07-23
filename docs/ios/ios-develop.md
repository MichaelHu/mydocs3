# ios开发笔记

> 目标：有自己的代言产品



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
