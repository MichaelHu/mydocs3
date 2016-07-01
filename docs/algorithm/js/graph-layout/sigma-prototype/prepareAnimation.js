sigma.prototype.prepareAnimation
    = function(options){
    var me = this
        , opt = options || {}
        , prefix = opt.readPrefix || ''
        ;

    me.graph.nodes().forEach(function(node){
        if('undefined' == typeof node[prefix + 'x']){
            node[prefix + 'x'] = node.x;
            node[prefix + 'y'] = node.y;
        }
    });

    return me;
};   
