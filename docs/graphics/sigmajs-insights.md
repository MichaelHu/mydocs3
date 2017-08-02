# sigmajs-insights

* github: <https://github.com/jacomyal/sigma.js>
* `v1.2.0` - 2016-11-03: <https://github.com/jacomyal/sigma.js/tree/v1.2.0>


## Features

* 老牌`基于namespace`的代码组织，`sigma`是顶级命名空间
* 设置`defaultNodeType`, `defaultEdgeType`来切换扩展的renderer等，比如默认为`def`，则使用：
        sigma.canvas.nodes.def
        sigma.canvas.labels.def
        sigma.canvas.edges.def
        sigma.canvas.hovers.def
    若需要将边设置为带箭头的贝塞尔曲线，则可以设置如下：
        defaultEdgeType: 'curvedArrow'

* `graph类扩展`，使用`addMethod()`, `attach()`, `attachBefore()`。支持添加新的方法、修改现有方法，甚至可以修改graph构造函数。
* `renderer`的创建需要`graph`和`camera`
* `renderer`会引用对应的`camera`，`camera`没有对`renderer`的直接引用，而是在sigma对象中使用`renderersPerCamera`来保存每个camera对应的renderer列表
* `camera.goTo()`，其中的`ratio`参数是缩放倍数的`倒数`
* `三种`坐标空间，分别是`Graph坐标`、`Camera坐标`以及`Renderer坐标`，以下展示`Camera转换`：

        Graph坐标 <----> Camera转换 <----> Camera坐标 <----> Camera.applyView() <----> Renderer坐标
            |        (x, y, angle, ratio)      |                                            |
            |                                  |                                            |
        (x, y, size)            (read_cam0:x, read_cam0:y, read_cam0:size)                  |
                                                        (renderer1:x, readerer1:y, renderer1:size)

    * Graph -> Camera：`translate( x, y ), rotate( angle ), scale( ratio )`
    * Camera -> Graph: `rotate( -angle ), scale( 1/ratio ), translate( x', y' )` 
    * Graph原始坐标如果没有根据renderer视窗进行适配，通常可以由Sigma引擎进行`尺寸适配（autoRescale）`，适配后会得到`read_cam0:`为前缀的新参数，如`read_cam0:x`, `read_cam0:size`，这些新参数相较于Graph原始坐标，只做了缩放和平移操作，`不包含旋转操作`，可以认为这一组坐标为`标准化以后的Graph坐标`。
    * `注意`：rotate, scale的逆操作是简单的、可调序的，而translate的操作受rotate和scale的影响，是复杂的、不可调序的，必须按原转换的逆序进行。

* `middleware`机制，其参数列表为`( readPrefix, writePrefix )`，在`sigmaInst.refresh()`中会`依次调用middlewares数组`中的所有middleware。`rescale`与`copy`这两个middleware`被主动调用`，不用添加到middlewares数组
* `camera.applyView( read, write, options )`在renderer的`render()`方法中调用，调用时传入renderer的`width`和`height`，调用结果会生成新的`Renderer坐标`，以renderer`中心点`为`(0, 0)`，带特定前缀，直接用于canvas绘制，例如：`renderer1:x`，若未传入write，则默认使用camera的前缀，例如：`cam0:x`
* `autoRescale`属性默认为`true`，`sigmaInst.refresh()`会根据view（绑定的第一个renderer的视窗）的大小自动调整坐标及尺寸，生成新的`Camera坐标`，类似`read_cam0:x`，以`适应视窗大小`，并以调整后的坐标为初始坐标，并设置camera参数为`{ x: 0, y: 0, ratio: 1, angle: 0 }`
* 若`autoRescale`属性设置为`false`，则`sigmaInst.refresh()`方法会调用copy middleware，从Graph原始坐标中复制一份新坐标，新坐标也以`read_cam0:`为前缀。
* 使用`多个canvas层`进行绘制，根据`batchEdgesDrawing`选项的设置，可能为`2个`或`3个`层：
    * `batchEdgesDrawing`选项，默认为`false`，此时边、节点以及标签都在一个canvas上绘制；如果设置为`true`，则边单独一个canvas绘制，节点和标签在另一个canvas绘制。
    * `mouse`和`hover`在同一个canvas绘制
* `四叉树应用` todo


## top level

### sigma.settings

    sigma.settings.js
        // Graph Settings
        clone: true
        immutable: true
        verbose: false

        // Renderers Settings
        classPrefix: 'sigma'
        defaultNodeType: 'def'
        defaultEdgeType: 'def'
        defaultLabelColor: '#000'
        defaultEdgeColor: '#000'
        defaultNodeColor: '#000'
        defaultLabelSize: 14
        edgeColor: 'source'
        minArrowSize: 0
        font: 'arial'
        fontStyle: ''
        labelColor: 'default'
        labelSize: 'fixed'

        labelSizeRatio: 1
        labelThreshold: 8

        webglOversamplingRatio: 2

        borderSize: 0
        defaultNodeBorderColor: '#000'

        hoverFont: ''
        singleHover: true
        hoverFontStyle: ''
        labelHoverShadow: 'default'
        labelHoverShadowColor: '#000'
        nodeHoverColor: 'node'
        defaultNodeHoverColor: '#000'
        labelHoverBGColor: 'default'
        defaultHoverLabelBGColor: '#fff'
        labelHoverColor: 'default'
        defaultLabelHoverColor: '#000'
        edgeHoverColor: 'edge'
        edgeHoverSizeRatio: 1
        defaultEdgeHoverColor: '#000'
        edgeHoverExtremities: false

        drawEdges: true
        drawNodes: true
        drawLabels: true
        drawEdgeLabels: false

        batchEdgesDrawing: false
        hideEdgesOnMove: false
        canvasEdgesBatchSize: 500
        webglEdgesBatchSize: 1000

        // Rescale Settings
        scalingMode: 'inside'
        sideMargin: 0
        minEdgeSize: 0.5
        maxEdgeSize: 1
        minNodeSize: 1
        maxNodeSize: 8

        // Captors Settings
        touchEnabled: true
        mouseEnabled: true
        mouseWheelEnabled: true
        doubleClickEnabled: true
        eventsEnabled: true
        zoomingRatio: 1.7
        doubleClickZoomingRatio: 2.2
        zoomMin: 0.0625
        zoomMax: 2
        mouseZoomDuration: 200
        doubleClickZoomDuration: 200
        mouseInertiaDuration: 200
        mouseInertiaRatio: 3
        touchInertiaDuration: 200
        touchInertiaRatio: 3
        doubleClickTimeout: 300
        doubleTapTimeout: 300
        dragTimeout: 200

        // Global Settings
        autoResize: true
        // true or an Array contains 'nodePosition', 'nodeSize', 'edgeSize'
        autoRescale: true
        enableCamera: true
        enableHovering: true
        enableEdgeHovering: false
        edgeHoverPrecision: 5
        rescaleIgnoreSize: false
        skipErrors: false

        // Camera Settings
        nodesPowRatio: 0.5
        edgesPowRatio: 0.5

        // Animations Settings
        animationsTime: 200


### sigma.export

> only for the node.js version

    sigma.export.js


### sigma.core

    sigma.core.js
        __instances
        sigma( conf )
            conf
                renderers
                renderer
                container
                id
                settings
                middlewares
                graph
            sigma.classes.dispatcher.extend( this )
            properties:
                id
                settings
                _handler
                graph
                middlewares
                cameras
                renderers
                renderersPerCamera
                cameraFrames
                camera
                // up to 19 events
                events: [
                    'click', 'rightClick', 'clickStage', 'doubleClickStage'
                    , 'rightClickStage', 'clickNode', 'clickNodes', 'doubleClickNode'
                    , 'doubleClickNodes', 'rightClickNode', 'rightClickNodes'
                    , 'overNode', 'overNodes', 'outNode', 'outNodes'
                    , 'downNode', 'downNodes', 'upNode', 'upNodes'
                ]
            prototype:
                addCamera( id )
                killCamera( v )
                addRenderer( options )
                    options
                        container
                        id
                        type
                        camera
                killRenderer( v )
                refresh( options )
                render()
                // 调用绑定到camera的所有renderer的render()方法
                renderCamera( camera, force )
                kill()
            static:
                instances
                version

### conrad
            
    conrad.js // a tiny javascript jobs scheduler
        ref: <http://github.com/jacomyal/conrad.js>




## renderers/

### def

    sigma.renderers.def.js
        sigma.renderers.def = webgl ?
            sigma.renderers.webgl : sigma.renderers.canvas

### canvas

    sigma.renderers.canvas.js
        sigma.renderers.canvas( graph, camera, settings, options ) 
            sigma.classes.dispatcher.extend( this )
            options
                container
                settings
                captors
            properties:
                conradId
                graph
                camera
                contexts
                domElements
                options
                container
                settings
                nodesOnScreen
                edgesOnScreen
                jobs
                captors
                width
                height

            prototype:
                render( options )
                    this.camera.applyView( undefine, this.options.prefix
                        , { width: this.width, height: this.height } )
                initDOM( tag, id )
                resize( w, h )
                clear()
                kill()


### webgl

    sigma.renderers.webgl.js
        sigma.renderers.webgl( graph, camera, settings, options )
            properties:
                conradId
                graph
                camera
                contexts
                domElements
                options
                container
                settings
                nodePrograms
                edgePrograms
                nodeFloatArrays
                edgeFloatArrays
                edgeIndicesArrays

            prototype:
                process()
                render( params )
                initDOM( tag, id, webgl )
                resize( w, h )
                clear()
                kill()

        sigma.utils.pkg( 'sigma.webgl.nodes' )
        sigma.utils.pkg( 'sigma.webgl.edges' )
        sigma.utils.pkg( 'sigma.canvas.labels' )



## renderers/canvas/

### nodes.def

    sigma.canvas.nodes.def.js
        // 默认绘制一个简单的实心圆盘(simple disc)
        sigma.canvas.nodes.def( node, context, settings )
            // 不需要默认save()和restore()



### labels.def

    sigma.canvas.labels.def.js
        // 默认在节点下方绘制标签
        sigma.canvas.labels.def( node, context, settings )


### hovers.def

    sigma.canvas.hovers.def.js
        // 默认情况下，hover时为label添加背景色
        sigma.canvas.hovers.def( node, context, settings )


### edges.def

    sigma.canvas.edges.def.js
        // 默认绘制一条直线
        sigma.canvas.edges.def( edge, source, target, context, settings )

### edges.curve

    sigma.canvas.edges.curve.js
        // 曲线边
        sigma.canvas.edges.curve( edge, source, target, context, settings )


### edges.arrow

    sigma.canvas.edges.arrow.js
        // 直线边，并展示指向target的箭头
        sigma.canvas.edges.arrow( edge, source, target, context, settings )


### edges.curvedArrow

    sigma.canvas.edges.curvedArrow.js
        // 曲线边，并展示指向target的箭头
        sigma.canvas.edges.curvedArrow( edge, source, target, context, settings )






## misc/

### animation

    sigma.misc.animation.js
        // camera动画
        sigma.misc.animation.camera( camera, val, options )
        sigma.misc.animation.kill( id )
        sigma.misc.animation.killAll( filter )
        sigma.misc.animation.has( filter )
        // 其他呢？
        

### bindDomEvents

    // 扩展DOM renderer，比如svg
    sigma.misc.bindDOMEvents.js
        sigma.misc.bindDOMEvents( container )
            Element( domElement )
                properties:
                    tag
                    class
                    id
                methods:
                    attr( attrName )
                    isNode()
                    isEdge()
                    isHover()
            click( e )
            doubleClick( e )
            onOver( e )
            onOut( e )
            // Click
            container.addEventListener('click', click, false);
            sigma.utils.doubleClick(container, 'click', doubleClick);
            // Touch counterparts
            container.addEventListener('touchstart', click, false);
            sigma.utils.doubleClick(container, 'touchstart', doubleClick);
            // Mouseover
            container.addEventListener('mouseover', onOver, true);
            // Mouseout
            container.addEventListener('mouseout', onOut, true);



### bindEvents

    // 扩展非DOM renderer，比如canvas或webGL
    sigma.misc.bindEvents.js
        sigma.misc.bindEvents( prefix )
            getNodes( e )
                point = self.camera.cameraPosition( mX, mY )
                nodes = self.camera.quadtree.point( point.x, point.y )
            getEdges( e )
                edges = self.camera.edgequadtree.point( point.x, point.y )
            bindCaptor( captor )
                onClick( e )
                onDoubleClick( e )
                onRightClick( e )
                onOut( e )
                onMove( e )
                captor.bind( 'click', onClick )
                captor.bind( 'mousedown', onMove )
                captor.bind( 'mouseup', onMove )
                captor.bind( 'mousemove', onMove )


### drawHovers

    sigma.misc.drawHovers.js
        sigma.misc.drawHovers( prefix )
            this.bind( 'overNode', ... )
            this.bind( 'outNode', ... )
            this.bind( 'overEdge', ... )
            this.bind( 'outEdge', ... )
            this.bind( 'render', ... )
            draw()



## classes/

### configurable

    sigma.classes.configurable.js
        configurable() 
            settings( a1, a2 )
            // 基于当前settings函数，返回新创建的configurable函数，新函数包含参数列表中的对象
            settings.embedObjects()




### camera

* `angle`是`逆时针`方向旋转的角度

以下为代码：

    sigma.classes.camera.js
        sigma.classes.camera( id, graph, settings, options )
            sigma.classes.dispatcher.extend( this )
            properties:
                graph
                id
                readPrefix: 'read_cam' + id + ':'
                prefix: 'cam' + id + ':'
                x
                y
                ratio
                angle
                isAnimated
                settings
            prototype:
                goTo( coordinates )
                // 可能和autoRescale有关
                applyView( read, write, options )
                // 先旋转再平移
                graphPosition( x, y, vector )
                // 先平移再旋转 
                cameraPosition( x, y, vector )
                // 获得转换矩阵
                getMatrix()
                getRectangle( width, height )


### graph

    sigma.classes.graph.js
        _methods
        _indexes
        _methodBindings
        _methodBeforeBindings
        __bindGraphMethod( methodName, scope, fn )
        __emptyObject( obj )
        graph( settings )
            properties:
                inNeighborsIndex
                outNeighborsIndex
                allNeighborsIndex
                inNeighborsCount
                outNeighborsCount
                allNeighborsCount
                nodesArray
                nodesIndex
                edgesArray
                edgesIndex
            prototype:
                addNode( node )
                addEdge( edge )
                dropNode( id )
                dropEdge( id )
                kill()
                clear()
                read( g )
                nodes( v )
                degree( v, which )
                edges( v )
            static:
                addMethod( methodName, fn )
                hasMethod( methodName )
                attach( methodName, key, fn, before )
                attachBefore( methodName, key, fn )
                addIndex( name, bindings )


### dispatcher

    sigma.classes.dispatcher.js
        dispatcher()
            properties:
                _handlers
            prototype:
                bind( events, handler )
                unbind( events, handler )
                dispatchEvent( events, data )
                getEvent( event, data )
            static:
                extend( target, args )



### quad

    // rectangle definition in quadtree

          top point  _______________________ top point
                    |                       |
                    |                       |
                    |                       |
                    |_______________________|
          lower left point              lower right point

    // 节点四叉树
    sigma.classes.quad.js
        // 四叉树几何操作
        // axis-aligned: 坐标轴对齐
        // top points: 矩形上方的两个点
        _geom
            pointToSquare( n )
            isAxisAligned( r )
            axisAlignedTopPoints( r )
            lowerLeftCoor( r )
            lowerRightCoor( r, llc )
            rectangleCorners( r )
            splitSquare( b )
            axis( c1, c2 )
            projection( c, a )
            axisCollision( a, c1, c2 )
            collision( c1, c2 )
        _quadIndex( point, quadBounds )
        _quadIndexes( rectangle, quadCorners )
        _quadCollision( corners, quadCorners )
        _quadSubdivide( index, quad )
        _quadInsert( el, sizedPoint, quad )
        _quadRetrievePoint( point, quad )
        _quadRetrieveArea( rectData, quad, collisionFunc, els )
        _quadTree( bounds, level, maxElements, maxLevel )
        quad()
            properties:
                _geom
                _tree
                _cache
            prototype:
                index( nodes, params )
                point( x, y )
                area( rect )


### edgequad

    // 边四叉树
    sigma.classes.edgequad.js



## middlewares/

### rescale

    // 怎么使用？
    sigma.middlewares.rescale.js
        // 重新计算节点、边的参数，获得与当前视窗（renderer的width、height形成的矩形）
        // 大小匹配的新的参数 
        sigma.middlewares.rescale( readPrefix, writePrefix, options )
        // 获得节点所占空间
        sigma.utils.getBoundaries( graph, prefix, doEdges )


### copy

    // 为节点和边复制属性
    sigma.middlewares.copy.js
        sigma.middlewares.copy( readPrefix, writePrefix )


## captors/

### mouse

    sigma.captors.mouse.js
        sigma.captors.mouse( target, camera, settings )
            _moveHandler( e )
            _upHandler( e )
            _downHandler( e )
            _outHandler( e )
            _clickHandler( e )
            _wheelHandler( e )
            _doubleClickHandler(


### touch

    sigma.captors.touch.js
        sigma.captors.touch( target, camera, settings )
            _handleStart( e )
            _handleLeave( e )
            _handleMove( e )
            _doubleTapHandler( e )



## utils/

### polyfills

    sigma.polyfills.js
        // requestAnimationFrame方法兼容
        global.requestAnimationFrame()
        global.cancelAnimationFrame()
        // bind方法兼容
        Function.prototype.bind( oThis )

### utils

> 包括`点包含算法、双击事件、动画缓动、WebGL、矩阵计算`等。

    sigma.utils.js
        sigma.utils.extend( src1, src2, ..., target )
        sigma.utils.dateNow()
        // 使用reduce()实现，有特色
        sigma.utils.pkg( pkgName )
        sigma.utils.id()
        sigma.utils.floatColor( val )
        sigma.utils.zoomTo( camera, x, y, ratio, animation )

        sigma.utils.getQuadraticControlPoint( x1, y1, x2, y2 )
        sigma.utils.getPointOnQuadraticCurve( t, x1, y1, x2, y2, xi, yi )
        sigma.utils.getPointOnBezierCurve( t, x1, y1, x2, y2, cx, cy, dx, dy )
        sigma.utils.getSelfLoopControlPoints( x, y, size )
        sigma.utils.getDistance( x0, y0, x1, y1 )
        // 两个圆的交点
        sigma.utils.getCircleIntersection( x0, y0, r0, x1, y1, r1 )
        // 点是否在线段上
        sigma.utils.isPointOnSegment( x, y, x1, y1, x2, y2, epsilon )
        // 点是否在二阶贝塞尔曲线上
        sigma.utils.isPointOnQuadraticCurve( x, y, x1, y1, x2, y2, cpx, cpy, epsilon )
        // 点是否在三阶贝塞尔曲线上
        sigma.utils.isPointOnBezierCurve( x, y, x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2, epsilon )

        sigma.utils.getX( e )
        sigma.utils.getY( e )
        sigma.utils.getPixelRatio()
        sigma.utils.getWidth()
        sigma.utils.getCenter( e )
        sigma.utils.mouseCoords( e, x, y )
        sigma.utils.getHeight( e )
        sigma.utils.getOffset( dom )

        // doubleClick
        sigma.utils.doubleClick( target, type, callback )
        sigma.utils.unbindDoubleClick( target, type )

        // easings
        sigma.utils.easings.linearNone( k )
        sigma.utils.easings.quadraticIn( k )
        sigma.utils.easings.quadraticOut( k )
        sigma.utils.easings.quadraticInOut( k )
        sigma.utils.easings.cubicIn( k )
        sigma.utils.easings.cubicOut( k )
        sigma.utils.easings.cubicInOut( k )

        // WebGL
        sigma.utils.loadShader( gl, shaderSource, shaderType, error )
        sigma.utils.loadProgram( gl, shaders, attribs, loc, error )

        // Matrix
        sigma.utils.matrices.translation( dx, dy )
        sigma.utils.matrices.rotation( angle, m2 )
        sigma.utils.matrices.scale( ratio, m2 )
        sigma.utils.matrices.multiply( a, b, m2 )




## plugins

    sigma.layout.forceAtlas2
    sigma.layout.noverlap

    sigma.pathfinding.astar

    sigma.plugins.animate
    sigma.plugins.dragNodes
    sigma.plugins.relativeSize
    sigma.plugins.neighborhoods

    sigma.renderers.customShapes
    sigma.renderers.edgeDots
    sigma.renderers.edgeLabels
    sigma.renderers.parallelEdges
    sigma.renderers.snapshot




