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

