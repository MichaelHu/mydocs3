# sigmajs-insight

* github: <https://github.com/jacomyal/sigma.js>
* `v1.2.0`: <https://github.com/jacomyal/sigma.js/tree/v1.2.0>


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
* `camera` todo
* `四叉树应用` todo


## code structure

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



    sigma.export.js
        // only for the node.js version



    sigma.core.js
        sigma( conf )
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
                events
            prototype:
                addCamera()
                killCamera()
                addRenderer()
                killRenderer()
                refresh()
                render()
                renderCamera()
                kill()
            static:
                instances
                version
            
    conrad.js // a tiny javascript jobs scheduler
        ref: <http://github.com/jacomyal/conrad.js>




## renderers/

    sigma.renderers.def.js
        sigma.renderers.def = webgl ?
            sigma.renderers.webgl : sigma.renderers.canvas

    sigma.renderers.canvas.js
        sigma.renderers.canvas( graph, camera, settings, options ) 
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

            prototype:
                render( options )
                initDOM( tag, id )
                resize( w, h )
                clear()
                kill()



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



### renderers/canvas/

    sigma.canvas.nodes.def.js
        // 默认绘制一个简单的实心圆盘(simple disc)
        sigma.canvas.nodes.def( node, context, settings )
            // 不需要默认save()和restore()


    sigma.canvas.labels.def.js
        // 默认在节点下方绘制标签
        sigma.canvas.labels.def( node, context, settings )


    sigma.canvas.hovers.def.js
        // 默认情况下，hover时为label添加背景色
        sigma.canvas.hovers.def( node, context, settings )


    sigma.canvas.edges.def.js
        // 默认绘制一条直线
        sigma.canvas.edges.def( edge, source, target, context, settings )


    sigma.canvas.edges.curve.js
        // 曲线边
        sigma.canvas.edges.curve( edge, source, target, context, settings )


    sigma.canvas.edges.arrow.js
        // 直线边，并展示指向target的箭头
        sigma.canvas.edges.arrow( edge, source, target, context, settings )


    sigma.canvas.edges.curvedArrow.js
        // 曲线边，并展示指向target的箭头
        sigma.canvas.edges.curvedArrow( edge, source, target, context, settings )



## misc/

    sigma.misc.animation.js
        // camera动画
        sigma.misc.animation.camera( camera, val, options )
        sigma.misc.animation.kill( id )
        sigma.misc.animation.killAll( filter )
        sigma.misc.animation.has( filter )
        // 其他呢？
        

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


    sigma.misc.drawHovers.js
        sigma.misc.drawHovers( prefix )
            this.bind( 'overNode', ... )
            this.bind( 'outNode', ... )
            this.bind( 'overEdge', ... )
            this.bind( 'outEdge', ... )
            this.bind( 'render', ... )
            draw()



## middlewares/
## classes/

    sigma.classes.configurable.js
        configurable() 
            settings( a1, a2 )
            // 基于当前settings函数，返回新创建的configurable函数，新函数包含参数列表中的对象
            settings.embedObjects()


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
                applyView( read, write, options )
                graphPosition( x, y, vector )
                cameraPosition( x, y, vector )
                getMatrix()
                getRectangle( width, height )


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


    // 边四叉树
    sigma.classes.edgequad.js


## captors/


## utils/

    sigma.polyfills.js
    sigma.utils.js
