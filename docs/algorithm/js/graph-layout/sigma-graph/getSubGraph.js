sigma.classes.graph.addMethod(
    'getSubGraph'
    , function(options){
    var opt = options || {}
        , me = this
        , filter = opt.filter
        , edgeFilter = opt.edgeFilter
        , dummyRoot = opt.dummyRoot || null
        , dummyEdges = opt.dummyEdges || []
        , nodes = me.nodesArray.slice( 0 )
        , edges = me.edgesArray.slice( 0 )
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

    if('function' == typeof edgeFilter){
        for(var i=edges.length-1; i>=0; i--){
            if(!edgeFilter(edges[i])){
                edges.splice(i, 1);
            }
        }
    }

    if ( dummyRoot && dummyEdges.length ) {
        nodes.push( dummyRoot );
        edges = edges.concat( dummyEdges );
    }

    return {
        nodes: nodes
        , edges: edges
    };
}); 
