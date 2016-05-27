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

