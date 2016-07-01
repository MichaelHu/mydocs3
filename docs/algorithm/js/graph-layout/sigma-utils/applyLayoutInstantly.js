sigma.utils.applyLayoutInstantly
    = function(nodes, options){
    var opt = options || {}
        , readPrefix = opt.readPrefix || ''
        , writePrefix = opt.writePrefix || ''
        , clearOld = opt.clearOld || 0
        ;

    if(!nodes || !nodes.length){
        return;
    }
    nodes.forEach(function(node){
        if(undefined !== node[readPrefix + 'x']){
            node[writePrefix + 'x'] = node[readPrefix + 'x'];
            node[writePrefix + 'y'] = node[readPrefix + 'y'];
            if(clearOld){
                delete node[readPrefix + 'x'];
                delete node[readPrefix + 'y'];
            }
        }
        else {
            node[writePrefix + 'x'] = node.x;
            node[writePrefix + 'y'] = node.y;
        }
    });
};
