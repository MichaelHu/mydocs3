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
