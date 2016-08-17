# Hierarchy layout

> 层次布局算法研究和实践

> 信赖和善于利用经时间证明的智慧


<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.plugins.animate.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.layout.noverlap.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.layout.forceAtlas2.min.js"></script>
<script src="http://258i.com/static/bower_components/vivagraphjs/dist/vivagraph.min.js"></script>
<script src="http://258i.com/static/bower_components/lodash/dist/lodash.min.js"></script>

<script src="./js/graph-layout/utils.js"></script>
<script src="./js/graph-layout/sigma-utils.js"></script>
<script src="./js/graph-layout/sigma-graph.js"></script>
<script src="./js/graph-layout/sigma-prototype.js"></script>
<script src="./js/graph-layout/Grid/grid.js"></script>
<script src="./js/sigma-extend/enable-drag.js"></script>

<script src="./js/graph-data/all.js"></script>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-graph {
    height: 400px;
}
.test-graph svg {
    width: 100%;
    height: 100%;
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



## 算法描述

`相关概念`：

1. 选定一个`中心`节点，对图进行`广度遍历`，形成一片`遍历森林`（或者叫做`布局森林`）
2. `布局森林`中每个节点在以它为根的子树上拥有的`叶子节点数`(`node._wt_leaves`)，决定其在层次布局中的`宽度`；每个节点在遍历树中的`层级`(`node._wt_level`)，决定其在层次布局中的`层次`。
3. `布局森林`包含一到多棵`布局树`，对于每棵`布局树`，其`根节点`的`叶子节点数`为`leaves`，其节点的`最大层级`为`level`，在布局的时候将该布局树在尺寸为`leaves*level`的`网格`上进行`均衡`分布。 


`优化策略`：

1. `同层`兄弟节点有边，通过调整让`有边`的兄弟节点`靠近`
2. 避免`同层`其他边`穿过`节点`中心`
3. 两个`上层`节点同时与一个`下层`节点`有边`，通过调整让有边的兄弟节点`靠近`
4. `大量`同层`叶子型`节点，形成矩阵
5. 支持`横向`布局
6. `层高`与同层`邻接`节点`距离`可独立`配置`，特别对于同层孩子节点较多的情况，加大层高效果更明显

`适用场景`：

1. 边数`不大于`节点数的图形。
2. `树状`图



## 工具方法


### adjustSiblingsOrder

`adjustSiblingsOrder(parent, edges)`：`层次`布局中，`同层次`的`兄弟`节点之间如果存在边，则调整`有边`的兄弟节点`靠近`。

    @[data-script="javascript"]sigma.utils.adjustSiblingsOrder
        = function(parentNode, edges) {

        if(!parentNode || !parentNode._wt_children){
            console.log(arguments.callee
                , 'parentNode is null or parentNode._wt_children is not existed');
            return;
        }
        
        var nodes = parentNode._wt_children
            , edges = edges || []
            , visitedNodes = {}
            , node
            , index
            , len = nodes.length
            , j
            , adjacentNodes
            , flagLeft
            , flagRight
            ;

        while((index = _hasMoreIndex()) >= 0){
            node = nodes[index];
            visitedNodes[node.id] = 1;
            adjacentNodes = _getAdjacentNodes(node, nodes);
            flagLeft = 0;
            flagRight = 0;
            if(adjacentNodes && adjacentNodes.length){

                if(index>0 && adjacentNodes.indexOf(nodes[index-1]) < 0){
                    for(j=index-1; j>=0; j--){
                        if(adjacentNodes.indexOf(nodes[j]) >= 0){
                            nodes.splice(index, 1);
                            nodes.splice(j, 0, node);
                            flagLeft = 1;
                            break;
                        }
                    }
                } 

                if(flagLeft){
                    continue;
                }

                if(index<len - 1 && adjacentNodes.indexOf(nodes[index+1]) < 0){
                    for(j=index+1; j<len; j++){
                        if(adjacentNodes.indexOf(nodes[j]) >= 0){
                            nodes.splice(j-1, 0, node);
                            nodes.splice(index, 1);
                            break;
                        }
                    }
                } 

            }
        }

        function _hasMoreIndex(){
            for(var i=0; i<len; i++){
                var _node = nodes[i];
                if(!visitedNodes[_node.id]){
                    return i;            
                }
            }
            return -1;
        }

        function _getAdjacentNodes(node) {
            var retNodes = [];
            edges.forEach(function(edge){
                var adjNodeId, adjNode;

                if(edge.source == node.id){
                    adjNodeId = edge.target;
                }

                if(edge.target == node.id){
                    adjNodeId = edge.source;
                }

                if(!adjNodeId){
                    return;
                }

                if(adjNodeId != node.id){
                    if(nodes.map(function(node){return node.id;})
                        .indexOf(adjNodeId) >= 0){
                        adjNode = sigma.utils.getNodeById(nodes, adjNodeId);
                        retNodes.push(adjNode);
                    }
                }
            });
            return retNodes;
        }

    };



### avoidSameLevelTravelThrough

`avoidSameLevelTravelThrough(nodesOfSameLevel, edges)`：层次布局中，属于`同一层级`的所有节点中，`非靠近`节点之间存在边相连，调整中间节点的`上下位置`，`避免`边`穿过`中间节点，造成不直观的效果。

    @[data-script="javascript"]sigma.utils.avoidSameLevelTravelThrough
        = function(nodesOfSameLevel, edges) {

        if(!nodesOfSameLevel){
            console.log(arguments.callee
                , 'nodesOfSameLevel is null');
            return;
        }

        var nodes = nodesOfSameLevel 
            , edges = edges || []
            , unit = unit || 1
            , node, fromNode, toNode
            , len = nodes.length
            , i, j, k
            ;

        nodes.forEach(function(node){
            delete node._wt_dy;
        });

        for(i=0; i<len; i++){
            fromNode = nodes[i];
            for(j=i+2; j<len; j++){
                toNode = nodes[j];
                if(_isConnected(fromNode, toNode)){
                    for(k=i+1; k<j; k++){
                        node = nodes[k];     
                        // adjust once
                        if(node._wt_dy) {
                            continue;
                        }
                        node._wt_dy = ( k % 2 == 0 ? -1 : 1 );
                    }
                }
            }
        } 

        function _isConnected(fromNode, toNode){
            for(var i=0; i<edges.length; i++){
                var edge = edges[i];
                if(edge.source == fromNode.id
                        && edge.target == toNode.id
                    || edge.source == toNode.id
                        && edge.target == fromNode.id) {
                    return 1;
                } 
            }
            return 0;
        }

    };



### avoidChildrenTravelThrough

`avoidChildrenTravelThrough(parent, edges)`：层次布局中，属于`同一父节点`的所有`兄弟`节点中，`非靠近`节点之间存在边相连，调整中间节点的`上下位置`，`避免`边`穿过`中间节点，造成不直观的效果。


    @[data-script="javascript"]sigma.utils.avoidChildrenTravelThrough
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




### computeExternalNodes

`computeExternalNodes(tree)`：计算树结构中，以每个节点为根的子树的外部节点，并将外部节点列表以
`_wt_externalnodes`字段保存。

1. 每个节点都有`_wt_externalnodes`字段
2. 子节点的外部节点集合是父节点外部节点集合的子集
3. 祖先节点及当前节点本身都不属于当前节点的外部节点集合

该数据结构用于`同层`节点位置调整时的判断信息。


    @[data-script="javascript"]sigma.utils.computeExternalNodes
        = function( tree, options ) {

    };







### 方法验证


验证`adjustSiblingsOrder`, `avoidChildrenTravelThrough`等方法。


<div id="test_37" class="test">
<div class="test-container">
<div id="test_37_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_37');
        var g1 = getRandomGraph(10, 10, 1);
        var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        var g2 = networkGraph_edges_between_the_same_level_nodes;
        var containerId = 'test_37_graph';
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
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_37_left'))
            && (sm2 = isSigmaInstanceExisted('test_37_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_37_left'
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-left')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm2 = getUniqueSigmaInstance(
                    'test_37_right'
                    , {
                        settings: sigmaSettings 
                        , graph: g2
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-right')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        var forest = sm1.graph.getLayoutForest()
            ;

        forest.forEach(function(tree){

            s.show('before order adjusting:');
            s.append_show(
                tree._wt_children.map(function(node){
                    return node.id;
                })
            );
    
            sigma.utils.adjustSiblingsOrder(tree, sm1.graph.edges());

            s.append_show('after order adjusting:');
            s.append_show(
                tree._wt_children.map(function(node){
                    return node.id;
                })
            );

            tree = sm1.graph.nodes('n3'); 
            s.append_show('before order adjusting:');
            s.append_show(
                tree._wt_children.map(function(node){
                    return node.id;
                })
            );
    
            sigma.utils.adjustSiblingsOrder(tree, sm1.graph.edges());

            s.append_show('after order adjusting:');
            s.append_show(
                tree._wt_children.map(function(node){
                    return node.id;
                })
            );
        });

        sm1.refresh();

        forest = sm2.graph.getLayoutForest();
        
        forest.forEach(function(tree){

            tree = sm2.graph.nodes('n0'); 
            s.append_show('\nbefore travel through adjusting:');
            s.append_show(
                tree._wt_children.map(function(node){
                    return node.id + ':' + ( node._wt_dy || 0 );
                })
            );
    
            sigma.utils.avoidChildrenTravelThrough(tree, sm2.graph.edges());

            s.append_show('after travel through adjusting:');
            s.append_show(
                tree._wt_children.map(function(node){
                    return node.id + ':' + ( node._wt_dy || 0 );
                })
            );
        });

        sm2.refresh();

    })();

</div>
<div class="test-panel"></div>
</div>







## 算法实现

`层次布局算法`(`无优化`)：

    @[data-script="javascript"]sigma.prototype.layoutHierarchy
        = function(options){
        var me = this;
        me.initializeLayout();

        var opt = options || {} 
            , forest = me.graph.getLayoutForest(opt)
            , treeOffsetX = 0
            , unit = opt.unit || 1
            ;

        sigma.utils.computeLeaves(forest);

        forest.forEach(function(tree){

            depthTravel(tree, treeOffsetX);
            treeOffsetX += unit * tree._wt_leaves;

            function depthTravel(node, parentX){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level - 1
                    , parentX = parentX || 0
                    , currentX = 0
                    ;

                node.hier_x = parentX + unit * leaves / 2;
                node.hier_y = unit * level;

                if(children.length > 0){
                    children.forEach(function(child){
                        depthTravel(child, parentX + currentX);
                        currentX += unit * child._wt_leaves;
                    }); 
                }
                delete node._wt_children;
            }

        });

        return this;
    };



`层次布局算法`(`使用均衡优化`、`优化策略1`、`优化策略2`、`优化策略5`、`优化策略6`)：


    @[data-script="javascript"]sigma.prototype.layoutHierarchy2
        = function(options){
        var me = this;
        me.initializeLayout();

        var opt = options || {} 
            , forest = me.graph.getLayoutForest(opt)
            , treeOffsetX = 0
            , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}

            // compatible with old versions
            , unit = opt.unit || opt.xUnit || opt.yUnit || 1

            , xUnit = opt.xUnit || unit
            , yUnit = opt.yUnit || unit
            , gridUnit = Math.min( xUnit, yUnit )
            , edges = me.graph.getSubGraph(options).edges
            , layoutHorizontal = opt.layoutHorizontal || 0
            ;

        sigma.utils.computeLeaves(forest);

        // if `heightLimit`, computes yUnit again
        if ( opt.heightLimit 
            && 1 == forest.length 
            && forest[ 0 ]._wt_maxlevel
            ) {
            /**
             * yUnit = opt.heightLimit / ( forest[ 0 ]._wt_maxlevel - 1 );
             * modified for edge collapsing
             */
            yUnit = opt.heightLimit / forest[ 0 ]._wt_maxlevel;
        }

        forest.forEach(function(tree){

            var maxLevel = 1
                , nodesOfSameLevel = {}
                , avoidSameLevelTravelThrough = opt.avoidSameLevelTravelThrough
                , delta = opt.avoidSameLevelTravelThroughDelta || 0.2
                ;

            depthTravel(tree, treeOffsetX * xUnit);
            tree._wt_maxlevel = maxLevel;
            tree._hier_offsetx = treeOffsetX;
            treeOffsetX += tree._wt_leaves;
            if(avoidSameLevelTravelThrough){
                for(var i in nodesOfSameLevel){
                    sigma.utils.avoidSameLevelTravelThrough(
                        nodesOfSameLevel[i]
                        , edges
                    );
                    nodesOfSameLevel[i].forEach(function(node){
                        if(layoutHorizontal){
                            node.hier_x += 
                                ( node._wt_dy || 0 ) * ( delta || 0.2 ) * yUnit;
                        }
                        else {
                            node.hier_y += 
                                ( node._wt_dy || 0 ) * ( delta || 0.2 ) * yUnit;
                        }
                        delete node._wt_dy;
                    });
                }
            }

            function depthTravel(node, parentX){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level
                    , parentX = parentX || 0
                    , currentX = 0
                    ;

                if(opt.adjustSiblingsOrder){
                    sigma.utils.adjustSiblingsOrder(node, edges);
                }

                if(avoidSameLevelTravelThrough){
                    ( nodesOfSameLevel[level] 
                        = nodesOfSameLevel[level] || [] )
                        .push(node);
                }

                if(level > maxLevel) {
                    maxLevel = level;
                }

                if(layoutHorizontal){
                    node.hier_y = parentX + xUnit * leaves / 2;
                    node.hier_x = yUnit * ( level - 1 ); 
                }
                else {
                    node.hier_x = parentX + xUnit * leaves / 2;
                    node.hier_y = yUnit * ( level - 1 ); 
                }

                if(children.length > 0){
                    children.forEach(function(child){
                        depthTravel(child, parentX + currentX);
                        currentX += xUnit * child._wt_leaves;
                    }); 
                }
            }

        });

        sigma.utils.layoutTreesByGrid( 
            forest
            , {
                spaceGrid: spaceGrid
                , optimalDistance: gridUnit
                , readPrefix: 'hier_'
            } 
        ); 

        return this;
    };




## 算法演示


以下示例展示树状`层次`布局算法：

<div id="test_50" class="test">
<div class="test-container">
<div id="test_50_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_50');
        var partialLayout = 0;
        var layoutHorizontal = 0;
        // var g1 = getRandomGraph(20, 18, 8);
        // var g1 = getLineGraph(20, 18, {nodeSize: 8});
        // var g1 = networkGraph_edges_between_the_same_level_nodes_3;
        // var g1 = networkGraph_circle_0628;
        // var g1 = networkGraph_mesh_0628;
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        // var g1 = networkGraph_grid_0521; 
        // var g1 = networkGraph_tree_0521;
        // var g1 = networkGraph_2circles_0523;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_tree_0524;
        // var g1 = networkGraph_many_children_0526;
        // var g1 = networkGraph_forest_0527;
        // var g1 = networkGraph_person_event_event_person_0729;
        // var g1 = networkGraph_person_event_event_person_0801;
        // var g1 = networkGraph_triangle_0801;
        // var g1 = networkGraph_triangle_0801_2;
        var g1 = networkGraph_complex_hier_160816; 

        if(partialLayout){
            g1.nodes.forEach(function(node){
                node.color = node.oldColor || node.color;
                delete node.oldColor;
                delete node.selected;
                if(Math.random() > 0.5){
                    node.selected = 1;
                    node.oldColor = node.color;
                    node.color = '#1f77b4';
                }
            });
        }

        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
            }
            , g3 = {
                nodes: g1.nodes.slice()
                , edges: [] 
            }
            ;
        var containerId = 'test_50_graph';
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
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
                , autoRescale: 0
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_50_left'))
            && (sm2 = isSigmaInstanceExisted('test_50_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_50_left'
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-left')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm2 = getUniqueSigmaInstance(
                    'test_50_right'
                    , {
                        settings: sigmaSettings 
                        , graph: g2
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-right')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sigmaEnableNodeDrag(sm2);

        sm1
            .normalizeSophonNodes()
            .alignCenter({rescaleToViewport: 1})
            .refresh()
            ;

        sm2
            .normalizeSophonNodes()
            .alignCenter({rescaleToViewport:1})
            .refresh() // note: must invoke `refresh()` to update coordinates

            .layoutHierarchy2({
                xUnit: 50
                , yUnit: 100
                // , heightLimit: 2000
                // unit: 50
                , adjustSiblingsOrder: 1
                , avoidSameLevelTravelThrough: 1
                , avoidSameLevelTravelThroughDelta: 0.2
                , layoutHorizontal: layoutHorizontal
                , filter: partialLayout
                    ? function(node){return node.selected;}
                    : null
            })
            .normalizeSophonNodes({
                readPrefix: 'hier_'
                , filter: partialLayout
                    ? function(node){return node.selected;}
                    : null
            })
            ;

        if(!partialLayout){
            sm2
            .alignCenter({
                wholeView: 1
                , readPrefix: 'hier_'
                , writePrefix: 'hier_'
            })
            ;
        }

        sm2
            .prepareAnimation({
                readPrefix: 'hier_'
            });

        setTimeout(function(){
            sigma.plugins.animate(
                sm2
                , {
                    x: 'hier_x'
                    , y: 'hier_y'
                }
                , {
                    duration: 1000
                }
            );

        }, 500);

    })();

</div>
<div class="test-panel"></div>
</div>








