# D3.js API

> <https://github.com/mbostock/d3/wiki/API-Reference>



<script src="../common/d3/d3.min.js"></script>
<script>

d3.select('head')
    .append('link')
    .attr({
        'href': 'http://static.didialift.com/pinche/css/animate.min.css'
        , 'rel': 'stylesheet'
        , 'type': 'text/css'
    })
    ;

function random(min, max){
    return min + Math.random() * ( max - min );
}

function randomColor(rgb) {
    var hsl = [
        'hsl(' + 360 * Math.random()
        , 100 * Math.random() + '%'
        , 100 * Math.random() + '%)'
        ].join(',');
    return rgb ? hsl.toString() : hsl; 
}

function randomData(min, max, size) {
    var data = [];
    for ( var i=0; i<size; i++ ) {
        data.push(random(min, max));
    }
    return data;
}

var Display = {

    show: function($cont, $console){
        return function(content){
            $console.text(content || $cont.html()); 
        };
    }

    , append_show: function($cont, $console){
        return function(content){
            $console.text(
                $console.text() 
                + ' ; '
                + ( content || $cont.html() )
            ); 
        };
    }

};

</script>



<style>
/* 先决定画多大 */
.tri{ width:100px;height:100px;position:relative;}

/* 画三条边，都是横的 */
.tri .ri,
.tri .ri:before,
.tri .ri:after,
.tri .ri .i{content:'';position:absolute;height:0;bottom:0;left:0;width:100%;border-width:0 20px 20px;border-color:transparent transparent #000 transparent;border-style:dashed dashed inset dashed;box-sizing:border-box}

/* 把其中两条边旋转一下 */
.tri .ri:before{transform:rotate(-60deg) scaleY(-1);transform-origin:left bottom}
.tri .ri:after{transform:rotate(60deg) scaleY(-1);transform-origin:right bottom}

/* 把.ri这一层的border去掉 */
.tri .ri{border:none}
</style>

<div class="tri"><div class="ri"><div class="i"></div></div></div>





### 选择器

    d3.select(selector)
    d3.select(node)
    d3.selectAll(selector)
    d3.selectAll(nodes)

值得注意的用法：

    d3.selectAll(this.childNodes)
    d3.selectAll(document.links)


<style type="text/css">
.test::before {
    display: block;
    text-align: right;
    padding-right: 10px;
    content: 'testing area';
    color: #bbb;
}

.test {
    margin: 15px 0;
    padding: 10px;
    cursor: pointer;
    background-color: #eee;
    border-radius: 5px;
}

.test-container span {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 0 10px;
    border: 1px solid #bbb;
    background-color: #eee;
    color: #f00;
}

.test-panel button {
    margin: 5px;
}

.test-console {
    margin: 10px;
    padding: 5px;
    font-family: courier;
    font-size: 14px;
    line-height: 20px;
    color: #f66;
}

</style>

<div id="test_1" class="test">
<div class="test-container">
<span>1</span><span>2</span><span>3</span>
</div>
<div class="test-console"></div>
<div class="test-panel">
<button id="test_1_btn_1">sel.attr('className', 'abc')</button>
<button id="test_1_btn_2">sel.property('className', 'abc')</button>
<button id="test_1_btn_3">sel.style('color', 'blue')</button>
<br>
<button id="test_1_btn_4">sel.classed('def', 1)</button>
<button id="test_1_btn_5">sel.classed('def', 0)</button>
<button id="test_1_btn_6">sel.classed('def abc': true)</button>
<button id="test_1_btn_7">sel.classed({ 'def': false, 'ghi': true })</button>
<br>
<button id="test_1_btn_10">sel.append('span')</button>
<button id="test_1_btn_11">sel.append(function(d,i){...})</button>
<br>
<button id="test_1_btn_15">sel.insert('span', ':first-child')</button>
<button id="test_1_btn_16">sel.insert('span')</button>
<br>
<button id="test_1_btn_20">sel.remove()</button>
</div>
</div>

<script>
(function(){


var $cont = d3.select('#test_1 .test-container')
    , $console = d3.select('#test_1 .test-console');

var show = Display.show($cont, $console);
var append_show = Display.append_show($cont, $console);


d3.select('#test_1_btn_1').on('click', function(){
    $cont.select('span').attr('className', 'abc');
    show();
});
    
d3.select('#test_1_btn_2').on('click', function(){
    $cont.select('span').property('className', 'abc');
    show();
});

d3.select('#test_1_btn_3').on('click', function(){
    $cont.select('span').style('color', 'blue');
    show();
});

d3.select('#test_1_btn_4').on('click', function(){
    $cont.select('span').classed('def', 1);
    show();
});

d3.select('#test_1_btn_5').on('click', function(){
    $cont.select('span').classed('def', 0);
    show();
});

d3.select('#test_1_btn_6').on('click', function(){
    $cont.select('span').classed('def abc', true);
    show();
});

d3.select('#test_1_btn_7').on('click', function(){
    $cont.select('span').classed({'def': false, 'ghi': true});
    show();
});




d3.select('#test_1_btn_10').on('click', function(){
    $cont.append('span').text(4);
    show();
});

d3.select('#test_1_btn_11').on('click', function(){
    $cont.append(function(d,i){
            // 函数返回必须时DOM
            return document.createElement('span'); 
        })
        .text(5);
    show();
});


d3.select('#test_1_btn_15').on('click', function(){
    $cont.insert('span', ':first-child').text(0);
    show();
});

d3.select('#test_1_btn_16').on('click', function(){
    $cont.insert('span').text(0);
    show();
});



d3.select('#test_1_btn_20').on('click', function(){
    $cont.select('span').remove();
    show();
});



})();
</script>






<div id="test_2" class="test">
<div class="test-container">
<span>1</span><span>2</span><span>3</span>
</div>
<div class="test-console"></div>
<div class="test-panel">
<button id="test_2_btn_1">sel.datum()</button>
<button id="test_2_btn_2">sel.data([...]).datum()</button>
<button id="test_2_btn_3">sel.data('string').datum()</button>
<button id="test_2_btn_4">sel.data(function(){return arr;}).datum()</button>
<button id="test_2_btn_5">sel.data(values, function(d){...}).datum()</button>
<button id="test_2_btn_6">sel.data([...]).datum(function(){...})</button>
</div>
</div>


<script>
(function(){


var $cont = d3.select('#test_2 .test-container')
    , $console = d3.select('#test_2 .test-console');

var show = Display.show($cont, $console);
var append_show = Display.append_show($cont, $console);

d3.select('#test_2_btn_1').on('click', function(){
    var data = $cont.select('span').datum();
    show(JSON.stringify(data || []) );
});

d3.select('#test_2_btn_2').on('click', function(){
    var data = $cont.select('span')
                .data(['a', 'b', 'c'])
                .datum();
    show(JSON.stringify(data || []) );
});

d3.select('#test_2_btn_3').on('click', function(){
    var data = $cont.select('span')
                .data('string')
                .datum();
    show(JSON.stringify(data || []) );
});

d3.select('#test_2_btn_4').on('click', function(){
    var data = $cont.selectAll('span')
                .data(function(){
                    var i = 5, arr = [];
                    while(i >0){
                        arr.push('item ' + ( 5 - i + 1 ));
                        i--;
                    }
                    return arr;
                })
                .datum();
    show(JSON.stringify(data || []) );
});

d3.select('#test_2_btn_5').on('click', function(){

    var selection = $cont.selectAll('span')
                .data(
                    [
                        { name: 'hudamin', value: 2 }
                        , { name: 'michael', value: 1 }
                        , { name: 'even', value: 3 }
                    ]
                )
                .text(function(d, i){
                    return d.name + ': ' + d.value;
                })
                ;

    console.log(selection);

    selection = selection.data(
                    [
                        { name: 'hudamin', value: 20 }
                        , { name: 'even', value: 30 }
                    ]
                    , function(d){
                        return d.name;
                    }
                )
                .text(function(d, i){
                    return d.name + ': ' + d.value;
                })
                .sort()
                ;

    selection.exit().remove();

    console.log(selection);
    var data = selection.datum();
    show(JSON.stringify(data || []) );
});

d3.select('#test_2_btn_6').on('click', function(){

    $cont.selectAll('span')
                .data(
                    [
                        { name: 'hudamin', value: 1 }
                        , { name: 'michael', value: 2 }
                        , { name: 'even', value: 3 }
                        , { name: 'karen', value: 4 }
                    ]
                )
                .enter()
                .append('span')
                ;

    var selection = $cont.selectAll('span')
                .text(function(d, i){
                    return d.name + ': ' + d.value;
                })
                .classed({
                    'animated jello': 1
                    , 'bounceIn': 0
                })
                ;

    var __index = 1;
    selection.attr('data-index', function(){return __index++;});
    show();

    setTimeout(function(){
        selection.datum(function(){return this.dataset;})
            .sort(function(a, b){return b.index - a.index;})
            .classed({
                'jello': 0
                , 'bounceIn': 1
            })
            ;

        var data = selection.datum();
        show(JSON.stringify(data || []) );
    }, 2000);
});





    
})();
</script>

### selection.data()

    selection.data([values [, key ]])

比较不好理解的是key函数和values配合使用的时候，

    selection.data(values, function(d, i){...})

以下是API文档摘抄的：

A key function `key([ d [, i ]])` may be specified to `control how data is joined to elements (this replaces the default by-index behavior)`. The key function returns a string which is used to join a datum with its corresponding element, based on the previously-bound data. For example, if each datum has a unique field name, the join might be specified as .data(data, function(d) { return d.name; })

The key function is `called twice` during the data binding process, which proceeds in `two phases`.

1. The key function is evaluated on the nodes to form `nodeByKeyValue` (an associative array of nodes) with the this context as the node, d as the node __data__ member and the second argument i as the selection group index.

2. The key function is evaluated on `each element of the values array` - this time with values as the this context, values[i] as the first argument d and the values index i as the second argument - and the results are then used to attempt to `look up` the nodes in the nodeByKeyValue collection. If the lookup is successful, the node is added to the `update selection`, any nodes not queried are added to the exit selection. Any data elements that failed to find a matching node are used to form the enter selection.

If a key function is specified, the data operator also affects the index of nodes; this index is passed as the second argument i to any operator function arguments. However, note that existing DOM elements are not automatically reordered; use `sort` or `order` as needed. For a more detailed example of how the key function affects the data join, see the tutorial `A Bar Chart, Part 2` (<https://bost.ocks.org/mike/bar/2/>.

概括一下：

* key函数决定数据如何绑定到选择区的节点
* key函数会被调用两次
    1. 第一次针对已有节点及其已绑定数据： `key(nodes[i].__data__, i)`，结果形成一个关联数组`nodeByKeyValue`，key是key()函数的计算结果，value是对应的节点对象
    2. 第二次针对新绑定数据： `key(data[i], i)`，拿该计算结果去查找`nodeByKeyValue`，命中的节点将会被绑定数据data[i]
* 进入新选择区的节点顺序可能与现有节点不一致，需要主动调用`order`或`sort`重新排序

以下是代码例子：


    d3.select('#test_2_btn_5').on('click', function(){

        var selection = $cont.selectAll('span')
                    .data(
                        [
                            { name: 'hudamin', value: 2 }
                            , { name: 'michael', value: 1 }
                            , { name: 'even', value: 3 }
                        ]
                    )
                    .text(function(d, i){
                        return d.name + ': ' + d.value;
                    })
                    ;

        console.log(selection);

        selection = selection.data(
                        [
                            { name: 'hudamin', value: 20 }
                            , { name: 'even', value: 30 }
                        ]
                        , function(d){
                            return d.name;
                        }
                    )
                    .text(function(d, i){
                        return d.name + ': ' + d.value;
                    })
                    .sort()
                    ;

        selection.exit().remove();

        console.log(selection);
        var data = selection.datum();
        show(JSON.stringify(data || []) );
    });




### 二维数据绑定

二维数据绑定，一个典型的例子是Table的创建。

<div id="test_3" class="test">
<div class="test-container"></div>
<div class="test-panel">
<button id="test_3_btn_1">Create Table</button>
<button id="test_3_btn_2">Roll Table</button>
<button id="test_3_btn_3">Change BGColor</button>
</div>
</div>
<script>
(function(){

var matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
];

var initial = 1;

d3.select('#test_3_btn_1').on('click', function(){

    if( !initial ) return;
    initial = 0;

    var tr = d3.select('#test_3 .test-container').append('table')
        .selectAll('tr').data(matrix)
        .enter()
        .append('tr');

    var td = tr.selectAll('td')
        .data(function(d){ return d; })
        .enter()
        .append('td')
        .text(function(d){ return d; })
        .style('background-color', function(){ return randomColor(1); })
        .style('color', function(){ return randomColor(1); })
        ;

});

d3.select('#test_3_btn_2').on('click', function(){

    if(initial) return;

    var table = d3.select('#test_3 table');

    var old_matrix = matrix;

    matrix = old_matrix.slice(1);
    matrix.push(old_matrix[0]);

    var tr = table.selectAll('tr')
        ;

    tr.data(matrix);

    // update
    tr.selectAll('td')
        .data(function(d, i){return d;}) 
        .text(function(d, i){return d;}) 
        .classed('animated jello', 1)
        ;

    setTimeout(function(){
        tr.selectAll('td')
            .classed('animated jello', 0)
            ;
    }, 1000);


});

d3.select('#test_3_btn_3').on('click', function(){

    if(initial) return;

    var table = d3.select('#test_3 table');

    table.selectAll('td')
        .style('background-color', function(){ return randomColor(1); })
        .style('color', function(){ return randomColor(1); })
        ;
});


})();

</script>


代码如下：

    (function(){

    var matrix = [
        [11975,  5871, 8916, 2868],
        [ 1951, 10048, 2060, 6171],
        [ 8010, 16145, 8090, 8045],
        [ 1013,   990,  940, 6907]
    ];

    var initial = 1;

    d3.select('#test_3_btn_1').on('click', function(){

        if( !initial ) return;
        initial = 0;

        var tr = d3.select('#test_3 .test-container').append('table')
            .selectAll('tr').data(matrix)
            .enter()
            .append('tr');

        var td = tr.selectAll('td')
            .data(function(d){ return d; })
            .enter()
            .append('td')
            .text(function(d){ return d; })
            .style('background-color', function(){ return randomColor(1); })
            .style('color', function(){ return randomColor(1); })
            ;

    });

    d3.select('#test_3_btn_2').on('click', function(){

        if(initial) return;

        var table = d3.select('#test_3 table');

        var old_matrix = matrix;

        matrix = old_matrix.slice(1);
        matrix.push(old_matrix[0]);

        var tr = table.selectAll('tr')
            ;

        tr.data(matrix);

        // update
        tr.selectAll('td')
            .data(function(d, i){return d;}) 
            .text(function(d, i){return d;}) 
            .classed('animated jello', 1)
            ;

        setTimeout(function(){
            tr.selectAll('td')
                .classed('animated jello', 0)
                ;
        }, 1000);


    });

    })();




### Transitions



## Ordinal Scales （。。）

> d3.scale.ordinal

辅助数据可视化的相关计算，输入域和输出范围的映射。


<div id="test_40" class="test">
<div class="test-container"></div>
<div class="test-console"></div>
<div class="test-panel">
<button id="test_40_btn_1">ordinal.domain(), ordinal.range()</button>
<button id="test_40_btn_2">ordinal.domain(values)</button>
<button id="test_40_btn_3">ordinal.range(values)</button>
<button id="test_40_btn_4">ordinal.rangePoints(interval)</button>
<button id="test_40_btn_5">ordinal.rangePoints(interval, padding)</button>
<button id="test_40_btn_6">ordinal(x)</button>
<button id="test_40_btn_7">ordinal.rangeRoundPoints(interval)</button>
<button id="test_40_btn_8">ordinal.rangeRoundPoints(interval, padding)</button>
<button id="test_40_btn_9">ordinal.rangeBands(interval)</button>
<button id="test_40_btn_10">ordinal.rangeBands(interval, padding)</button>
<button id="test_40_btn_11">ordinal.rangeBands(interval, padding, outerPadding)</button>
<button id="test_40_btn_12">ordinal.rangeRoundBands(interval)</button>
<button id="test_40_btn_13">ordinal.rangeRoundBands(interval, padding)</button>
<button id="test_40_btn_14">ordinal.rangeRoundBands(interval, padding, outerPadding)</button>
</div>
</div>
<script>
(function(){

var $cont = d3.select('#test_40 .test-container')
    , $console = d3.select('#test_40 .test-console');

var show = Display.show($cont, $console);
var append_show = Display.append_show($cont, $console);

d3.select('#test_40_btn_1').on('click', function(){

    var ordinal = d3.scale.ordinal();
    show('Empty Range: ' + JSON.stringify(ordinal.range()));
    append_show('Empty Domain: ' + JSON.stringify(ordinal.domain()));
    
});

d3.select('#test_40_btn_2').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    show('Domain: ' + JSON.stringify(ordinal.domain()));
    
});

d3.select('#test_40_btn_3').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.range([10, 30, 50, 70, 90]);
    show('Range: ' + JSON.stringify(ordinal.range()));
    
});

d3.select('#test_40_btn_4').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangePoints([10, 30]);
    show('Range: ' + JSON.stringify(ordinal.range()));
    
});

d3.select('#test_40_btn_5').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangePoints([10, 30], 2);
    show('Range: ' + JSON.stringify(ordinal.range()));
    
});

d3.select('#test_40_btn_6').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.range([10, 30, 50, 70, 80, 90, 100]);
    show('Domain: ' + JSON.stringify(ordinal.domain()));
    append_show('Range: ' + JSON.stringify(ordinal.range()));
    // 8将被添加到domain，并对应range的90
    append_show('ordinal(8): ' + JSON.stringify(ordinal(8)));
    // 10将被添加到domain，并对应range的100
    append_show('ordinal(10): ' + JSON.stringify(ordinal(10)));
    
});

d3.select('#test_40_btn_7').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeRoundPoints([10, 30]);
    show('Range: ' + JSON.stringify(ordinal.range()));
    
});

d3.select('#test_40_btn_8').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeRoundPoints([10, 30], 1);
    show('Range: ' + JSON.stringify(ordinal.range()));
    
});

d3.select('#test_40_btn_9').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeBands([10, 39]);
    show('Range: ' + JSON.stringify(ordinal.range()));
    append_show('BandWidth: ' + JSON.stringify(ordinal.rangeBand()));
    append_show('RangeExtent: ' + JSON.stringify(ordinal.rangeExtent()));
    
});

d3.select('#test_40_btn_10').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeBands([1, 9], 0.5, 0);
    show('Range: ' + JSON.stringify(ordinal.range()));
    append_show('BandWidth: ' + JSON.stringify(ordinal.rangeBand()));
    append_show('RangeExtent: ' + JSON.stringify(ordinal.rangeExtent()));
    
});

d3.select('#test_40_btn_11').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeBands([1, 9], 0.5, 0.5);
    show('Range: ' + JSON.stringify(ordinal.range()));
    append_show('BandWidth: ' + JSON.stringify(ordinal.rangeBand()));
    append_show('RangeExtent: ' + JSON.stringify(ordinal.rangeExtent()));
    
});

d3.select('#test_40_btn_12').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeRoundBands([10, 39]);
    show('Range: ' + JSON.stringify(ordinal.range()));
    append_show('BandWidth: ' + JSON.stringify(ordinal.rangeBand()));
    append_show('RangeExtent: ' + JSON.stringify(ordinal.rangeExtent()));
    
});

d3.select('#test_40_btn_13').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeRoundBands([1, 9], 0.5, 0);
    show('Range: ' + JSON.stringify(ordinal.range()));
    append_show('BandWidth: ' + JSON.stringify(ordinal.rangeBand()));
    append_show('RangeExtent: ' + JSON.stringify(ordinal.rangeExtent()));
    
});

d3.select('#test_40_btn_14').on('click', function(){

    var ordinal = d3.scale.ordinal();
    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeRoundBands([1, 9], 0.5, 0.5);
    show('Range: ' + JSON.stringify(ordinal.range()));
    append_show('BandWidth: ' + JSON.stringify(ordinal.rangeBand()));
    append_show('RangeExtent: ' + JSON.stringify(ordinal.rangeExtent()));
    
});


})();
</script>






### ordinal.range([interval[, padding]])

其中padding的含义为首尾节点距离区间的最大值和最小值之间的距离之和，计算公式：首尾节点距边界的距离为`step * padding / 2`，step为节点两两之间的距离。比如padding为1，则首尾节点距边界距离为`step/2`

<img src="./img/range-padding.png">





### ordinal.rangeBands([interval[, padding[, outerPadding]]])

将range去除首尾的`step*outerPadding`后，剩余部分为：`step*(n-padding)`

公式为： 

* `step * outerPadding * 2 + step * (n - padding) = interval.max - interval.min`
* `width = step * (1 - padding)`

padding取值区间为`[0, 1]`

    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeBands([1, 9], 0.5, 0);

    ordinal.domain([1, 3, 5, 7, 9]);
    ordinal.rangeBands([1, 9], 0.5, 0.5);

实际发现以下两种方式是等价的：

    ordinal.rangeBands([1, 9], 0.5);
    ordinal.rangeBands([1, 9], 0.5, 0.5);

也即outerPadding如果没有指定，`默认值为0.5`。

<img src="./img/d3-rangeBands.png" style="height: 600px;">



### Categorical Colors


分类颜色API：

    d3.scale.category10()
    d3.scale.category20()
    d3.scale.category20b()
    d3.scale.category20c()

注意，以上API生成新的scale对象。

<div id="test_50" class="test">
<div class="test-container"></div>
<div class="test-console"></div>
<div class="test-panel">
<button id="test_50_btn_1">d3.scale.category10().range()</button>
<button id="test_50_btn_2">d3.scale.category20().range()</button>
<button id="test_50_btn_3">d3.scale.category20b().range()</button>
<button id="test_50_btn_4">d3.scale.category20c().range()</button>
</div>
</div>
<script>
(function(){

var $cont = d3.select('#test_50 .test-container')
    , $console = d3.select('#test_50 .test-console');

var show = Display.show($cont, $console);
var append_show = Display.append_show($cont, $console);

function showColors( colors ) {

    // show('Colors: ' + JSON.stringify(d3.scale.category10().range()));
    var upSel = $cont.selectAll('span')
        .data(colors)
        ;

    // enter
    upSel
        .enter()
        .append('span')
        ;

    // remove
    upSel
        .exit()
        .remove()
        ;

    // update all
    upSel
        .text(function(d, i){ return d; })
        .style({
            'background-color': function(d, i){ return d; }
            , 'color': '#fff'
        })
        ;
}

d3.select('#test_50_btn_1').on('click', function(){
    showColors(d3.scale.category10().range());
});

d3.select('#test_50_btn_2').on('click', function(){
    showColors(d3.scale.category20().range());
});

d3.select('#test_50_btn_3').on('click', function(){
    showColors(d3.scale.category20b().range());
});

d3.select('#test_50_btn_4').on('click', function(){
    showColors(d3.scale.category20c().range());
});



})();
</script>


## SVG

参考：<a href="./svg.md.preview.html">SVG</a>

path的d属性生成比较麻烦，需要各类构造器。

### d3.svg.line

line构造器：


    // 默认构造器
    var line = d3.svg.line();
    var def = line([ [20, 50] ]);

    // 自定义存取器的构造器
    var line = d3.svg.line()
            .x(function(d){ return d.x; })
            .y(function(d){ return d.y; })
            ;
    var def = line([ {x:20, y:50} ]);



<div id="test_60" class="test">
<div class="test-container"></div>
<div class="test-console"></div>
<div class="test-panel">
<button id="test_60_btn_1">line([ [20,50] ])</button>
<button id="test_60_btn_2">line([ {x:20,y:50} ])</button>
</div>
</div>

<script>
(function(){


var $cont = d3.select('#test_60 .test-container')
    , $console = d3.select('#test_60 .test-console');

var show = Display.show($cont, $console);
var append_show = Display.append_show($cont, $console);

d3.select('#test_60_btn_1').on('click', function(){
    var line = d3.svg.line();
    var def = line([[20, 50]]);
    show(def);
});

d3.select('#test_60_btn_1').on('click', function(){
    var line = d3.svg.line();
    var def = line([[20, 50]]);
    show(def);
});

d3.select('#test_60_btn_2').on('click', function(){
    var line = d3.svg.line()
            .x(function(d){ return d.x; })
            .y(function(d){ return d.y; })
            ;
    var def = line([ {x:20, y:50}]);
    show(def);
});



})();
</script>







### line.interpolate([interpolate])

插值模式，预定义的有13种：

linear, linear-closed, step, step-before, step-after, basis, basis-open, basis-closed,
bundle, cardinal, cardinal-open, cardinal-closed, monotone

可以通过字符串方式指定插值模式：

    line.interpolate('linear-closed');

如果interpolate为函数，则该函数作为构建路径字符串的接口函数，也即自定义interpolate函数。

    var line = d3.svg.line()
            .interpolate(interpolate)
        , data = [
            [20,50]
            , [100,130]
            , [220,200]
            , [400,80]
            , [350,180]
        ]
        ;

    var svg = d3.select('#test_70_svg')
        , upSel = svg.selectAll('path')
            .data([ data ])
            ; 

    if(initial) {
        upSel
            .enter()
            .append('path')
            ;
        initial = 0;
    }

    upSel.exit().remove();

    upSel
        .attr('d', function(d){ return line(d); })
        .style({
            'fill': '#fff'
            , 'stroke': 'red'
        })
        ;


以下Demo展示这13种插值函数的表现：

<style type="text/css">
#test_70_svg {
    border: 1px dashed #bbb;
}
</style>

<div id="test_70" class="test">
<div class="test-panel">
<select id="test_70_select" class="form-control">
<option value="linear">linear</option>
<option value="linear-closed">linear-closed</option>
<option value="step">step</option>
<option value="step-before">step-before</option>
<option value="step-after">step-after</option>
<option value="basis">basis</option>
<option value="basis-open">basis-open</option>
<option value="basis-closed">basis-closed</option>
<option value="bundle">bundle</option>
<option value="cardinal">cardinal</option>
<option value="cardinal-open">cardinal-open</option>
<option value="cardinal-closed">cardinal-closed</option>
<option value="monotone">monotone</option>
</select>
</div>
<div class="test-console"></div>
<div class="test-container">
<svg id="test_70_svg" width="100%" height="300"></svg>
</div>
</div>

<script>
(function(){


var $cont = d3.select('#test_70 .test-container')
    , $console = d3.select('#test_70 .test-console');

var show = Display.show($cont, $console);
var append_show = Display.append_show($cont, $console);

var initial = 1;

function render( interpolate ) {

    var line = d3.svg.line()
            .interpolate(interpolate)
        , data = [
            [20,50]
            , [100,130]
            , [220,200]
            , [400,80]
            , [350,180]
            , [420,220]
        ]
        ;

    show('interpolate mode: ' + line.interpolate());
    var svg = d3.select('#test_70_svg')
        , upSel = svg.selectAll('path')
            .data([ data ])
        , upSelRect = svg.selectAll('rect')
            .data(data)
        , upSelText = svg.selectAll('text')
            .data(data)
            ; 

    if(initial) {
        upSel
            .enter()
            .append('path')
            ;
        upSelRect
            .enter()
            .append('rect')
        upSelText
            .enter()
            .append('text')
        initial = 0;
    }

    upSel.exit().remove();
    upSelRect.exit().remove();
    upSelText.exit().remove();

    upSel
        .attr('d', function(d){ return line(d); })
        .style({
            'fill': '#fff'
            , 'stroke': 'red'
        })
        ;

    upSelRect
        .attr('x', function(d){ return d[0] - 3; })
        .attr('y', function(d){ return d[1] - 3; })
        .attr('width', 7)
        .attr('height', 7)
        .style({
            'fill': '#8c564b'
            , 'stroke-width': 1
            , 'stroke': '#000'
        })

    upSelText
        .attr('x', function(d){ return d[0] + 10; })
        .attr('y', function(d){ return d[1] + 6; })
        .text(function(d, i){ return '[ ' + d[0] + ', ' + d[1] + ' ] (' + i + ')'; })
        .style({
            'fill': '#8ca252'
            , 'stroke-width': 0
            , 'font-size': '12px' 
        })
        ;

}

d3.select('#test_70_select').on('change', function(e){
    var interpolate = this.value;
    render(interpolate);
});

render('linear');



})();
</script>

### other







