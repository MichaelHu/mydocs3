sigma.classes.graph.addMethod(
    'getCircuits'
    , function(root){

    var me = this
        , nodes = me.nodesArray
        , edges = me.edgesArray
        , root = root || nodes[0]
        ;

    return sigma.utils.getCircuits(nodes, edges, root);

});  

