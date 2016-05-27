sigma.classes.graph.addMethod(
    'getLayoutForest'
    , function(options){
    var opt = options || {}
        , me = this
        , nodes = me.nodesArray
        , edges = me.edgesArray
        ;

    return sigma.utils.getLayoutForest(nodes, edges, opt); 
});    

