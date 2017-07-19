# bezier curve

## History 

* 数学基础是`1912`年就广为人知的`伯恩斯坦多项式` <https://en.wikipedia.org/wiki/Bernstein_polynomial>
* `1959`年，就职于`雪铁龙`的法国数学家`Paulde Casteljau`开始应用，提出了一种数值稳定的`de Casteljau算法`
* `1962`年，就职于`雷诺`的法国工程师`Pierre Bezier`广泛宣传，用于辅助汽车车体的工业设计

## Resources

* `de Casteljau`绘制法演示：<https://myst729.github.io/bezier-curve/>

    <img src="./img/bezier-quadratic-animation.gif">

* 贝塞尔曲线扫盲：<https://myst729.github.io/#/blog/articles/2013/bezier-curve-literacy/>
* `canvas`绘制贝塞尔曲线：<ref://../graphics/canvas.md.html>
* `svg`绘制贝塞尔曲线：<ref://../graphics/svg.md.html>



## Features

* 开始于`P0`并结束于`Pn`，即所谓的`端点插值法`属性
* 贝塞尔曲线是`直线`的充要条件是`控制点共线`
* 曲线的起始点（结束点）相切于贝塞尔多边形的第一节（最后一节）
* 一条曲线可以在任意点切割成`两条或任意多条`子曲线，每一条子曲线仍是`贝塞尔曲线`
* 一些看似简单的曲线（如圆）无法以贝塞尔曲线精确描述





## Formulas

<style type="text/css">
b { font-style: italic; }
</style>
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        TeX: { extensions: ["AMSmath.js"]},
        jax: ["input/TeX","output/HTML-CSS"],
        tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
    });
</script>
<script src="http://258i.com/static/bower_components/MathJax/MathJax.js"></script>

### 线性贝塞尔曲线
<script type="math/tex; mode=display">
B(t)=P_0+(P_1-P_0)t = P_0 (1-t) + P_1 t, t\in[0,1]
</script>


### 二阶贝塞尔曲线
<script type="math/tex; mode=display">
B(t)=P_0 (1-t)^2 + 2P_1 t(1-t) + P_2 t^2, t\in[0,1]
</script>


### 三阶贝塞尔曲线
<script type="math/tex; mode=display">
B(t)=(1-t)^3 P_0+3t(1-t)^2 P_1+3(1-t)t^2 P_2 + t^3 P_3,t\in[0,1]
</script>


### n阶贝塞尔曲线
<script type="math/tex; mode=display">
B(t)=\sum_{i=0}^{n}\binom{n}{i}P_i(1-t)^{n-i}t^i,t\in[0,1]
</script>

<script type="math/tex">
其中，\binom{n}{i} = C_n^i为二项式系数。
</script>
关于二项式系数，可参考<ref://./binomial-coefficient.md.html>

## 贝塞尔曲面

todo

