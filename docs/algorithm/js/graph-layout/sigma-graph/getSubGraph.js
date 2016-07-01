sigma.classes.graph.addMethod(
    'getSubGraph'
    , function(options){
    var opt = options || {}
        , me = this
        , filter = opt.filter
        , nodes = me.nodesArray
        , edges = me.edgesArray
        , _node_ids
        ;

    if('function' == typeof filter){
        nodes = [];
        edges = [];
        me.nodesArray.forEach(function(node){
            if(filter(node)){
                nodes.push(node);
            }
        });
        
        _node_ids = nodes.map(function(node){return node.id;});
        me.edgesArray.forEach(function(edge){
            if(_node_ids.indexOf(edge.source) >= 0 
                && _node_ids.indexOf(edge.target) >= 0){
                edges.push(edge);
            }
        });
    }

    return {
        nodes: nodes
        , edges: edges
    };
});
