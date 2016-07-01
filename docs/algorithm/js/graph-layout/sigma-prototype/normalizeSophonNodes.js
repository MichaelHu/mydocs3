sigma.prototype.normalizeSophonNodes
    = function(options){

    var opt = options || {}
        , me = this
        , filter = opt.filter
        , g = me.graph.getSubGraph(opt)
        , oldSubCenter
        , oldRect
        ;

    if('function' == typeof filter && !opt.center){
        oldRect = sigma.utils.getNodesRect(g.nodes);
        oldSubCenter = {
            x: oldRect.x + oldRect.w / 2
            , y: oldRect.y + oldRect.h / 2
        };
        opt.center = oldSubCenter;
    }

    sigma.utils.normalizeSophonNodes(
        g.nodes
        , opt
    );

    return me;
}; 
