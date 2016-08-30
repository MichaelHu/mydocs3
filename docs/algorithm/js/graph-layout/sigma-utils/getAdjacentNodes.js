sigma.utils.getAdjacentNodes
    = function( node, nodes, edges ) {
    var retNodes = [];

    if ( !node || !nodes || !edges ) {
        return retNodes;
    }

    edges.forEach(function(edge){
        var adjNodeId, adjNode;

        if(edge.source == node.id){
            adjNodeId = edge.target;
        }

        if(edge.target == node.id){
            adjNodeId = edge.source;
        }

        if(!adjNodeId){
            return;
        }

        if(adjNodeId != node.id){
            if(nodes.map(function(node){return node.id;})
                .indexOf(adjNodeId) >= 0){
                adjNode = sigma.utils.getNodeById(nodes, adjNodeId);
                retNodes.push(adjNode);
            }
        }
    });

    return retNodes;
};
