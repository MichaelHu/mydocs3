sigma.utils.adjustSiblingsOrder
    = function(parentNode, edges) {

    if(!parentNode || !parentNode._wt_children){
        console.log(arguments.callee
            , 'parentNode is null or parentNode._wt_children is not existed');
        return;
    }

    var nodes = parentNode._wt_children
        , edges = edges || []
        , visitedNodes = {}
        , node
        , index
        , len = nodes.length
        , j
        , adjacentNodes
        , flagLeft
        , flagRight
        ;

    while((index = _hasMoreIndex()) >= 0){
        node = nodes[index];
        visitedNodes[node.id] = 1;
        adjacentNodes = _getAdjacentNodes(node, nodes);
        flagLeft = 0;
        flagRight = 0;
        if(adjacentNodes && adjacentNodes.length){

            if(index>0 && adjacentNodes.indexOf(nodes[index-1]) < 0){
                for(j=index-1; j>=0; j--){
                    if(adjacentNodes.indexOf(nodes[j]) >= 0){
                        nodes.splice(index, 1);
                        nodes.splice(j, 0, node);
                        flagLeft = 1;
                        break;
                    }
                }
            } 

            if(flagLeft){
                continue;
            }

            if(index<len - 1 && adjacentNodes.indexOf(nodes[index+1]) < 0){
                for(j=index+1; j<len; j++){
                    if(adjacentNodes.indexOf(nodes[j]) >= 0){
                        nodes.splice(j-1, 0, node);
                        nodes.splice(index, 1);
                        break;
                    }
                }
            } 

        }
    }

    function _hasMoreIndex(){
        for(var i=0; i<len; i++){
            var _node = nodes[i];
            if(!visitedNodes[_node.id]){
                return i;            
            }
        }
        return -1;
    }

    function _getAdjacentNodes(node) {
        var retNodes = [];
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
    }

};   
