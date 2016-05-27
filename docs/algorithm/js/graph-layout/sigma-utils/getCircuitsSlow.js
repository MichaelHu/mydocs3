sigma.utils.getCircuitsSlow
    = function(nodes, edges, root) {

    if(!nodes || !nodes.length){
        return;
    }

    var me = this
        , root = root || nodes[0]
        , children
        , path = []
        , circuits = []
        , isStop = 0
        ;

    edges = edges || [];

    root._dt_level = 1;
    _depthTravel(root);
    return circuits;

    function _depthTravel(node){
        if(isStop){
            return;
        }

        if(!isNodeInPath(node)){
            path.push(node);

            var children = getChildren(node); 
            if(children.length > 0){
                children.forEach(function(child){
                    _depthTravel(child);
                });
            }

            path.pop(node);
        }
        else if(node.id == root.id
            && path.length > 2){
            circuits.push(path.slice());  
            if(circuits.length >= 20){
                isStop = 1;
            }
        }
    }

    function isNodeInPath(node){
        return path.map(function(_node){return _node.id;})
            .indexOf(node.id)
            != -1
            ;
    }

    function getChildren(node){
        var id = node.id
            , children = []
            , childId
            , child
            ;

        if(node._tmp_children){
            return node._tmp_children; 
        }

        edges.forEach(function(edge){
            if(
                edge.source == id
                || edge.target == id
              ){
                childId = edge.source;
                if(childId == id){
                    childId = edge.target;
                }

                child = sigma.utils.getNodeById(nodes, childId);
                children.push(child);
            }
        });

        return (node._tmp_children = children);
    }

};
