# github-buttons

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>

## Resources

* `site`: <http://ghbtns.com> 
* `github`: <https://github.com/mdo/github-buttons> <iframe src="https://ghbtns.com/github-btn.html?user=mdo&repo=github-buttons&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>

## Usage

嵌入`iframe`代码片段，通过配置`查询参数`的方式配置展示项目。

    @[data-script="html"]<iframe src="https://ghbtns.com/github-btn.html?user=mdo&repo=github-buttons&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>

该服务使用国外站点提供，可能偶尔被墙，服务不稳定。推荐使用以下`镜像地址`，由于是一个纯静态前端应用，很容易制作镜像。

    @[data-script="html"]<iframe src="http://258i.com/gbtn.html?user=mdo&repo=github-buttons&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>

## 原理

使用<https://api.github.com>开放API服务接口，支持`jsonp`服务。其请求格式为：

    https://api.github.com/repos/{owner}/{repo_name}?callback=funcname

如：

* <https://api.github.com/repos/d3/d3?callback=callback>
* <https://api.github.com/repos/MichaelHu/turbo-markdown?callback=callback>

