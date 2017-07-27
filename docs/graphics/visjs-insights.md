# visjs-insights

github: <https://github.com/almende/vis>

## Versions

* 2017-07-02 `v4.20.1`
* `v0.*, v1.*, v2.*, v3.*`

## Features

* 功能大而全，默认包含`渲染引擎`、`布局引擎`、`物理引擎`等，不同于`sigmajs, zrender`等，进行层次拆分，使用插件来扩展



## lib/network/

### Network

    Network.js
        Network( container, data, options )
            properties:
                options
                defaultOptions
                body
                    container
                    nodes
                    nodeIndices
                    edges
                    edgeIndices
                    emitter
                    eventListeners
                    data
                    functions
                    modules
                    view
                images
                groups
                canvas
                selectionHandler
                interactionHandler
                view
                renderer
                physics
                layoutEngine
                clustering
                manipulation
                nodesHandler
                edgesHandler
            prototype:
                setOptions( options )
                _updateVisibleindices()
                bindEventListeners()
                setData( data )
                destroy()
                _updateValueRange( obj )
                isActive()

                // proxy to this.canvas
                setSize()
                canvasToDOM()
                DOMtoCanvas()

                // proxy to this.clustering
                findNode()
                isCluster()
                openCluster
                cluster()
                getNodesInCluster()
                clusterByConnection()
                clusterByHubsize()
                clusterOutliers()

                // proxy to this.layoutEngine
                getSeed()

                // proxy to this.manipulation
                enableEditMode()
                disableEditMode()
                addNodeMode()
                editNode()
                editNodeMOde() // deprecated
                addEdgeMode()
                editEdgeMode()
                deleteSelected()

                // proxy to nodesHandler
                getPositions()
                storePositions()
                moveNode()
                getBoundingBox()
                getConnectedNodes( objectId )
                getConnectedEdges()

                // proxy to this.physics
                startSimulation()
                stopSimulation()
                stabilize()

                // proxy to this selectionHandler
                getSelection()
                setSelection()
                getSelectedNodes()
                getSelectedEdges()
                getNodeAt()
                getEdgeAt()
                selectNodes()
                selectEdges()
                unselectAll()

                // proxy to this.renderer
                redraw()

                // proxy to this.view
                getScale()
                getViewPosition()
                fit()
                moveTo()
                focus()
                releaseNode()

                // proxy to this.configurator
                getOptionsFromConfigurator()


### shapes

    shapes.js
        // 直接扩展`CanvasRenderingContext2D.prototype`
        circle( x, y, r )
        square( x, y, r )
        triangle( x, y, r )
        triangleDown( x, y, r )
        star( x, y, r )
        diamond( x, y, r )
        roundRect( x, y, w, h, r )
        ellipse_vis( x, y, w, h )
        database( x, y, w, h )
        arrowEndpoint( x, y, angle, length )
        circleEndpoint( x, y, angle, length )
        dashedLine( x, ,y, x2, y2, pattern )


### Images

    Images.js
        Images( callback )
            properties:
                images
                imageBroken
                callback




## network/modules/

### Canvas

    Canvas.js
        Canvas( body )
            properties:
                body
                pixelRatio
                resizeTimer
                resizeFunction
                cameraState
                initialized
                canvasViewCenter
                options
                defaultOptions
            prototype:
                bindEventListener()
                setOptions( options )
                _cleanUp()
                _onResize()
                _getCameraState( pixelRatio )
                _setCameraState()
                _prepareValue( value )
                _create()
                _bindHammer()
                setSize( width, height )
                getContext()
                _determinePixelRatio()
                _setPixelRatio()
                setTransform()
                _XconvertDOMtoCanvas( x )
                _XconvertCanvasToDOM( x )
                _YconvertDOMtoCanvas( y )
                _YconvertCanvasToDOM( y )
                canvasToDOM( pos )
                DOMtoCanvas( pos )


### CanvasRendering

    CanvasRendering.js
        CanvasRenderer( body, canvas )
            properties:
                body
                canvas
                redrawRequested
                renderTimer
                requiresTimeout
                renderingActive
                renderRequests
                allowRedraw
                dragging
                options
                defaultOptions

            prototype:
                bindEventListener()
                setOptions( options )
                _startRendering()
                _renderStep()
                redraw()
                _requestRedraw()
                _redraw( hidden )
                _resizeNodes()
                _drawNodes( ctx, alwaysShow )
                _drawEdges( ctx )
                _determineBrowserMethod()



### LayoutEngine

    LayoutEngine.js
        HierarchicalStatus()
            properties:
                childrenReference
                parentReference
                levels
                trees
                isTree
            prototype:
                addRelation( parentNodeId, childNodeId )
                checkIfTree()
                ensureLevel( nodeId )
                getMaxLevel( nodeId )
                levelDownstream( nodeA, nodeB )
                setMinLevelToZero( nodes )
                getTreeSize( nodes, index )
        LayoutEngine( body )
            properties:
                body
                initialRandomSeed
                randomSeed
                setPhysics
                options
                optionsBackup
                defaultOptions
            prototype:
                bindEventListener()
                setOptions( options, allOptions )
                adaptAllOptionsForHierarchicalLayout( allOptions )
                seededRandom()
                positionInitially( nodesArray )
                layoutNetwork()
                _shiftToCenter()
                _declusterAll()
                getSeed()
                setupHierarchicalLayout()
                _condenseHierarchy()
                _getSpaceAroundNode( node, map )
                _centerParent( node )
                _placeNodesByHierarchy( distribution )
                _placeBranchNodes( parentId, parentLevel )
                _validatePositionAndContinue( node, level, pos )
                _indexArrayToNodes( idArray )
                _getDistribution()
                _getActiveEdges( node )
                _getHubSize()
                _determineLevelsByHubsize()
                _determineLevelsCustomCallback()
                _determineLevelsDirected()
                _generateMap()
                _craelNetwork( callback , startingNodeId )
                _shiftBlock( parentId, diff )
                _findCommonParent( childA, childB )
                _setPositionForHierarchy( node, position, level, doNotUpdate )
                _isVertical()
                _getPositionForHierarchy( node )
                _sortNodeArray()
                getStaticType()
                _getCenterPosition( childNodes )



