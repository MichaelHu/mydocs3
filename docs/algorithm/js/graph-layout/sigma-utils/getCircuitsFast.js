sigma.utils.getCircuitsFast
    = function(nodes, edges, root) {

    if(!nodes || !nodes.length){
        return;
    }

    var me = this
        , root = root || nodes[0]
        , visitedNodes = {}
        , children
        , path = []
        , circuits = []
        ;

    edges = edges || [];

    _depthTravel(root);
    return circuits;

    function _depthTravel(node){
        if(visitedNodes[node.id]){
            return;
        }
        visitedNodes[node.id] = 1;
        path.push(node);

        var children = getChildren(node); 
        if(children.length > 0){
            children.forEach(function(child){
                _depthTravel(child);
            });
        }
        path.pop(node);
    }

    function getChildren(node){
        var id = node.id
            , children = []
            , childId
            , child
            ;
        edges.forEach(function(edge){
            if(
                edge.source == id
                || edge.target == id
              ){
                childId = edge.source;
                if(childId == id){
                    childId = edge.target;
                }

                if(childId == root.id && path.length > 2){
                    circuits.push(path.slice());  
                }                        

                if(!visitedNodes[childId]){
                    child = sigma.utils.getNodeById(nodes, childId);
                    children.push(child);
                }

            }
        });
        return children;
    }

};    

