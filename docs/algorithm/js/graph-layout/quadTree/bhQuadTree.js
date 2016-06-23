(function(){

    var _id = 1;

    function quadTree(topX, topY, size, maxLevel, options){
        var me = this;

        me.topX = topX;
        me.topY = topY;
        me.size = size;
        me.maxLevel = maxLevel;
        me.opt = options || {};

        me.isLeaf = true;
        me.mass = 0;

        me._id = _id++;
        me._addStatus = 0;
    }

    quadTree.prototype.addNode = function(node){
        var me = this
            , addStatus
            ;

        if(me.topX > node.x || node.x > me.topX + me.size
            || me.topY > node.y || node.y > me.topY + me.size){
            return false;
        }

        addStatus = ++me._addStatus;
        // console.log('addNode: addStatus ' + addStatus + ', id: ' + me._id);
        switch( addStatus ) {
            case 1:
                return me.firstAdd(node);
            case 2:
                return me.secondAdd(node);
            default:
                return me.thirdAdd(node);
        }
    };



    // When first add, there is no division.
    quadTree.prototype.firstAdd = function(node){
        var me = this
            ;
        me.mass = 1;
        me.x = me.centerMassX = node.x;
        me.y = me.centerMassY = node.y;

        // console.log('firstAdd: addStatus ' + me._addStatus + ', id: ' + me._id);

        return true;
    };

    quadTree.prototype.secondAdd = function(node){
        var me = this
            ;

        // console.log('secondAdd: addStatus ' + me._addStatus + ', id: ' + me._id);

        if(0 == me.maxLevel) {
            return me.leafAdd(node);
        }
        else {
            me.divideTree();

            // This quadTree represents one node, add it to a child accordingly
            me.addToChildren(me);

            return me.rootAdd(node);
        }
    };

    quadTree.prototype.thirdAdd = function(node){
        var me = this
            ;

        // console.log('thirdAdd: maxLevel ' + me.maxLevel + ' , id: ' + me._id);

        if(0 == me.maxLevel) {
            return me.leafAdd(node);
        }
        else {
            return me.rootAdd(node);
        }
    };

    quadTree.prototype.rootAdd = function(node){
        var me = this
            ;

        // console.log('rootAdd: addStatus ' + me._addStatus + ', id: ' + me._id);

        me.assimilateNode(node);
        return me.addToChildren(node);
    };

    quadTree.prototype.leafAdd = function(node){
        var me = this
            ;

        // console.log('leafAdd: addStatus ' + me._addStatus + ', id: ' + me._id);

        me.assimilateNode(node);
        return true;
    };

    quadTree.prototype.assimilateNode = function(node){
        var me = this
            ;
        me.x = me.centerMassX = (me.mass * me.centerMassX + node.x) / (me.mass + 1);
        me.y = me.centerMassY = (me.mass * me.centerMassY + node.y) / (me.mass + 1);
        me.mass++;
    };

    quadTree.prototype.divideTree = function(){
        var me = this
            , _size = me.size
            , _childSize = _size / 2
            , _children
            , _topX = me.topX
            , _topY = me.topY
            , _maxLevel = me.maxLevel - 1
            , _top = [
                [ _topX + _childSize  , _topY + _childSize ]
                , [ _topX             , _topY + _childSize ]
                , [ _topX             , _topY              ]
                , [ _topX + _childSize, _topY              ]
            ]
            , i
            ;

        _children = me.children = [];
        for(i=0; i<_top.length; i++){
            _children.push(
                new quadTree(
                    _top[i][0]
                    , _top[i][1]
                    , _childSize
                    , _maxLevel
                    , me.opt
                )
            );
        }
        me.isLeaf = false;

        if('function' == typeof me.opt.ondivision){
            me.opt.ondivision(_topX, _topY, _size);
        }
    };

    quadTree.prototype.addToChildren = function(node){
        var me = this, i;

        for(i=0; i<me.children.length; i++){
            if(me.children[i].addNode(node)){
                return true;
            }
        }

        return false;
    };

    function buildBHQuadTree(graph, maxLevel, options){
        var nodes = graph.nodes || [] 
            , xMin = Infinity
            , yMin = Infinity
            , xMax = -Infinity
            , yMax = -Infinity
            , size
            , tree
            ;

        _id = 1;

        nodes.forEach(function(node){
            xMin = Math.min(xMin, node.x);
            yMin = Math.min(yMin, node.y);
            xMax = Math.max(xMax, node.x);
            yMax = Math.max(yMax, node.y);
        });

        size = Math.max(yMax - yMin, xMax - xMin);
        tree = new quadTree(xMin, yMin, size, maxLevel, options); 

        nodes.forEach(function(node){
            tree.addNode(node);
        });

        return tree;
    }

    window.buildBHQuadTree = buildBHQuadTree;;

})();
