sigma.utils.widthTravel
    = function(nodes, edges, root, callbacks, excludes) {

    if(!nodes || !nodes.length){
        return;
    }

    var cbs = callbacks || {}
        , edges = edges || []
        , queue = []
        , parentAndSiblingNodes = excludes || {}
        , root = root || nodes[0]
        , node = root
        , children
        , maxLevel = 0
        ;

    node._wt_level = 1;
    maxLevel = Math.max( node._wt_level, maxLevel );
    queue.push(node);
    parentAndSiblingNodes[node.id] = 1;

    while((node = queue.splice(0, 1)).length > 0){
        node = node[0];
        children = getChildren(node); 
        node._wt_children = children;
        queue = queue.concat(children);

        if(typeof cbs['onNode'] == 'function'){
            cbs['onNode'](node);
        }
    }
    root._wt_maxlevel = maxLevel;

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
                if(!parentAndSiblingNodes[childId]){
                    parentAndSiblingNodes[childId] = 1;
                    child = sigma.utils.getNodeById(nodes, childId);
                    child._wt_level = node._wt_level + 1;
                    maxLevel = Math.max( child._wt_level, maxLevel );
                    children.push(child);
                }
            }
        });
        return children;
    }

};
