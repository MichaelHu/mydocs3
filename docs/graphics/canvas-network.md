# canvas-network


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-wrapper {
    height: 500px;
}
</style>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="./data/graph/all.js"></script>
<script src="./data/graph/utils.js"></script>


## 步骤

> 170905

* 画布创建、分辨率适配等
* 支持通用图谱数据格式
* 绘制节点、边
* 第一个类：`Graph`

> 170906

* 第二个类：`Network`
* 引入图谱布局相关图谱数据和图谱生成器，更大范围的数据测试
* 增加画布`resize`事件
    * `onNode`, `onEdge`不能只通过`refresh()`的参数传递，而需要在创建Network的时候指定，这样在resize的时候，内部调用refresh时，也能正确调用
* 绘制节点标签
* 构建`utils`包
        extend( target, source )
        defaults( target, source )
        font( options )
* 添加Network类的`defaultSettings`以及`settings`


## API设计

### 功能点及特性

    启用ES6语法
    支持移动版
    可以只支持canvas，其他暂不考虑
    使用prefix fields
    graph可以clone
    视图中点为坐标轴原点
    多renderer
    分层渲染
    19个事件支持
    暂不做私有属性
    MVC模式

### 场景收集

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

### API草案

    Network
        constructor( container, options )
        refresh( options )
        setGraph( nodes, edges )
        draw( options )
    Graph
        constructor( nodes, edges )
        init( nodes, edges )
        set( nodes, edges )
        clear()
        nodes( ids )
        edges( ids )
        addNodes( nodes )
        addEdges( edges )
        addNode( node )
        addEdge( edge )


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


### dummyFunc()

    @[data-script="babel-loose"]function dummyFunc() {}


### clearObject()

    @[data-script="babel-loose"]function clearObject( obj ) {
        for ( let k in obj ) {
            if( !( 'hasOwnProperty' in obj ) || obj.hasOwnProperty( k ) ) {
                delete obj[ k ];
            }
        }
    }


### alignCenter()

    @[data-script="babel-loose"]function alignCenter( graph, options ){
        let nodes = graph.nodes() || []
            , opt = options || {}
            , writePrefix = opt.writePrefix || ''
            , readPrefix = opt.readPrefix || ''
            , rect
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
            node[ writePrefix + 'x' ] = node[ readPrefix + 'x' ] + offset.x;
            node[ writePrefix + 'y' ] = node[ readPrefix + 'y' ] + offset.y;
        } );
    }


### rescale()

    @[data-script="babel-loose"]function rescale( graph, width, height, options ){
        let nodes = graph.nodes() || []
            , opt = utils.defaults( {}, options )
            , readPrefix = opt.readPrefix || ''
            , writePrefix = opt.writePrefix || ''
            , rect, ratio
            , maxNodeSize = opt.maxNodeSize
            , minNodeSize = opt.minNodeSize
            , nodeFontSize = parseInt( opt.nodeFontSize || opt.fontSize )
            , _maxNodeSize, _minNodeSize
            , ignoreNodeSize = typeof opt.ignoreNodeSize == 'undefined'
                ? true : opt.ignoreNodeSize
            , w, h
            ;

        if ( nodeFontSize !== + nodeFontSize ) nodeFontSize = 20;

        minNodeSize = minNodeSize || maxNodeSize || 10;
        maxNodeSize = maxNodeSize || minNodeSize || 20;
        w = ignoreNodeSize ? width : width - 2 * maxNodeSize;
        h = ignoreNodeSize ? height : height - 2 * maxNodeSize - 2 * nodeFontSize;

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
        ctx.setTransform( ratio, 0, 0, ratio, cssSize.w / 2, cssSize.h / 2 )
    }


## packages

### utils

    @[data-script="babel-loose"]var utils = ( function() {

        function extend( target, ...sources ) {
            for ( let i = 0; i < sources.length; i++ ) {
                let source = sources[ i ];
                for ( let key in source ) {
                    if ( source.hasOwnProperty( key ) ) {
                        target[ key ] = source[ key ];
                    }
                }
            }
            return target;
        }

        function defaults( target, ...sources ) {
            for ( let i = 0; i < sources.length; i++ ) {
                let source = sources[ i ];
                for ( let key in source ) {
                    if ( source.hasOwnProperty( key ) && target[ key ] == undefined ) {
                        target[ key ] = source[ key ];
                    }
                }
            }
            return target;
        }

        function font( options ) {
            let fontSettings = {
                    fontStyle: 'normal'
                    , fontVariant: 'normal'
                    , fontWeight: 'normal'
                    , fontSize: 'medium'
                    , lineHeight: 'normal'
                    , fontFamily: 'inherit' 
                }
                , opt = defaults( {}, options, fontSettings )
                , styles = []
                ;
            for ( let key in fontSettings ) {
                styles.push( opt[ key ] );
            }
            styles[ 3 ] = styles[ 3 ] + '/' + styles[ 4 ];
            styles.splice( 4, 1 );

            return styles.join( ' ' );
        }

        return {
            extend
            , defaults
            , font
        };

    } )();


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

        set( nodes, edges ) {
            let me = this;
            me.clear();
            me.init( nodes, edges );
            return me;
        }

        clear() {
            let me = this;
            me._nodesArray.length = 0;
            me._edgesArray.length = 0;
            clearObject( me._nodesIndex );
            clearObject( me._edgesIndex );
            return me;
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



### Network

> 网络图谱创建等（ todo ）

    @[data-script="babel-loose"]class _Network {

        constructor( container, options ) {
            let me = this
                , opt = options || {}
                , graphData = opt.graph || {}
                ;

            if ( typeof container == 'string' ) {
                if ( document.querySelector ) {
                    container = document.querySelector( container );
                }
            }

            if ( ! container instanceof HTMLElement ) {
                throw 'Network: wrong argument.';
            }

            me.defaultSettings = {
                drawNodeLabels: false
                , onNode: drawNode
                , onEdge: drawEdge
                , maxNodeSize: 20
                , minNodeSize: 5

                // default color
                , nodeLabelColor: '#111'
                , nodeFillColor: '#2ca02c'
                , nodeStrokeColor: '#2ca02c'
                , edgeLabelColor: '#111'
                , edgeFillColor: '#999'
                , edgeStrokeColor: '#999'

                // default fontStyle
                , fontStyle: 'normal'
                , fontVariant: 'normal'
                , fontWeight: 'normal'
                , fontSize: '12px'
                , lineHeight: '14px'
                , fontFamily: 'sans-serif'
            };

            me.settings = utils.defaults( {}, opt, me.defaultSettings );
            me.container = container;
            me.canvas = createCanvas( container );
            me.context = me.canvas.getContext( '2d' );
            me.graph = new Graph( graphData.nodes, graphData.edges );
            window.addEventListener( 'resize', ( e ) => me.onresize( e ), false );
        }

        setGraph( nodes, edges ) {
            let me = this;
            me.graph.set( nodes, edges );
            return me;
        }

        onresize() {
            let me = this
                , width = me.container.offsetWidth
                , height = me.container.offsetHeight
                ;
            console.log( 'resize', width, height );
            adaptDevice( me.canvas, { w: width, h: height } );
            me.refresh();
        }

        draw( options ) {
            let me = this
                , opt = utils.defaults( {}, options, me.settings ) 
                , onNode = opt.onNode
                , onEdge = opt.onEdge
                , nodeOption = utils.extend( {}, opt, {
                    fontStyle: opt.nodeFontStyle || opt.fontStyle
                    , fontVariant: opt.nodeFontVariant || opt.fontVariat
                    , fontWeight: opt.nodeFontWeight || opt.fontWeight
                    , fontSize: opt.nodeFontSize || opt.fontSize
                    , lineHeight: opt.nodeLineHeight || opt.lineHeight
                    , fontFamily: opt.nodeFontFamily || opt.fontFamily
                } )
                , edgeOption = utils.extend( {}, opt, {
                    fontStyle: opt.edgeFontStyle || opt.fontStyle
                    , fontVariant: opt.edgeFontVariant || opt.fontVariat
                    , fontWeight: opt.edgeFontWeight || opt.fontWeight
                    , fontSize: opt.edgeFontSize || opt.fontSize
                    , lineHeight: opt.edgeLineHeight || opt.lineHeight
                    , fontFamily: opt.edgeFontFamily || opt.fontFamily
                } )
                ;

            rescale( 
                me.graph
                , me.container.offsetWidth
                , me.container.offsetHeight
                , utils.extend( 
                    {}
                    , opt
                    , {
                        ignoreNodeSize: false
                    }
                ) 
            );
            alignCenter( me.graph );

            me.graph.edges().forEach( ( edge ) => {
                let source = me.graph.nodes( edge.source );
                let target = me.graph.nodes( edge.target );
                onEdge( me.context, edge, source, target, nodeOption ); 
            } );
            me.graph.nodes().forEach( ( node ) => {
                onNode( me.context, node, edgeOption ); 
            } );

            return me;
        }

        refresh( options ) {
            let me = this
                , width = me.container.offsetWidth
                , height = me.container.offsetHeight
                ;
            me.context.clearRect(
                - width / 2, - height / 2
                , width, height 
            );
            return me.draw( options );
        }

    }

    var Network = _Network;


## 绘制基本图谱

### drawNode()

    @[data-script="babel-loose"]function drawNode( context, node, options ) {
        let r = node.size
            , x = node.x
            , y = node.y
            , color = node.color || '#2ca02c'
            , opt = utils.defaults( {}, options )
            ;

        context.save();
        context.beginPath();
        context.arc( x, y, r, 0, Math.PI * 2 ); 
        // context.rect( x - r / 2, y - r / 2, r, r ); 
        context.strokeStyle = color || opt.nodeStrokeColor;
        context.stroke();
        if ( !opt.noFillNode ) {
            context.fillStyle = color || opt.nodeFillColor;
            context.fill();
        }
        if ( opt.drawNodeLabels ) {
            let metrics = context.measureText( node.label );
            context.strokeStyle = opt.nodeLabelColor;
            context.fillStyle = opt.nodeLabelColor;
            context.font = utils.font( opt );
            context.textAlign = 'center';
            context.textBaseline = 'top';
            context.strokeText( node.label, x, y + r + 0, metrics.width );
        }
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
        let containerSelector = '#' + containerId;
        let s = fly.createShow( containerSelector );
        let container = document.getElementById( containerId );
        const conf_drawNodeLabels = 1;
        let net = container.net 
                || new Network( 
                    '#' + containerId + ' .canvas-wrapper' 
                    , {
                        drawNodeLabels: conf_drawNodeLabels
                        , fontFamily: 'Arial'
                        , nodeLabelColor: '#666'
                    }
                )
            ;

        var g1 = getRandomGraph(100, 100, [ 5, 20 ], { width: net.canvas.offsetWidth, height: net.canvas.offsetHeight } );
        // var g1 = getLineGraph(14, 30, {nodeSize: 8});
        // var g1 = networkGraph_circle_0628;
        // var g1 = networkGraph_mesh_0628;
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        // var g1 = networkGraph0520;
        // var g1 = networkGraph_grid_0521;
        // var g1 = networkGraph_tree_0521;
        // var g1 = networkGraph_2circles_0523;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_tree_0524;
        // var g1 = networkGraph_many_children_0526;
        // var g1 = networkGraph_star_161017;
        // var g1 = networkGraph_person_event_event_person_0729;
        // var g1 = networkGraph_person_event_event_person_0801;
        // var g1 = networkGraph_triangle_0801;
        // var g1 = networkGraph_triangle_0801_2;
        // var g1 = networkGraph_complex_hier_160816;
        // var g1 = networkGraph_complex_hier_160817;
        // var g1 = networkGraph_complex_hier_160820;
        // var g1 = networkGraph_complex_hier_160823;
        // var g1 = networkGraph_circle_group_1118;

        container.net = net;
        net.setGraph( g1.nodes, g1.edges );

        let startTime = new Date().getTime();
        net.refresh( {
            maxNodeSize: 10
            , minNodeSize: 5
            , drawNodeLabels: conf_drawNodeLabels
        } );
        let endTime = new Date().getTime();

        s.show( 'testing start ...' );
        s.append_show( g1.nodes.length + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );

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
* 绘制文本的性能损耗较大，10000个节点需要`0.08s`，10000个节点+10000个label需要`0.7s`

### Mac Safari

* 在小圆绘制方面，与`Mac Chrome`相反，它能高效率的不间断绘制大量的小圆，但是随着圆的半径的增大，其绘制速度却显著下降，反而远低于Chrome
* 绘制大量小圆时，Safari性能高；但绘制大量大圆（可视区无法完全容纳整个圆）时，情况刚好相反
* 绘制文本的性能损耗更大，10000个节点需要`0.07s`，10000个节点+10000个label需要`1.932s`

### 其他

* 总的来说，一个`不成熟`的结论像是：Chrome针对`可视区外`的大量绘制做了优化，相反Safari针对`可视区内`的大量绘制做了优化
* 绘制`line`, `rect`时，两者性能差别不大


<div id="test_canvas_perf" class="test">
<div class="test-container">
<div class="canvas-wrapper" style="height:500px; width:600px;"></div>
<div class="test-console"></div>

    @[data-script="babel editable"](function(){

        let containerId = 'test_canvas_perf';
        let s = fly.createShow( '#' + containerId );
        let container = document.getElementById( containerId );
        let canvas = container.canvas || createCanvas( '#' + containerId + ' .canvas-wrapper' );
        let context = canvas.getContext( '2d' );
        const MAX_NODES_FIRST = 5000;
        const MAX_NODES_SECOND = 469000;
        let allNodes = MAX_NODES_FIRST + MAX_NODES_SECOND;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let source, target;

        container.canvas = canvas;
        context.clearRect( 0, 0, width, height );

        let startTime = new Date().getTime();
        console.log( startTime );
        for( let i = 0; i < MAX_NODES_FIRST; i++ ) {
            source = target;
            let x = ( Math.random() > 0.5 ? 1 : -1 ) * width * Math.random();
            let y = ( Math.random() > 0.5 ? 1 : -1 ) * height * Math.random();
            target = { x: x, y: y };
            drawNode( context, { x: x, y: y, size: 800 }, { noFillNode: true } );
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
