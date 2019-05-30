# mermaid

> Generation of diagram and flowchart from text in a similar manner as markdown

## Resources

* online-docs: <https://mermaidjs.github.io> 
* github: <https://github.com/knsv/mermaid> <iframe src="http://258i.com/gbtn.html?user=knsv&repo=mermaid&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<style type="text/css">
@import "http://258i.com/static/build/mermaid/mermaid.min.css";
</style>
<script src="/Users/hudamin/projects/git/mystatic/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/mermaid/mermaid.js"></script>
<script>
mermaid.initialize({ startOnLoad: false });
</script>


## Features

* 支持流程图( *graph* )、甘特图( *gantt* )、序列图( *sequenceDiagram* )、类图( *classDiagram* )、*git*工作流图( *gitGraph* )等
* 基于**D3.js**构建


## Tips

* **动态渲染**方式，使用以下API，务必传递`container`参数 
        /**
         * 在container容器中渲染svg图形
         * @param id {text} 即将生成的svg图形的id
         * @param txt {text} 原始svg代码
         * @param callback {function} 渲染回调函数，可由回调方决定如何将svg代码插入容器
         * @param container {dom} 指定dom容器
         */
        mermaidAPI.render(id, txt, callback, container)

* 文档中Demo给出的API调用方式，container参数未提供，这种方式只支持flowchart的渲染，而对于sequenceDiagram以及gantt，则无法正常渲染。**建议统一使用以上提供container参数的调用方式，确保三种类型的图形都同时支持**。
* 渲染出来的图形，会**自动进行高度和宽度自适应**，自适应过程中会**通过调整scale来达到全局展示的目的**。




## Versions

    7.0.4
    ...


## Flowchart

### Example 1

    @[data-script="mermaid show-code"]graph LR
    a-->b

### Example 2

    @[data-script="mermaid show-code"]graph TB
    c1-->a2
    subgraph one
        a1-->a2
    end
    subgraph two
        b1-->b2
    end
    subgraph three
        c1-->c2
    end

### Example 3

    @[data-script="mermaid show-code"]graph LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5

### Example 4
> use fontawesome

    @[data-script="mermaid show-code"]graph TD
    B["fa:fa-twitter for peace"]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps?);


### Example 5

    @[data-script="mermaid show-code"]graph LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]


## Sequence diagram

### Example 1

    @[data-script="mermaid show-code"]sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!



### Example 2

    @[data-script="mermaid show-code"]sequenceDiagram
    participant John
    participant Alice
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!

### Example 3

    @[data-script="mermaid show-code"]sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J->>A: Great!


### Example 4

    @[data-script="mermaid show-code"]sequenceDiagram
    Alice->>John: Hello John, how are you?
    activate John
    John-->>Alice: Great!
    deactivate John


### Example 5

    @[data-script="mermaid show-code"]sequenceDiagram
    Alice->>+John: Hello John, how are you?
    John-->>-Alice: Great!


### Example 6

    @[data-script="mermaid show-code"]sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!


### Example 7

    @[data-script="mermaid show-code"]sequenceDiagram
    participant John
    Note right of John: Text in note


### Example 8

    @[data-script="mermaid show-code"]sequenceDiagram
    Alice->John: Hello John, how are you?
    Note over Alice,John: A typical interaction

### Example 9

    @[data-script="mermaid show-code"]sequenceDiagram
    Alice->John: Hello John, how are you?
    loop Every minute
        John-->Alice: Great!
    end

### Example 10

    @[data-script="mermaid show-code"]sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end




## Gantt diagram

### Example 1

    @[data-script="mermaid show-code"]gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d



### Example 2

    @[data-script="mermaid show-code"]gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram functionality to mermaid

    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2              :         des4, after des3, 5d

    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d

    section Documentation
    Describe gantt syntax               :active, a1, after des1, 3d
    Add gantt diagram to demo page      :after a1  , 20h
    Add another diagram to demo page    :doc1, after a1  , 48h

    section Last section
    Describe gantt syntax               :after doc1, 3d
    Add gantt diagram to demo page      :20h
    Add another diagram to demo page    :48h
