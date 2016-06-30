sigma.prototype.applyLayoutInstantly
    = function(options){
    sigma.utils.applyLayoutInstantly(
        this.graph.nodes()
        , options
    );
    return this;
};
