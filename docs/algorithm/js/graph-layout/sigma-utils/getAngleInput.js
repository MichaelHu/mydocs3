sigma.utils.getAngleInput
    = function(fromNode, toNode, options){

    var opt = options || {} 
        , readPrefix = opt.readPrefix || ''
        , dy = fromNode[readPrefix + 'y'] - toNode[readPrefix + 'y']
        , dx = fromNode[readPrefix + 'x'] - toNode[readPrefix + 'x']
        , angleInput
        ;
    sin = dy / Math.sqrt( 
            Math.pow(dx, 2) + Math.pow(dy, 2) 
        );
    cos = dx / Math.sqrt(
            Math.pow(dx, 2) + Math.pow(dy, 2) 
        );

    if( sin >= 0 ) {
        angleInput = Math.acos(cos);
    }
    else {
        angleInput = 2 * Math.PI - Math.acos(cos);
    }

    return angleInput;
}; 
