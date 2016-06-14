sigma.utils.getClusterLevels
    = function(numOfFirstLevel, totalNum){

    var i = 1
        , step = numOfFirstLevel
        , all = 0
        ;

    do {
        all += i * step;
        i++;
    }
    while(all < totalNum);
    return i - 1; 
}   
