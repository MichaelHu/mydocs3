sigma.utils.depthTravel
    = function(nodes, edges, root, callbacks) {

    if(!nodes || !nodes.length){
        return;
    }

    var cbs = callbacks || {}
        , visitedNodes = {}
        , node = root || nodes[0]
        , children
        ;

    edges = edges || [];

    node._dt_level = 1;
    _depthTravel(node);

    function _depthTravel(node){
        if(visitedNodes[node.id]){
            return;
        }
        visitedNodes[node.id] = 1;

        if(typeof cbs['onNode'] == 'function'){
            cbs['onNode'](node);
        }

        var children = getChildren(node); 
        if(children.length > 0){
            children.forEach(function(child){
                _depthTravel(child);
            });
        }
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
                if(!visitedNodes[childId]){
                    child = sigma.utils.getNodeById(nodes, childId);
                    child._dt_level = node._dt_level + 1;
                    children.push(child);
                }
            }
        });
        return children;
    }

};

