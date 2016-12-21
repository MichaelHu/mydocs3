# Bigpipe


> 一种网页服务技术方案

<http://www.searchtb.com/2011/04/an-introduction-to-bigpipe.html>

解决传统方案的server全量生成页面HTML返回浏览器渲染，对于大型网页（比如Facebook个人页）的加载性能问题。

思路是将页面分成多个pagelet，在server和浏览器之间建立管道，传送pagelet。`达到`服务器准备`数据`和浏览器`渲染`的`并行`。

<img src="./img/bigpipe.png" width="700">






