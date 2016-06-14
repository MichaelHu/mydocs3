sigma.utils.interpolatesAngle
    = function(
        angleRange
        , numOfFirstLevel
        , levels
        , angleStart
    ) {
    var retArr = []
        , angleStart = angleStart || 0
        , numOfCurrentLevel
        , anglesOfCurrentLevel
        , stepOfCurrentLevel
        , angleOffset
        , i, j
        ;

    for(i=0; i<levels; i++){
        numOfCurrentLevel = ( i + 1 ) * numOfFirstLevel;
        anglesOfCurrentLevel = [];
        stepOfCurrentLevel = angleRange / numOfCurrentLevel;
        angleOffset = stepOfCurrentLevel * ( i == 0 ? 0 : 0.5 );
        angleOffset += angleStart;

        retArr.push(anglesOfCurrentLevel);
        for(j=0; j<numOfCurrentLevel; j++){
            anglesOfCurrentLevel.push(
                stepOfCurrentLevel * j + angleOffset
            );
        }
    }

    return retArr;
};
