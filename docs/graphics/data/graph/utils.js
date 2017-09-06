function getUniqueSigmaInstance(instId, config, isSearch){

    var instances = (
            arguments.callee.__instances
                || ( arguments.callee.__instances = [] )
        )
        ;

    if(!instances[instId]) {
        if(isSearch){
            return false;
        }

        if(!config) {
            instances[instId] = new sigma();
        }
        else {
            instances[instId] = new sigma(
                $.extend(
                    {}
                    , config
                ) 
            );
        }
    }
    else {
        if(isSearch == 2) {
            var ret = instances[instId];
            delete instances[instId];
            return ret;
        }
    }

    return instances[instId];
}

function isSigmaInstanceExisted(instId){
    return getUniqueSigmaInstance(instId, null, 2);
}

function getRandomGraph(numOfNodes, numOfEdges, fixSize, options){

    var i
        , s
        , N = numOfNodes
        , E = numOfEdges
        , g = { nodes: [], edges: [] }
        , opt = options || {}
        ;

    for(i=0; i<N; i++){
        g.nodes.push({
            id: 'n' + i
            , label: '' + i
            , x: Math.random() * ( opt.width || 1 )
            , y: Math.random() * ( opt.height || 1 )
            , size: Object.prototype.toString.call( fixSize ) == '[object Array]'
                ? fixSize[ 0 ] + Math.random() * ( fixSize[ 1 ] - fixSize[ 0 ] )
                : ( fixSize || Math.random() )
            , color: fly.randomColor()
        });
    }

    for(i=0; i<E; i++){
        var edge = {
            id: 'e' + i
            , source: 'n' + (Math.random() * N | 0)
            , target: 'n' + (Math.random() * N | 0)
            , size: fixSize ? 1 : 1 * Math.random()
            , label: 'e' + i
            // , type: 'curve'
            // , color: fly.randomColor()
            , color: '#ccc'
            , hover_color: '#f00'
        };

        if(edgeExists(edge)){
            continue;
        }
        else {
            g.edges.push(edge);
        }

    }

    function edgeExists(edge){
        for(var i=0; i<g.edges.length; i++){
            if(g.edges[i].source == edge.source
                && g.edges[i].target == edge.target) {
                return true;
            }
        }
        return false;
    }

    return g;
}


function getClusterGraph(
    numOfNodes
    , options){

    var opt = options || {} 
        , graph = {nodes: [], edges: []}
        , nid = 1
        , eid = 1
        , xMax = opt.xMax || 300
        , yMax = opt.yMax || 200
        , nodeSize = opt.nodeSize || 1
        , edgeLabels = opt.edgeLabels || []
        ;

    for(var i=0; i<numOfNodes; i++){
        graph.nodes.push({
            id: 'n' + nid
            , label: 'n' + nid++
            , x: xMax * Math.random() 
            , y: yMax * Math.random() 
            , size: nodeSize
            , color: fly.randomColor()
        }); 
    }

    function getEdgeLabel( id ) {
        if ( edgeLabels && edgeLabels.length ) {
            return edgeLabels[ edgeLabels.length * Math.random() | 0 ] + '';
        }
        else {
            return id + '';
        }
    }

    for(i=1; i<numOfNodes; i++){
        graph.edges.push({
            id: 'e' + eid++
            , source: 'n1'
            , target: graph.nodes[i].id
            , color: '#ccc'
            , hoverColor: '#f00'
            , label: getEdgeLabel( eid )
        });
    }

    return graph;
}


function getLineGraph(
    numOfNodes
    , numOfEdges
    , options){

    var opt = options || {} 
        , graph = {nodes: [], edges: []}
        , nid = 1
        , eid = 1
        , xOffset = opt.xOffset || 0
        , yOffset = opt.yOffset || 0
        , xMax = opt.xMax || 300
        , yMax = opt.yMax || 200
        , nodeSize = opt.nodeSize || 1
        , i
        ;

    for(var i=0; i<numOfNodes; i++){
        graph.nodes.push({
            id: 'n' + nid
            , label: 'n' + nid++
            , x: opt.vertical ? xOffset : xMax * Math.random() 
            , y: opt.vertical ? yMax * Math.random() : yOffset
            , size: nodeSize
            , color: fly.randomColor()
        }); 
    }

    for(i=0; i<numOfEdges; i++){
        var edge = {
            id: 'e' + i
            , source: graph.nodes[Math.random() * numOfNodes | 0].id 
            , target: graph.nodes[Math.random() * numOfNodes | 0].id 
            , size: opt.fixSize ? 1 : 1 * Math.random()
            // , type: 'curve'
            // , color: fly.randomColor() 
            , color: '#ccc'
            , hover_color: '#f00'
        };

        if(edgeExists(edge)){
            continue;
        }
        else {
            graph.edges.push(edge);
        }

    }

    function edgeExists(edge){
        for(var i=0; i<graph.edges.length; i++){
            if(graph.edges[i].source == edge.source
                && graph.edges[i].target == edge.target) {
                return true;
            }
        }
        return false;
    }

    return graph;
}

function createRawGraphData(
    nodeCount
    , existedNodes
    , edgeLabels
    ){

    var graph = {nodes: [], edges: [], fromNodes: []}
        , nodeIds = []
        , len1, len2
        , idSeed = 100000
        , existedNodes = existedNodes || []
        , _nodes = []
        , _edgeLabels = edgeLabels || null 
        ;

    function getLabel( id ) {
        if ( _edgeLabels && _edgeLabels.length ) {
            return _edgeLabels[ _edgeLabels.length * Math.random() ];
        }
        else {
            return id;
        }
    }

    for(var i=0; i<nodeCount; i++){
        var id = 'n' + idSeed++;
        nodeIds.push(id);
        graph.nodes.push({
            id: id 
            , label: id
            , newAdded: true
            , x: null
            , y: null
            , size: 10
            // , color: fly.randomColor()
            // , color: '#ff7f0e' 
            , color: '#74c476' 
        });
    }

    _nodes = _nodes.concat(graph.nodes, existedNodes); 
    len1 = graph.nodes.length;
    len2 = _nodes.length;
    for(i=0; i<len1; i++){
        id = 'e' + idSeed++;
        var randomIndex = len2 * Math.random() | 0;
        var targetId = _nodes[ randomIndex ].id;
        if ( randomIndex >= nodeCount ) {
            graph.fromNodes.push( _nodes[ randomIndex ] );
        }
        graph.edges.push({
            id: id 
            , source: graph.nodes[ i ].id
            , target: targetId
            , color: '#d62728' 
            , hoverColor: '#c00'
            , label: getLabel( id )
        });
    }

    return graph;
}
