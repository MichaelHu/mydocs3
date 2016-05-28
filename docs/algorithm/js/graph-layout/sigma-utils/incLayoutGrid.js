sigma.utils.incLayoutGrid
    = function(nodes, newNodes, selectedNodes, options){

    if(!newNodes || !newNodes.length
        || !nodes || !nodes.length){
        return;
    }

    var opt = options || {} 
        , rect
        , center
        , newCenter
        , oldNodes
        , newWidth = ( Math.ceil(Math.sqrt(newNodes.length)) - 1 ) * ( opt.space || 50 ) 
            + ( newNodes[0].size || + 20 )
        , gnr = sigma.utils.getNodesRect
        ;

    selectedNodes = selectedNodes || [];
    if(!selectedNodes.length){
        selectedNodes = nodes;
    }
    rect = gnr(nodes, opt);
    center = {
        x: rect.x + rect.w / 2
        , y: rect.y + rect.h / 2
    };
    newCenter = {
        x: rect.x + rect.w + newWidth
        , y: rect.y + rect.h / 3
    };



    rect = gnr(selectedNodes, opt);
    // from selected nodes' center point 
    newNodes.forEach(function(node){
        node.x = rect.x + rect.w / 2; 
        node.y = rect.y + rect.h / 2;
    });

    // prepare for the next animation
    nodes.forEach(function(node){
        node.grid_x = node.x;
        node.grid_y = node.y;
    });

    opt.center = newCenter;
    sigma.utils.getGridLayout(newNodes, opt);

};



sigma.prototype.incLayoutGrid = function(
    newNodes, selectedNodes, options) {
    var me = this
        , nodes = me.graph.nodes()
        ;

    sigma.utils.incLayoutGrid(
        nodes
        , newNodes
        , selectedNodes
        , options
    );

    return me;
};
