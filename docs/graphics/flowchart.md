# flowchart

> 将文本表示的流程图描述绘制成可视化的`流程图`

## Resources

* site: <http://flowchart.js.org> 需翻墙才能正常查看
* github: <https://github.com/adrai/flowchart.js> <iframe src="http://258i.com/gbtn.html?user=adrai&repo=flowchart.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>


## Features

* 流程图`文本定义`语法
* 底层调用了`raphael` - <ref://./raphaeljs.md.html>
* 主流浏览器中使用了`SVG`方式绘制


## API

    var diagram = flowchart.parse( 'CHART-DEFINITION' );
    diagram.drawSVG( 'diagram', config );


## Definition code 

    st=>start: Start:>http://www.google.com[blank]
    e=>end:>http://www.google.com
    op1=>operation: My Operation
    sub1=>subroutine: My Subroutine
    cond=>condition: Yes
    or No?:>http://www.google.com
    io=>inputoutput: catch something...

    st->op1->cond
    cond(yes)->io->e
    cond(no)->sub1(right)->op1
