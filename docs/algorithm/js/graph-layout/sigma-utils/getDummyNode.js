sigma.utils.getDummyNode = function( options ) {
    var opt = options || {} 
        , node = {
            x: +opt.x === opt.x ? opt.x : null
            , y: +opt.y === opt.y ? opt.y : null
            , size: opt.size || 1
            , color: opt.color || '#f00'
            , _isdummy: 1
        };

    node.id = 'dummynode_' 
        + new Date().getTime()
        + '_' + ( Math.random() + '' ).substr( 2, 6 )
        ;

    node.label = node.id;

    return node;
};   
