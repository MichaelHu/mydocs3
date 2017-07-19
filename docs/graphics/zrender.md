# zrender

> A light-weight canvas library which provides 2d draw for `ECharts`.


## Resources

* github: <https://github.com/ecomfe/zrender>


## 简介

* 分层渲染的思想
* MVC驱动模型
* 使用`AMD`风格编写，使用`r.js`导出
* 代码风格简洁易懂
* 文档没有及时更新

## Code Structure

    zrender.js
        VML or canvas
        zrender
            version
            // factory pattern
            init( dom, opts )
            dispose( zr )
            getInstance( id )
            registerPainter( name, Ctor )
        ZRender( id, dom, opts )
            properties:
                dom
                id
                storage
                painter
                handler
                animation
                _needsRefresh
            methods:
                getId()
                add( el )
                remove( el )
                configLayer( zLevel, config )
                refresh()
                flush()
                addHover( el, style )
                removeHover( el )
                clearHover( el )
                refreshHover()
                resize( opts )
                clearAnimation()
                getWidth()
                getHeight()
                pathToImage( e, dpr )
                setCursorStyle( cursorStyle )
                findHover( x, y )
                on( eventName, eventHandler, context )
                off( eventName, eventHandler )
                trigger( eventName, event )
                clear()
                dispose()
                

    config.js
        properties:
            debugMode: 0
            devicePixelRatio: dpr


    Storage.js
        图形绘制队列管理     
        Storage()
            properties:
                _roots
                _displayList
                _displayListLen
            methods:
                traverse( cb, context )
                getDisplayList( update, includeIgnore )
                updateDisplayList( includeIgnore )
                _updateAndAddDisplayable( el, clipPaths, includeIgnore )
                addRoot( el )
                delRoot( el )
                addToStorage( el )
                delFromStorage( el )
                dispose()


    Painter.js
        MAX_PROGRESSIVE_LAYER_NUMBER
        parseInt10( val )
        isLayerValid( layer )
        preProcessLayer( layer )
        postProcessLayer( layer )
        isDisplayableCulled( el, width, height )
        isClipPathChanged( clipPaths, prevClipPaths )
        doClip( clipPaths, ctx )
        createRoot( width, height )
        Painter( root, storage, opts )
            properties:
                _opts
                dpr
                _singleCanvas
                root
                storage
                _zlevelList
                _layers
                _layerConfig
                _width
                _height
                _domRoot
                _progressiveLayers
                _hoverLayer
                _hoverElements
            methods:
                isSingleCanvas()
                getViewportRoot()
                getViewportRootOffset()
                refresh( paintAll )
                addHover( el, hoverStyle )
                removeHover( el )
                clearHover( el )
                refreshHover()
                _startProgressive()
                _clearProgressive()
                _paintList( list, paintAll )
                _doPaintList( list, paintAll )
                _doPaintEl( el, currentLayer, forcePaint, scope )
                getLayer( zlevel )
                insertLayer( zlevel, layer )
                eachLayer( cb, context )
                eachBuiltinLayer( cb, context )
                eachOtherLayer( cb, context )
                getLayers()
                _updateLayerStatus( list )
                clear()
                _clearLayer( layer )
                configLayer( zlevel, config )
                delLayer( zlevel )
                resize( width, height )
                clearLayer( zlevel )
                dispose()
                getRenderedCanvas( opts )
                getWidth()
                getHeight()
                _getSize( whIdx )
                pathToImage( path, dpr )


    Layer.js
        createDom( id, type, painter, dpr )
        Layer( id, painter, dpr )
            properties:
                id
                dom
                domBack
                ctxBack
                painter
                config
                clearColor
                motionBlur
                lastFrameAlpha
                dpr
            prototype:
                elCount
                __dirty
                initContext()
                createBackBuffer()
                resize( width, height )
                clear( clearAll )


    Handler.js
        makeEventPacket( eveType, targetInfo, event )
        isHover( displayable, x, y )
        EmptyProxy()
            prototype:
                dispose()
        Handler( storage, painter, proxy, painterRoot )
            Eventful.call( this )        
            Draggable.call( this )
            properties:
                storage
                painter
                painterRoot
                proxy
                _hovered
                _lastTouchMoment
                _lastX
                _lastY
            prototype:
                mousemove( event )
                mouseout( event )
                resize( event )
                dispatch( eventName, eventArgs )
                dispose()
                setCursorStyle( cursorStyle )
                dispatchToElement( targetInfo, eventName, event )
                findHover( x, y, exclude )
                click( event )
                mousedown( event )
                mouseup( event )
                mousewheel( event )
                dblclick( event )
                contextmenu( event )
        util.mixin( Handler, Eventful );
        util.mixin( Handler, Draggable );
        


    Element.js 
        Element( opts )
            Transformable.call( this, opts )
            Eventful.call( this, opts )
            Animatable.call( this, opts )
            properties:
                id
            prototype:
                type
                name
                __zr
                ignore
                clipPath
                drift( dx, dy ) // 漂移
                beforeUpdate()
                afterUpdate()
                update()
                traverse( cb, context )
                attrKV( key, value )
                hide()
                show()
                attr( key, value )
                setClipPath( clipPath )
                removeClipPath()
                addSelfToZr( zr )
                removeSelfFromZr( zr )

        zrUtil.mixin( Element, Animatable )
        zrUtil.mixin( Element, Transformable )
        zrUtil.mixin( Element, Eventful )
        


## core/

    env.js
        env
            browser
                firefox
                ie
                edge
                weChat
                version
            os
            node
            canvasSupported
            touchEventsSupported
            pointerEventsSupported


    event.js
        getBoundingClientRect( el )
        defaultGetZrXY( el, e, out )
        @return {
            clientToLocal( el, e, out, calculate )
            , normalizeEvent( el, e, calculate )
            , addEventListener( el, name, handler )
            , removeEventListener( el, name, handler )
            , stop( e )
            , Dispatcher: Eventful
        }


    guid.js
        idStart = 0x0907; // 为什么从0x0907开始？
        function() { return idStart++; }


    log.js
        config.debugMode
            0       return
            1       throw new Error()
            > 1     console.log()


    matrix.js
        matrix
            fields:
                create()
                identity( out )
                copy( out, m )
                mul( out, m1, m2 )
                translate( out, a, v )
                rotate( out, a, rad )
                scale( out, a, v )
                invert( out, a ) // 逆矩阵

    

    timsort.js
        // <https://github.com/mziccard/node-timsort>


    utils.js
        HashMap( obj )
            prototype:
                get( key )
                set( key, value )
                each( cb, context )
                removeKey( key )
        @return {
            clone( source )
            merge( target, source, overwrite )
            mergeAll( targetAndSources, overwrite )
            extend( target, source )
            defaults( target, source, overlay )
            createCanvas()
            getContext()
            indexOf( array, value )
            inherits( clazz, baseClazz )
            mixin( target, source, overlay )
            isArrayLike( data )
            each( obj, cb, context )
            map( obj, cb, context )
            reduce( obj, cb, memo, context )
            filter( obj, cb, context )
            find( obj, cb, context )
            bind( func, context )
            curry( func )
            isArray( value )
            isFunction( value )
            isString( value )
            isObject
            isBuiltInObject( value )
            isDom( value )
            eqNaN( value ) { return value !== value; }
            retrieve( values )
            slice()
            assert( condition, message )
            setAsPrimitive( obj )
            isPrimitive( obj )
            createHashMap( obj )
            noop
        }



    vector.js
        ArrayCtor
        vector
            create( x, y )
            copy( out, v )
            clone( v )
            set( out, a, b )
            add( out, v1, v2 )
            scaleAndAdd( out, v1, v2, a )
            sub( out, v1, v2 )
            len( v )
            lenSquare( v )
            mul( out, v1, v2 )
            div( out, v1, v2 )
            // 向量点积
            dot( v1, v2 )
            scale( out, v, s )
            normalize( out, v )
            // 向量间距离
            distance( v1, v2 )
            // 向量间距离平方
            distanceSquare( v1, v2 )
            negate( out, v )
            // 插值两个点
            lerp( out, v1, v2, t )
            applyTransform( out, v, m )
            min( out, v1, v2 )
            max( out, v1, v2 )



    curve.js
        isAroundZero( val )
        isNotAroundZero( val )
        cubicAt( p0, p1, p2, p3, t )
        cubicDerivativeAt( p0, p1, p2, p3, t )
        cubicRootAt( p0, p1, p2, p3, val, roots )
        cubicExtrema( p0, p1, p2, p3, extrema )
        cubicSubdivide( p0, p1, p2, p3, t, out )
        cubicProjectPoint( x0, y0, x1, y1, x2, y2, x3, y3, x, y, out )
        quadraticAt( p0, p1, p2, t )
        quadraticDerivativeAt( p0, p1, p2, t )
        quadraticRootAt( p0, p1, p2, val, roots )
        quadraticExtremum( p0, p1, p2 )
        quadraticSubdivide( p0, p1, p2, t, out )
        quadraticProjectPoint( x0, y0, x1, y1, x2, y2, x, y, out )



    bbox.js
        fromPoints( points, min, max )
        fromLine( x0, y0, x1, y1, min, max )
        fromCubic( x0, y0, x1, y1, x2, y2, x3, y3, min, max )
        fromQuadratic( x0, y0, x1, y1, x2, y2, min, max )
        fromArc( x, y, rx, ry, startAngle, endAngle, anticlockwise, min, max )


    arrayDiff.js
        arrayDiff( arr0, arr1, equal )


    // 抹平canvas和svg的差异
    PathProxy.js
        PathProxy( notSaveData )
            properties:
                _saveData
                data
                _ctx
            prototype:
                _xi
                _yi
                _x0
                _y0
                _ux
                _uy
                _len
                _lineDash
                _dashOffset
                _dashIdx
                _dashSum
                setScale( sx, sy )
                getContext()
                beginPath( ctx )
                moveTo( x, y )
                lineTo( x, y )
                bezierCurveTo( x1, y1, x2, y2, x3, y3 )
                quadraticCurveTo( x1, y1, x2, y2 )
                arc( cx, cy, r, startAngle, endAngle, anticlockwise )
                arcTo( x1, y1, x2, y2, radius )
                rect( x, y, w, h )
                closePath()
                fill( ctx )
                stroke( ctx )
                setLineDash( lineDash )
                setLineDashOffset( offset )
                len()
                setData( data )
                appendPath( path )
                addData( cmd )
                _expandData()
                _needsDash()
                _dashedLineTo( x1, y1 )
                _dashedBezierTo( x1, y1, x2, y2, x3, y3 )
                _dashedQuadraticTo( x1, y1, x2, y2 )
                // 转成静态的Float32Array，减少堆内存占用
                toStatic()
                getBoundingRect()
                rebuildPath( ctx )


    LRU.js
    GestureMgr.js
    BoundingRect.js


