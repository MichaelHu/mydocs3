# mathjax


<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX","output/HTML-CSS"],
        tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
    });
</script>
<script src="http://258i.com/static/bower_components/MathJax/MathJax.js"></script>


* site: <http://www.mathjax.org>
* github: <https://github.com/mathjax/MathJax>
* 安装文档：<https://github.com/mathjax/MathJax-docs/blob/master/installation.rst>
* AMS为其`Managing Partner`，`stackoverflow`是其`partner`
* 重量型框架，支持Tex, LaTex, MathML, AsciiMath等各类数学符号标准，配置较多，需要了解各类扩展。入门门槛较高。
* 目前调研，没有明确提供`js API`的处理方式（输入字符串，获得输出），或许是经过检验，类似需求没有存在的必要场景。其输入主要为`混杂的HTML`文档、特定类型的`script标签`、外部加载的文件。输出方式为`替换原文档或标签内容`。
* 功能强大，书写方便


## Features

* 3种输出方式，`HTML-with-CSS`, `SVG`, 浏览器的`原生MathML支持`，对应`jax`配置项

        jax: [ 'input/TeX', 'output/HTML-CSS' ]

	`HTML-with-CSS`的方式，个人感觉非常不错。

* 使用mathjax的应用：<http://docs.mathjax.org/en/latest/misc/mathjax-in-use.html>



## installation

### CDN

最简单方式

详见： <http://docs.mathjax.org/en/latest/start.html#using-the-mathjax-content-delivery-network-cdn>

    <script type="text/javascript" async
      src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
    </script>

`config`参数具体参考，todo


### GIT

### NPM

	npm install mathjax

`2.6开始`支持npm安装，但需要注意的是，npm包`不包含PNG字体`。


### Bower

	bower install MathJax



## 配置

    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            extensions: ["tex2jax.js"],
            jax: ["input/TeX","output/HTML-CSS"],
            tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
        });
    </script>



## APIs

> API: <http://docs.mathjax.org/en/latest/api/index.html>



## LaTex参考

`Short Math Guide for LaTex`: <ftp://ftp.ams.org/pub/tex/doc/amsmath/short-math-guide.pdf>
，或者：<a href="./pdf/short-math-guide.pdf">本地下载版</a>。该文档提供了各类数学公式编辑器
遵循的`LaTex`语法标准。


## 处理script

* <http://docs.mathjax.org/en/latest/advanced/model.html>

### inline方式
	
    <script type="math/tex">公式开始：x+\sqrt{1-x^2}，公式结束</script>

<script type="math/tex">公式开始：x+\sqrt{1-x^2}，公式结束</script>

	<script type="math/tex">公式开始：x = { \frac { -b\pm\sqrt{b^2-4ac} } { 2a } }，公式结束</script>

<script type="math/tex">公式开始：x = { \frac { -b\pm\sqrt{b^2-4ac} } { 2a } }，公式结束</script>

> 不建议使用`\over`, `\atop`等。




### block方式

> 开关：`mode=display`

    <script type="math/tex; mode=display">
      \sum_{n=1}^\infty {1\over n^2} = {\pi^2\over 6}
    </script>


<script type="math/tex; mode=display">
  \sum_{n=1}^\infty {1\over n^2} = {\pi^2\over 6}
</script>


    <script type="math/tex; mode=display">
        \text{p-norm: }\parallel x\parallel_p
        =(\sum_{i=1}^n\mid x_i\mid^p)^{1/p}
    </script>

<script type="math/tex; mode=display">
    \text{p-norm: }\parallel x\parallel_p
    =(\sum_{i=1}^n\mid x_i\mid^p)^{1/p}
</script>


