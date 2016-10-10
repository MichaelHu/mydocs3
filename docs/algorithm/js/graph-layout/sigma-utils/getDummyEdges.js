sigma.utils.getDummyEdges 
    = function( fromNode, toNodes, options ) {
    var opt = options || {} 
        , edges = []
        , edge
        ;

    // assertions
    if ( !fromNode ) {
        throw new Error( 'sigma.utils.getDummyEdges: `fromNode` is undefined' );
    }
    if ( !toNodes ) {
        throw new Error( 'sigma.utils.getDummyEdges: `toNodes` is undefined' );
    }
    if ( !toNodes.length ) {
        throw new Error( 'sigma.utils.getDummyEdges: `toNodes.length` is zero' );
    }

    for ( var i = 0; i < toNodes.length; i++ ) {
        edge = {
            source: fromNode.id
            , target: toNodes[ i ].id
            , size: opt.size || 1
            , color: opt.color || '#0f0'
            , hover_color: opt.hover_color || '#f00'
            , _isdummy: 1
        };
        edge.id = 'dummyedge_' 
            + new Date().getTime()
            + '_' + ( Math.random() + '' ).substr( 2, 6 )
            ;
        edges.push( edge );
    }

    return edges;
};  
