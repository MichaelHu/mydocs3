sigma.utils.getNodesRect
    = function(nodes, options){

    var opt = options || {}
        , xMin = Infinity
        , yMin = Infinity
        , xMax = -Infinity
        , yMax = -Infinity
        , readPrefix = opt.readPrefix || ''
        , ignoreNodeSize = typeof opt.ignoreNodeSize == 'undefined'
            ? true : opt.ignoreNodeSize
        , node, i, x, y, size
        ;

    i = nodes.length - 1;
    while(i >= 0){
        node = nodes[i];
        x = node[readPrefix + 'x'] || 0;
        y = node[readPrefix + 'y'] || 0;
        size = ignoreNodeSize 
            ? 0 : node[readPrefix + 'size'] || node['size'] || 0.2;
        if(x - size < xMin){
            xMin = x - size;
        }
        if(x + size > xMax){
            xMax = x + size;
        }
        if(y - size < yMin){
            yMin = y - size;
        }
        if(y + size > yMax){
            yMax = y + size;
        }
        i--;
    }

    if(nodes.length == 0){
        xMin = 0;
        yMin = 0;
        xMax = 0;
        yMax = 0;
    }

    return {
        x: xMin
        , y: yMin
        , w: xMax - xMin
        , h: yMax - yMin
    };
}   

