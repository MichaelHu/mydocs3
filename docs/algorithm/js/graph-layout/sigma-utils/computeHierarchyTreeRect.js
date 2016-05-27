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

