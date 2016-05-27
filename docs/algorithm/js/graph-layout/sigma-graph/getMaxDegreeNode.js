sigma.classes.graph.addMethod(
    'getMaxDegreeNode'
    , function(){

    var nodes = nodes || this.nodesArray
        , edges = edges || this.edgesArray
        , me = this
        ;

    return sigma.utils.getMaxDegreeNode(nodes, edges);        
});  

