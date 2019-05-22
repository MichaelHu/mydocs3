# flowchart

> 将文本表示的流程图描述绘制成可视化的`流程图`

## Resources

* site: <http://flowchart.js.org> 需翻墙才能正常查看
* github: <https://github.com/adrai/flowchart.js> <iframe src="http://258i.com/gbtn.html?user=adrai&repo=flowchart.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>


## Features

* 流程图`文本定义`语法
* 底层调用了`raphael` - <ref://./raphaeljs.md.html>
* 主流浏览器中使用了`SVG`方式绘制


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.hidden-code {
    display: none;
}
</style>
<script src="http://258i.com/static/build/raphaeljs/raphael.min.js"></script>
<script src="http://258i.com/static/bower_components/flowchart/release/flowchart.min.js"></script>
<script src="/Users/hudamin/projects/git/mystatic/bower_components/snippets/js/mp/fly.js"></script>



## Tips

* **必须有起始和结束状态**，否则会报错
* 流程方向默认总是**自上而下**
* 状态定义和状态流转之间的**空行不是必须的**
* **状态类型**包含以下**6种**：
    | 类型 | 含义 |
    | start | 起始状态 |
    | end | 结束状态 |
    | operation | 操作 |
    | subroutine | 子例程 |
    | condition | 条件判断 |
    | inputoutput | 输入输出 |
    | parallel | 并行任务 |

* 状态节点的**样式类型**可以通过`options.flowstate`自定义，包括类型名称和样式属性值，例如：
        {
            ...
            flowstate: {
                approved: {
                    fill: "#58C4A3",
                    "font-size": 12,
                    "yes-text": "APPROVED",
                    "no-text": "n/a"
                }
                ...
            } 
        }

* 通过`|`操作符可以设定状态节点所属的**样式类型**，例如：
        sub1=>subroutine: My Subroutine|approved

* 特殊操作符汇总
    | 操作符 | 含义 | 备注 |
    | : | 状态类型分隔符，用于将状态类型和状态标题成分隔开 ||
    | => | 状态定义，用于将状态名与定义体分隔开 | 与状态名和状态类型之间`不能有空格` |
    | :> | 链接定义 ||
    | -> | 状态连接 | 同样的，其与状态名之间`不能有空格` |
    | \| | 设置状态样式类型 ||



## API

### Usage

    var diagram = flowchart.parse( 'the definition code' );
    diagram.drawSVG( 'diagram', options );

### Options

    @[data-script="javascript"]var options = {
        x: 10,
        y: 0,
        "line-width": 2,
        "line-length": 50,
        "text-margin": 10,
        "font-size": 14,
        "font-color": "#000",
        "line-color": "black",
        "element-color": "black",
        fill: "white",
        "yes-text": "yes",
        "no-text": "no",
        "arrow-end": "block",
        scale: 1,

        // style symbol types
        symbols: {
            start: {
                "font-color": "red",
                "element-color": "green",
                fill: "yellow"
            },
            end: {
                class: "end-element"
            }
        },

        // even flowstate support ;-)
        flowstate: {
            past: { fill: "#CCCCCC", "font-size": 12 },
            current: { fill: "yellow", "font-color": "red", "font-weight": "bold" },
            future: { fill: "#FFFF99" },
            request: { fill: "blue" },
            invalid: { fill: "#999" },
            customize: { fill: "green" },
            approved: {
                fill: "#58C4A3",
                "font-size": 12,
                "yes-text": "APPROVED",
                "no-text": "n/a"
            },
            rejected: {
                fill: "#C45879",
                "font-size": 12,
                "yes-text": "n/a",
                "no-text": "REJECTED"
            }
        }
    };


## Definition codes

### Example 1

<div id="test_example_1" class="test">
<div class="test-diagram"></div>
    @[class="test-flowchart-script"]st=>start: Start:>https://github.com/MichaelHu[blank]
    e=>end:>https://github.com/MichaelHu

    st->e
<div class="test-container">

    @[data-script="javascript" class="hidden-code"](function(){

        var s = fly.createShow('#test_example_1');
        var $container = $('#test_example_1');
        var $scriptContainer = $container.find('.test-flowchart-script');
        var script = $scriptContainer.text();
        var diagram = flowchart.parse(script);
        diagram.drawSVG($container.find('.test-diagram')[0], options);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### Example 2

<div id="test_example_2" class="test">
<div class="test-diagram"></div>
    @[class="test-flowchart-script"]st=>start: Start:>https://github.com/MichaelHu[blank]
    e=>end:>https://github.com/MichaelHu
    op1=>operation: My Operation
    sub1=>subroutine: My Subroutine
    cond=>condition: Yes
    or No?:>https://github.com/MichaelHu
    io=>inputoutput: catch something...
    para=>parallel: parallel tasks

    st->op1->cond
    cond(yes)->io->e
    cond(no)->para
    para(path1, bottom)->sub1(right)->op1
    para(path2, top)->op1
<div class="test-container">

    @[data-script="javascript" class="hidden-code"](function(){

        var s = fly.createShow('#test_example_2');
        var $container = $('#test_example_2');
        var $scriptContainer = $container.find('.test-flowchart-script');
        var script = $scriptContainer.text();
        var diagram = flowchart.parse(script);
        diagram.drawSVG($container.find('.test-diagram')[0], options);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### Example 3

<div id="test_example_3" class="test">
<div class="test-diagram"></div>
    @[class="test-flowchart-script"]st=>start: Start|past:>https://github.com/MichaelHu[blank]
    e=>end: End|future:>https://github.com/MichaelHu
    op1=>operation: My Operation|past
    op2=>operation: Stuff|current
    sub1=>subroutine: My Subroutine|invalid
    cond=>condition: Yes
    or No?|customize:>https://github.com/MichaelHu
    c2=>condition: Good idea|rejected
    io=>inputoutput: catch something...|future

    st->op1(right)->cond
    cond(yes, right)->c2
    cond(no)->sub1(left)->op1
    c2(yes)->io->e
    c2(no)->op2->e
<div class="test-container">

    @[data-script="javascript" class="hidden-code"](function(){

        var s = fly.createShow('#test_example_3');
        var $container = $('#test_example_3');
        var $scriptContainer = $container.find('.test-flowchart-script');
        var script = $scriptContainer.text();
        var diagram = flowchart.parse(script);
        diagram.drawSVG($container.find('.test-diagram')[0], options);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### Example 4

    @[data-script="flowchart"]st=>start: Start|past:>https://github.com/MichaelHu[blank]
    e=>end: End|future:>https://github.com/MichaelHu
    op1=>operation: My Operation|past
    op2=>operation: Stuff|current
    sub1=>subroutine: My Subroutine|invalid
    cond=>condition: Yes
    or No?|customize:>https://github.com/MichaelHu
    c2=>condition: Good idea|rejected
    io=>inputoutput: catch something...|future

    st->op1(right)->cond
    cond(yes, right)->c2
    cond(no)->sub1(left)->op1
    c2(yes)->io->e
    c2(no)->op2->e
