sigma.prototype.alignCenter = function(options){
    var opt = options || {} 
        , me = this
        , rect = sigma.utils.getNodesRect(me.graph.nodes(), opt) 
        , cameras = me.cameras
        , camera
        , renderer
        , readPrefix = opt.readPrefix || ''
        , writePrefix = opt.writePrefix || ''
        , ratio
        , height
        , width
        , i
        ;

    for(i in cameras){
        camera = cameras[i];
        renderer = me.renderersPerCamera[camera.id][0];
        ratio = camera.ratio;
        height = renderer.height;
        width = renderer.width;

        // wholeview mode by setting an appropriate camera ratio
        if(opt.wholeView){
            ratio = Math.max(rect.w / width, rect.h / height) * 1.3;
        }
        // another wholeview mode by rescaling coordinates 
        else if(opt.rescaleToViewport){
            sigma.middlewares.rescale.call(
                me
                , readPrefix
                , writePrefix
                , {
                    width: width
                    , height: height
                    , autoRescale: ['nodePosition']
                    , scalingMode: 'inside'
                    , rescaleIgnoreSize: 1
                    , sideMargin: Math.min(rect.h, rect.w) * 0.2 
                }
            );
            ratio = 1;
        }

        camera.goTo({
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
            // prevents `ratio = 0`
            , ratio: ratio || 1
        });
    }

    return me;
} 

sigma.prototype.applyLayoutInstantly
    = function(options){
    sigma.utils.applyLayoutInstantly(
        this.graph.nodes()
        , options
    );
    return this;
};
sigma.prototype.incLayoutGrid = function(
    newNodes, selectedNodes, options) {
    var me = this
        , nodes = me.graph.nodes()
        ;

    sigma.utils.incLayoutGrid(
        nodes
        , newNodes
        , selectedNodes
        , options
    );

    return me;
};
sigma.prototype.initializeLayout
    = function( options ) {
    var me = this
        , opt = options || {}
        , tmpFields = [
            '_wt_children'
            , '_wt_leaves'
            , '_wt_maxlevel'
            , '_wt_level'
            , '_wt_dy'

            , 'hier_x'
            , 'hier_y'
            , 'yfh_x'
            , 'yfh_y'
            , 'circle_x'
            , 'circle_y'
            , 'grid_x'
            , 'grid_y'
        ]
        ;

    me.graph.nodes().forEach( function( node ) {
        tmpFields.forEach ( function( field ) {
            delete node[ field ];
        } );
    } );

    return me;
};
sigma.prototype.layoutCircle
    = function(options){

    var opt = options || {}
        , forest = this.graph.getCircleForest(opt)
        , treeOffsetX = 0
        , PI = Math.PI
        , radius = opt.radius || 1 
        , radiusStep = radius 
        , initialAngleStep = 15 * PI / 180
        , angleStep = initialAngleStep
        // for tendency
        , angleOffset = 20 * PI / 180
        ;

    sigma.utils.computeLeaves(forest);

    var a = forest.map(function(tree){
        return tree.id 
    }).join(', ');
    // console.log(a);

    forest.forEach(function(tree){
        var circuit
            , angle = PI / 2 
            , maxLevel = 1
            , hasCircuit = tree._circuit ? 1 : 0
            ; 

        // if there is a circuit, layout it with a circle
        if(hasCircuit){
            circuit = tree._circuit;     
            angleStep = 2 * PI / circuit.length;
            circuit.forEach(function(node){
                depthTravel(node, angle, radius);
                angle += angleStep; 
            });
        }
        else {
            depthTravel(tree, angle, 0);
        }
        tree._wt_maxlevel = maxLevel;

        // depthTravel(tree, treeOffsetX);
        // treeOffsetX += tree._wt_leaves;

        function depthTravel(node, angle, radius, tendency){
            var children = node._wt_children
                , leaves = node._wt_leaves
                , level = node._wt_level
                , len = children.length
                , circleX
                , circleY
                , angleStep = initialAngleStep / level
                , angleStart = angle - len * angleStep / 2
                , _angle = angleStart + angleStep / 2
                , tendency = tendency || 1
                ;

            if(level > maxLevel) {
                maxLevel = level;
            }

            circleX = radius * Math.cos(angle);
            circleY = radius * Math.sin(angle); 

            node.circle_x = circleX;
            node.circle_y = circleY;

            // console.log(radius, angle, circleX, circleY, angleStep);

            if(len > 0){

                if(!hasCircuit && level == 1 && opt.makeRootCenter){
                    angleStep = 2 * PI / len;  
                }

                if(len == 1) {
                    // _angle = angleStart + ( tendency ? 1 : -1 ) * level * angleOffset;
                }
                children.forEach(function(child){
                    depthTravel(child, _angle, radius + radiusStep, 1 - tendency);
                    _angle += angleStep;
                }); 
            }
        }

    });


    var grid = new Grid(40, 40)
        , debug = 0
        , id = 2
        ;

    forest.sort(function(a, b){
        return b._wt_maxlevel - a._wt_maxlevel;
    });

    forest.forEach(function(tree){
        var spaceBlock = sigma.utils.computeCircleTreeRect(tree)
            ;

        grid.placeBlock(tree.id, spaceBlock, debug);
    });

    var output = grid.grid.map(
            function(row){
                return row.join('  ');
            }
        ).join('\n');

    // console.log(output);

    forest.forEach(function(tree){
        var spaceBlock = grid.getBlockRect(tree.id) 
            , hasCircuit = tree._circuit ? 1 : 0
            , dx = ( 
                    spaceBlock.gridPos.x 
                    + ( hasCircuit ? spaceBlock.w / 2 : 0 ) 
                ) * radius
            , dy = ( 
                    spaceBlock.gridPos.y 
                    + ( hasCircuit ? spaceBlock.h / 2 : 0 ) 
                ) * radius
            ;

        // if there is a circuit
        if(tree._circuit){
            tree._circuit.forEach(function(node){
                depthTravel(node);
            });
            delete tree._circuit;
        }
        else {
            depthTravel(tree);
        }

        function depthTravel(node){
            var children = node._wt_children
                ;

            node.circle_x += dx;
            node.circle_y += dy;

            if(children.length > 0){
                children.forEach(function(child){
                    depthTravel(child);
                }); 
                delete node._wt_children;
            }
        }
    });

    return this;
}; 

sigma.prototype.layoutCircle2
    = function(options){

    var opt = options || {}
        , forest = this.graph.getCircleForest(opt)
        , treeOffsetX = 0
        , PI = Math.PI
        // `nodeSize` is not exactly `node.size`
        , nodeSize = opt.nodeSize || 0.2
        , radiusStep = opt.radiusStep || 2 
        , initialAngleRange = opt.initialAngleRange || PI 
        , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}
        , radius
        ;

    sigma.utils.computeLeaves(forest);

    var a = forest.map(function(tree){
        return tree.id 
    }).join(', ');
    // console.log(a);

    forest.forEach(function(tree){
        var circuit
            , angle = PI / 2 
            , maxLevel = 1
            , hasCircuit = tree._circuit ? 1 : 0
            , angleStep
            , config
            ; 

        // if there is a circuit, layout it with a circle
        if(hasCircuit){
            circuit = tree._circuit;     
            config = _getAngleStepAndRadius(
                2 * PI // layout the circuit with a circle
                , nodeSize
                , circuit.length 
                , radiusStep
                , 0
            );
            angleStep = config.angleStep;
            radius = config.radius; 
            circuit.forEach(function(node){
                depthTravel(node, angle, radius);
                angle += angleStep; 
            });
        }
        else {
            depthTravel(tree, angle, 0);
        }
        tree._wt_maxlevel = maxLevel;

        function depthTravel(node, angle, radius){
            var children = node._wt_children
                , leaves = node._wt_leaves
                , level = node._wt_level
                , len = children.length
                , circleX
                , circleY
                , angleRange = initialAngleRange / level
                , config = _getAngleStepAndRadius(
                    angleRange
                    , nodeSize
                    , len || 1
                    , radiusStep
                    , radius
                )
                , _angleStep = config.angleStep 
                , _radius = config.radius
                , angleStart = angle - angleRange / 2
                , _angle = angleStart + _angleStep / 2
                ;

            if(level > maxLevel) {
                maxLevel = level;
            }

            circleX = radius * Math.cos(angle);
            circleY = radius * Math.sin(angle); 

            node.circle_x = circleX;
            node.circle_y = circleY;

            // console.log(radius, angle, circleX, circleY, _angleStep);

            if(len > 0){

                if(!hasCircuit && level == 1 && opt.makeRootCenter){
                    _angleStep = 2 * PI / len;  
                }

                children.forEach(function(child){
                    depthTravel(child, _angle, _radius);
                    _angle += _angleStep;
                }); 
            }
        }

    });

    function _getAngleStepAndRadius(
        angleRange, nodeSize, nodeCount, radiusStep, radiusStart){

        var radius
            , angleStep
            , i = 0
            ;

        while(1){
            i++;
            radius = radiusStart + i * radiusStep;
            if(radius * angleRange / ( nodeSize * 3 ) >= nodeCount){
                break;
            } 
        }
        angleStep = angleRange / nodeCount;
        return {
            radius: radius
            , angleStep: angleStep
        };
    }


    sigma.utils.layoutTreesByGrid(
        forest
        , {
            spaceGrid: spaceGrid
            , optimalDistance: radiusStep
            , readPrefix: 'circle_'
        }
    );

    return this;

}; 
sigma.prototype.layoutCluster
    = function(options){

    var opt = options || {} 
        , me = this
        , distanceCoefficient = opt.distanceCoefficient || 1.5 
        , forest = me.graph.getLayoutForest(opt)
        , edges = me.graph.edges()
        ;

    forest.forEach(function(tree){

        // temp
        tree.cluster_x = tree.x;
        tree.cluster_y = tree.y;

        depthTravel(tree);

        function depthTravel(node, angleInput){
            var children = node._wt_children
                , angleInput = angleInput || Math.PI * 3 / 2
                , nonLeafChildren
                , clusterConfig
                , ai
                , distance
                ;

            clusterConfig = sigma.utils.clustersNodes(
                children
                , {
                    angleInput: angleInput
                    , root: node
                    , readPrefix: 'cluster_'
                    , writePrefix: 'cluster_'
                    , angleRange: opt.angleRange 
                        || _getAngleRange(children.length) 
                        || Math.PI / 2
                    , radiusStep: opt.radiusStep
                    , randomRadius: opt.randomRadius || 0
                    , centerFirst: 1
                }
            );

            // children.forEach(function(child){
            //     console.log(child.cluster_x + ', ' + child.cluster_y);
            // });

            nonLeafChildren = _getNonLeafChildren(children);

            if(nonLeafChildren.length > 0){
                nonLeafChildren.forEach(function(child){
                    distance = _getDistance(clusterConfig, child);
                    _stretchNode(child, node, distance);
                    ai = sigma.utils.getAngleInput(
                        node
                        , child
                        , {
                            readPrefix: 'cluster_'
                        }
                    );
                    depthTravel(child, ai);
                }); 
            }
        }

    });

    function _getAngleRange(totalNum){
        var ret = 1;
        if(totalNum <= 2){
            ret = 0.5;
        }
        else if(totalNum <= 5){
            ret = 1;
        }
        else if(totalNum <= 8){
            ret = 1.5;
        }
        else {
            ret = 2;
        }
        return Math.PI * ret;
    }

    function _getDistance(clusterConfig, node){
        var c = clusterConfig
            , cl = c.clusterLevels
            , rs = c.radiusStep
            , distance
            , childrenCount = cl.numOfNodes
            , grandChildrenCount = node._wt_children.length
            , childrenRadiius
            , grandChildrenRadius
            ;

        childrenRadius = rs * cl;
        if(c.randomRadius){
            childrenRadius += radiusStep;
        }
        grandChildrenRadius = _getRadius(grandChildrenCount, rs); 

        distance = ( childrenRadius + grandChildrenRadius ) 
            * distanceCoefficient;

        return distance;
    }

    function _getRadius(nodesCount, radiusStep){
        var numOfFirstLevel = sigma.utils.getNumOfFirstClusterLevel(
                nodesCount
                , 15
                , 1
            )
            , clusterLevels = sigma.utils.getClusterLevels(
                numOfFirstLevel
                , nodesCount
            ) 
            ;

        return radiusStep * clusterLevels;
    }

    function _stretchNode(node, fromNode, distance){
        var d = Math.sqrt(
                Math.pow(node.cluster_x - fromNode.cluster_x, 2)
                + Math.pow(node.cluster_y - fromNode.cluster_y, 2)
            )
            , scale = distance / d
            , newX, newY
            ;

        newX = fromNode.cluster_x 
            + scale * ( node.cluster_x - fromNode.cluster_x );
        newY = fromNode.cluster_y 
            + scale * ( node.cluster_y - fromNode.cluster_y );

        node.cluster_x = newX;
        node.cluster_y = newY;
    }

    function _getNonLeafChildren(children){
        var ret = [];
        children.forEach(function(child){
            if(child._wt_children
                && child._wt_children.length > 0){
                ret.push(child);
            }
        });
        return ret;
    }

    return this;
};  
sigma.prototype.layoutGrid = function(options){
    var me = this
        , g = me.graph.getSubGraph(options)
        ;

    sigma.utils.getGridLayout(
        g.nodes 
        , options
    );

    return me;
}  
sigma.prototype.layoutHierarchy2
    = function(options){

    var opt = options || {} 
        , me = this
        , forest = me.graph.getLayoutForest(opt)
        , treeOffsetX = 0
        , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}

        // compatible with old versions
        , unit = opt.unit || opt.xUnit || opt.yUnit || 1

        , xUnit = opt.xUnit || unit
        , yUnit = opt.yUnit || unit
        , gridUnit = Math.min( xUnit, yUnit )
        , edges = me.graph.getSubGraph(options).edges
        , layoutHorizontal = opt.layoutHorizontal || 0
        ;

    sigma.utils.computeLeaves(forest);

    // if `heightLimit`, computes yUnit again
    if ( opt.heightLimit 
        && 1 == forest.length 
        && forest[ 0 ]._wt_maxlevel
        ) {
        /**
         * yUnit = opt.heightLimit / ( forest[ 0 ]._wt_maxlevel - 1 );
         * modified for edge collapsing
         */
        yUnit = opt.heightLimit / forest[ 0 ]._wt_maxlevel;
    }

    forest.forEach(function(tree){

        var maxLevel = 1
            , nodesOfSameLevel = {}
            , avoidSameLevelTravelThrough = opt.avoidSameLevelTravelThrough
            , delta = opt.avoidSameLevelTravelThroughDelta || 0.2
            ;

        depthTravel(tree, treeOffsetX * xUnit);
        tree._wt_maxlevel = maxLevel;
        tree._hier_offsetx = treeOffsetX;
        treeOffsetX += tree._wt_leaves;
        if(avoidSameLevelTravelThrough){
            for(var i in nodesOfSameLevel){
                sigma.utils.avoidSameLevelTravelThrough(
                    nodesOfSameLevel[i]
                    , edges
                );
                nodesOfSameLevel[i].forEach(function(node){
                    if(layoutHorizontal){
                        node.hier_x += 
                            ( node._wt_dy || 0 ) * ( delta || 0.2 ) * yUnit;
                    }
                    else {
                        node.hier_y += 
                            ( node._wt_dy || 0 ) * ( delta || 0.2 ) * yUnit;
                    }
                    delete node._wt_dy;
                });
            }
        }

        function depthTravel(node, parentX){
            var children = node._wt_children
                , leaves = node._wt_leaves
                , level = node._wt_level
                , parentX = parentX || 0
                , currentX = 0
                ;

            if(opt.adjustSiblingsOrder){
                sigma.utils.adjustSiblingsOrder(node, edges);
            }

            if(avoidSameLevelTravelThrough){
                ( nodesOfSameLevel[level] 
                    = nodesOfSameLevel[level] || [] )
                    .push(node);
            }

            if(level > maxLevel) {
                maxLevel = level;
            }

            if(layoutHorizontal){
                node.hier_y = parentX + xUnit * leaves / 2;
                node.hier_x = yUnit * ( level - 1 ); 
            }
            else {
                node.hier_x = parentX + xUnit * leaves / 2;
                node.hier_y = yUnit * ( level - 1 ); 
            }

            if(children.length > 0){
                children.forEach(function(child){
                    depthTravel(child, parentX + currentX);
                    currentX += xUnit * child._wt_leaves;
                }); 
            }
        }

    });

    sigma.utils.layoutTreesByGrid( 
        forest
        , {
            spaceGrid: spaceGrid
            , optimalDistance: gridUnit
            , readPrefix: 'hier_'
        } 
    ); 

    return this;
};  
( function() {

function isLinelikeLayout(nodes, options){
    var nodes = nodes || []
        , opt = options || {}
        , rect = sigma.utils.getNodesRect(nodes, opt)
        , threshold = opt.threshold || 20
        , debugShow = opt.debugShow
        ;

    if(nodes.length <= 2){
        return 0;
    }

    if('function' == typeof debugShow){
        debugShow('rect w,h', rect.w, rect.h);
    }

    if(rect.w / rect.h > threshold
        || rect.h / rect.w > threshold){
        return 1;
    }
    return 0;
}  

function hasWhollyOverlayedNodes(nodes, options) {
    var opt = options || {}
        , nodes = nodes || []
        , prefix = opt.readPrefix || ''
        , len = nodes.length
        , i, j, n1, n2
        ;

    for(i=0; i<len; i++){
        n1 = nodes[i];
        for(j=i+1; j<len; j++){
            n2 = nodes[j]; 
            if(n1[prefix + 'x'] == n2[prefix + 'x']
                && n1[prefix + 'y'] == n2[prefix + 'y']){
                return true;
            }
        }
    } 
    return false;
} 

function hasInvalidValues(nodes, options) {
    var opt = options || {}
        , nodes = nodes || []
        , prefix = opt.readPrefix || ''
        , len = nodes.length
        , i, n1
        ;

    for(i=0; i<len; i++){
        n1 = nodes[i];
        if(n1[prefix + 'x'] !== +n1[prefix + 'x']
            || n1[prefix + 'y'] !== +n1[prefix + 'y']){
            return true;
        }
    } 
    return false;
} 

sigma.prototype.layoutYifanHu
    = function(options){
    var opt = options || {}
        , me = this
        , subGraph = me.graph.getSubGraph(opt)
        , nodes = subGraph.nodes
        , edges = subGraph.edges
        , newOpt = Object.assign({}, opt, {readPrefix: ''})
        ;

    if(isLinelikeLayout(nodes, {
            threshold: 10
        })
        || hasWhollyOverlayedNodes(nodes)
        || hasInvalidValues(nodes)
        ){
        // note: `opt.readPrefix` must be ''
        me.layoutGrid(newOpt)
            .applyLayoutInstantly({
                readPrefix: 'grid_'
                , clearOld: 1
            });
    }

    sigma.utils.layoutYifanHu(nodes, edges, opt);
    return me;
};  



} )();
sigma.prototype.normalizeSophonNodes
    = function(options){

    var opt = options || {}
        , me = this
        , filter = opt.filter
        , g = me.graph.getSubGraph(opt)
        , oldSubCenter
        , oldRect
        ;

    if('function' == typeof filter && !opt.center){
        oldRect = sigma.utils.getNodesRect(g.nodes);
        oldSubCenter = {
            x: oldRect.x + oldRect.w / 2
            , y: oldRect.y + oldRect.h / 2
        };
        opt.center = oldSubCenter;
    }

    sigma.utils.normalizeSophonNodes(
        g.nodes
        , opt
    );

    return me;
}; 
sigma.prototype.prepareAnimation
    = function(options){
    var me = this
        , opt = options || {}
        , prefix = opt.readPrefix || ''
        ;

    me.graph.nodes().forEach(function(node){
        if('undefined' == typeof node[prefix + 'x']){
            node[prefix + 'x'] = node.x;
            node[prefix + 'y'] = node.y;
        }
    });

    return me;
};   
