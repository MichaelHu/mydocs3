# graph layout 3

> 网络拓扑图布局算法研究3，续`graph layout 2`

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-graph {
    height: 400px;
}
.test-graph div {
    float: left;
    height: 100%;
    width: 50%;
    border: 1px dotted #666;
}
.test-graph div.test-graph-left-top,
.test-graph div.test-graph-right-top,
.test-graph div.test-graph-left-bottom,
.test-graph div.test-graph-right-bottom {
    height: 50%;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.plugins.animate.min.js"></script>

<script src="./js/graph-layout/utils.js"></script>
<script src="./js/graph-layout/Grid/grid.js"></script>
<script src="./js/graph-layout/quadTree/bhQuadTree.js"></script>
<script src="./js/graph-layout/sigma-utils.js"></script>
<script src="./js/graph-layout/sigma-graph.js"></script>
<script src="./js/graph-layout/sigma-prototype.js"></script>
<script src="./js/sigma-extend/enable-drag.js"></script>

<script src="./js/graph-data/all.js"></script>





## 环形布局

> 固定布局-续


### 算法描述


#### 环形布局算法

从`中心点`root开始，对图进行`环形`布局。

1. 从`中心点`开始，获取图的`环形广度遍历森林`。可能包含`多棵`遍历树。
2. 针对每棵遍历树`tree`，计算中心点的`回路`，若`有回路`，`goto 3`，`无回路`，`goto 4`
3. 若`中心点`在一个`回路`中，则选取包含中心点的`最长回路`，将该回路的所有节点分布在`第一层`圆环上，然后将以每个节点为根的`布局树``按层次`排布在`外面`的`圆环`上
4. 若中心点`不在`任何回路中，则中心点放置在图形`中点`，然后将以中心点为根的`布局树`按`层次`排布在`外面`的`圆环`上



`参数`：

* `angleStep`，在圆环上排布节点时的角度增量，该值对于不同层次的圆环不能一致，一般与半径成反比



#### 优化策略

* `root`选取，以`最大度数`节点作为获取遍历森林时的起点，可以一定程度上避免`边交叉`以及`树状`布局
* `无回路`情况的tree，将根节点放置在`圆环中心`
* 使用连通图的`最大复杂回路`取代从root开始的回路



#### 应用场景

* 适用于边数大于节点数，存在回路的图
* 对于层次较多的纯树形布局，效果不好






### 依赖方法

其他依赖方法可以从<a href="./graph-layout.md.preview.html">graph-layout</a>获取。主要包括：
`getCircleForest()`, `getCircuits()`等。


#### getGraphFromTree

`getGraphFromTree( tree, allEdges )`: 从`树`结构中获取`图`信息，包含nodes和edges。

    @[data-script="javascript"]sigma.utils.getGraphFromTree
        = function( tree, allEdges ) {
        var nodes = []
            , nodesHash = {}
            , edges = []
            ;

        allEdges = allEdges || [];
        depthTravel( tree );
        allEdges.forEach( function( edge ) {
            if ( nodesHash[ edge.source ]
                || nodesHash[ edge.target ] ) {
                edges.push( edge );
            }
        } );
        return {
            nodes: nodes
            , edges: edges
        };

        function depthTravel( node ) {
            nodes.push( node );
            nodesHash[ node.id ] = 1;
            if ( node._wt_children ) {
                node._wt_children.forEach( function( child ) {
                    depthTravel( child );
                });
            }
        }
    }; 



<div id="test_getcomplicatedloops" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_getcomplicatedloops');
        var g = networkGraph_complicated_loops_0928;
        var forest = sigma.utils.getLayoutForest( g.nodes, g.edges );
        var newGraph;

        if ( forest.length == 1 ) {
            newGraph = sigma.utils.getGraphFromTree( forest[ 0 ], g.edges );
            s.show( 
                'old graph: [ ' + g.nodes.length + ', ' + g.edges.length + ' ] ' 
                , 'new graph: [ ' + newGraph.nodes.length + ', ' + newGraph.edges.length + ' ] ' 
            );
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



#### getMaxComplicatedLoop

`getMaxComplicatedLoop( nodes, edges, options )`: 获取连通图的`最大`复杂回路。
`复杂回路`的介绍见下方`getComplicatedLoops()`。

    @[data-script="javascript"]sigma.utils.getMaxComplicatedLoop
        = function( nodes, edges, options ) {
        var opt = options || {}
            , loops = sigma.utils.getComplicatedLoops(
                nodes, edges, opt
            )
            , maxLoops = null
            ;

        loops = loops.complicated;
        if ( loops.length ) {
            loops.sort( function( loopA, loopB) {
                return loopB.length - loopA.length;
            } );
            maxLoops = loops[ 0 ];
        }

        return maxLoops;
    };




#### getComplicatedLoops

> 图的遍历算法与`孩子选取`、`遍历顺序`、`信息传递`等相关，不同方式能达到不同的遍历效果。


`getComplicatedLoops( nodes, edges, options )`: 获取连通图的所有`复杂回路`。

复杂回路定义，简单说，`复杂回路`就是回路中`点`可以`重复`，`边不`能`重复`。

如下图所示：

 @[style="padding-left: 50px;"]<img src="./img/graph-complicated-loop.png" height="500">

`算法描述`：

> 寻找连通图G的所有复杂回路(loop)。

1. 使用`depthTravel`。
2. 遍历过程中，每个`节点`可能被`多次访问`，但其孩子节点`只展开一次`。被访问过的节点不再对其孩子节点展开。
3. `孩子`节点的`选取`不受是否被访问过的影响，但深度遍历路径上的`父亲`节点`不能`被选为孩子节点。
4. 访问孩子节点前，判断其是否被访问过，如果被访问过，则表示找到一个回路，`记录`下该`回路`信息，不再展开该孩子节点。
5. 孩子节点访问完，进行如下判断：
    * 孩子节点与父亲节点`不存在回路`，将从path中抛出，抛出的子节点若本身在一个loop中，则该loop是一个复杂回路。
    * 孩子节点与父亲节点`存在回路`，则保持孩子节点，并将孩子节点的回路信息`合并`至父亲节点中。
6. 上图`节点8、9、10`形成的复杂回路中，深度遍历路径为`8->9->10`，其中8和10互为孩子节点，只在`节点10`的展开过程中`发现loop`，并向上`传递`，并在节点8处判断是否保留该回路。




> @param {object} [options]

    { 
        getSimpleLoop: 0
    }


以下为代码实现：

    @[data-script="javascript"]sigma.utils.getComplicatedLoops
        = function ( nodes, edges, options ) {
        var opt = options || {}
            , visitedNodes = {}
            , path = []
            , complicatedLoops = []
            , subPathIfAny
            , root

            // only for simple loops
            , ancestors = [] 
            , simpleLoops = []
            , getSimpleLoop = opt.getSimpleLoop
            ;

        if ( nodes.length ) {
            root = opt.root || nodes[ 0 ];

            if ( root ) {
                _depthTravel( root );
            }

            if ( path.length > 1 ) {
                subPathIfAny = _pathPopTill( root );
                if ( subPathIfAny.length ) {
                    complicatedLoops.push( subPathIfAny );
                }
            }

            nodes.forEach( function( node ) {
                delete node._tmp_children;
                delete node._loops;
            } );
        }

        return {
            complicated: complicatedLoops
            , simple: simpleLoops
        };

        function _depthTravel( node, parent ) {
            var _children = _getChildren( node, parent )
                , _nodeId = node.id
                ;

            path.push( node );

            visitedNodes[ _nodeId ] = 1
            node._loops = [];

            // for simple loops
            if ( getSimpleLoop ) {
                ancestors.push( node );
            }

            _children.forEach( function( _child ) {
                var _childId = _child.id
                    , _loop
                    , _simpleLoop  // for simple loop
                    , _loops
                    , _inSameLoop = 0
                    , _subPath
                    ;

                if ( visitedNodes[ _childId ] ) {
                    // loop nodes sequence must begin from node which is visited earlier.
                    if ( 
                        path.indexOf( _child ) < path.indexOf( node )
                        ) {
                        _loop = _pathGetLoop( _child, node ); 
                        node._loops.push( _loop );

                        // for simple loop
                        if ( getSimpleLoop ) {
                            _simpleLoop = _pathGetLoop( _child, node, ancestors );
                            simpleLoops.push( _simpleLoop );
                        }
                    }
                }
                else {
                    _depthTravel( _child, node );

                    _loops = _child._loops;
                    _loops.forEach( function( loop ) {
                        for ( var i = 0; i < loop.length; i++ ) {
                            if ( loop[ i ].id == _nodeId ) {
                                node._loops.push( loop );
                                _inSameLoop = 1;
                                break;
                            }
                        }
                    } );

                    if ( !_inSameLoop ) {
                        _subPath = _pathPopTill( _child );
                        if ( _subPath.length > 1 ) {
                            complicatedLoops.push( _subPath );
                        }
                    }
                }
            } );

            if ( getSimpleLoop ) {
                ancestors.pop();
            }

            // console.log( 'loops length of ' + node.id + ': ' + node._loops.length );
        }

        function _pathGetLoop( from, to, ancestors/* extend for simple loop */ ) {
            var _path = ancestors || path 
                , i = _path.length - 1
                , loop = []
                , toNodeFound = 0
                , node
                ;

            if ( i < 0 ) {
                // assertion
                throw new Error( '_pathGetLoop: _path empty' );
            }

            // if ( _path[ i ].id != to.id ) {
            //     throw new Error( '_pathGetLoop: the last element is not matched!' );
            // } 

            while ( i >= 0 ) {
                node = _path[ i ];
                if ( !toNodeFound ) {
                    if ( node.id == to.id ) {
                        toNodeFound = 1;
                        loop.push( node );
                    }
                }
                else {
                    loop.push( node );
                    if ( node.id == from.id ) {
                        break;
                    }
                }
                i--;
            }

            if ( !toNodeFound ) {
                throw new Error( '_pathGetLoop: _path doesn\'t contain `to` node!' );
            }

            if ( i < 0 ) {
                console.log( visitedNodes, _path, from, to );
                throw new Error( '_pathGetLoop: _path doesn\'t contain `from` node!' );
            }

            return loop.reverse();
        }

        function _pathPopTill( node ) {
            var len = path.length
                , i = len - 1
                ;

            if ( i < 0 ) {
                throw new Error( '_pathPopTill: path empty!' );
            }

            while ( i >= 0 ) {
                if ( path[ i ].id == node.id ) {
                    break;
                }
                i--;
            }

            if ( i < 0 ) {
                throw new Error( '_pathPopTill: path doesn\'t contain node!' );
            }

            return path.splice( i, len - i ); 
        }

        function _getChildren( node, parent ) {
            var id = node.id
                , children = []
                , childId
                , parentId = parent && parent.id
                , child
                ;

            if ( node._tmp_children ) {
                return node._tmp_children;
            }

            edges.forEach( function( edge ) {
                if ( edge.source == id
                    || edge.target == id
                ) {
                    childId = edge.source;
                    if ( childId == id ) {
                        childId = edge.target;
                    }

                    if ( childId != parentId ) {
                        child = sigma.utils.getNodeById( nodes, childId );
                        // maybe duplicated edges
                        if ( children.indexOf( child ) < 0 ) {
                            children.push( child );
                        }
                    } 
                }
            } );

            return ( node._tmp_children = children );
        }

    };


<div id="test_getComplicatedLoops" class="test">
<div class="test-container">
<div id="test_getComplicatedLoops_graph" class="test-graph">
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_getComplicatedLoops');
        // var g1 = getRandomGraph(10, 10, 10);
        // var g1 = networkGraph_complex_hier_160817; 
        // var g1 = networkGraph_complex_hier_160816;
        var g1 = networkGraph_complex_hier_160820; 
        var g1 = networkGraph_complicated_loops_0928;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_3;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_person_event_event_person_0729;
        // var g1 = networkGraph_person_event_event_person_0801;
        // var g1 = networkGraph_triangle_0801_2;
        var containerId = 'test_getComplicatedLoops_graph';
        var rendererSettings = {
                // captors settings
                doubleClickEnabled: true
                , mouseWheelEnabled: false

                // rescale settings
                , minEdgeSize: 0.5
                , maxEdgeSize: 1
                , minNodeSize: 1 
                , maxNodeSize: 5

                // renderer settings
                , edgeHoverColor: fly.randomColor() 
                , edgeHoverSizeRatio: 1
                , edgeHoverExtremities: true
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 5 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
                , autoRescale: 0
            };

        var sm1;

        if((sm1 = isSigmaInstanceExisted('test_getComplicatedLoops'))){
            sm1.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_getComplicatedLoops'
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId)[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm1
            .normalizeSophonNodes()
            .alignCenter({rescaleToViewport: 1})
            .refresh()
            ;

        sigmaEnableNodeDrag( sm1 );

        var forest = sm1.graph.getLayoutForest()
            , loops
            , maxLoop
            ;

        s.show( 'get complicated loops:' );
        if ( forest.length ) {
            loops = sigma.utils.getComplicatedLoops( g1.nodes, g1.edges );
            s.append_show( 'original node count: ' + g1.nodes.length );
            s.append_show( '\ncomplicated loops: ' );
            s.append_show( loops.complicated.map( function( loop ) {
                return { 
                    size: loop.length
                    , loop: loop.map( function( node ) { return node.id; } )
                }
            } ) ); 

            s.append_show( 
                '\nsimple loops ( empty by default, non-empty only if `option.getSimpleLoop` is on): ' 
            );
            s.append_show( loops.simple.map( function( loop ) {
                return { 
                    size: loop.length
                    , loop: loop.map( function( node ) { return node.id; } )
                }
            } ) ); 

            s.append_show( 
                '\nmax complicated loop:' 
            );
            maxLoop = sigma.utils.getMaxComplicatedLoop( g1.nodes, g1.edges );

            if ( maxLoop ) {
                s.append_show( {
                    size: maxLoop.length
                    , loop: maxLoop.map( function( node ) { 
                        return node.id; 
                    }) 
                } ); 
            }
            else {
                s.append_show( { size: 0, loop: [] } );
            }
        }

    })();

</div>
<div class="test-panel"></div>
</div>





### 算法实现


#### 简版实现

`环形布局`简版算法如下，`未做``均衡`算法，多棵`树`之间会产生`重叠`：

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'layoutCircleSimple'
        , function(){

        var forest = this.getCircleForest()
            , treeOffsetX = 0
            , PI = Math.PI
            , radius = 0.5 
            , radiusStep = radius 
            , initialAngleStep = 20 * PI / 180
            , angleStep = initialAngleStep
            ;

        sigma.utils.computeLeaves(forest);

        forest.forEach(function(tree){
            var circuit
                , angle = 0
                , maxLevel = 1
                ; 

            // if there is a circuit, layout it with a circle
            if(tree._circuit){
                circuit = tree._circuit;     
                angleStep = 2 * PI / circuit.length;
                circuit.forEach(function(node){
                    depthTravel(node, angle, radius);
                    angle += angleStep; 
                });
            }
            else {
                depthTravel(tree, angle, 0);
            }
            tree._wt_maxlevel = maxLevel;

            // depthTravel(tree, treeOffsetX);
            // treeOffsetX += tree._wt_leaves;

            function depthTravel(node, angle, radius){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level
                    , len = children.length
                    , circleX
                    , circleY
                    , angleStep = initialAngleStep / level
                    , angleStart = angle - len * angleStep / 2
                    , _angle = angleStart + angleStep / 2
                    ;

                if(level > maxLevel) {
                    maxLevel = level;
                }

                circleX = radius * Math.cos(angle);
                circleY = radius * Math.sin(angle); 

                node.circle_x = circleX;
                node.circle_y = circleY;

                // console.log(radius, angle, circleX, circleY, angleStep);

                if(len > 0){
                    children.forEach(function(child){
                        depthTravel(child, _angle, radius + radiusStep);
                        _angle += angleStep;
                    }); 
                }
            }

        });

        // console.log(forest);

        return this;
    });



#### 均衡化版本（试验）


使用`均衡布局`优化的`环形布局`算法如下：

    @[data-script="javascript"]sigma.prototype.layoutCircle
        = function(options){
        var me = this;
        me.initializeLayout();

        var opt = options || {}
            , forest = me.graph.getCircleForest(opt)
            , treeOffsetX = 0
            , PI = Math.PI
            , radius = opt.radius || 1 
            , radiusStep = radius 
            , initialAngleStep = 15 * PI / 180
            , angleStep = initialAngleStep
            , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}
            // for tendency
            , angleOffset = 20 * PI / 180
            ;

        sigma.utils.computeLeaves(forest);

        var a = forest.map(function(tree){
            return tree.id 
        }).join(', ');
        // console.log(a);

        forest.forEach(function(tree){
            var circuit
                , angle = PI / 2 
                , maxLevel = 1
                , hasCircuit = tree._circuit ? 1 : 0
                ; 

            // if there is a circuit, layout it with a circle
            if(hasCircuit){
                circuit = tree._circuit;     
                angleStep = 2 * PI / circuit.length;
                circuit.forEach(function(node){
                    depthTravel(node, angle, radius);
                    angle += angleStep; 
                });
            }
            else {
                depthTravel(tree, angle, 0);
            }
            tree._wt_maxlevel = maxLevel;

            // depthTravel(tree, treeOffsetX);
            // treeOffsetX += tree._wt_leaves;

            function depthTravel(node, angle, radius, tendency){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level
                    , len = children.length
                    , circleX
                    , circleY
                    , angleStep = initialAngleStep / level
                    , angleStart = angle - len * angleStep / 2
                    , _angle = angleStart + angleStep / 2
                    , tendency = tendency || 1
                    ;

                if(level > maxLevel) {
                    maxLevel = level;
                }

                circleX = radius * Math.cos(angle);
                circleY = radius * Math.sin(angle); 

                node.circle_x = circleX;
                node.circle_y = circleY;

                // console.log(radius, angle, circleX, circleY, angleStep);

                if(len > 0){

                    if(!hasCircuit && level == 1 && opt.makeRootCenter){
                        angleStep = 2 * PI / len;  
                    }

                    if(len == 1) {
                        // _angle = angleStart + ( tendency ? 1 : -1 ) * level * angleOffset;
                    }
                    children.forEach(function(child){
                        depthTravel(child, _angle, radius + radiusStep, 1 - tendency);
                        _angle += angleStep;
                    }); 
                }
            }

        });


        var grid = new Grid(spaceGrid.xSize, spaceGrid.ySize)
            , debug = 0
            , id = 2
            ;

        forest.sort(function(a, b){
            return b._wt_maxlevel - a._wt_maxlevel;
        });

        forest.forEach(function(tree){
            var spaceBlock = sigma.utils.computeCircleTreeRect(tree)
                ;

            grid.placeBlock(tree.id, spaceBlock, debug);
        });

        var output = grid.grid.map(
                function(row){
                    return row.join('  ');
                }
            ).join('\n');

        // console.log(output);

        forest.forEach(function(tree){
            var spaceBlock = grid.getBlockRect(tree.id) 
                , hasCircuit = tree._circuit ? 1 : 0
                , dx = ( 
                        spaceBlock.gridPos.x 
                        + ( hasCircuit ? spaceBlock.w / 2 : 0 ) 
                    ) * radius
                , dy = ( 
                        spaceBlock.gridPos.y 
                        + ( hasCircuit ? spaceBlock.h / 2 : 0 ) 
                    ) * radius
                ;

            // if there is a circuit
            if(tree._circuit){
                tree._circuit.forEach(function(node){
                    depthTravel(node);
                });
                delete tree._circuit;
            }
            else {
                depthTravel(tree);
            }

            function depthTravel(node){
                var children = node._wt_children
                    ;

                node.circle_x += dx;
                node.circle_y += dy;

                if(children.length > 0){
                    children.forEach(function(child){
                        depthTravel(child);
                    }); 
                    delete node._wt_children;
                }
            }
        });

        return this;
    };




#### 充分优化版本


使用`均衡布局`、`自适应半径`、`复杂回路中心`优化的`环形布局`算法：

> @param {object} [options]

    {
        nodeOccupiedSpace: 30
        , radiusStep: 100
        , initialAngleRange: Math.PI / 3 
        , spaceGrid: { xSize: 40, ySize: 40 }
        , makeRootCenter: 0
        // 针对无回路图，总是将最大度数节点放在中间
        , makeMaxDegreeNodeRoot: 0
        , sortCircuit: function( a, b ) { return a - b; }
        , sortChildren: function( a, b ) { ... }
        // 是否使用复杂回路中心
        , useComplicatedLoop: 1
    }


算法实现如下：

    @[data-script="javascript"]sigma.prototype.layoutCircle2
        = function(options){
        var me = this;
        me.initializeLayout();

        var opt = options || {}
            , forest = this.graph.getCircleForest(opt)
            , treeOffsetX = 0
            , PI = Math.PI
            , nodeSize = forest.length && forest[ 0 ].size || 0.2 
            , nodeOccupiedSpace = opt.nodeOccupiedSpace || nodeSize * 3 
            , radiusStep = opt.radiusStep || 2 
            , initialAngleRange = opt.initialAngleRange || PI 
            , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}
            , sortCircuit = opt.sortCircuit || 0
            , sortChildren = opt.sortChildren || 0
            , radius
            ;

        sigma.utils.computeLeaves(forest);

        forest.forEach(function(tree){
            var circuit
                , angle = PI / 2 
                , maxLevel = 1
                , hasCircuit = tree._circuit ? 1 : 0
                , angleStep
                , config
                ; 

            // if there is a circuit, layout it with a circle
            if(hasCircuit){
                circuit = tree._circuit;     
                config = _getAngleStepAndRadius(
                    2 * PI // layout the circuit with a circle
                    , circuit.length 
                    , radiusStep
                    , 0
                    , { fillMaxAngleRange: 1 }
                );
                angleStep = config.angleStep;
                radius = config.radius; 

                if( typeof sortCircuit == 'function' ) {
                    circuit.sort( sortCircuit );
                }
                
                circuit.forEach(function(node){
                    depthTravel(node, angle, radius);
                    angle += angleStep; 
                });
            }
            else {
                depthTravel(tree, angle, 0);
            }
            tree._wt_maxlevel = maxLevel;

            function depthTravel(node, angle, radius){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level
                    , len = children.length
                    , circleX
                    , circleY
                    , forMakeRootCenter = 
                        !hasCircuit && level == 1 && opt.makeRootCenter

                    // todo: adaptive angle range
                    , maxAngleRange = (
                        forMakeRootCenter
                            ? 2 * PI
                            : initialAngleRange / level
                    )

                    , config = _getAngleStepAndRadius(
                        maxAngleRange
                        , len || 1
                        , radiusStep
                        , radius
                        , { fillMaxAngleRange: forMakeRootCenter ? 1 : 0 }
                    )
                    , angleRange = config.angleRange 
                    , _angleStep = config.angleStep 
                    , _radius = config.radius
                    , angleStart = angle - angleRange / 2
                    , _angle = angleStart + _angleStep / 2
                    ;

                if(level > maxLevel) {
                    // maxLevel is in `forest.forEach` context
                    maxLevel = level;
                }

                circleX = radius * Math.cos(angle);
                circleY = radius * Math.sin(angle); 

                node.circle_x = circleX;
                node.circle_y = circleY;

                if(len > 0){
                    if( typeof sortChildren == 'function' ) {
                        children.sort( sortChildren );
                    }

                    children.forEach(function(child){
                        depthTravel(child, _angle, _radius);
                        _angle += _angleStep;
                    }); 
                }
            }

        });

        function _getAngleStepAndRadius(
            maxAngleRange, nodeCount, radiusStep, radiusStart, options){

            var opt = options || {} 
                , radius
                , angleStep
                , angleRange
                , radian
                , i = 0
                ;

            while(1){
                i++;
                radius = radiusStart + i * radiusStep;
                radian = nodeOccupiedSpace * nodeCount / radius;
                if ( radian <= maxAngleRange ) {
                    break;
                }
            }

            if ( opt.fillMaxAngleRange ) {
                angleRange = maxAngleRange;
            }
            else {
                angleRange = radian;
            }

            angleStep = angleRange / nodeCount;

            return {
                radius: radius
                , angleRange: angleRange
                , angleStep: angleStep
            };
        }


        sigma.utils.layoutTreesByGrid(
            forest
            , {
                spaceGrid: spaceGrid
                , optimalDistance: radiusStep
                , readPrefix: 'circle_'
            }
        );

        me.graph.nodes().forEach( function( node ) {
            delete node._wt_children;
            delete node._circuit;
        } );


        return this;

    };




### 算法演示

以下示例展示`环形`布局算法，`右下角`为充分优化版本的排布效果：

<div id="test_5" class="test">
<div class="test-container">
<div id="test_5_graph" class="test-graph" style="height: 800px">
<div class="test-graph-left-top"></div>
<div class="test-graph-right-top"></div>
<div class="test-graph-left-bottom"></div>
<div class="test-graph-right-bottom"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_5');
        var g1 = getRandomGraph(15, 30, 8);
        // var g1 = networkGraph_circle_0628;
        // var g1 = networkGraph_mesh_0628;
        // var g1 = getLineGraph(14, 30, {nodeSize: 8});
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        // var g1 = networkGraph0520;
        // var g1 = networkGraph_grid_0521; 
        // var g1 = networkGraph_tree_0521;
        // var g1 = networkGraph_2circles_0523;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_tree_0524;
        // var g1 = networkGraph_many_children_0526;

        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
            }
            , g3 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
            }
            , g4 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
            }
            ;
        var containerId = 'test_5_graph';
        var rendererSettings = {
                // captors settings
                doubleClickEnabled: true
                , mouseWheelEnabled: false

                // rescale settings
                , minEdgeSize: 0.5
                , maxEdgeSize: 1
                , minNodeSize: 1 
                , maxNodeSize: 5

                // renderer settings
                , edgeHoverColor: fly.randomColor() 
                , edgeHoverSizeRatio: 1
                , edgeHoverExtremities: true
                , drawLabels: false
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
                , autoRescale: false
                , zoomMin: 0.01
                , zoomMax: 100
            };

        var sm1, sm2, sm3, sm4;

        if((sm1 = isSigmaInstanceExisted('test_5_left_top'))
            && (sm2 = isSigmaInstanceExisted('test_5_right_top'))
            && (sm3 = isSigmaInstanceExisted('test_5_left_bottom'))
            && (sm4 = isSigmaInstanceExisted('test_5_right_bottom'))){
            sm1.kill();
            sm2.kill();
            sm3.kill();
            sm4.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_5_left_top'
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-left-top')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm2 = getUniqueSigmaInstance(
                    'test_5_right_top'
                    , {
                        settings: sigmaSettings 
                        , graph: g2
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-right-top')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm3 = getUniqueSigmaInstance(
                    'test_5_left_bottom'
                    , {
                        settings: sigmaSettings 
                        , graph: g3
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-left-bottom')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm4 = getUniqueSigmaInstance(
                    'test_5_right_bottom'
                    , {
                        settings: sigmaSettings 
                        , graph: g4
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-right-bottom')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        

        sm1
            .normalizeSophonNodes()
            .alignCenter({rescaleToViewport: 1})
            .refresh()
            ;

        sm2
            .normalizeSophonNodes()
            .alignCenter({
                rescaleToViewport: 1
            })
            .refresh()
            .layoutCircle()
            .normalizeSophonNodes({
                readPrefix: 'circle_'
            })
            .alignCenter({
                rescaleToViewport: 1
                , readPrefix: 'circle_'
                , writePrefix: 'circle_'
            })
            ;


        var useNoverlap = 0;
        setTimeout(function(){
            sigma.plugins.animate(
                sm2
                , {
                    x: 'circle_x'
                    , y: 'circle_y'
                }
                , {
                    duration: 1000
                    , onComplete: function(){
                        if(!useNoverlap) return;
                        var noverlapListener = sm2.configNoverlap({
                                nodeMargin: 0.1,
                                scaleNodes: 1.05,
                                gridSize: 20,
                                easing: 'quadraticInOut',
                                duration: 5000
                            });
                        sm2.startNoverlap();
                    }
                }
            );

        }, 500);

        sm3
            .normalizeSophonNodes()
            .alignCenter({
                rescaleToViewport: 1
            })
            .refresh()
            .layoutCircle({
                makeRootCenter: 1
                , makeMaxDegreeNodeRoot: 1
            })
            .normalizeSophonNodes({
                readPrefix: 'circle_'
            })
            .alignCenter({
                rescaleToViewport: 1
                , readPrefix: 'circle_'
                , writePrefix: 'circle_'
            })
            ;

        setTimeout(function(){
            sigma.plugins.animate(
                sm3
                , {
                    x: 'circle_x'
                    , y: 'circle_y'
                }
                , {
                    duration: 1000
                }
            );

        }, 500);

        
        sm4
            .normalizeSophonNodes()
            .alignCenter({
                rescaleToViewport: 1
            })
            .refresh()
            .layoutCircle2({
                makeRootCenter: 1
                , makeMaxDegreeNodeRoot: 1
                , useComplicatedLoop: 1
                , nodeOccupiedSpace: 30
                , radiusStep: 100
                , initialAngleRange: Math.PI / 3
            })
            .normalizeSophonNodes({
                readPrefix: 'circle_'
            })
            .alignCenter({
                wholeView: 1
                , readPrefix: 'circle_'
                , writePrefix: 'circle_'
            })
            ;

        var useLayoutHierarchy = 0;
        setTimeout(function(){
            sigma.plugins.animate(
                sm4
                , {
                    x: 'circle_x'
                    , y: 'circle_y'
                }
                , {
                    duration: 1000
                    , onComplete: function(){
                        if(!useLayoutHierarchy) return;
                        setTimeout(function(){
                            sm4
                                .layoutHierarchy()
                                .normalizeSophonNodes({readPrefix: 'hier_'})
                                .alignCenter({
                                    rescaleToViewport: 1
                                    , readPrefix: 'hier_'
                                    , writePrefix: 'hier_'
                                })
                                .refresh()
                                ;

                            sigma.plugins.animate(
                                sm4
                                , {
                                    x: 'hier_x'
                                    , y: 'hier_y'
                                }
                               , {duration: 1000}
                            ); 
                        }, 1000);
                    }

                }
            );

        }, 500);

    })();

</div>
<div class="test-panel"></div>
</div>




## 布局方案比较

> 布局没有银弹。没有普遍适用的布局，只有合适的布局

方便后面的讨论，我们记连通图`G` = `( N, E )`，N为节点集，E为边集。`c(N)`为节点数目，`c(E)`为边数目。


### 层次布局

> 擅长`树图`的布局，一般而言，比较适合`c(N) > c(E)`的图。


`层次`布局适合树状结构的布局，`层次感`很清晰。

 <img src="./img/hier_n100_e50.png">

 <img src="./img/hier_tree.png">



但以下情况效果不好：

* `同层`孩子节点较多，但是总层次不多的情况，会出现`矮胖图`，两侧的子节点和父节点形成`超长边`；这种问题尚无较好解决办法，`块布局`可能解决方案，但它实现方案复杂，而且容易出现边和第三方节点交叉的问题。

    <img src="./img/hier_tree_many_children.png">

    <img src="./img/hier_cluster_n100.png">

    <img src="./img/hier_n1000_e1000.png">

    <img src="./img/hier_n1500_e1000.png">



* `边数`大于`节点数`的图，展示也不清晰

    <img src="./img/hier_n25_e50.png">

* 同层非相邻孩子节点间存在边的情况，容易出现连线穿过`第三个`节点的情况。不过这种问题也可以优化，调整节点顺序或者上下位置微调。

    <img src="./img/hier_edges_between_same_level.png">


* `网状`布局图显示不直观[`右侧`为布局结果]：

    <img src="./img/hier_mesh.png">



### 力导向布局


> 用模拟物理系统来排布节点，比较普遍适用。对于`树状`、`网格状`图等都有不错的展现方式。
> 其布局具有`簇结构`的特征，对于复杂网络图的`趋势`排布很有应用价值。

树状图的排布，与层次布局做比较的话，较多情况下后者更加稳定、精致。


`力导向`能`均衡`边的长度，整体形成`簇`的布局。整体形成舒展的布局。
对于层次布局遇到的问题，`力导向`布局能有更好的展现。

孩子节点数很多的情况：

 <img src="./img/yfh_cluster_n100.png.png">

 <img src="./img/yfh-big-cluster-layout.png">

节点和边都很多的情况：

 <img src="./img/yfh_n1000_e1000.png">

 <img src="./img/yfh_n1500_e1000.png">

其他情况：

 <img src="./img/yfh_n100_e50.png">

 <img src="./img/yfh_n25_e50.png">

 <img src="./img/yfh_tree.png">

 <img src="./img/yfh_tree_many_children.png">

`劣势`为计算量较大。

也有一些情况效果不好：

* `孤立节点`与其他簇或节点会`不断远离`，形成的整体效果空间上不均衡，如下所示。这种问题可以通过辅以`grid空间均衡`算法解决。

    <img src="./img/yfh_no_layoutBalanced.png">

* 受`前置布局`影响很大。特别是当前置布局为`线性`布局时，力导向布局表现就很差。这时可以通过修改`前置`布局来避免。 
    1. 比较理想的`前置`布局是`矩阵`布局
    2. `环形`前置布局也不是理想前置布局，因为存在不少距离很远的边，需要较长`演化`时间来拉近
    3. `完全重合点`无法使用力导向布局进行分离，如果前置布局存在完全重合点，也需要重置前置布局

* 某些类型的复杂网络图，比如`双核`图。可能`层次布局 ＋ 手工`的效果更好

    <img src="./img/yfh_two_cores_160810.png">
    
    双核图

    <img src="./img/hier_by_hand_160810.png">

    层次布局 ＋ 手工



### 环形布局

> 环形布局是对层次布局和力导向布局的有力补充。对于`c(N) >= c(E)`的情况，使用`最大复杂回路中心`的环形布局比层次和力导向更加清晰、直观。

复杂回路本身满足`c(N) >= c(E)`，回路节点间存在较多的边，使用圆形布局，天生避免边重叠，能得到较好的布局效果。

 <img src="./img/layout-circle-0929.png">


 <img src="./img/layout-circle-0929-1.png">

 完美的`星形图`。


### 有普适布局吗？

目前而言，`没有`一种布局是`普适性`的。根据场景的不同，对同一图的展示要求也会不同。
以下展示某一网络图使用`层次`布局、`力导向`布局，以及基于层次布局的`手工`布局的比较。

 <img src="./img/hierarchy-layout-of-complex-graph-160730.png" height="140">

 层次布局效果。
 
 <img src="./img/force-layout-of-complex-graph-160730.png" height="300">

 力导向布局效果。

 <img src="./img/optimized-layout-of-complex-graph-160730.png" height="400">

 基于层次布局的手工布局效果。

