( function() {



function getDistance(node1, node2, options){
    var opt = options || {}
        , prefix = opt.readPrefix || ''
        , tip;

    if(!node1
        || !node2
        || isNaN(node1[prefix + 'x']) 
        || isNaN(node1[prefix + 'y'])
        || isNaN(node2[prefix + 'x'])
        || isNaN(node2[prefix + 'y'])
        ){
        tip = 'getDistance: nodes not exist or have no coordinates';
        if('function' == typeof opt.debugShow){
            opt.debugShow(tip, node1, node2);
        }
        else{
            throw new Error(tip);
        }
    }

    return Math.sqrt(
        Math.pow(node1[prefix + 'x'] - node2[prefix + 'x'], 2)
        + Math.pow(node1[prefix + 'y'] - node2[prefix + 'y'], 2)
    );
}  


function computeElectricalForce(
    node1, node2, distance, options){

    var opt = options || {}
        , relativeStrength = opt.relativeStrength
        , optimalDistance = opt.optimalDistance 
        , prefix = opt.readPrefix || ''
        , force = {
            dx: node2[prefix + 'x'] - node1[prefix + 'x']
            , dy: node2[prefix + 'y'] - node1[prefix + 'y']
        }
        , scale
        , zeroForce = {dx:0, dy:0}
        , tip
        ;

    if(optimalDistance !== +optimalDistance
        || relativeStrength !== +relativeStrength){
        tip = 'computeElectricalForce: optimalDistance or relativeStrength error';
        if('function' == typeof opt.debugShow){
            opt.debugShow(tip);
        }
        else{
            throw new Error(tip);
        }
        return zeroForce; 
    }

    scale = -relativeStrength * optimalDistance * optimalDistance
        / distance / distance;

    if(isNaN(scale) || Infinity == scale){
        tip = 'computeElectricalForce: NaN or Infinity scale';
        if('function' == typeof opt.debugShow){
            opt.debugShow(tip, 'scale: ' + scale);
        }
        else{
            console.log(tip, 'scale: ' + scale);
        }
        scale = -1;
    }

    force.dx *= scale;
    force.dy *= scale;

    return force;
} 


function computeRepulsionForce(
    node, quadTree, options) {

    var opt = options
        , zeroForce = {dx:0, dy:0, num:0}
        , distance
        , tree = quadTree
        , force
        , tip
        ;

    if(tree.mass <= 0){
        return zeroForce;
    }

    distance = getDistance(node, tree, opt);

    if(!opt || isNaN(opt.barnesHutTheta)){
        tip = 'computeRepulsionForce: options error!';
        if('function' == typeof opt.debugShow){
            opt.debugShow(tip, opt);
        }
        else {
            throw new Error(tip);
        }
    }

    if(tree.isLeaf || tree.mass == 1){
        if(distance < 1e-8){
            force = zeroForce;
        }
        else {
            force = computeElectricalForce(node, tree, distance, opt);  
        }
        force.num = 1;
    }
    else if(distance * opt.barnesHutTheta > tree.size){
        force = computeElectricalForce(node, tree, distance, opt); 
        force.dx *= tree.mass;
        force.dy *= tree.mass;
        force.num = 1;
    }
    else {
        force = zeroForce;
        force.num = 0;
        tree.children.forEach(function(child){
            var f = computeRepulsionForce(node, child, options);
            force.dx += f.dx;
            force.dy += f.dy;
            force.num += f.num;
        });
    }

    return force;
}  


function computeAttractionForce(
    node1, node2, options){

    var opt = options || {}
        , optimalDistance = opt.optimalDistance
        , prefix = opt.readPrefix || ''
        , force = {
            dx: node2[prefix + 'x'] - node1[prefix + 'x']
            , dy: node2[prefix + 'y'] - node1[prefix + 'y']
        }
        , distance = getDistance(node1, node2, opt)
        ;

    if(opt.optimalDistance == undefined){
        throw new Error('computeAttractionForce: optimalDistance not specified!');
    }

    force.dx *= distance / optimalDistance; 
    force.dy *= distance / optimalDistance;
    return force;
}   


sigma.utils.layoutYifanHu
    = function(nodes, edges, options){

    var opt = options || {}
        , nodes = nodes || [] 
        , edges = edges || [] 
        , prefix

        , quadTree
        , energyPrev = 0
        , energy = 0
        , step
        , isConverged = 0
        , progress = 0
        , iterations
        , energyChangeRatio

        , forest
        , layoutBalanced = opt.layoutBalanced || 0
        , spaceGrid = opt.spaceGrid || {
            xSize: 50
            , ySize: 50
        }
        ;

    // options
    opt.stepRatio = opt.stepRatio || 0.95;
    opt.relativeStrength = opt.relativeStrength || 0.2;
    opt.optimalDistance = opt.optimalDistance 
        || getOptimalDistance();
    opt.layoutBalancedSpace = opt.layoutBalancedSpace
        || opt.optimalDistance;
    opt.initialStep = opt.initialStep 
        || opt.optimalDistance / 5; 
    opt.quadTreeMaxLevel = opt.quadTreeMaxLevel || 8;
    opt.barnesHutTheta = opt.barnesHutTheta || 1.2;
    opt.convergenceThreshold = opt.convergenceThreshold || 1e-4;
    opt.maxIterations = opt.maxIterations || 2;

    prefix = opt.readPrefix || opt.writePrefix || '';
    step = opt.initialStep;
    iterations = opt.maxIterations; 

    debugShow('options', opt, '\n');

    // prepare prefix access
    nodes.forEach(function(node){
        node[prefix + 'x'] = node.x;
        node[prefix + 'y'] = node.y;
    });

    if(nodes.length <= 1){
        return {
            isConverged: 1
            , iterations: 0
        };
    }

    do {

        quadTree = buildBHQuadTree({nodes: nodes}
            , opt.quadTreeMaxLevel
            , {readPrefix: prefix}
        );

        nodes.forEach(function(node){
            node.dx = node.dy = 0;
        });

        nodes.forEach(function(node){
            var f = computeRepulsionForce(node, quadTree, opt);
            node.dx += f.dx;
            node.dy += f.dy;
        });

        // debugShow(1, nodes.map(function(node){
        //     return node.dx + ',' + node.dy
        // }), '\n');

        edges.forEach(function(edge){
            var n1 = sigma.utils.getNodeById(nodes, edge.source)
                , n2 = sigma.utils.getNodeById(nodes, edge.target)
                , f
                ;

            if(n1.id != n2.id){
                f = computeAttractionForce(n1, n2, opt);
                // debugShow('1.x', force);
                n1.dx += f.dx;
                n1.dy += f.dy;
                n2.dx -= f.dx;
                n2.dy -= f.dy;
            }
        });

        // debugShow(2, nodes.map(function(node){
        //     return node.dx + ',' + node.dy
        // }), '\n');

        // compute energy and move nodes according to force
        energyPrev = energy;
        energy = 0;
        nodes.forEach(function(node){
            var e, scale;

            e = node.dx * node.dx + node.dy * node.dy;
            scale = Math.sqrt(e);

            energy += e;

            if(!node.fixed){
                // normalized vector
                node.dx /= scale; 
                node.dy /= scale;

                node[prefix + 'x'] += step * node.dx;
                node[prefix + 'y'] += step * node.dy;
            }

            delete node.dx;
            delete node.dy;
        });

        // debugShow(3, nodes.map(function(node){
        //     return '[' + node.x 
        //         + ',' + node.y
        //         + '] => [' + node[prefix + 'x'] 
        //         + ',' + node[prefix + 'y'] 
        //         + ']'
        //         ;
        // }), '\n');

        // update step -- adaptive cooling
        updateStep();

        // check if converged
        energyChangeRatio = Math.abs(energy - energyPrev) / energy; 
        debugShow('energyChangeRatio', energyChangeRatio, energy, energyPrev);
        if(energyChangeRatio < opt.convergenceThreshold){
            isConverged = 1;
            debugShow('\n' + 4, 'converged!');
        }

    } while (!isConverged && --iterations);

    if(layoutBalanced){
        forest = sigma.utils.getLayoutForest(
            nodes
            , edges
        );
        sigma.utils.layoutTreesByGrid(
            forest
            , {
                optimalDistance: opt.layoutBalancedSpace
                , readPrefix: 'yfh_'
                , spaceGrid: spaceGrid 
            }
        );
    }

    return {
        isConverged: isConverged
        , iterations: opt.maxIterations - iterations
    };

    // optimalDistance = C^(1/3) * averageEdgeLength
    function getOptimalDistance(){
        var edgeLength = 0
            , len = edges.length
            , avgLength
            ;

        edges.forEach(function(edge){
            edgeLength += getDistance(
                sigma.utils.getNodeById(nodes, edge.source)
                , sigma.utils.getNodeById(nodes, edge.target)
                , {
                    readPrefix: prefix
                }
            );
        });
        avgLength = edgeLength / len;
        return Math.pow(opt.relativeStrength, 1/3) * avgLength;
    }

    function updateStep(){
        if( energy < energyPrev){
            progress++;
            if(progress >= 5){
                progress = 0;
                step /= opt.stepRatio;
            }
        }
        else{
            progress = 0;
            step *= opt.stepRatio;
        }
        debugShow('step', step);
    }

    function debugShow(){
        if('function' == typeof opt.debugShow){
            opt.debugShow.apply(window, arguments);
        }
    }

}; 





} )();
