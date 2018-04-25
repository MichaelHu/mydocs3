# virtual-dom

## Features

* 操作JS对象比直接操作DOM树`性能更高`
* 使用JS对象( vnode )去描述DOM树
* 对比JS对象的diff，获得diff的结果patch，再使用patch去操作DOM树，只更新有差异的部分
* `react`最先提出并实现, `vue 2.0`也开始使用


## Resources

* `virtual-dom` - A Virtual DOM and diffing algorithm <https://github.com/Matt-Esch/virtual-dom> <iframe src="http://258i.com/gbtn.html?user=Matt-Esch&repo=virtual-dom&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `snabbdom` - A virturl DOM library with focus on simplicity, modularity, powerful features and performance. <https://github.com/snabbdom/snabbdom> <iframe src="http://258i.com/gbtn.html?user=snabbdom&repo=snabbdom&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* 160930 一起理解 Virtual DOM <https://www.jianshu.com/p/bef1c1ee5a0e>
* 151122 深度剖析：如何实现一个 Virtual DOM 算法 <https://github.com/livoras/blog/issues/13>
