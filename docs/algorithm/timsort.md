# timsort

> 一种自适应、稳定排序算法

## Resources

* `node` implementation: <https://github.com/mziccard/node-timsort> <iframe src="https://ghbtns.com/github-btn.html?user=mziccard&repo=node-timsort&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>   

## Features

* 基于`归并`排序，适合与`部分有序`的数组的快速排序
* 空间复杂度：`O(n)`， 时间复杂度：`O(nlogn)`
* 最早由`Tim Peters`在Python的list中实现
* `Java 7`开始纳入timsort排序算法
* `zrender`使用了该排序算法 <https://github.com/ecomfe/zrender/blob/master/src/core/timsort.js>


