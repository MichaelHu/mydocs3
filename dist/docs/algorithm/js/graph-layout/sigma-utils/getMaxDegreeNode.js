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

