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
