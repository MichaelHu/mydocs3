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

