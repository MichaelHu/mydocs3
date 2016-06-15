# graph tools

> 图形工具集



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-graph {
    height: 600px;
}
.test-graph svg {
    width: 100%;
    height: 100%;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/react/react.min.js"></script>
<script src="http://258i.com/static/bower_components/react/react-dom.min.js"></script>
<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>

<script src="./js/network.js"></script>
<script src="./js/network-0520.js"></script>
<script src="./js/networkGraph0520-allEdges.js"></script>
<script src="./js/network-grid-0521.js"></script>
<script src="./js/network-grid-0612.js"></script>
<script src="./js/networkGraph-tree-0521.js"></script>
<script src="./js/network-forceAtlas2-0510.js"></script>
<script src="./js/network-2circle-0523.js"></script>
<script src="./js/network-edges-between-the-same-level-nodes-0524.js"></script>
<script src="./js/network-edges-between-the-same-level-nodes-2-0524.js"></script>
<script src="./js/network-edges-between-the-same-level-nodes-3-0531.js"></script>
<script src="./js/network-tree-0524.js"></script>
<script src="./js/network-edges-between-levels-0526.js"></script>
<script src="./js/network-many-children-0526.js"></script>
<script src="./js/network-forest-0527.js"></script>




## 一、sigma实例生成器

以下代码提供`sigma实例`的生成器，根据实例ID在上下文中`只保持``一个`实例，即使多次调用也是如此。

    @[data-script="javascript"]function getUniqueSigmaInstance(instId, config, isSearch){

        var instances = (
                arguments.callee.__instances
                    || ( arguments.callee.__instances = [] )
            )
            ;

        if(!instances[instId]) {
            if(isSearch){
                return false;
            }

            if(!config) {
                instances[instId] = new sigma();
            }
            else {
                instances[instId] = new sigma(
                    $.extend(
                        {}
                        , config
                    ) 
                );
            }
        }
        else {
            if(isSearch == 2) {
                var ret = instances[instId];
                delete instances[instId];
                return ret;
            }
        }

        return instances[instId];
    }

    function isSigmaInstanceExisted(instId){
        return getUniqueSigmaInstance(instId, null, 2);
    }



## 二、随机图形生成器

`getRandomGraph()`，返回一个`graph`数据结构，包含`nodes`和`edges`两个字段：

    {
        nodes: [ ... ]
        , edges: [ ... ]
    }

代码如下：

    @[data-script="javascript"]function getRandomGraph(numOfNodes, numOfEdges, fixSize, options){

        var i
            , s
            , opt = options || {}
            , N = numOfNodes
            , E = numOfEdges
            , g = { nodes: [], edges: [] }
            ;

        for(i=0; i<N; i++){
            g.nodes.push({
                id: 'n' + i
                , label: '' + i
                , x: Math.random()
                , y: Math.random()
                , size: fixSize || Math.random()
                , color: opt.color || fly.randomColor() 
            });
        }

        for(i=0; i<E; i++){
            var edge = {
                id: 'e' + i
                , source: 'n' + (Math.random() * N | 0) 
                , target: 'n' + (Math.random() * N | 0) 
                , size: fixSize ? 1 : 1 * Math.random()
                // , type: 'curve'
                // , color: fly.randomColor() 
                , color: '#ccc'
                , hover_color: '#f00'
            };

            if(edgeExists(edge)){
                continue;
            }
            else {
                g.edges.push(edge);
            }

        }

        function edgeExists(edge){
            for(var i=0; i<g.edges.length; i++){
                if(g.edges[i].source == edge.source
                    && g.edges[i].target == edge.target) {
                    return true;
                }
            }
            return false;
        }

        return g;
    }




## 三、图形手动生成器


### 3.1 工具方法


#### 3.1.1 getPointInfo()

`getPointInfo()`：获取`鼠标`事件的相关信息，返回鼠标在当前`画布`的位置，以及对应的`graph``坐标`。

    @[data-script="javascript"]function getPointInfo(
        mouseEvent, sigInst){

        var _s = sigInst
            , _renderer = _s.renderers[0] 
            , _camera = _s.camera 
            , _prefix = _renderer.options.prefix

            , e = mouseEvent
            , offset = _getOffset(_renderer.container)
            , rendererX = e.clientX - offset.left
            , rendererY = e.clientY - offset.top
            , cos = Math.cos(_camera.angle)
            , sin = Math.sin(_camera.angle)
            , nodes = _s.graph.nodes()
            , ref = []
            ;

        // console.log(nodes);

        // derotating coordinates
        for(var i = 0; i < 2; i++){
            var n = nodes[i]
                , aux = {
                    x: n.x * cos + n.y * sin
                    , y: n.y * cos - n.x * sin
                    , renX: n[_prefix + 'x']
                    , renY: n[_prefix + 'y']
                }
                ;

            ref.push(aux);
        }

        if(ref[0].x === ref[1].x && ref[0].y === ref[1].y) {
            var xRatio = ref[0].renX === 0 ? 1 : ref[0].renX;
            var yRatio = ref[0].renY === 0 ? 1 : ref[0].renY;
            x = ( ref[0].x / xRatio ) * ( rendererX - ref[0].renX ) + ref[0].x;
            y = ( ref[0].y / yRatio ) * ( rendererY - ref[0].renY ) + ref[0].y;
        }
        else {
            var xRatio = ( ref[1].renX - ref[0].renX ) / ( ref[1].x - ref[0].x );
            var yRatio = ( ref[1].renY - ref[0].renY ) / ( ref[1].y - ref[0].y );

            if ( ref[1].x === ref[0].x || 0 == xRatio ){
                xRatio = yRatio;
            }

            if ( ref[1].y === ref[0].y || 0 == yRatio ){
                yRatio = xRatio;
            }

            x = (rendererX - ref[0].renX) / xRatio + ref[0].x;
            y = (rendererY - ref[0].renY) / yRatio + ref[0].y;
        }

        function _getOffset(element){
            var st = window.getComputedStyle(element)
                , getCssProperty = function(prop){
                    return parseInt(st.getPropertyValue(prop)) || 0;
                }
                , rect = element.getBoundingClientRect()
                ;
            return {
                left: rect.left + getCssProperty('padding-left') 
                , top: rect.top + getCssProperty('padding-top')
            };
        }

        return {
            x: x * cos - y * sin
            , y: y * cos + x * sin
            , rendX: rendererX 
            , rendY: rendererY
        };

    }



#### 3.1.2 enableNodeDrag()

`enableNodeDrag()`：使当前`sigma实例`支持节点`拖动`。

sigmajs默认`不支持`节点拖动，使其支持节点拖动的方法带有一些特殊处理的地方，其中通过`overNode`和`outNode`事件的处理很有特点。

归纳来看，drag事件起于`overNode`，终止于`click`。

1. 在`overNode`事件中猜测用户可能需要进行节点拖动，进行`mousedown`事件的注册。
2. 用户鼠标按下，则触发`mousedown`事件，此时注册`mousemove`和`mouseup`事件，进行节点拖动。
3. `mousemove`事件中处理拖动相关逻辑；`mouseup`事件中已经完成节点拖动，解除`mousemove`和`mouseup`事件。同时，该事件后会触发`click`事件，为保万全，同样再次执行解除`mousemove`和`mouseup`事件。
4. 在`outNode`事件中（用户可能点击拖动也可能只是鼠标经过），取消`mousedown`事件的注册，以便清理`overNode`的现场。


代码实现如下：

    @[data-script="javascript"]function enableNodeDrag(sigInst, options){

        var opt = options || {}
            , _s = sigInst
            , s = opt.show || {
                show: function(){}
                , append_show: function(){}
            }
            , _nodesHovered = []
            , _indexHovered = {}
            , _isMouseDown
            , _prefix = ''
            , _dragNode
            , _camera = _s.camera
            , _renderer = _s.renderers[0]
            , _mouse = _renderer.domElements.mouse
            , _mouse = _renderer.container.lastChild
            , _body = document.body
            , _isTrulyDrag = false
            , ondragend = opt.ondragend || function(){}
            ;

        _prefix = _renderer.options.prefix;

        function onoverNode(e){
            var _node = e.data.node
                ;

            if(_indexHovered[_node.id]){
                return;
            }

            _nodesHovered.push(_node);
            _indexHovered[_node.id] = true;

            if(_nodesHovered.length && !_isMouseDown){
                _dragNode = _nodesHovered[_nodesHovered.length - 1];
                _mouse.addEventListener(
                    'mousedown'
                    , onmousedown
                    , false
                );
                // console.log(_nodesHovered, _dragNode);
            }
        }

        function onoutNode(e){
            var _node = e.data.node
                , index = _nodesHovered
                    .indexOf(_node)
                ;

            _nodesHovered.splice(index, 1);
            delete _indexHovered[_node.id];

            if(_nodesHovered.length && !_isMouseDown){
                // ?
                _dragNode = _nodesHovered[_nodesHovered.length - 1];
            }
            else {
                _mouse.removeEventListener('mousedown', onmousedown);
            }
        }

        function onmousedown(e){
            _isMouseDown = true;
            if(_dragNode && _s.graph.nodes().length > 1){
                _mouse.removeEventListener('mousedown', onmousedown);
                _body.addEventListener('mousemove', onmousemove);
                _body.addEventListener('mouseup', onmouseup);
                
                // Do not refresh edgequadtree during drag 
                var k, c;
                for(k in _s.cameras){
                    c = _s.cameras[k];
                    if(c.edgequadtree !== undefined){
                        c.edgequadtree._enabled = false;
                    }
                }
                _renderer.settings({
                    mouseEnabled: false
                    , enableHovering: false
                })
                // console.log('before refresh');
                _s.refresh();
            } 
        }

        function onmousemove(e){

            var pointInfo = getPointInfo(e, _s);
            _dragNode.x = pointInfo.x;
            _dragNode.y = pointInfo.y;
            _isTrulyDrag = true;
            _s.refresh();

        }

        function onmouseup(){
            _isMouseDown = false;

            // _mouse.addEventListener('mousedown', onmousedown);
            _body.removeEventListener('mousemove', onmousemove);
            _body.removeEventListener('mouseup', onmouseup);

            // allow to refresh edgequadtree
            var k, c;
            for(k in _s.cameras) {
                c = _s.cameras[k];
                if( c.edgequadtree != undefined) {
                    c.edgequadtree._enabled = true;
                }
            }

            _renderer.settings({
                mouseEnabled: true
                , enableHovering: true
            });

            _s.refresh();

            // dragend callback
            ondragend({isTrulyDrag: _isTrulyDrag});
            _isTrulyDrag = false;
        }

        function onclick(e){
            _isMouseDown = false;
            _body.removeEventListener('mousemove', onmousemove);
            _body.removeEventListener('mouseup', onmouseup);
        }

        _s
            .bind(
                'overNode'
                , function(e) {
                    s.append_show(e.type, e.data.node.id);
                    onoverNode(e);
                }
            )
            .bind(
                'outNode'
                , function(e) {
                    s.append_show(e.type, e.data.node.id);
                    onoutNode(e);
                }
            )
            .bind(
                'click' // raw click
                , function(e){
                    s.append_show(e.type);
                    onclick(e);
                }
            )
            ;

    }




### 3.2 graph编辑器

`操作说明`：

* `选择`节点：`单击`可选中或取消选中节点
* `增加`节点： 
    1. `双击`空白区域，新建一个`独立`节点
    2. 先选择一个节点，再在`空白`区域`单击`，则新建节点，并在两个节点间用`边`相连
* `删除节点`：`双击`要删除的`节点`，删除的该节点的同时，与该节点相关的边也会一并删除
* `删除边`：`双击`要删除的`边`
* `拖动`节点：`点击`节点并`拖动`
* `拖动`画布：`点击``空白`区域并拖动
* `放大`&`缩小`：鼠标`滚轮`
* `导出`数据：`toJSON`按钮


以下为编辑器：

<div id="test_30" class="test">
<div class="test-container">
<div id="test_30_graph" class="test-graph">
</div>
<div class="test-panel">
<button class="test-panel-tojson">to JSON</button>
<button class="test-panel-save">Save( todo )</button>
<button class="test-panel-clear">Clear</button>
<button class="test-panel-zoomin">ZoomIn</button>
<button class="test-panel-zoomout">ZoomOut</button>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_30');
        var g1 = getRandomGraph(2, 0, 10);
        var containerId = 'test_30_graph';
        var nodeSize = 10;
        var coordinatesRatio = 100;

        var rendererSettings = {
                // captors settings
                doubleClickEnabled: false
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
            };

        var sm1
            ;

        if((sm1 = isSigmaInstanceExisted(containerId))){
            sm1.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    containerId 
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: containerId 
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm1.refresh();
        s.show(' restarted ');

        var camera = sm1.camera
            , renderer = sm1.renderers[0]
            , mouse = renderer.domElements.mouse
            , selectedNode
            , isDoubleClickNode
            , isTrulyDrag
            ;

        function toggleSelected(sigInst, node){
            if(node.oldColor){
                selectedNode = null;
                node.color = node.oldColor; 
                delete node.oldColor;
            }
            else {
                selectedNode = node;
                node.oldColor = node.color;
                node.color = '#f00'; 
            }
            sigInst.refresh();
        }

        function clearSelected(sigInst, exclude){
            var graph = sigInst.graph
                , nodes = graph.nodes()
                ;

            if(!exclude){
                selectedNode = null;
            }

            nodes.forEach(function(node){
                if(node != exclude){
                    if(node.oldColor){
                        node.color = node.oldColor;
                    }
                    delete node.oldColor;
                }
            });
            sigInst.refresh();
        }

        var _id = 0;
        function initId(){
            var nodes = sm1.graph.nodes();
            nodes.forEach(function(node){
                var rslt = node.id.match(/\d+/g)
                    , id = 0
                    ; 
                if(rslt) {
                    id = rslt[0]; 
                }
                _id = Math.max(_id, id);
            }); 
            _id++;
        }
        initId();

        sm1
            .bind(
                'clickNode'
                , function(e){
                    var node = e.data.node
                        , id
                        ;

                    // console.log(e);

                    // wait maybe-doubleClickNode event triggered
                    setTimeout(function(){

                        if(isDoubleClickNode){
                            // console.log('isDoubleClickNode: return');
                            return;
                        }

                        if(isTrulyDrag){
                            // console.log('isTrulyDrag: return');
                            return;
                        }

                        // console.log('no DoubleClickNode: get in');

                        if(!selectedNode
                            || selectedNode == node){
                            toggleSelected(sm1, node); 
                            clearSelected(sm1, node);
                        }
                        else {
                            id = 'e' + _id++; 
                            sm1.graph.addEdge({
                                id: id 
                                , source: selectedNode.id
                                , target: node.id 
                                , color: '#ccc' 
                                , hoverColor: '#f00'
                            });
                            // console.log('add new edge');
                            toggleSelected(sm1, selectedNode);
                        }

                    }, 300);

                }
            )
            .bind(
                'clickStage'
                , function(e){
                    var pointInfo
                        , nodeId
                        , edgeId
                        , id
                        , node
                        ;
                    console.log(e);
                    if(selectedNode){
                        pointInfo = getPointInfo(e.data.captor, sm1);
                        id = _id++;
                        nodeId = 'n' + id;
                        edgeId = 'e' + id;
                        node = {
                            id: nodeId
                            , label: '' + id
                            , x: pointInfo.x
                            , y: pointInfo.y
                            , color: fly.randomColor()
                            , size: nodeSize
                        };
                        sm1.graph
                            .addNode(node)
                            .addEdge({
                                id: edgeId
                                , label: edgeId
                                , source: selectedNode.id
                                , target: node.id 
                                , color: '#ccc' 
                                , size: 1
                            })
                            ;
                        toggleSelected(sm1, selectedNode);
                    }
                }
            )
            .bind(
                'doubleClickStage'
                , function(e){
                    // console.log(e); 
                    var pointInfo = getPointInfo(e.data.captor, sm1)
                        , nodeId
                        , edgeId
                        , id
                        , node
                        ;
                    if(!selectedNode){
                        id = _id++;
                        nodeId = 'n' + id;
                        node = {
                            id: nodeId
                            , label: '' + id
                            , x: pointInfo.x
                            , y: pointInfo.y
                            , color: fly.randomColor()
                            , size: nodeSize
                        };
                        sm1.graph
                            .addNode(node)
                            ;

                        // avoid trigger `clickNode` event
                        setTimeout(function(){
                            sm1.refresh();
                        }, 0);
                    }
                }
            )
            .bind(
                'doubleClickNode'
                , function(e){
                    var node = e.data.node
                        ;

                    if(sm1.graph.nodes().length <= 2){
                        return;
                    }

                    // console.log(e);
                    isDoubleClickNode = true;

                    sm1.graph
                        .dropNode(node.id)
                        ;

                    sm1.refresh();
                    selectedNode = null;

                    // ensure `isDoubleClickNode` is on when `clickNode` handler is being invoked
                    setTimeout(function(){
                        isDoubleClickNode = false;
                    }, 500);
                }
            )
            .bind(
                'doubleClickEdge'
                , function(e){
                    var edge = e.data.edge
                        ;
                    // console.log(e);
                    sm1.graph
                        .dropEdge(edge.id);

                    sm1.refresh();
                }
            )
            ;


        enableNodeDrag(
            sm1
            , {
                ondragend: function(options){
                    var opt = options || {};

                    if(opt.isTrulyDrag){
                        clearSelected(sm1); 
                        isTrulyDrag = opt.isTrulyDrag;
                        // console.log('isTrulyDrag', isTrulyDrag);
                        setTimeout(function(){
                            isTrulyDrag = false;
                        }, 500);
                    }

                }
            }
        );

        $('#test_30 .test-panel-tojson')
            .off()
            .on(
                'click'
                , function(e){
                    var nodes = [], edges = [];

                    sm1.graph
                        .nodes()
                        .forEach(function(node){
                            var _n = {};
                            _n.id = node.id;
                            _n.x = node.x * coordinatesRatio | 0;
                            _n.y = node.y * coordinatesRatio | 0;
                            _n.color = node.color;
                            _n.size = nodeSize;
                            _n.label = node.label;
                            nodes.push(_n);
                        })
                        ;

                    sm1.graph
                        .edges()
                        .forEach(function(edge){
                            var _e = {};
                            _e.id = edge.id;
                            _e.source = edge.source;
                            _e.target = edge.target;
                            _e.color = edge.color;
                            _e.hoverColor = edge.hoverColor;
                            edges.push(_e);
                        })
                        ;

                    s.show({
                        nodes: nodes 
                        , edges: edges 
                    });
                }
            )
            ;

        $('#test_30 .test-panel-clear')
            .off()
            .on(
                'click'
                , function(e){
                    s.show('cleared');
                }
            )
            ;

        $('#test_30 .test-panel-zoomin')
            .off()
            .on(
                'click'
                , function(e){
                    var ratio = camera.ratio;
                    camera.goTo({ratio: ratio / 1.1});
                }
            )
            ;

        $('#test_30 .test-panel-zoomout')
            .off()
            .on(
                'click'
                , function(e){
                    var ratio = camera.ratio;
                    camera.goTo({ratio: ratio * 1.1});
                }
            )
            ;




    })();

</div>
</div>




## 四、图形测试用例




<div id="test_40" class="test">
<div class="test-container">
<div id="test_40_graph" class="test-graph" style="height:400px;">
</div>
<div class="test-panel">
<select></select>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_40');
        var g1 = getRandomGraph(10, 20, 10);
        var containerId = 'test_40_graph';

        var rendererSettings = {
                // captors settings
                doubleClickEnabled: false
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
                sideMargin: 10 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm1
            ;

        if((sm1 = isSigmaInstanceExisted(containerId))){
            sm1.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    containerId 
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: containerId 
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm1.refresh();
        s.show(' restarted ');


        var $select = $('#test_40 select').html('')
            , firstItem
            ;

        for(var i in window){
            if(!firstItem){
                firstItem = 1;
                refreshData(i);
            }
            if(/^networkGraph/.test(i)){
                $select.append(
                    '<option>' + i + '</option>'
                );
            }
        }

        $select
            .off()
            .bind(
                'change'
                , function(e){
                    var varName = $select.val();
                    refreshData(varName);
                }
            )
            ;

        function refreshData(varName){
            sm1.graph
                .clear()
                .read(window[varName])
                ;
            sm1.refresh();
            s.show('var g1 = ' + varName + ';');
        }

    })();

</div>
</div>
