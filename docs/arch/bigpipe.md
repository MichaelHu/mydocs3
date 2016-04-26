# Bigpipe


> 一种网页服务技术方案

<http://www.searchtb.com/2011/04/an-introduction-to-bigpipe.html>

解决传统方案的server全量生成页面HTML返回浏览器渲染，对于大型网页（比如Facebook个人页）的加载性能问题。

思路是将页面分成多个pagelet，在server和浏览器之间建立管道，传送pagelet。达到服务器准备数据和浏览器渲染的并行。

<img src="./img/bigpipe.png" width="700">






