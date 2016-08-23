sigma.utils.computeHeight 
    = function( forest, options ) {
    var opt = options || {};

    forest.forEach( function( tree ) {
        _depthTravel( tree );
    } );

    function _depthTravel( node ) {
        var subTreeHeight = 0
            , children = node._wt_children
            ;

        children.forEach( function( child ) {
            subTreeHeight = Math.max( subTreeHeight, _depthTravel( child ) );
        } );

        node._wt_height = subTreeHeight + 1;
        if ( 'function' == typeof opt.onNode ) {
            opt.onNode( node );
        }

        return node._wt_height;
    }

};  
