# paperjs

> The Swiss Army Knife of Vector Graphics Scripting – Scriptographer ported to JavaScript and the browser, using HTML5 Canvas


## Features

* 矢量图形脚本的瑞士军刀
* 使用Canvas技术



## Resources

* site: <http://paperjs.org> 
* github: <https://github.com/paperjs/paper.js> <iframe src="http://258i.com/gbtn.html?user=paperjs&repo=paper.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe> 


## Examples

> <http://paperjs.org/examples/>

* `路径相交`判断 <http://paperjs.org/examples/path-intersections/>
* 图片`放射转盘`效果 <http://paperjs.org/examples/spiral-raster/>
* `Q-bertify`效果 <http://paperjs.org/examples/q-bertify/>
* Meta Ball`水融合`效果 <http://paperjs.org/examples/meta-balls/>
* Tadpoles - 小蝌蚪 <http://paperjs.org/examples/tadpoles/>



## Install

    $ npm i paper --save
    $ bower install paper

## Usage

### Demo 1

* 通过script标签的`canvas自定义属性`指定canvas画布的id

代码如下：

    <!DOCTYPE html>
    <html>
    <head>
    <!-- Load the Paper.js library -->
    <script type="text/javascript" src="js/paper.js"></script>
    <!-- Define inlined PaperScript associate it with myCanvas -->
    <script type="text/paperscript" canvas="myCanvas">
        // Create a Paper.js Path to draw a line into it:
        var path = new Path();
        // Give the stroke a color
        path.strokeColor = 'black';
        var start = new Point(100, 100);
        // Move to start and draw a line from there
        path.moveTo(start);
        // Note the plus operator on Point objects.
        // PaperScript does that for us, and much more!
        path.lineTo(start + [ 100, -50 ]);
    </script>
    </head>
    <body>
        <canvas id="myCanvas" resize></canvas>
    </body>
    </html>







