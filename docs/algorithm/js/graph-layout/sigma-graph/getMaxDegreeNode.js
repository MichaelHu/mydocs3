sigma.classes.graph.addMethod(
    'getMaxDegreeNode'
    , function( options ){

    var me = this
        , opt = options || {}
        , g = opt.subGraph || me.getSubGraph( opt )
        ;

    return sigma.utils.getMaxDegreeNode( g.nodes, g.edges );        
});
