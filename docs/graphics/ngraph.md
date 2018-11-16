# ngraph


## Resources

* ngraph: <https://github.com/anvaka/ngraph>
* ngraph.tobinary: <https://github.com/anvaka/ngraph.tobinary> 500w边、100w节点，二进制数据保存23M

## Features

* 图谱相关算法的集合
* 可以用于浏览器，也可用于服务端
* 以`ngraph`作为`命名空间`，提供各类功能子package
* 各类子package：图谱数据结构、图谱序列化工具、交互式渲染引擎、`布局算法`、图计算等


## 图数据结构

* `ngraph.graph`: <https://github.com/anvaka/ngraph.graph> 提供图谱数据结构



## 布局算法

### 在线布局

* `ngraph.forcelayout`: <https://github.com/anvaka/ngraph.forcelayout>
* `ngraph.forcelayout3d`: <https://github.com/anvaka/ngraph.forcelayout3d>

### 离线布局

* `ngraph.offline.layout`: is an npm module to perform such layout. If this module is too slow, you can also try:
* `ngraph.native`:  which is fully implemented in C++ and is 9x faster thant javascript version.




## 交互式渲染引擎

* `VivaGraphJS`: <https://github.com/anvaka/VivaGraphJS>
* `ngraph.pexel`: `3D`渲染引擎，底层基于`three.js` <https://github.com/anvaka/ngraph.pixel>



## 图计算

* `ngraph.pagerank` <https://github.com/anvaka/ngraph.pagerank> PageRank calculation for ngraph.graph，用于计算graph的pagerank值，Demo <https://anvaka.github.io/ngraph.pagerank/demo/>



