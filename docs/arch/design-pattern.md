# design pattern

## Resources

* 《图解设计模式》 【日】结城浩 著 杨文轩 译

    `结城浩`：生于1963年，日本资深技术作家和程序员。在编程语言、设计模式、数学、加密技术等领域，编写了很多深受欢迎的入门书。代表作有《数学女孩》系列、《程序员的数学》、《图解密码技术》等。

* 《Head First Design Patterns: A Brain-Friendly Guide》, Eric Freeman, Elisabeth Robson
* 171219 谈谈到底什么是抽象，以及软件设计的抽象原则 <https://mp.weixin.qq.com/s/e7Mnyx-v6U-RnJmUmqs38Q>


## Patterns

    适应设计模式
        Iterator模式 - 一个一个遍历
        Adapter模式 - 加个“适配器”以便于复用

    交给子类
        Template Method模式 - 将具体处理交给子类
        Factory Method模式 - 将实例的生成交给子类

    生成实例
        Singleton模式 - 只有一个实例
        Prototype模式 - 通过复制生成实例
        Builder模式 - 组装复杂的实例
        Abstract Factory模式 - 将关联零件组装成产品

    分开考虑
        Bridge模式 - 将类的功能层次结构与实现层次结构分离
        Strategy模式 - 整体地替换算法

    一致性
        Composite模式 - 容器与内容的一致性
        Decorator模式 - 装饰边框与被装饰物的一致性

    访问数据结构
        Visitor模式 - 访问数据结构并处理数据
        Chain of Responsibility模式 - 推卸责任

    简单化
        Facade模式 - 简单窗口
        Mediator模式 - 只有一个仲裁者

    管理状态
        Observer模式 - 发送状态变化通知
        Memento模式 - 保存对象状态
        State模式 - 用类表示状态

    避免浪费
        Flyweight模式 - 共享对象、避免浪费
        Proxy模式 - 只在必要时生成实例

    用类来表现
        Command模式 - 命令也是类
        Interpreter模式 - 语法规则也是类


## 抽象

> Conceptual abstractions may be formed by filtering the information content of a concept or an observable phenomenon, selecting only the aspects which are relevant for a particular subjectively valued purpose.

抽象是指为了某种目的，对一个概念或一种现象包含的信息进行过滤，移除不相关的信息，只保留与某种最终目的相关的信息。从另外的角度看，抽象就是简化事物，抓住`事物本质`的过程。

### 生活中的抽象

抽象派主义画家`毕加索`的画，从上往下进行抽象。

 <img src="./img/abstract-bull.jpg" style="max-height:500px">
        

### 软件开发中的抽象

在软件开发里面，最重要的抽象就可能是`分层`了。分层随处可见，例如我们的系统就是分层的。最早的程序是直接运行在硬件上的，开发成本非常高。然后慢慢开始有了操作系统，操作系统提供了资源管理、进程调度、输入输出等所有程序都需要的基础功能，开发程序时调用操作系统的接口就可以了。再后来发现操作系统也不够，于是又有了各种运行环境（如 JVM）。

`编程语言`也是一种分层的抽象。机器理解的其实是机器语言，即各种二进制的指令。但我们不可能直接用机器语言编程，于是我们发明了汇编语言、C 语言以及 Java 等各种高级语言，一直到 Ruby、Python 等动态语言

开发中，我们应该也都听说过各种分层模型。例如经典的三层模型（展现层、业务逻辑层、数据层），还有 MVC 模型等。有一句名言：`“软件领域的任何问题，都可以通过增加一个间接的中间层来解决”`。分层架构的核心其实就是抽象的分层，每一层的抽象只需要而且只能关注本层相关的信息，从而简化整个系统的设计。


## SOLID原则

### 单一职责原则( Single Responsibility Principle, SRP )

> 一个模块应该只做一件事，并把这件事做好。

其实对照应抽象的定义，可以发现这个原则本身就是抽象的核心体现。如果一个类包含了很多方法，或者一个方法特别长，就要引起我们的特别注意了。



### 开放/封闭原则( Open/Closed Principle, OCP )

> 模块设计对扩展开放，对修改封闭。


### 里氏替换原则( Liskov Substitution Principle, LSP )

> 子类必须能够替换成它们的基类 


### 接口隔离原则( Interface Segregation Principle, ISP )

> 客户端不应该被迫依赖它们不使用的方法

    interface Shape {
        public function area();
        public function volume();
    }
    public class Square extends Shape {
        ???
    }



### 依赖倒置原则( Dependency Inversion Principle, DIP )

> 高层模块不应该依赖于低层模块的实现，两者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖与抽象。



## 迪米特法则( Law of Demeter )

> 模块不应该了解它所操作的对象的内部情况

想象一下，如果你想让你的狗狗快点跑的话，你会对狗狗说，还是对四条狗腿说？如果你去店里买东西，你会把钱交给店员，还是会把钱包交给店员让他自己拿？

    final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();


