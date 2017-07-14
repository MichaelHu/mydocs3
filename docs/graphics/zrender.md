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
        debugMode: 0
        devicePixelRatio: dpr
    Storage.js
        绘制队列管理     
    Painter.js
        timsort
        Clip相关
        Painter( root, storage, opts )
            _layers
            Hover相关处理
            _doPaintList
            Layers相关处理
    Layer.js
        Layer( id, painter, dpr )
    Handler.js
        使用Eventful
        使用Draggable
        makeEventPacket
        Handler( storage, painter, proxy, painterRoot )
        mousemove
        mouseout
        resize
        dispatch
        click, mousedown, mouseup, mousewheel, dbclick, contextmenu
        等
    Element.js 
        Element( opts )
            Transformabel.call()
            Eventful.call()
            Animatable.call()

            drift( dx, dy ) // 漂移
            beforeUpdate
            afterUpdate
            hide
            show
            setClipPath
            removeClipPath
            等
    core/
        env.js

