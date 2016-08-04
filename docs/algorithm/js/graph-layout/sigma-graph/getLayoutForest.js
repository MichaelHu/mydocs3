sigma.classes.graph.addMethod(
    'getLayoutForest'
    , function(options){
    var me = this
        , g = me.getSubGraph(options)
        ;

    return sigma.utils.getLayoutForest(
        g.nodes
        , g.edges
        , options
    ); 
});
