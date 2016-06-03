sigma.classes.graph.addMethod(
    'widthTravel'
    , function(root, callbacks, excludes){

    var me = this
        , nodes = me.nodesArray
        , edges = me.edgesArray
        , root = root || notes[0]
        , cbs = callbacks || {}
        ;

    sigma.utils.widthTravel(
        nodes     
        , edges
        , root
        , cbs
        , excludes
    );

    return me;

});     

