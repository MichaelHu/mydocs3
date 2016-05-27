sigma.utils.computeLeaves
    = function(forest){

    forest.forEach(function(tree){

        // if there is a circuit
        if(tree._circuit){
            tree._circuit.forEach(function(node){
                depthTravel(node);
            });
        }
        else {
            depthTravel(tree);

        }

        function depthTravel(node){
            var children = node._wt_children
                , _leaves
                , leaves = 0
                ;
            if(children.length == 0){
                _leaves = [1];
            }
            else {
                _leaves = children.map(function(node){
                    return depthTravel(node);
                }); 
            }

            _leaves.forEach(function(item){
                leaves += item;
            });

            return ( node._wt_leaves = leaves );
        }

    });

}   

