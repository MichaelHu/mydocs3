sigma.utils.getCircleForest
    = function(nodes, edges, options){

    var opt = options || {} 
        , circuits
        , circuit
        , tree = opt.root 
            || ( opt.makeMaxDegreeNodeRoot 
                ? sigma.utils.getMaxDegreeNode(nodes, edges) : null )
            || nodes[0]
        , excludes
        , nodesVisited = {}
        , forest = []
        ;

    edges = edges || [];

    do {
        if ( opt.useComplicatedLoop ) {
            circuits = sigma.utils.getComplicatedLoops( nodes, edges, { root: tree } )
                        .complicated;
        }
        else {
            circuits = sigma.utils.getCircuits(nodes, edges, tree);
        }

        excludes = {};

        if(circuits.length > 0){
            circuits.sort(function(a, b){
                return b.length - a.length;
            });

            // the longest circuit
            tree._circuit = circuit = circuits[0]; 

            circuit.forEach(function(_node){
                excludes[_node.id] = 1;
            });

            circuit.forEach(function(_node){
                sigma.utils.widthTravel(
                    nodes
                    , edges
                    , _node
                    , {
                        onNode: function(__node){
                            nodesVisited[__node.id] = 1;
                        }
                    }
                    , excludes
                );
            });
        }
        else {
            sigma.utils.widthTravel(
                nodes
                , edges
                , tree
                , {
                    onNode: function(__node){
                        nodesVisited[__node.id] = 1;
                    }
                }
            );
        }

        forest.push(tree);

    } while((tree = hasMore()));

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

