sigma.utils.getNodesFromTree
    = function( tree ) {
    var nodes = [];

    depthTravel( tree );
    return nodes;

    function depthTravel( node ) {
        nodes.push( node );
        if ( node._wt_children ) {
            node._wt_children.forEach( function( child ) {
                depthTravel( child );
            } );
        }
    }
};  
