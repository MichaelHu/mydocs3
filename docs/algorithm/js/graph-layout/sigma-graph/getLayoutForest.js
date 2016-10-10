sigma.classes.graph.addMethod(
    'getLayoutForest'
    , function(options){
    var me = this
        , opt = options || {}
        , g = opt.subGraph || me.getSubGraph(options)
        ;

    return sigma.utils.getLayoutForest(
        g.nodes
        , g.edges
        , options
    ); 
});   
