# quadtree

> A `QuadTree` is a data structure in which the coordinate space is broken up into `regions / nodes` that contain items. If `too many items` are added into a node, then that node is `divided into` `4 sub-nodes`. This can provide very `fast lookup` of items based on the coordinates and coordinates and dimensions.

> 递归算法的一行不起眼的代码，可能包含极大的信息量。这是其难懂的地方，也是魅力所在。

> 需要注意属性及其同名函数的区别



## 前言

octree，3D quadtree


* wikipedia: <https://en.wikipedia.org/wiki/Quadtree>

* Quick Tip: Use Quadtrees to Detect Likely Collisions in 2D Space: <http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374>

* js quadtree: <https://github.com/timohausmann/quadtree-js/>

* javascript quadtree implementation: <http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/>

* Python quadtree: <https://github.com/fogleman/Quads>

* quadtree web demos: <https://www.michaelfogleman.com/static/quads/>

* <http://my.oschina.net/xhload3d/blog/353020>



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/d3/d3.min.js"></script>
<script src="./js/graph-layout/utils.js"></script>








## BarnesHut quadtree



### 算法描述

1. 节点总是添加到`叶子型`子树
2. 除了最底层子树，四叉树的划分能确保每一个子树包含`至多`一个节点
3. 每棵子树封装了整棵子树的`总质量(mass)`以及`重心(centerMass)`，极大方便了`超级节点(supernode)`的查找

以下是一个`Barnes-Hut`四叉树：
 
 <img src="./img/quadtree-barnes-hut.png" width="400">




### 算法实现


<div id="test_100" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var _divisionCallback = null
            , _id = 1
            ;

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
            me.centerMassX = (me.mass * me.centerMassX + node.x) / (me.mass + 1);
            me.centerMassY = (me.mass * me.centerMassY + node.y) / (me.mass + 1);
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

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### 算法验证





<div id="test_110" class="test">
<div class="test-container">
<svg width="100%" height="400"></svg>
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_110');
        var svg = d3.select('#test_110 svg')
            , sel
            , graph = getRandomGraph(20, 0, 5)
            , width = parseInt(d3.select('#test_110').style('width'))
            , height = 380
            , xOffset = (width - height) / 2
            , paths = []
            , isFirstDivision = 1
            , textArr
            , tree
            , tmpMaxLevel
            , showNodeCoords = 0
            , showTreeMassCenter = 0
            , showTreeMass = 1
            ;

        s.show('building Barnes-Hut quadtree');

        graph.nodes.forEach(function(node){
            node.x *= height;
            node.x += xOffset;
            node.y *= height;
            node.y += 10;
        });

        // circle
        function showCircle(sel){
            sel.attr('r', function(d){return d.size;})
                .attr('cx', function(d){return d.x;})
                .attr('cy', function(d){return d.y;})
                .style('fill', function(d){return d.color;})
                ;
        }

        sel = svg.selectAll('circle')
            .data(graph.nodes)
            ;
        showCircle(sel);

        sel.enter()
            .append('circle')
            ;
        showCircle(sel);
        
        sel.exit().remove();


        // text
        function showText(sel){
            sel.attr('x', function(d){return d.x + d.size;})
                .attr('y', function(d){return d.y + 6;})
                .text(function(d){
                    return d.label
                        + ( 
                            showNodeCoords 
                            ? (
                                '[' + Math.floor(d.x)
                                + ',' + Math.floor(d.y) 
                                + ']'
                            ) 
                            : ''
                        )
                        ; 
                })
                .style({
                    fill: function(d){return d.color;}
                    , 'font-size': '12px'
                })
                ;
        }

        sel = svg.selectAll('text')
            .data(graph.nodes)
            ;
        showText(sel);

        sel.enter()
            .append('text')
            ;
        showText(sel);

        sel.exit().remove();




        tree = buildBHQuadTree(
            graph
            , 4
            , {
                ondivision: function(topX, topY, size){
                    // s.append_show(topX, topY, size)
                    var line = d3.svg.line()
                        ;

                    if(isFirstDivision){
                        paths.push(
                            line([
                                [topX, topY]
                                , [topX, topY + size]
                                , [topX + size, topY + size]
                                , [topX + size, topY]
                            ]) 
                            + 'Z'
                        );
                        isFirstDivision = 0;
                    }

                    paths.push(
                        line([
                            [topX, topY + size / 2]
                            , [topX + size, topY + size / 2]
                        ])
                    );
                    paths.push(
                        line([
                            [topX + size / 2, topY]
                            , [topX + size / 2, topY + size]
                        ])
                    );

                }
            }
        );


        // show divisions
        function showDivisions(index){
            var sel
                , step = isFirstDivision ? 3 : 2
                , data = paths.slice(0, index + step )
                ;

            sel = svg.selectAll('path')
                .data(data)
                .attr('d', function(d){return d;})
                ;

            sel.enter()
                .append('path')
                .attr('d', function(d){return d;})
                .style({
                    'fill': 'transparent'
                    , 'stroke': '#bbb'
                    , 'stroke-width': '1'
                })
                ;

            sel.exit()
                .remove()
                ;

            if(index + step + 1 < paths.length){
                setTimeout(function(){
                        showDivisions(index + step );
                }, 200);
            }
            isFirstDivision = 0;
        }

        isFirstDivision = 1;
        showDivisions(0);


        // traverse quadTree
        function traverse(tree, options){

            var opt = options || {}
                ;
            
            if('function' == typeof opt.onvisit){
                opt.onvisit(tree);
            }

            if(tree.isLeaf){
                return;
            }

            tree.children.forEach(function(child){
                traverse(child, options);
            });
        }

        textArr = graph.nodes;
        tmpMaxLevel = tree.maxLevel;
        traverse(tree, {
            onvisit: function(_tree){
                var sel;

                if(showTreeMassCenter){
                    textArr = textArr.concat([_tree]);

                    // update
                    sel = svg.selectAll('text')
                        .data(textArr)
                        ;

                    // append
                    sel.enter()
                        .append('text')
                        .attr('x', function(d){return d.topX;})
                        .attr('y', function(d){
                            return d.topY + 14
                                + ( tmpMaxLevel - d.maxLevel ) * 14;
                        })
                        .text(function(d){
                            return d._id + '[' 
                                + Math.floor( d.centerMassX || 0 )  + ',' 
                                + Math.floor( d.centerMassY || 0 )  + ']' 
                                ;
                        })
                        .style({
                            'font-size': '12px'
                            , 'fill': 'red'
                            , 'stroke-width': '1'
                        })
                        ;

                    sel.exit().remove();
                }

                if(showTreeMass){
                    s.append_show('tree ' + _tree._id, 'mass ' + _tree.mass);
                }
            }
        });


    })();

</div>
<div class="test-panel">
</div>
</div>





## 碰撞检测

todo: 碰撞应用 ＋ 碰撞检测

quadtree-js: <https://github.com/timohausmann/quadtree-js/>





## 应用

1. 图布局：BarnesHut quadtree

2. 碰撞检测

    <img src="./img/collision-detect-quadtree.png" width="400">
    
3. 图片存储

    <img src="./img/image-quadtree.png" height="150">

