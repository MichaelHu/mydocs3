sigma.utils.getLayoutForest
    = function(nodes, edges, options){

    var opt = options || {}
        , nodesVisited = {}
        , forest = []
        , node = opt.dummyRoot 
            || opt.root 
            || ( 
                opt.makeMaxDegreeNodeRoot
                    ? sigma.utils.getMaxDegreeNode( nodes.slice( 0 ), edges.slice( 0 ) )
                    : nodes[0]
            )
        , excludes = opt.excludes
        ;

    do {
        sigma.utils.widthTravel(
            nodes
            , edges
            , node
            , {
                onNode: function(node){
                    nodesVisited[node.id] = true;
                    if ( 'function' == typeof opt.childrenSort ) {
                        node._wt_children.sort( opt.childrenSort );
                    }
                }
            } 
            , excludes
        )
        forest.push(node);
        ;
    } while((node = hasMore()));

    function hasMore(){
        for(var i=0; i<nodes.length; i++){
            if(!nodesVisited[nodes[i].id]){
                return nodes[i];
            }
        }
        return 0;
    }

    return forest;
};
