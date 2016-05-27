sigma.utils.getGridLayout
    = function(nodes, options){

    if(!nodes || !nodes.length){
        return;
    }

    var opt = options || {}
        , r = Math.ceil(Math.sqrt(nodes.length))
        , i = 0
        , j = 0
        , nodeSize = nodes[0].size || 1
        , step = opt.space || nodeSize  * 3 
        , center = opt.center
        , rect
        , ltPoint
        ;

    if(!center){
        rect = sigma.utils.getNodesRect(nodes, opt);
        center = {
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
        };
    }

    ltPoint = {
        x: center.x - step * ( r - 1 ) / 2
        , y: center.y - step * ( r - 1 ) / 2
    };

    nodes.forEach(function(node){
        node.grid_x = j * step + ltPoint.x;
        node.grid_y = i * step + ltPoint.y; 
        j++;
        if(j >= r) {
            j = 0;
            i++;
        }
    });

    return nodes;
};
