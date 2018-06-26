# zrender

> `Echarts`底层使用的轻量级渲染引擎

## Resources

* github: <https://github.com/ecomfe/zrender> <iframe src="http://258i.com/gbtn.html?user=ecomfe&repo=zrender&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* docs: <https://ecomfe.github.io/zrender-doc/public/>
* `zrender-insights`: <ref://./zrender-insights.md.html>


## Features

* `MVC`模式
* 支持`Canvas 2D/WebGL/SVG/VML`


## Versions 

* latest: `3.5.2`
* `3.x`
* `2.x`
* `1.x`




## Examples

### 添加图形类型 

技术点：

* 初始化场景
* 添加常见图形
* 修改图形属性

示例代码如下：

    var zr = zrender.init(document.getElementById('main'));
    var circle = new zrender.Circle({
        shape: {
            cx: 150,
            cy: 50,
            r: 40
        },
        style: {
            fill: 'none',
            stroke: '#F00'
        }
    });
    zr.add(circle);
    console.log(circle.shape.r); // 40
    circle.attr('shape', {
        r: 50 // 只更新 r。cx、cy 将保持不变。
    });

