# canvas-network


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-wrapper {
    height: 500px;
}
</style>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="./data/all.js"></script>


## 步骤

* 画布创建、分辨率适配等
* 支持通用图谱数据格式
* 绘制节点、边、标签
* 第一个类：Graph


## API设计

    启用ES6语法
    支持移动版
    可以只支持canvas，其他暂不考虑
    使用prefix fields
    graph可以clone
    视图中点为坐标轴原点
    多renderer
    暂不做私有属性
    场景收集
        new
        destroy
        graph
            clear()
            read()
            addNode()
            addEdge()
        refresh() 
        clear()
        layers
        event
            onnodeclick
            onnodesclick
            onedgeclick
            onedgesclick

            onnodedbclick
            onnodesdbclick
            onedgedbclick
            onedgesdbclick

            onnodehover
            onnodeshover
            onedgehover
            onedgeshover

            onnodedrag

            onresize
            onmousewheel
            oncontextmenu


## 基础方法

### getNodesRect()

    @[data-script="babel-loose"]function getNodesRect( nodes, options ) {

        var opt = options || {}
            , xMin = Infinity
            , yMin = Infinity
            , xMax = -Infinity
            , yMax = -Infinity
            , readPrefix = opt.readPrefix || ''
            , ignoreNodeSize = typeof opt.ignoreNodeSize == 'undefined'
                ? true : opt.ignoreNodeSize
            , node, i, x, y, size
            ;

        i = nodes.length - 1;
        while( i >= 0 ) {
            node = nodes[ i ];
            x = node[ readPrefix + 'x' ] || 0;
            y = node[ readPrefix + 'y' ] || 0;
            size = ignoreNodeSize 
                ? 0 : node[ readPrefix + 'size' ] || node[ 'size' ] || 0;
            if( x - size < xMin ) {
                xMin = x - size;
            }
            if( x + size > xMax ) {
                xMax = x + size;
            }
            if( y - size < yMin ) {
                yMin = y - size;
            }
            if( y + size > yMax ) {
                yMax = y + size;
            }
            i--;
        }

        if( nodes.length == 0 ) {
            xMin = 0;
            yMin = 0;
            xMax = 0;
            yMax = 0;
        }

        return {
            x: xMin
            , y: yMin
            , w: xMax - xMin
            , h: yMax - yMin
        };

    }

### alignCenter()

    @[data-script="babel-loose"]function alignCenter( graph, options ){
        let nodes = graph.nodes() || []
            , opt = options || {}
            , writePrefix = opt.writePrefix || ''
            , readPrefix = opt.readPrefix || ''
            , rect
            , onNode = opt.onNode || function() {}
            , center
            , offset
            ;

        if ( !nodes.length ) {
            return;
        }

        rect = getNodesRect( nodes );
        center = {
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
        };

        offset = { x: 0 - center.x, y: 0 - center.y };

        nodes.forEach( ( node ) => {
            onNode( node );
            node[ writePrefix + 'x' ] = node[ readPrefix + 'x' ] + offset.x;
            node[ writePrefix + 'y' ] = node[ readPrefix + 'y' ] + offset.y;
        } );
    }


### rescale()

    @[data-script="babel-loose"]function rescale( graph, width, height, options ){
        let nodes = graph.nodes() || []
            , opt = options || {}
            , readPrefix = opt.readPrefix || ''
            , writePrefix = opt.writePrefix || ''
            , rect, ratio
            , onNode = opt.onNode || function() {}
            , maxNodeSize = opt.maxNodeSize
            , minNodeSize = opt.minNodeSize
            , _maxNodeSize, _minNodeSize
            , ignoreNodeSize = typeof opt.ignoreNodeSize == 'undefined'
                ? true : opt.ignoreNodeSize
            , w, h
            ;

        minNodeSize = minNodeSize || maxNodeSize || 10;
        maxNodeSize = maxNodeSize || minNodeSize || 20;
        w = ignoreNodeSize ? width : width - 2 * maxNodeSize;
        h = ignoreNodeSize ? height : height - 2 * maxNodeSize;

        if ( !nodes.length ) {
            return;
        }

        _maxNodeSize = 0;
        _minNodeSize = Infinity;
        nodes.forEach( ( node ) => {
            if ( node.size > _maxNodeSize ) {
                _maxNodeSize = node.size;
            }
            if ( node.size < _minNodeSize ) {
                _minNodeSize = node.size;
            }
        } );

        rect = getNodesRect( nodes, { ignoreNodeSize: true } );
        if ( w * h * rect.w * rect.h == 0 ) {
            return;
        }

        ratio = Math.min( w / rect.w, h / rect.h );

        let sizeRange = maxNodeSize - minNodeSize;
        let _sizeRange = _maxNodeSize - _minNodeSize;
        nodes.forEach( ( node ) => {
            onNode( node );
            node[ writePrefix + 'x' ] = ratio * node[ readPrefix + 'x' ];
            node[ writePrefix + 'y' ] = ratio * node[ readPrefix + 'y' ];
            if ( _sizeRange == 0 ) {
                node[ writePrefix + 'size' ] = minNodeSize + sizeRange / 2;
            }
            else {
                node[ writePrefix + 'size' ] = ( node[ readPrefix + 'size' ] - _minNodeSize ) 
                    / _sizeRange * sizeRange + minNodeSize;
            }
        });
    }

### createCanvas()

    @[data-script="babel-loose"]function createCanvas( container, options ){
        var width, height, canvas
            , opt = options || {}
            ;

        if ( typeof container == 'string' ) {
            if ( document.querySelector ) {
                container = document.querySelector( container );
            }
            else {
                container = document.getElementById( container );
            }
        }

        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas = document.createElement( 'canvas' );
        container.appendChild( canvas );
        adaptDevice( canvas, { w: width, h: height } );
        return canvas;
    }

### adaptDevice()

    @[data-script="babel-loose"]function adaptDevice( canvas, cssSize ){
        var ratio = window.devicePixelRatio
            , ctx = canvas.getContext( '2d' )
            ;
        canvas.width = cssSize.w * ratio;
        canvas.height = cssSize.h * ratio;
        canvas.style.width = cssSize.w + 'px';
        canvas.style.height = cssSize.h + 'px';
        // the center point is ( 0, 0 )
        ctx.translate( cssSize.w / 2, cssSize.h / 2 );
        ctx.scale( ratio, ratio );
    }


## 类

### Graph

> 存储和管理图谱的节点、边数据，提供高效的相关基本操作

    @[data-script="babel-loose"]class _Graph {

        constructor( nodes, edges ) {
            let me = this;
            me._nodesArray = [];
            me._edgesArray = [];
            me._nodesIndex = {};
            me._edgesIndex = {};
            me.init( nodes, edges );
        }

        init( nodes, edges ) {
            let me = this;
            me.addNodes( nodes );
            me.addEdges( edges );
        }

        nodes( ids ) {
            let me = this;
            if ( ids === undefined ) {
                return me._nodesArray.slice( 0 );
            }

            if ( typeof ids === 'string' || typeof ids === 'number' ) {
                return me._nodesIndex[ ids ];
            }

            if ( Object.prototype.toString.call( ids ) === '[object Array]' ) {
                let _nodes = [];
                for ( let i = 0; i < ids.length; i++ ) {
                    if ( typeof ids[ i ] === 'string' || typeof ids[ i ] === 'number' ) {
                        _nodes.push( me._nodesIndex[ ids[ i ] ] );
                    }
                    else {
                        throw 'nodes: node must have a string or number id.';
                    }
                }
                return _nodes;
            }
            throw 'nodes: wrong arguments.';
        }

        edges( ids ) {
            let me = this;
            if ( ids === undefined ) {
                return me._edgesArray.slice( 0 );
            }

            if ( typeof ids === 'string' || typeof ids === 'number' ) {
                return me._edgesIndex[ ids ];
            }

            if ( Object.prototype.toString.call( ids ) === '[object Array]' ) {
                let _edges = [];
                for ( let i = 0; i < ids.length; i++ ) {
                    if ( typeof ids[ i ] === 'string' || typeof ids[ i ] === 'number' ) {
                        _edges.push( me._edgesIndex[ ids[ i ] ] );
                    }
                    else {
                        throw 'edges: edge must have a string or number id.';
                    }
                }
                return _edges;
            }
            throw 'edges: wrong arguments.';
        }

        addNodes( nodes ) {
            let me = this;
            if ( !nodes || !nodes.length ) {
                return me;
            }
            nodes.forEach( node => me.addNode( node ) );
            return me;
        }

        addEdges( edges ) {
            let me = this;
            if ( !edges || !edges.length ) {
                return me;
            }
            edges.forEach( edge => me.addEdge( edge ) );
            return me;
        }

        addNode( node ) {
            let me = this
                , validNode = {}
                ;

            if ( typeof node.id !== 'string' && typeof node.id !== 'number' ) {
                throw 'The node must have a string or number id.';
            }

            for ( let k in node ) {
                validNode[ k ] = node[ k ];
            }
            me._nodesArray.push( validNode );
            me._nodesIndex[ validNode.id ] = validNode;
            return me;
        }

        addEdge( edge ) {
            let me = this
                , validEdge = {}
                ;

            if ( typeof edge.id !== 'string' && typeof edge.id !== 'number' ) {
                throw 'The edge must have a string or number id.';
            }

            if ( ( typeof edge.source !== 'string' && typeof edge.source !== 'number' ) 
                || !me._nodesIndex[ edge.source ] ) {
                throw 'The edge source must have an existing node id.';
            }

            if ( ( typeof edge.target !== 'string' && typeof edge.target !== 'number' ) 
                || !me._nodesIndex[ edge.target ] ) {
                throw 'The edge target must have an existing node id.';
            }

            for ( let k in edge ) {
                validEdge[ k ] = edge[ k ];
            }
            me._edgesArray.push( validEdge );
            me._edgesIndex[ validEdge.id ] = validEdge;
            return me;
        }
        
    }

    var Graph = _Graph;



## 绘制基本图谱

### drawNode()

    @[data-script="babel-loose"]function drawNode( context, node ) {
        let r = node.size
            , x = node.x
            , y = node.y
            , color = node.color || '#2ca02c';
            ;

        context.save();
        context.beginPath();
        context.arc( x, y, r, 0, Math.PI * 2 ); 
        // context.rect( x - r / 2, y - r / 2, r, r ); 
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    }


### drawEdge()

    @[data-script="babel-loose"]function drawEdge( context, edge, source, target, options ) {
        let label = edge.label
            , color = edge.color || '#2ca02c';
            ;

        context.save();
        context.beginPath();
        context.moveTo( source.x, source.y );
        context.lineTo( target.x, target.y );
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    }


### 阶段性验证


<div id="test_basic_network" class="test">
<div class="test-container">
<div class="canvas-wrapper"></div>
<div class="test-console"></div>

    @[data-script="babel editable"](function(){

        let containerId = 'test_basic_network';
        let s = fly.createShow( '#' + containerId );
        let container = document.getElementById( containerId );
        let canvas = container.canvas 
            || createCanvas( '#' + containerId + ' .canvas-wrapper' );
        let context = canvas.getContext( '2d' );
        const MAX_NODES_FIRST = 500;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let source, target;

        container.canvas = canvas;
        context.clearRect( -width / 2, -height / 2, width, height );

        // let g1 = networkGraph_circle_0628;
        // let g1 = networkGraph_mesh_0628;
        // let g1 = getLineGraph(14, 30, {nodeSize: 8});
        // let g1 = networkGraph_FR;
        // let g1 = networkGraph_ForceAtlas2;
        // let g1 = networkGraph0520;
        // let g1 = networkGraph_grid_0521;
        // let g1 = networkGraph_tree_0521;
        // let g1 = networkGraph_2circles_0523;
        // let g1 = networkGraph_edges_between_the_same_level_nodes;
        // let g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // let g1 = networkGraph_tree_0524;
        // let g1 = networkGraph_many_children_0526;
        // let g1 = networkGraph_star_161017;
        // let g1 = networkGraph_person_event_event_person_0729;
        // let g1 = networkGraph_person_event_event_person_0801;
        // let g1 = networkGraph_triangle_0801;
        let g1 = networkGraph_triangle_0801_2;
        // let g1 = networkGraph_complex_hier_160816;
        // let g1 = networkGraph_complex_hier_160817;
        // let g1 = networkGraph_complex_hier_160820;
        // let g1 = networkGraph_complex_hier_160823;
        // let g1 = networkGraph_circle_group_1118;

        let graph = new Graph( g1.nodes, g1.edges );
        let startTime = new Date().getTime();
        rescale( graph, width, height
            , { 
                ignoreNodeSize: false
                , minNodeSize: 5
                , maxNodeSize: 10
            } 
        );
        alignCenter( graph );
        graph.edges().forEach( ( edge ) => {
            let source = graph.nodes( edge.source );
            let target = graph.nodes( edge.target );
            drawEdge( context, edge, source, target );
        } );
        graph.nodes().forEach( ( node ) => {
            drawNode( context, node );
        } );
        let endTime = new Date().getTime();

        s.show( 'testing start ...' );
        s.append_show( graph.nodes().length + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );

    })();

</div>
<div class="test-panel">
</div>
</div>






## 性能试验

> 在尺寸为`500*600`的画布上进行性能试验

### Mac Chrome

* `不间断`绘制小圆（360度arc），半径为5，最多只能绘制`大概469072`个小圆，超过该数目以后，画布无任何内容；随着绘制圆的半径增大，能绘制的数目会增多，绘制速度也明显提升，比如圆半径为400时，其绘制速度大大提高
* 如果要绘制更多数量的半径为5的小圆，则可采用`间断性`绘制，确保每次绘制的数量要`少于`以上数量
* 第一次不间断绘制如果失败，后续绘制也会失败
* 绘制大量小圆时，Chrome的性能低，远低于Safari；但绘制大量大圆（可视区无法完全容纳整个圆）时，情况刚好相反

### Mac Safari

* 在小圆绘制方面，与`Mac Chrome`相反，它能高效率的不间断绘制大量的小圆，但是随着圆的半径的增大，其绘制速度却显著下降，反而远低于Chrome
* 绘制大量小圆时，Safari性能高；但绘制大量大圆（可视区无法完全容纳整个圆）时，情况刚好相反

### 其他

* 总的来说，一个`不成熟`的结论像是：Chrome针对`可视区外`的大量绘制做了优化，相反Safari针对`可视区内`的大量绘制做了优化
* 绘制`line`, `rect`时，两者性能差别不大


<div id="test_canvas_perf" class="test">
<div class="test-container">
<div class="canvas-wrapper" style="height:500px; width:600px;"></div>
<div class="test-console"></div>

    @[data-script="babel"](function(){

        let containerId = 'test_canvas_perf';
        let s = fly.createShow( '#' + containerId );
        let canvas = createCanvas( '#' + containerId + ' .canvas-wrapper' );
        let context = canvas.getContext( '2d' );
        const MAX_NODES_FIRST = 5000;
        const MAX_NODES_SECOND = 469000;
        let allNodes = MAX_NODES_FIRST + MAX_NODES_SECOND;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let source, target;

        let startTime = new Date().getTime();
        console.log( startTime );
        for( let i = 0; i < MAX_NODES_FIRST; i++ ) {
            source = target;
            let x = ( Math.random() > 0.5 ? 1 : -1 ) * width * Math.random();
            let y = ( Math.random() > 0.5 ? 1 : -1 ) * height * Math.random();
            target = { x: x, y: y };
            drawNode( context, { x: x, y: y, size: 800 } );
            if ( source ) {
                drawEdge( context, { label: 'e' + i, color: '#fff' }, source, target );
            }
        }
        let endTime = new Date().getTime();
        console.log( endTime );

        s.show( 'testing start ...' );
        s.append_show( MAX_NODES_FIRST + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );

        // setTimeout( () => {
        //     let startTime = new Date().getTime();
        //     for( let i = 0; i < MAX_NODES_SECOND; i++ ) {
        //         let x = width * Math.random();
        //         let y = height * Math.random();
        //         drawNode( context, x, y, 'n' + i, '#d62728' );
        //     }
        //     let endTime = new Date().getTime();
        //     s.append_show( MAX_NODES_SECOND + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );
        // }, 5000 ) ;


    })();

</div>
<div class="test-panel">
</div>
</div>
