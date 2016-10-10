sigma.utils.layoutTreesByGrid
    = function(forest, options){

    var opt = options || {}
        , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}
        , grid = new Grid(spaceGrid.xSize, spaceGrid.ySize)
        , unit = opt.optimalDistance || 100 
        , prefix = opt.readPrefix || opt.writePrefix || ''
        , debug = opt.debug || 0
        ;


    forest.forEach(function(tree){
        _computeTreeRect(tree);
    });

    // sort by tree's area in decreasing order
    forest.sort(function(a, b){
        return b._tmp_rect.w * b._tmp_rect.h
            - a._tmp_rect.w * a._tmp_rect.h
            ;
    });

    forest.forEach(function(tree){
        var spaceBlock = _normalizeTreeRect(tree, unit) 
            ;

        grid.placeBlock(tree.id, spaceBlock, debug);
    });

    forest.forEach(function(tree){
        var spaceBlock = grid.getBlockRect(tree.id) 
            , hasCircuit = tree._circuit ? 1 : 0
            , dx = spaceBlock.gridPos.x * unit - spaceBlock.x
            , dy = spaceBlock.gridPos.y * unit - spaceBlock.y
            ;

        debug && console.log(tree.id, spaceBlock);

        // clear temporary attribures
        if(tree._tmp_rect){
            delete tree._tmp_rect;
        }

        // if there is a circuit
        if(tree._circuit){
            tree._circuit.forEach(function(node){
                __depthTravel(node);
            });
            delete tree._circuit;
        }
        else {
            __depthTravel(tree);
        }

        function __depthTravel(node){
            var children = node._wt_children
                ;

            node[prefix + 'x'] += dx;
            node[prefix + 'y'] += dy;

            if(children.length > 0){
                children.forEach(function(child){
                    __depthTravel(child);
                }); 
                // delete node._wt_children;
            }
        }
    });


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
                readPrefix: prefix
                , ignoreNodeSize: 0
            }
        );
        tree._tmp_rect = rect; 
        tree._node_count = nodes.length;
        nodes.length = 0;
        return rect;

        function __depthTravel(node){
            var children = node._wt_children
                , len = children.length
                ;

            if ( !node._isdummy ) {
                nodes.push(node);
            }
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
            , extendRatio = 1
            ;

        spaceBlock.x = rect.x;
        spaceBlock.y = rect.y;
        if(tree._node_count > 1){
            // extendRatio = 1.2;
            extendRatio = 1;
        }

        // `extendRatio` is for reserved space for node-collision on boundaris
        spaceBlock.w = Math.ceil(rect.w * extendRatio / unit);
        spaceBlock.h = Math.ceil(rect.h * extendRatio / unit);

        if(spaceBlock.w * unit - rect.w < unit
            && tree._node_count > 1){
            spaceBlock.w++;
        }
        if(spaceBlock.h * unit - rect.h < unit
            && tree._node_count > 1){
            spaceBlock.h++;
        }

        return spaceBlock;
    }


};     
