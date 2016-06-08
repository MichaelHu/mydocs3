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



    var grid = new Grid(40, 40)
        , debug = 0
        , id = 2
        ;

    function _computeTreeRect(tree){
        var nodes = []
            , circuit = tree._circuit
            , rect
            ; 

        if(circuit){
            circuit.forEach(function(node){
                __depthTravel(node);
            });
        }
        else {
            __depthTravel(tree);
        }

        rect = sigma.utils.getNodesRect(
            nodes
            , {
                readPrefix: 'circle_'
                , ignoreNodeSize: 0
            }
        );
        nodes.length = 0;
        tree._tmp_rect = rect; 
        // debug && console.log(rect);
        return rect;

        function __depthTravel(node){
            var children = node._wt_children
                , len = children.length
                ;

            nodes.push(node);
            if(len > 0){
                children.forEach(function(child){
                    __depthTravel(child); 
                });
            }
        }
    }

    function _normalizeTreeRect(tree, unit){
        var rect = tree._tmp_rect
            , spaceBlock = {}
            ;

        spaceBlock.x = rect.x;
        spaceBlock.y = rect.y;
        // `* 1.1` is reserved space for node-collision on boundaris
        spaceBlock.w = Math.ceil(rect.w * 1.1 / unit);
        spaceBlock.h = Math.ceil(rect.h * 1.1 / unit);
        return spaceBlock;
    }

    forest.forEach(function(tree){
        _computeTreeRect(tree);
    });

    forest.sort(function(a, b){
        return b._tmp_rect.w * b._tmp_rect.h
            - a._tmp_rect.w * a._tmp_rect.h
            ;
    });

    forest.forEach(function(tree){
        var spaceBlock = _normalizeTreeRect(tree, radiusStep) 
            ;

        grid.placeBlock(tree.id, spaceBlock, debug);
    });

    var output = grid.grid.map(
            function(row){
                return row.join('  ');
            }
        ).join('\n');

    debug && console.log(output);

    forest.forEach(function(tree){
        var spaceBlock = grid.getBlockRect(tree.id) 
            , hasCircuit = tree._circuit ? 1 : 0
            , dx = spaceBlock.gridPos.x * radiusStep - spaceBlock.x
            , dy = spaceBlock.gridPos.y * radiusStep - spaceBlock.y
            ;

        debug && console.log(tree.id, spaceBlock);

        // clear temporary attribures
        if(tree._tmp_rect){
            delete tree._tmp_rect;
        }

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

sigma.prototype.layoutGrid = function(options){
    sigma.utils.getGridLayout(this.graph.nodes(), options);
    return this;
} 
sigma.prototype.layoutHierarchy2
    = function(options){

    var opt = options || {} 
        , me = this
        , forest = me.graph.getLayoutForest(opt)
        , treeOffsetX = 0
        , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}
        , unit = opt.unit || 1
        , edges = me.graph.edges()
        ;

    sigma.utils.computeLeaves(forest);

    forest.forEach(function(tree){

        var maxLevel = 1
            , nodesOfSameLevel = {}
            , avoidSameLevelTravelThrough = opt.avoidSameLevelTravelThrough
            , delta = opt.avoidSameLevelTravelThroughDelta || 0.2
            ;

        depthTravel(tree, treeOffsetX * unit);
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
                    node.hier_y += 
                        ( node._wt_dy || 0 ) * ( delta || 0.2 ) * unit;
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

            node.hier_x = parentX + unit * leaves / 2;
            node.hier_y = unit * ( level - 1 ); 

            if(children.length > 0){
                children.forEach(function(child){
                    depthTravel(child, parentX + currentX);
                    currentX += unit * child._wt_leaves;
                }); 
            }
        }

    });

    var grid = new Grid(spaceGrid.xSize, spaceGrid.ySize)
        , debug = 0
        ;

    forest.sort(function(a, b){
        return Math.max(b._wt_leaves, b._wt_maxlevel)
            - Math.max(a._wt_leaves, a._wt_maxlevel);
    });

    forest.forEach(function(tree){
        var spaceBlock = sigma.utils.computeHierarchyTreeRect(
                tree
                , tree._hier_offsetx
            )
            ;

        grid.placeBlock(tree.id, spaceBlock, debug);
    });

    var output = grid.grid.map(
            function(row){
                return row.join('  ');
            }
        ).join('\n');

    debug && console.log(output);

    forest.forEach(function(tree){
        var spaceBlock = grid.getBlockRect(tree.id)
            , dx = ( spaceBlock.gridPos.x - spaceBlock.x ) * unit
            , dy = ( spaceBlock.gridPos.y - spaceBlock.y ) * unit
            ;

        _depthTravel(tree);

        function _depthTravel(node){
            var children = node._wt_children
                ;

            node.hier_x += dx;
            node.hier_y += dy;

            if(children.length > 0){
                children.forEach(function(child){
                    _depthTravel(child);
                });
                delete node._wt_children;
            }
        }
    });

    return this;
};  
sigma.prototype.normalizeSophonNodes
    = function(options){

    sigma.utils.normalizeSophonNodes(
        // note: `this.graph.nodesArray` will not work
        this.graph.nodes()
        , options
    );

    return this;
};     

