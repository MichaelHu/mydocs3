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

### Usage

    var diagram = flowchart.parse( 'the definition code' );
    diagram.drawSVG( 'diagram', options );

### Options

    {
      'x': 0,
      'y': 0,
      'line-width': 3,
      'line-length': 50,
      'text-margin': 10,
      'font-size': 14,
      'font-color': 'black',
      'line-color': 'black',
      'element-color': 'black',
      'fill': 'white',
      'yes-text': 'yes',
      'no-text': 'no',
      'arrow-end': 'block',
      'scale': 1,
      // style symbol types
      'symbols': {
        'start': {
          'font-color': 'red',
          'element-color': 'green',
          'fill': 'yellow'
        },
        'end':{
          'class': 'end-element'
        }
      },
      // even flowstate support ;-)
      'flowstate' : {
        'past' : { 'fill' : '#CCCCCC', 'font-size' : 12},
        'current' : {'fill' : 'yellow', 'font-color' : 'red', 'font-weight' : 'bold'},
        'future' : { 'fill' : '#FFFF99'},
        'request' : { 'fill' : 'blue'},
        'invalid': {'fill' : '#444444'},
        'approved' : { 'fill' : '#58C4A3', 'font-size' : 12, 'yes-text' : 'APPROVED', 'no-text' : 'n/a' },
        'rejected' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'n/a', 'no-text' : 'REJECTED' }
      }
    }


## Definition code 

### Example 1

    st=>start: Start:>http://www.google.com[blank]
    e=>end:>http://www.google.com
    op1=>operation: My Operation
    sub1=>subroutine: My Subroutine
    cond=>condition: Yes
    or No?:>http://www.google.com
    io=>inputoutput: catch something...
    para=>parallel: parallel tasks

    st->op1->cond
    cond(yes)->io->e
    cond(no)->para
    para(path1, bottom)->sub1(right)->op1
    para(path2, top)->op1

### Example 2

    st=>start: Start|past:>http://www.google.com[blank]
    e=>end: End|future:>http://www.google.com
    op1=>operation: My Operation|past
    op2=>operation: Stuff|current
    sub1=>subroutine: My Subroutine|invalid
    cond=>condition: Yes
    or No?|approved:>http://www.google.com
    c2=>condition: Good idea|rejected
    io=>inputoutput: catch something...|future

    st->op1(right)->cond
    cond(yes, right)->c2
    cond(no)->sub1(left)->op1
    c2(yes)->io->e
    c2(no)->op2->e
