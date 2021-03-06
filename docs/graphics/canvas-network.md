# canvas-network


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-wrapper {
    height: 500px;
}
.canvas-wrapper2 {
    height: 300px;
    width: 50%;
    float: left;
    box-sizing: border-box;
    border: 1px dotted #ccc;
}
</style>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="./data/graph/all.js"></script>
<script src="./data/graph/utils.js"></script>
<script src="http://258i.com/static/build/sinon-3.2.1.js"></script>


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

> 170907

* 第三个类：`Camera`，管理视角参数，可以投射到多个renderer（荧幕）
* 第四个类：`Renderer`，管理画布（荧幕）
* 第五个类：`Network2`，临时类，用于测试`Camera-Renderer`渲染机制

以上类只是完成了基本代码编写，尚需要demo验证

> 170911

* 引入`sinon.js`单测，针对类层次开发过程中的单元测试，完成Network2、Camera的单测
* 基本调通Network2 -> Camera -> Renderer类层次构建

> 170912

* `一Camera`对应`多Renderer`调试
* `autoRescale`调试
* `settings chain`开发和调试
    * 全局settings在创建Network实例时传入
    * 添加新的Camera，其settings可通过addCamera( options )传入
    * 添加新的Renderer，其settings可通过addRenderer( container, options )传入
    * `刷新`图谱时，新的settings可以通过Network.refresh( options )传入，可以覆盖原有settings，但`仅限当前`refresh行为；同样的Camera.refresh( options )和Renderer.render( options )也类似，其传入的options仅限当前行为
* 调试`多Camera`功能
* 增加`utils.extend( target, ...others )`
* 开发及调试`Camera.goTo( perspective, needsRefresh )`

> 170913

* 第六个类：`Layer`，实现画布分层
* `resize`功能
* some bugfix


> 170914

* 调试main与hover画布
* 考虑事件模型
* 增加点击事件，并简单调试
* 定义`坐标模型`，`四种`类型的坐标 


> 170915

* 节点点击：viewport坐标 -> render坐标 -> 获取节点
* 开始编写小部分包含算法（contain）


> 170916

todo：hover层渲染／节点hover／拖动／动画


## API设计

### 功能点及特性

    启用ES6语法
    支持移动版
    可以只支持canvas，其他暂不考虑
    使用prefix fields
    graph可以clone
    视图中点为坐标轴原点
    多camera
    多renderer
    暂不做私有属性
    settings chain

    事件引擎
    动画引擎
    分层渲染
    MVC模式
    19个事件支持

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


### Sigmajs晦涩之处

    Camera和Renderer的关系
    Renderer没有默认指定中央点为(0, 0)


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
    Network2
        constructor( options )
        setGraph( nodes, edges )
        addCamera( options )
        cameras( id )
        refresh( options )
    Camera
        constructor( graph, options )
        initRenderers()
        addRenderer( container, options )
        snapshot( options )
        project( options )
        goTo( perspective, needsRefresh )
        refresh( options )
    Renderer
        constructor( container, camera, options )
        draw( options )
        render( options )




### 配置链





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

        rect = getNodesRect( nodes, opt );
        center = {
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
        };

        offset = { x: 0 - center.x, y: 0 - center.y };

        nodes.forEach( ( node ) => {
            node[ writePrefix + 'x' ] = ( node[ readPrefix + 'x' ] || 0 ) + offset.x;
            node[ writePrefix + 'y' ] = ( node[ readPrefix + 'y' ] || 0 ) + offset.y;
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
            let size = node[ readPrefix + 'size' ] 
                    = node[ readPrefix + 'size' ] || node.size || 0;
            if ( size > _maxNodeSize ) {
                _maxNodeSize = size;
            }
            if ( size < _minNodeSize ) {
                _minNodeSize = size;
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
            node[ writePrefix + 'x' ] = ratio * ( node[ readPrefix + 'x' ] || 0 );
            node[ writePrefix + 'y' ] = ratio * ( node[ readPrefix + 'y' ] || 0 );
            if ( _sizeRange == 0 || isNaN( _sizeRange )  ) {
                node[ writePrefix + 'size' ] = minNodeSize + sizeRange / 2;
            }
            else {
                node[ writePrefix + 'size' ] = ( node[ readPrefix + 'size' ]  - _minNodeSize ) 
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
        ctx.setTransform( ratio, 0, 0, ratio, canvas.width / 2, canvas.height / 2 )
    }


## 绘制基本图谱

### drawNode()

    @[data-script="babel-loose"]function drawNode( context, node, options ) {
        let opt = utils.defaults( {}, options )
            , prefix = opt.readPrefix || ''
            , r = node[ prefix + 'size' ] || node.size
                || ( ( opt.nodeMaxSize || 20 ) + ( opt.nodeMinSize || 5 ) ) / 2 
            , x = node[ prefix + 'x' ] || 0
            , y = node[ prefix + 'y' ] || 0
            , color = node[ prefix + 'color' ] || node.color
            , label = node[ prefix + 'label' ] || node.label
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
            let metrics = context.measureText( label );
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
        let opt = utils.extend( {}, options ) 
            , prefix = opt.readPrefix || ''
            , label = edge[ prefix + 'label' ] || edge.label
            , color = edge[ prefix + 'color' ] || edge.color || opt.edgeStrokeColor
            ;

        context.save();
        context.beginPath();
        context.moveTo( source[ prefix + 'x' ], source[ prefix + 'y' ] );
        context.lineTo( target[ prefix + 'x' ], target[ prefix + 'y' ] );
        context.strokeStyle = color;
        context.stroke();
        context.restore();
    }




## packages

### utils

#### 代码实现

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

        function extendOnly( target, ...others ) {
            let len = others.length 
                , sources = [].slice.call( others, 0, len - 1 )
                , keys = others[ len - 1 ] 
                ;
            for ( let i = 0; i < sources.length; i++ ) {
                let source = sources[ i ];
                for ( let key in source ) {
                    if ( source.hasOwnProperty( key ) && keys.indexOf( key ) >= 0 ) {
                        target[ key ] = source[ key ];
                    }
                }
            }
            return target;
        }

        function defaults( target, ...sources ) {
            for ( let i = sources.length - 1; i >= 0; i-- ) {
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

        function dom( container ) {
            if ( typeof container == 'string' ) {
                if ( document.querySelector ) {
                    container = document.querySelector( container );
                }
            }

            if ( ! container instanceof HTMLElement ) {
                throw 'Network: wrong argument.';
            }
            return container;
        }

        return {
            extend
            , extendOnly
            , defaults
            , font
            , dom
        };

    } )();


#### 单测

    
<div id="test_utils" class="test">
<div class="test-container">

    @[data-script="babel"](function(){

        var s = fly.createShow('#test_utils');
        s.show( 'testing utils ...' );
        
        let target = { a: 1 }
            , source = { a: 3, b: '123', c: 'hello' }
            ;

        let t1 = utils.extendOnly( {}, target, source, [ 'a', 'c' ] );
        s.append_show( t1.a === 3, 'a should be extended' );
        s.append_show( t1.b === undefined, 'b should not be extended' );
        s.append_show( t1.c === 'hello', 'c should be extended' );

        let t2 = utils.extendOnly( {}, [ 'a', 'c' ] );
        s.append_show( t2.a === undefined && t2.c === undefined, 'a or c should not be extended' );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### contain
    
#### 代码实现

    @[data-script="babel-loose"]var contain = ( () => {

        function pointInPoint( x1, y1, x2, y2, r ) {
            return Math.pow( x1 - x2, 2 ) + Math.pow( y1 - y2, 2 ) <= r * r;
        }

        return {
            pointInPoint
        };
            
    } )();


## 类

### Graph

> 存储和管理图谱的节点、边数据，提供相关的、高效的基本数据操作

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
            adaptDevice( me.canvas, { w: width, h: height } );
            me.refresh();
        }

        draw( options ) {
            let me = this
                , opt = utils.extend( {}, me.settings, options ) 
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
                onEdge( me.context, edge, source, target, edgeOption ); 
            } );
            me.graph.nodes().forEach( ( node ) => {
                onNode( me.context, node, nodeOption ); 
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




### Network2

> 支持`Camera`、`Renderer`的版本

* settings`层级链`，Network -> Camera -> Renderer，下层配置覆盖上层配置
* camera的id由内部通过`Network.fromCameraId`自增id生成，外部可以通过`camera.id`获得


#### 代码实现

    @[data-script="babel-loose"]class __Network {

        constructor( options ) {
            let me = this
                , opt = options || {}
                , graphData = opt.graph || {} 
                ;

            me.defaultSettings = {

                // =====================
                // camera settings
                // ---------------------
                autoRescale: false 
                , maxNodeSize: 20
                , minNodeSize: 5


                // =====================
                // renderer settings
                // ---------------------
                , drawNodeLabels: false
                , onNode: drawNode
                , onEdge: drawEdge

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

            me.fromCameraId = 0;
            me.settings = utils.extend( {}, me.defaultSettings, opt );
            me.graph = new Graph( graphData.nodes, graphData.edges );
            me._cameras = [];
            me.addCamera( me.settings );
        }

        setGraph( nodes, edges ) {
            let me = this;
            me.graph.set( nodes, edges );
            return me;
        }

        cameras( id ) {
            let me = this
                , _camera;

            if ( id === undefined ) {
                _camera = me._cameras;
            }
            else if ( typeof id === 'string' || typeof id === 'number') {
                for ( let i = 0; i < me._cameras.length; i++ ) {
                    if ( me._cameras[ i ].id === id ) {
                        _camera = me._cameras[ i ];    
                        break;
                    }
                }
            }
            else {
                throw 'cameras(): wrong arguments.';
            }

            return _camera;
        }

        addCamera( options ) {
            let me = this
                , opt = utils.extend( { cameraId: me.fromCameraId++ }, me.settings, options )
                ;

            delete opt.renderers;
            utils.extend( opt, options );

            let camera = new Camera( me.graph, opt )
            me._cameras.push( camera );
            return camera.id;
        }

        refresh( options ) {
            let me = this
                , opt = utils.extend( {}, options )
                ;
            me._cameras.forEach( ( camera ) => camera.refresh( opt ) );
        }

    }

    var Network2 = __Network;


#### 验证

<div id="test_Network2" class="test">
<div class="test-container">

    @[data-script="babel"](function(){

        var s = fly.createShow('#test_Network2');
        s.show( 'ut starting...' );

        if ( !window.Camera ) {
            window.Camera = sinon.spy( function( graph, options ) {
                this.settings = utils.defaults( {}, options );
            } );
        }

        let net = new Network2();
        s.append_show( net.cameras().length == 1, 'net.cameras() has 1 item' );
        console.log( net.cameras() );
        s.append_show( net.cameras()[ 0 ].settings.edgeStrokeColor === '#999'
            , 'correct default edgeStrokeColor' ); 

        net.addCamera();
        s.append_show( net.cameras().length == 2, 'net.cameras() has 2 items after addCamera()' );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### Camera

> `投影机`，管理`视角`，包括视中心、缩放、旋转等参数

* camera管理`从属`于它的renderer，只要是荧幕，camera都可以往上面投射影像，一个camera可以对应多个荧幕
* camera需要有一套独立于graph的`标准化`坐标（可能是`rescale`以后的坐标），其相关的renderer的渲染基于这套标准化坐标
* 坐标统一保存在graph中，不同套坐标使用`前缀`区分
* camera是自带`胶片`（graph数据）的，`goTo( x, y, ratio, angle )`的含义是将胶片的`(x,y)`投射到荧幕（renderer）的`中心点`，也就是`(0, 0)`；将胶片`放大`ratio倍，再`逆时针`旋转angle弧度
* `约定`：graph坐标相关值x, y, size，在`读取过程`中，若其值为`null, undefined或NaN`，需修正成`0`

#### 代码实现

    @[data-script="babel-loose"]class _Camera {

        constructor( graph, options ) {
            let me = this
                ;

            me.settings = utils.defaults( {}, options );
            me.id = me.settings.cameraId;
            me.prefix = 'c' + me.id + ':';
            me.graph = graph;
            me.x = 0;
            me.y = 0;
            me.angle = 0;
            me.ratio = 1;

            me.renderers = [];
            if ( me.settings.renderers ) {
                me.initRenderers();
            }
        }

        initRenderers() {
            let me = this
                , opt = me.settings
                , renderers = opt.renderers
                ;

            if ( typeof renderers.length != 'undefined' ) {
                renderers.forEach( ( renderer ) => {
                    me.addRenderer( renderer.container, utils.extend( {}, opt, renderer ) ) 
                } );
            }
            else {
                me.addRenderer( renderers.container, utils.extend( {}, opt, renderers ) );
            }
        }

        addRenderer( container, options ) {
            let me = this
                , opt = utils.extend( {}, me.settings, options )
                , renderer = new Renderer( container, me, opt )
                ;
            me.renderers.push( renderer );
        }

        snapshot( options ) {
            let me = this
                , prefix = me.prefix
                , opt = utils.extend( { writePrefix: prefix }, me.settings, options ) 
                , mainRenderer = me.renderers.length ? me.renderers[ 0 ] : null
                ;

            if ( opt.alignCenter ) {
                alignCenter( me.graph, opt );
            }
            else {
                me.graph.nodes().forEach( ( node ) => {
                    node[ prefix + 'x' ] = node.x || 0;
                    node[ prefix + 'y' ] = node.y || 0;
                } );
            }

            if ( opt.autoRescale && mainRenderer ) {
                rescale( me.graph, mainRenderer.width
                    , mainRenderer.height
                    , utils.extend( {}, opt, { readPrefix: prefix, ignoreNodeSize: false } ) 
                );
            }

            return me;
        }

        project( options ) {
            let me = this
                , readPrefix = me.prefix
                , writePrefix
                ;
            if ( me.renderers.length ) {
                let offset = { x: 0 - me.x, y: 0 - me.y };
                let ratio = me.ratio;
                let angle = me.angle;
                let cos = Math.cos( angle ), sin = Math.sin( angle );
                writePrefix = me.renderers[ 0 ].prefix;
                me.graph.nodes().forEach( ( node ) => {
                    node[ writePrefix + 'x' ] 
                        = ( ( node[ readPrefix + 'x' ] || 0 ) + offset.x ) * ratio;
                    node[ writePrefix + 'y' ] 
                        = ( ( node[ readPrefix + 'y' ] || 0 ) + offset.y ) * ratio;
                    node[ writePrefix + 'size' ] = ( node[ readPrefix + 'size' ] || 0 ) * ratio;

                    let x = node[ writePrefix + 'x' ], y = node[ writePrefix + 'y' ];  
                    node[ writePrefix + 'x' ] = x * cos + y * sin;
                    node[ writePrefix + 'y' ] = -x * sin + y * cos;
                } );
            }
            return me;
        }

        goTo( perspective, needsRefresh ) {
            let me = this;
            utils.extendOnly( me, perspective, [ 'x', 'y', 'ratio', 'angle' ] );
            needsRefresh && me.refresh();
            return me;
        }

        refresh( options ) {
            let me = this
                , opt = utils.extend( {}, options )
                ;

            me.snapshot( opt ).project( opt );
            me.renderers.forEach( ( renderer ) => renderer.render( opt ) );
        }

    }
    var Camera = _Camera;


#### 验证

<div id="test_Camera" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="babel editable"](function(){

        var s = fly.createShow('#test_Camera');

        let render = sinon.spy();
        let addRenderer = sinon.stub( Camera.prototype, 'addRenderer' )
                .callsFake( function( container, options ) {
                    this.renderers.push( { prefix: 'r_c0:', render: render } );
                } );

        s.show( 'testing Camera class ...' );

        let nodes = [ { id: 1, x: null, y: null } ];
        let graph = new Graph( nodes );
        let camera = new Camera( graph, { renderers: {}, cameraId: 0 } ); 

        s.append_show( camera.prefix === 'c0:', 'correct prefix' );
        s.append_show( addRenderer.calledOnce, 'addRenderer() called once' );
        s.append_show( render.notCalled, 'render() not called' );

        camera.refresh();
        s.append_show( render.calledOnce, 'render() called once' );
        s.append_show( camera.renderers.length === 1, 'renderers has 1 item' ); 
        s.append_show( camera.graph.nodes().length === 1, 'has 1 node' );
        s.append_show( camera.graph.nodes()[ 0 ][ 'c0:x' ] === 0, 'correct snapshot()' );
        s.append_show( camera.graph.nodes()[ 0 ][ 'r_c0:x' ] === 0, 'correct project()' );

        console.log( camera.graph.nodes() );

        addRenderer.restore();

    })();

</div>
<div class="test-panel">
</div>
</div>


### Renderer

> 荧幕，图形渲染器

#### 定位及说明

* 不同于sigmajs，canvas层面已经调整`荧幕中央`为`(0, 0)`
* 可扩展出`SVG` Renderer, `WebGL` Renderer
* 支持`画布分层`，至少包含两个层。一个绘制节点、边、标签等内容的层（`main`）；另一个绘制Hover层（`hover`）
* Renderer管理`从属`的画布层（Layer），能随意调用`指定`画布进行绘制
* 处理和派发发生在荧幕上的`事件`
* 坐标类型（`4类`）：
    * `Graph坐标`，对应`原始`坐标值
    * `Camera坐标`，对应原始坐标值，`或者`对应将原始坐标值进行`Rescale`后的坐标值
    * `Renderer坐标`，以画布`中心点`为坐标原点的坐标系
    * `Viewport坐标`，画布矩形`左上`顶点为(0, 0)，`右下`顶点为(w, h)，只和`可视区`相关，总是`非负`坐标值


#### 代码实现

    @[data-script="babel-loose"]class _Renderer {

        constructor( container, camera, options ) {
            let me = this
                ;

            me.settings = utils.defaults( {}, options );
            me.camera = camera;
            me.prefix = 'r_' + me.camera.prefix;

            me.container = utils.dom( container );
            me.width = me.container.offsetWidth;
            me.height = me.container.offsetHeight;
            me.container.style.position = 'relative';

            me.layers = {};
            me.initLayers();
            window.addEventListener( 'resize', e => me.resize(), false );
            me.container.addEventListener( 'click', ( e ) => {
                let rect = me.container.getBoundingClientRect()
                    , viewportPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top }
                    , renderPoint = { 
                        x: viewportPoint.x - me.width / 2
                        , y: viewportPoint.y - me.height / 2
                    }
                    ;
                console.log( [ e.clientX, e.clientY, rect.top, rect.left ].join( ' | ' ) );
                console.log( 'point: ' + viewportPoint.x + ', ' + viewportPoint.y );
                console.log( 'renderPoint: ' + renderPoint.x + ', ' + renderPoint.y );
                me.camera.graph.nodes().forEach( ( node ) => {
                    if ( contain.pointInPoint(
                            node[ me.prefix + 'x' ]
                            , node[ me.prefix + 'y' ]
                            , renderPoint.x
                            , renderPoint.y
                            , node[ me.prefix + 'size' ] 
                        ) ) {
                        console.log( 'node ' + node.label + ' clicked' );
                    }
                } );
            } );
        }

        initLayers() {
            let me = this;
            [ 'main', 'hover' ].forEach( ( type ) => {
                me.layers[ type ] = new Layer( me.container, type, me.settings );
            } );
        }

        eachLayers( func ) {
            let me = this;
            for ( let key in me.layers ) {
                let layer = me.layers[ key ];
                func.call( layer, key );
            }
        }

        draw( options ) {

            let me = this
                , opt = utils.extend( { readPrefix: me.prefix }, me.settings, options )
                , graph = me.camera.graph
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

            graph.edges().forEach( ( edge ) => {
                let source = graph.nodes( edge.source );
                let target = graph.nodes( edge.target );
                onEdge( me.layers[ 'hover' ].context, edge, source, target, edgeOption );
            } );

            graph.nodes().forEach( ( node ) => {
                onNode( me.layers[ 'main' ].context, node, nodeOption );
            } );

            return me;

        }

        resize() {
            let me = this;

            me.width = me.container.offsetWidth;
            me.height = me.container.offsetHeight;

            me.eachLayers( function( type ) {
                this.resize();
            } );
            me.camera.refresh();
            // me.render();
        }

        render( options ) {
            let me = this
                , width = me.width
                , height = me.height
                ;

            me.eachLayers( function( type ) {
                this.context.clearRect(
                    - width / 2, - height / 2
                    , width, height
                );
            } );

            return me.draw( options );
        }

    }
    var Renderer = _Renderer;


### Layer

> 画布层，每一个画布层包含一张背景透明的画布。

* 管理画布与`屏幕dpr`、`容器尺寸`的适配
* 管理画布的`堆叠`顺序

#### 代码实现

    @[data-script="babel-loose"]class _Layer {

        constructor( container, type, options ) {
            let me = this;
            const zIndexConfig = {
                    main: 100        
                    , hover: 1000
                };

            me.settings = utils.extend( {}, options );
            me.container = utils.dom( container );
            me.canvas = createCanvas( container );
            me.context = me.canvas.getContext( '2d' );

            me.canvas.style.position = 'absolute';
            me.canvas.style.top = '0';
            me.canvas.style.left = '0';
            me.canvas.style.right = '0';
            me.canvas.style.bottom = '0';
            me.canvas.setAttribute( 'data-type', type );
            me.canvas.style.zIndex = zIndexConfig[ type ] || 'auto';
        }

        resize() {
            let me = this
                , width = me.container.offsetWidth
                , height = me.container.offsetHeight
                ;
            adaptDevice( me.canvas, { w: width, h: height } );
        }

    }
    var Layer = _Layer;




## 验证

### 阶段性验证1

> 主要验证内容

* 无Camera版本（简版）图谱引擎验证
* 渲染性能评估


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
                        , maxNodeSize: 10
                        , minNodeSize: 5
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
            drawNodeLabels: conf_drawNodeLabels
        } );
        let endTime = new Date().getTime();

        s.show( 'testing start ...' );
        s.append_show( g1.nodes.length + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );

    })();

</div>
<div class="test-panel">
</div>
</div>




### 阶段性验证2

> 主要验证内容

* 单Camera - 多Renderer，独立渲染参数
* 多Camera，独立视角
* 配置链：Network级 - Camera级 - Renderer级
* Camera视角变换 

<div id="test_basic_network2" class="test">
<div class="test-container">
<div class="canvas-wrapper2"></div>
<div class="canvas-wrapper2"></div>
<div class="canvas-wrapper2"></div>
<div class="canvas-wrapper2"></div>
<div class="test-console"></div>

    @[data-script="babel editable"](function(){

        var containerId = 'test_basic_network2';
        var s = fly.createShow( '#' + containerId );
        let container = document.getElementById( containerId ); 
        let net = container.net
                || new Network2( {
                    // graph: { nodes: [ { id: 1, x: 10, y: 20, label: 'n1' } ] }   
                    autoRescale: true
                    , minNodeSize: 3
                    , maxNodeSize: 10
                    , alignCenter: true
                    , renderers: [
                        {
                            container: '#' + containerId + ' .canvas-wrapper2:nth-child(1)'
                            , drawNodeLabels: true
                        }
                        , {
                            container: '#' + containerId + ' .canvas-wrapper2:nth-child(2)'
                            , edgeStrokeColor: 'red'
                            , drawNodeLabels: true
                            , nodeLabelColor: '#888' 
                        }
                    ]
                } );

        container.net = net;

        var g1 = getRandomGraph( 100, 100, [ 5, 20 ] );
        // var g1 = getLineGraph(14, 30, {nodeSize: 8});
        // var g1 = networkGraph_circle_0628;
        // var g1 = networkGraph_mesh_0628;
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        // var g1 = networkGraph0520;
        var g1 = networkGraph_grid_0521;
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

        if ( !container.cameraAdded ) {
            container.cameraAdded = net.addCamera( {
                autoRescale: true
                , renderers: [
                    {
                        container: '#' + containerId + ' .canvas-wrapper2:nth-child(3)'
                    }
                    , {
                        container: '#' + containerId + ' .canvas-wrapper2:nth-child(4)'
                    }
                ]
            } );
        }

        net.setGraph( g1.nodes, g1.edges );
        net.refresh();
        net.cameras( container.cameraAdded )
            .goTo( { x: -50, y: -50, ratio: 0.6, angle: Math.PI / 4 } )
            .refresh( { autoRescale: true, minNodeSize: 2, maxNodeSize: 8 } );
        s.show( 'testing ...' );

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
* 绘制`文本`的性能损耗较大，10000个节点需要`0.08s`，10000个节点+10000个label需要`0.7s`

### Mac Safari

* 在小圆绘制方面，与`Mac Chrome`相反，它能高效率的不间断绘制大量的小圆，但是随着圆的半径的增大，其绘制速度却显著下降，反而远低于Chrome
* 绘制大量小圆时，Safari性能高；但绘制大量大圆（可视区无法完全容纳整个圆）时，情况刚好相反
* 绘制`文本`的性能损耗更大，10000个节点需要`0.07s`，10000个节点+10000个label需要`1.932s`

### 其他

* 绘制`30w`规模的图谱，Safari从按下Start到绘制完毕且按钮归位，所花时间`4.x秒`；Chrome所画时间却需要`20+秒`。从Performance分析，花在`GPU`的时间很长。`todo`: 为什么两者有这么大区别？Chrome下该如何优化？
* 总的来说，一个`不成熟`的结论像是：Chrome针对`可视区外`的大量绘制做了优化，相反Safari针对`可视区内`的大量绘制做了优化
* 绘制`line`, `rect`时，两者性能差别不大


<div id="test_canvas_perf" class="test">
<div class="test-container">
<div class="canvas-wrapper" style="height:500px; width:600px"></div>
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
        context.clearRect( - width / 2, - height / 2, width, height );

        let startTime = new Date().getTime();
        console.log( startTime );
        for( let i = 0; i < MAX_NODES_FIRST; i++ ) {
            source = target;
            let x = ( Math.random() > 0.5 ? 1 : -1 ) * width / 2 * Math.random();
            let y = ( Math.random() > 0.5 ? 1 : -1 ) * height / 2 * Math.random();
            target = { x: x, y: y };
            drawNode( context, { x: x, y: y, size: 500 }, { noFillNode: true } );
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
