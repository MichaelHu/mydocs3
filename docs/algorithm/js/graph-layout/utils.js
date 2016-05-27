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

function getRandomGraph(numOfNodes, numOfEdges, fixSize){

    var i
        , s
        , N = numOfNodes
        , E = numOfEdges
        , g = { nodes: [], edges: [] }
        ;

    for(i=0; i<N; i++){
        g.nodes.push({
            id: 'n' + i
            , label: '' + i
            , x: Math.random()
            , y: Math.random()
            , size: fixSize || Math.random()
            , color: fly.randomColor() 
        });
    }

    for(i=0; i<E; i++){
        var edge = {
            id: 'e' + i
            , source: 'n' + (Math.random() * N | 0) 
            , target: 'n' + (Math.random() * N | 0) 
            , size: fixSize ? 1 : 1 * Math.random()
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
