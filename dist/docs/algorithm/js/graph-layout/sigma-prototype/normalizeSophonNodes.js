sigma.prototype.normalizeSophonNodes
    = function(options){

    sigma.utils.normalizeSophonNodes(
        // note: `this.graph.nodesArray` will not work
        this.graph.nodes()
        , options
    );

    return this;
};     

