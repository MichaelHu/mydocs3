sigma.classes.graph.addMethod(
    'getCircleForest'
    , function(options){

    var me = this
        , nodes = me.nodesArray
        , edges = me.edgesArray
        ;

    return sigma.utils.getCircleForest(nodes, edges, options);
});    

