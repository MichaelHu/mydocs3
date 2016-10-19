sigma.utils.clustersNodes
    = function(
        nodes
        , options
    ) {

    var opt = options || {}
        , root = opt.root || {x: 0, y: 0}
        , len 
        , numOfFirstLevel
        , clusterLevels
        , angleRange = opt.angleRange || 2 * Math.PI
        , radiusStep = opt.radiusStep || 100
        , angleInput = opt.angleInput || 0
        , angleStart = angleInput
        , writePrefix = opt.writePrefix || ''
        , readPrefix = opt.readPrefix || ''
        , randomRadius = opt.randomRadius
        , radius = 0, _r
        , _rx, _ry 
        , i, j, k
        , angles
        , PI = Math.PI
        , alen, mid, left, right
        , retObj = null 
        ;

    if(!nodes || !nodes.length){
        return retObj;
    }

    len = nodes.length; 
    numOfFirstLevel = opt.numOfFirstLevel 
        || sigma.utils.getNumOfFirstClusterLevel(len, 15, 1);
    clusterLevels = sigma.utils.getClusterLevels(numOfFirstLevel, len); 
    if ( len <= 1 ) {
        angleRange = 0;
    }

    if(angleRange < PI * 2){
        angleStart = ( 2 * PI - angleRange ) / 2 + angleInput;
    }

    retObj = {
        numOfFirstLevel: numOfFirstLevel
        , numOfNodes: len
        , clusterLevels: clusterLevels
        , angleInput: angleInput
        , angleRange: angleRange
        , angleStart: angleStart
        , radiusStep: radiusStep
    };

    angles = sigma.utils.interpolatesAngle(
        angleRange
        , numOfFirstLevel
        , clusterLevels 
        , angleStart
    );

    if(typeof root[writePrefix + 'x'] == 'undefined'){
        root[writePrefix + 'x'] = root.x;
        root[writePrefix + 'y'] = root.y;
    }

    k = 0;
    _rx = root[readPrefix + 'x'];
    _ry = root[readPrefix + 'y'];

    if(opt.centerFirst){
        for(i=0; i<angles.length && k < len; i++){
            radius += radiusStep;
            alen = angles[i].length;
            mid = Math.floor(alen / 2);
            for(j=0; j<=mid && k<len; j++, k++){
                _r = _getRadius(radius);
                nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][mid - j]);
                nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][mid - j]);

                _r = _getRadius(radius);
                if(k + 1 < len && mid + j < alen && j != 0){
                    k++;
                    nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][mid + j]);
                    nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][mid + j]);
                }
            }
        }
    }
    else if(opt.sidesFirst){
        for(i=0; i<angles.length && k < len; i++){
            radius += radiusStep;
            alen = angles[i].length;
            mid = Math.floor(alen / 2);
            for(j=0; j<=mid && k<len; j++, k++){
                _r = _getRadius(radius);
                left = j;
                right = alen - 1 - j;
                if(left > right) {
                    break;
                }

                nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][left]);
                nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][left]);

                if(k + 1 < len && left < right){
                    k++;
                    _r = _getRadius(radius);
                    nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][right]);
                    nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][right]);
                }
            }
        }
    }
    else {
        for(i=0; i<angles.length && k < len; i++){
            radius += radiusStep;
            alen = angles[i].length;
            for(j=0; j<alen && k<len; j++, k++){
                _r = _getRadius(radius);
                nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][j]);
                nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][j]);
            }
        }
    }

    return retObj;

    function _getRadius(radius){
        return radius 
            + ( randomRadius ? 0.5 * radiusStep * Math.random() : 0 );
    }

};
