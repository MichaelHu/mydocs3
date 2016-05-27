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

