# echarts-insights

## top-level

    echarts.js
        MessageCenter()
            prototype:
                on( event, handler, context )
                one( event, handler, context )
                off( event, handler, context )
        ECharts( dom, theme, opts ) 
            properties:
                id
                group
                _dom
                _zr
                _throttledZrFlush
                _theme
                _chartsViews
                _chartsMap
                _componentsViews
                _componentsMap
                _coordSysMgr
                _api
                _model
                _messageCenter
                // In case some people write `window.onresize = chart.resize`
                resize: zrUtil.bind( this.resize, this )
                _pendingActions
            prototype:
                _onframe()
    getDom()
    getZr()
    setOption( option, notMerge, lazyUpdate )
    setTheme() { console.log( 'ECharts#setTheme() is DEPRECATED in ECharts 3.0' ); }
    getModel()
    getOption()
    getWidth()
    getHeight()
    getDevicePixelRatio()
    getRenderedCanvas( opts )
    getDataURL( opts )
    getConnectedDataURL( opts )
    convertToPixel: zrUtil.curry( doConvertPixel, 'convertToPixel' )
    containPixel( finder, value )
    getVisual( finder, visualType )
    getViewOfComponentModel( componentModel )
    getViewOfSeriesModel( seriesModel )
    ...







