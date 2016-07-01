sigma.utils.adjustSiblingsOrder
    = function(parentNode, edges) {

    if(!parentNode || !parentNode._wt_children){
        console.log(arguments.callee
            , 'parentNode is null or parentNode._wt_children is not existed');
        return;
    }

    var nodes = parentNode._wt_children
        , edges = edges || []
        , visitedNodes = {}
        , node
        , index
        , len = nodes.length
        , j
        , adjacentNodes
        , flagLeft
        , flagRight
        ;

    while((index = _hasMoreIndex()) >= 0){
        node = nodes[index];
        visitedNodes[node.id] = 1;
        adjacentNodes = _getAdjacentNodes(node, nodes);
        flagLeft = 0;
        flagRight = 0;
        if(adjacentNodes && adjacentNodes.length){

            if(index>0 && adjacentNodes.indexOf(nodes[index-1]) < 0){
                for(j=index-1; j>=0; j--){
                    if(adjacentNodes.indexOf(nodes[j]) >= 0){
                        nodes.splice(index, 1);
                        nodes.splice(j, 0, node);
                        flagLeft = 1;
                        break;
                    }
                }
            } 

            if(flagLeft){
                continue;
            }

            if(index<len - 1 && adjacentNodes.indexOf(nodes[index+1]) < 0){
                for(j=index+1; j<len; j++){
                    if(adjacentNodes.indexOf(nodes[j]) >= 0){
                        nodes.splice(j-1, 0, node);
                        nodes.splice(index, 1);
                        break;
                    }
                }
            } 

        }
    }

    function _hasMoreIndex(){
        for(var i=0; i<len; i++){
            var _node = nodes[i];
            if(!visitedNodes[_node.id]){
                return i;            
            }
        }
        return -1;
    }

    function _getAdjacentNodes(node) {
        var retNodes = [];
        edges.forEach(function(edge){
            var adjNodeId, adjNode;

            if(edge.source == node.id){
                adjNodeId = edge.target;
            }

            if(edge.target == node.id){
                adjNodeId = edge.source;
            }

            if(!adjNodeId){
                return;
            }

            if(adjNodeId != node.id){
                if(nodes.map(function(node){return node.id;})
                    .indexOf(adjNodeId) >= 0){
                    adjNode = sigma.utils.getNodeById(nodes, adjNodeId);
                    retNodes.push(adjNode);
                }
            }
        });
        return retNodes;
    }

};   
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
sigma.utils.avoidChildrenTravelThrough
    = function(parentNode, edges) {

    if(!parentNode || !parentNode._wt_children){
        console.log(arguments.callee
            , 'parentNode is null or parentNode._wt_children is not existed');
        return;
    }

    sigma.utils.avoidSameLevelTravelThrough(
        parentNode._wt_children
        , edges
    );
};  
sigma.utils.avoidSameLevelTravelThrough
    = function(nodesOfSameLevel, edges) {

    if(!nodesOfSameLevel){
        console.log(arguments.callee
            , 'nodesOfSameLevel is null');
        return;
    }

    var nodes = nodesOfSameLevel 
        , edges = edges || []
        , unit = unit || 1
        , node, fromNode, toNode
        , len = nodes.length
        , i, j, k
        ;

    nodes.forEach(function(node){
        delete node._wt_dy;
    });

    for(i=0; i<len; i++){
        fromNode = nodes[i];
        for(j=i+2; j<len; j++){
            toNode = nodes[j];
            if(_isConnected(fromNode, toNode)){
                for(k=i+1; k<j; k++){
                    node = nodes[k];     
                    // adjust once
                    if(node._wt_dy) {
                        continue;
                    }
                    node._wt_dy = ( k % 2 == 0 ? -1 : 1 );
                }
            }
        }
    } 

    function _isConnected(fromNode, toNode){
        for(var i=0; i<edges.length; i++){
            var edge = edges[i];
            if(edge.source == fromNode.id
                    && edge.target == toNode.id
                || edge.source == toNode.id
                    && edge.target == fromNode.id) {
                return 1;
            } 
        }
        return 0;
    }

};
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
sigma.utils.computeCircleTreeRect
    = function(tree){

    var maxLevel = tree._wt_maxlevel
        , hasCircuit = tree._circuit ? 1 : 0
        , width = hasCircuit ? 2 * maxLevel : maxLevel
        ;

    if(maxLevel){
        return {
            x: 0
            , y: 0 
            , w: width 
            , h: width 
        };
    }

    return null;
}    

sigma.utils.computeHierarchyTreeRect
    = function(tree, offsetX){

    var maxLevel = tree._wt_maxlevel
        , leaves = tree._wt_leaves
        , height = maxLevel || 1
        , width = leaves || 1
        ;

    if(maxLevel){
        return {
            x: offsetX || 0
            , y: 0 
            , w: width 
            , h: height 
        };
    }

    return null;
}  

sigma.utils.computeLeaves
    = function(forest){

    forest.forEach(function(tree){

        // if there is a circuit
        if(tree._circuit){
            tree._circuit.forEach(function(node){
                depthTravel(node);
            });
        }
        else {
            depthTravel(tree);

        }

        function depthTravel(node){
            var children = node._wt_children
                , _leaves
                , leaves = 0
                ;
            if(children.length == 0){
                _leaves = [1];
            }
            else {
                _leaves = children.map(function(node){
                    return depthTravel(node);
                }); 
            }

            _leaves.forEach(function(item){
                leaves += item;
            });

            return ( node._wt_leaves = leaves );
        }

    });

}   

sigma.utils.depthTravel
    = function(nodes, edges, root, callbacks) {

    if(!nodes || !nodes.length){
        return;
    }

    var cbs = callbacks || {}
        , visitedNodes = {}
        , node = root || nodes[0]
        , children
        ;

    edges = edges || [];

    node._dt_level = 1;
    _depthTravel(node);

    function _depthTravel(node){
        if(visitedNodes[node.id]){
            return;
        }
        visitedNodes[node.id] = 1;

        if(typeof cbs['onNode'] == 'function'){
            cbs['onNode'](node);
        }

        var children = getChildren(node); 
        if(children.length > 0){
            children.forEach(function(child){
                _depthTravel(child);
            });
        }
    }

    function getChildren(node){
        var id = node.id
            , children = []
            , childId
            , child
            ;
        edges.forEach(function(edge){
            if(
                edge.source == id
                || edge.target == id
              ){
                childId = edge.source;
                if(childId == id){
                    childId = edge.target;
                }
                if(!visitedNodes[childId]){
                    child = sigma.utils.getNodeById(nodes, childId);
                    child._dt_level = node._dt_level + 1;
                    children.push(child);
                }
            }
        });
        return children;
    }

};

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
sigma.utils.getCircleForest
    = function(nodes, edges, options){

    var opt = options || {} 
        , circuits
        , circuit
        , tree = opt.root 
            || ( opt.makeMaxDegreeNodeRoot 
                ? sigma.utils.getMaxDegreeNode(nodes, edges) : null )
            || nodes[0]
        , excludes
        , nodesVisited = {}
        , forest = []
        ;

    edges = edges || [];

    do {
        circuits = sigma.utils.getCircuits(nodes, edges, tree);
        excludes = {};

        if(circuits.length > 0){
            circuits.sort(function(a, b){
                return b.length - a.length;
            });

            // the longest circuit
            tree._circuit = circuit = circuits[0]; 

            circuit.forEach(function(_node){
                excludes[_node.id] = 1;
            });

            circuit.forEach(function(_node){
                sigma.utils.widthTravel(
                    nodes
                    , edges
                    , _node
                    , {
                        onNode: function(__node){
                            nodesVisited[__node.id] = 1;
                        }
                    }
                    , excludes
                );
            });
        }
        else {
            sigma.utils.widthTravel(
                nodes
                , edges
                , tree
                , {
                    onNode: function(__node){
                        nodesVisited[__node.id] = 1;
                    }
                }
            );
        }

        forest.push(tree);

    } while((tree = hasMore()));

    function hasMore(){
        for(var i=0; i<nodes.length; i++){
            if(!nodesVisited[nodes[i].id]){
                return nodes[i];
            }
        }
        return 0;
    } 

    return forest;

};

sigma.utils.getCircuits
    = function(nodes, edges, root) {

    var nLen = nodes.length || 1
        , eLen = edges.length || 1
        ;

    if(eLen <= 50 && eLen / nLen <= 1.25){
        return sigma.utils.getCircuitsSlow(nodes, edges, root); 
    }
    else { 
        return sigma.utils.getCircuitsFast(nodes, edges, root); 
    }

};

sigma.utils.getCircuitsFast
    = function(nodes, edges, root) {

    if(!nodes || !nodes.length){
        return;
    }

    var me = this
        , root = root || nodes[0]
        , visitedNodes = {}
        , children
        , path = []
        , circuits = []
        ;

    edges = edges || [];

    _depthTravel(root);
    return circuits;

    function _depthTravel(node){
        if(visitedNodes[node.id]){
            return;
        }
        visitedNodes[node.id] = 1;
        path.push(node);

        var children = getChildren(node); 
        if(children.length > 0){
            children.forEach(function(child){
                _depthTravel(child);
            });
        }
        path.pop(node);
    }

    function getChildren(node){
        var id = node.id
            , children = []
            , childId
            , child
            ;
        edges.forEach(function(edge){
            if(
                edge.source == id
                || edge.target == id
              ){
                childId = edge.source;
                if(childId == id){
                    childId = edge.target;
                }

                if(childId == root.id && path.length > 2){
                    circuits.push(path.slice());  
                }                        

                if(!visitedNodes[childId]){
                    child = sigma.utils.getNodeById(nodes, childId);
                    children.push(child);
                }

            }
        });
        return children;
    }

};    

sigma.utils.getCircuitsSlow
    = function(nodes, edges, root) {

    if(!nodes || !nodes.length){
        return;
    }

    var me = this
        , root = root || nodes[0]
        , children
        , path = []
        , circuits = []
        , isStop = 0
        ;

    edges = edges || [];

    root._dt_level = 1;
    _depthTravel(root);
    return circuits;

    function _depthTravel(node){
        if(isStop){
            return;
        }

        if(!isNodeInPath(node)){
            path.push(node);

            var children = getChildren(node); 
            if(children.length > 0){
                children.forEach(function(child){
                    _depthTravel(child);
                });
            }

            path.pop(node);
        }
        else if(node.id == root.id
            && path.length > 2){
            circuits.push(path.slice());  
            if(circuits.length >= 20){
                isStop = 1;
            }
        }
    }

    function isNodeInPath(node){
        return path.map(function(_node){return _node.id;})
            .indexOf(node.id)
            != -1
            ;
    }

    function getChildren(node){
        var id = node.id
            , children = []
            , childId
            , child
            ;

        if(node._tmp_children){
            return node._tmp_children; 
        }

        edges.forEach(function(edge){
            if(
                edge.source == id
                || edge.target == id
              ){
                childId = edge.source;
                if(childId == id){
                    childId = edge.target;
                }

                child = sigma.utils.getNodeById(nodes, childId);
                children.push(child);
            }
        });

        return (node._tmp_children = children);
    }

};
sigma.utils.getClusterLevels
    = function(numOfFirstLevel, totalNum){

    var i = 1
        , step = numOfFirstLevel
        , all = 0
        ;

    do {
        all += i * step;
        i++;
    }
    while(all < totalNum);
    return i - 1; 
}   
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
sigma.utils.getLayoutForest
    = function(nodes, edges, options){

    var opt = options || {}
        , nodesVisited = {}
        , forest = []
        , node = opt.root || nodes[0]
        , excludes = opt.excludes
        ;

    do {
        sigma.utils.widthTravel(
            nodes
            , edges
            , node
            , {
                onNode: function(node){
                    nodesVisited[node.id] = true;
                }
            } 
            , excludes
        )
        forest.push(node);
        ;
    } while((node = hasMore()));

    function hasMore(){
        for(var i=0; i<nodes.length; i++){
            if(!nodesVisited[nodes[i].id]){
                return nodes[i];
            }
        }
        return 0;
    }

    return forest;
};

sigma.utils.getMaxDegreeNode
    = function(nodes, edges){

    if(!nodes || !edges) {
        return null;
    }

    var degreeArr = [] 
        , degree
        , node, edge, i, j
        ;

    for(i=0; i<nodes.length; i++){
        node = nodes[i];
        degree = {
            id: node.id
            , data: 0
        };
        degreeArr.push(degree);

        for(j=0; j<edges.length; j++){
            edge = edges[j]; 
            if(
                edge.source  == node.id
                || edge.target  == node.id
            ){
                degree.data++;
            }
        }
    }
    degreeArr.sort(function(a, b){
        return b.data - a.data;
    });

    return degreeArr.length
        ? sigma.utils.getNodeById(nodes, degreeArr[0].id)
        : null;

};

sigma.utils.getNodeById
    = function(nodes, id){
        if(!nodes) {
            return null;
        }
        for(var i=0; i<nodes.length; i++){
            if(nodes[i].id == id){
                return nodes[i];
            }
        }
        return null;
    } 


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

sigma.utils.getNumOfFirstClusterLevel
    = function(totalNum, max, min){

    var max = max || 18 
        , min = min || 1
        , i = 1
        , t = 0
        , m
        ;
    while(1){
        t += i; 
        m = Math.ceil(totalNum / t);
        if(m >= min && m <= max){
            return m;
        }
        i++;
    }
} 
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
sigma.utils.interpolatesAngle
    = function(
        angleRange
        , numOfFirstLevel
        , levels
        , angleStart
    ) {
    var retArr = []
        , angleStart = angleStart || 0
        , numOfCurrentLevel
        , anglesOfCurrentLevel
        , stepOfCurrentLevel
        , angleOffset
        , i, j
        ;

    for(i=0; i<levels; i++){
        numOfCurrentLevel = ( i + 1 ) * numOfFirstLevel;
        anglesOfCurrentLevel = [];
        stepOfCurrentLevel = angleRange / numOfCurrentLevel;
        angleOffset = stepOfCurrentLevel * ( i == 0 ? 0 : 0.5 );
        angleOffset += angleStart;

        retArr.push(anglesOfCurrentLevel);
        for(j=0; j<numOfCurrentLevel; j++){
            anglesOfCurrentLevel.push(
                stepOfCurrentLevel * j + angleOffset
            );
        }
    }

    return retArr;
};
sigma.utils.layoutTreesByGrid
    = function(forest, options){

    var opt = options || {}
        , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}
        , grid = new Grid(spaceGrid.xSize, spaceGrid.ySize)
        , unit = opt.optimalDistance || 100 
        , prefix = opt.readPrefix || opt.writePrefix || ''
        , debug = opt.debug || 0
        ;


    forest.forEach(function(tree){
        _computeTreeRect(tree);
    });

    // sort by tree's area in decreasing order
    forest.sort(function(a, b){
        return b._tmp_rect.w * b._tmp_rect.h
            - a._tmp_rect.w * a._tmp_rect.h
            ;
    });

    forest.forEach(function(tree){
        var spaceBlock = _normalizeTreeRect(tree, unit) 
            ;

        grid.placeBlock(tree.id, spaceBlock, debug);
    });

    forest.forEach(function(tree){
        var spaceBlock = grid.getBlockRect(tree.id) 
            , hasCircuit = tree._circuit ? 1 : 0
            , dx = spaceBlock.gridPos.x * unit - spaceBlock.x
            , dy = spaceBlock.gridPos.y * unit - spaceBlock.y
            ;

        debug && console.log(tree.id, spaceBlock);

        // clear temporary attribures
        if(tree._tmp_rect){
            delete tree._tmp_rect;
        }

        // if there is a circuit
        if(tree._circuit){
            tree._circuit.forEach(function(node){
                __depthTravel(node);
            });
            delete tree._circuit;
        }
        else {
            __depthTravel(tree);
        }

        function __depthTravel(node){
            var children = node._wt_children
                ;

            node[prefix + 'x'] += dx;
            node[prefix + 'y'] += dy;

            if(children.length > 0){
                children.forEach(function(child){
                    __depthTravel(child);
                }); 
                delete node._wt_children;
            }
        }
    });


    function _computeTreeRect(tree){
        var nodes = []
            , circuit = tree._circuit
            , rect
            ; 

        if(circuit){
            circuit.forEach(function(node){
                __depthTravel(node);
            });
        }
        else {
            __depthTravel(tree);
        }

        rect = sigma.utils.getNodesRect(
            nodes
            , {
                readPrefix: prefix
                , ignoreNodeSize: 0
            }
        );
        tree._tmp_rect = rect; 
        tree._node_count = nodes.length;
        nodes.length = 0;
        return rect;

        function __depthTravel(node){
            var children = node._wt_children
                , len = children.length
                ;

            nodes.push(node);
            if(len > 0){
                children.forEach(function(child){
                    __depthTravel(child); 
                });
            }
        }
    }

    function _normalizeTreeRect(tree, unit){
        var rect = tree._tmp_rect
            , spaceBlock = {}
            , extendRatio = 1
            ;

        spaceBlock.x = rect.x;
        spaceBlock.y = rect.y;
        if(tree._node_count > 1){
            extendRatio = 1.2;
        }

        // `extendRatio` is for reserved space for node-collision on boundaris
        spaceBlock.w = Math.ceil(rect.w * extendRatio / unit);
        spaceBlock.h = Math.ceil(rect.h * extendRatio / unit);

        return spaceBlock;
    }


}; 
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
sigma.utils.widthTravel
    = function(nodes, edges, root, callbacks, excludes) {

    if(!nodes || !nodes.length){
        return;
    }

    var cbs = callbacks || {}
        , edges = edges || []
        , queue = []
        , parentAndSiblingNodes = excludes || {}
        , node = root || nodes[0]
        , children
        ;

    node._wt_level = 1;
    queue.push(node);
    parentAndSiblingNodes[node.id] = 1;

    while((node = queue.splice(0, 1)).length > 0){
        node = node[0];
        children = getChildren(node); 
        node._wt_children = children;
        queue = queue.concat(children);

        if(typeof cbs['onNode'] == 'function'){
            cbs['onNode'](node);
        }
    }

    function getChildren(node){
        var id = node.id
            , children = []
            , childId
            , child
            ;
        edges.forEach(function(edge){
            if(
                edge.source == id
                || edge.target == id
              ){
                childId = edge.source;
                if(childId == id){
                    childId = edge.target;
                }
                if(!parentAndSiblingNodes[childId]){
                    parentAndSiblingNodes[childId] = 1;
                    child = sigma.utils.getNodeById(nodes, childId);
                    child._wt_level = node._wt_level + 1;
                    children.push(child);
                }
            }
        });
        return children;
    }

};

