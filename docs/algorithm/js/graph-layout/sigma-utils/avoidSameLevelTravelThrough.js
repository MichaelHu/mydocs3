sigma.utils.avoidSameLevelTravelThrough
    = function(nodesOfSameLevel, edges) {

    if(!nodesOfSameLevel){
        console.log(arguments.callee
            , 'nodesOfSameLevel is null');
        return;
    }

    var nodes = nodesOfSameLevel 
        , edges = edges || []
        , unit = unit || 1
        , node, fromNode, toNode
        , len = nodes.length
        , i, j, k
        ;

    nodes.forEach(function(node){
        delete node._wt_dy;
    });

    for(i=0; i<len; i++){
        fromNode = nodes[i];
        for(j=i+2; j<len; j++){
            toNode = nodes[j];
            if(_isConnected(fromNode, toNode)){
                for(k=i+1; k<j; k++){
                    node = nodes[k];     
                    // adjust once
                    if(node._wt_dy) {
                        continue;
                    }
                    node._wt_dy = ( k % 2 == 0 ? -1 : 1 );
                }
            }
        }
    } 

    function _isConnected(fromNode, toNode){
        for(var i=0; i<edges.length; i++){
            var edge = edges[i];
            if(edge.source == fromNode.id
                    && edge.target == toNode.id
                || edge.source == toNode.id
                    && edge.target == fromNode.id) {
                return 1;
            } 
        }
        return 0;
    }

};
