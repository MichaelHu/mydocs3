# arch

* 不要派发`指令型`事件，而是派发`描述型`事件
* 充分理解c/c++的assert断言的思想，在小单元开发中作用非常明显。比如js小单元中可以使用`throw new Error()`来代替


## React

* render()函数的多次执行与只执行一次
* `dom-update`与`react-render`
* 通过setState()触发与通过EventCenter触发
    * setState()会触发React的生命周期updating phase的相关方法
    * EventCenter会触发对应事件的监听者
    * setState()是React特有的机制，是数据驱动的实现机制
    * EventCenter是一种设计模式，处理模块之间的解耦
    * 使用setState()来处理数据驱动的逻辑，由render()来更新视图
    * 使用EventCenter来处理非数据驱动部分的逻辑，比如响应某个用户行为时，出于性能考虑，不希望触发render()
* EventCenter，需要定义标准的`事件规范`
