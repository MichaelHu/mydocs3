sigma.classes.graph.addMethod(
    'depthTravel'
    , function(root, callbacks){

    var me = this 
        , nodes = me.nodesArray
        , edges = me.edgesArray
        ;

    sigma.utils.depthTravel(
        nodes
        , edges
        , root 
        , callbacks
    );

    return me;

}); 

