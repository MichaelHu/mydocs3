sigma.utils.clearLocalAndExternalNodes
    = function( tree ) {
    if ( !tree ) {
        return;
    }

    _depthTravel( tree );

    function _depthTravel( tree ) {
        var children = tree._wt_children;

        delete tree._wt_lenodes;
        children.forEach( function( child ) {
            _depthTravel( child );
        } );
    }
};   
