sigma.utils.getCircuits
    = function(nodes, edges, root) {

    var nLen = nodes.length || 1
        , eLen = edges.length || 1
        ;

    if(eLen <= 50 && eLen / nLen <= 1.25){
        return sigma.utils.getCircuitsSlow(nodes, edges, root); 
    }
    else { 
        return sigma.utils.getCircuitsFast(nodes, edges, root); 
    }

};

