sigma.utils.normalizeSophonNodes
    = function(nodes, options){

    if(!nodes){
        return null;
    }

    var opt = options || {} 
        , center = opt.center || {x:0, y:0}
        // , size = opt.size || 10
        , prefix = opt.readPrefix || ''
        , rect = sigma.utils.getNodesRect(nodes, opt) 
        , nodesCenter = {
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
        }
        , dx = center.x - nodesCenter.x
        , dy = center.y - nodesCenter.y
        ;

    nodes.forEach(function(node){
        node[prefix + 'x'] += dx;
        node[prefix + 'y'] += dy;
        // node.size = size;
    });

    return nodes;
}
