sigma.prototype.layoutGrid = function(options){
    var me = this
        , g = me.graph.getSubGraph(options)
        ;

    sigma.utils.getGridLayout(
        g.nodes 
        , options
    );

    return me;
}  
