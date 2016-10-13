( function() {

function isLinelikeLayout(nodes, options){
    var nodes = nodes || []
        , opt = options || {}
        , rect = sigma.utils.getNodesRect(nodes, opt)
        , threshold = opt.threshold || 20
        , debugShow = opt.debugShow
        ;

    if(nodes.length <= 2){
        return 0;
    }

    if('function' == typeof debugShow){
        debugShow('rect w,h', rect.w, rect.h);
    }

    if(rect.w / rect.h > threshold
        || rect.h / rect.w > threshold){
        return 1;
    }
    return 0;
}  

function hasWhollyOverlayedNodes(nodes, options) {
    var opt = options || {}
        , nodes = nodes || []
        , prefix = opt.readPrefix || ''
        , len = nodes.length
        , i, j, n1, n2
        ;

    for(i=0; i<len; i++){
        n1 = nodes[i];
        for(j=i+1; j<len; j++){
            n2 = nodes[j]; 
            if(n1[prefix + 'x'] == n2[prefix + 'x']
                && n1[prefix + 'y'] == n2[prefix + 'y']){
                return true;
            }
        }
    } 
    return false;
} 

function hasInvalidValues(nodes, options) {
    var opt = options || {}
        , nodes = nodes || []
        , prefix = opt.readPrefix || ''
        , len = nodes.length
        , i, n1
        ;

    for(i=0; i<len; i++){
        n1 = nodes[i];
        if(n1[prefix + 'x'] !== +n1[prefix + 'x']
            || n1[prefix + 'y'] !== +n1[prefix + 'y']){
            return true;
        }
    } 
    return false;
} 


sigma.prototype.layoutYifanHu
    = function(options){
    var me = this
        , opt = options || {}
        ;

    if ( !opt.skipInitialization ) {
        me.initializeLayout();
    }

    var subGraph = me.graph.getSubGraph(opt)
        , nodes = subGraph.nodes
        , edges = subGraph.edges
        , newOpt = Object.assign({}, opt, {readPrefix: ''})
        ;

    if(!opt.skipPreLayoutCheck) {
        if(isLinelikeLayout(nodes, {
                threshold: 10
            })
            || hasWhollyOverlayedNodes(nodes)
            || hasInvalidValues(nodes)
            ){
            // note: `opt.readPrefix` must be ''
            me.layoutGrid(newOpt)
                .applyLayoutInstantly({
                    readPrefix: 'grid_'
                    , clearOld: 1
                });
        }
    }

    sigma.utils.layoutYifanHu(nodes, edges, opt);
    return me;
};   


} )();
