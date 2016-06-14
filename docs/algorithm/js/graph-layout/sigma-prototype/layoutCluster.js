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
