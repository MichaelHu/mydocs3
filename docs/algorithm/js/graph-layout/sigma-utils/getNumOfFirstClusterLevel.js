sigma.utils.getNumOfFirstClusterLevel
    = function(totalNum, max, min){

    var max = max || 18 
        , min = min || 1
        , i = 1
        , t = 0
        , m
        ;
    while(1){
        t += i; 
        m = Math.ceil(totalNum / t);
        if(m >= min && m <= max){
            return m;
        }
        i++;
    }
} 
