sigma.utils.sortByNodesDegree
    = function( nodes, edges, reverse ) {

    if(!nodes || !edges) {
        throw new Error( 'sigma.utils.sortByNodesDegree: empty `nodes` or `edges`' );
    }

    var degreeArr = [] 
        , retNodes = []
        , degree
        , node, edge, i, j
        ;

    for(i=0; i<nodes.length; i++){
        node = nodes[i];
        degree = {
            node: node
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
        return ( 
            reverse
                ? b.data - a.data
                : a.data - b.data
        );
    });

    degreeArr.forEach( function( item ) {
        retNodes.push( item.node );
    } );

    return retNodes;

};   
