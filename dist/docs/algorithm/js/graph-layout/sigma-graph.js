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

sigma.classes.graph.addMethod(
    'getCircleForest'
    , function(options){

    var me = this
        , nodes = me.nodesArray
        , edges = me.edgesArray
        ;

    return sigma.utils.getCircleForest(nodes, edges, options);
});    

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

sigma.classes.graph.addMethod(
    'getMaxDegreeNode'
    , function(){

    var nodes = nodes || this.nodesArray
        , edges = edges || this.edgesArray
        , me = this
        ;

    return sigma.utils.getMaxDegreeNode(nodes, edges);        
});  

sigma.classes.graph.addMethod(
    'sortByNodesDegree'
    , function(reverse){
    var nodes = this.nodesArray
        , me = this
        ;

    nodes.forEach(function(node){
        node.degree = me.degree(node.id);
    });
    nodes.sort(function(a, b){
        return reverse 
            ? b.degree - a.degree
            : a.degree - b.degree;
    });

    return this;
}); 

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

