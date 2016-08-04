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
