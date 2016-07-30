var sigmaEnableNodeDrag = ( function() {


/**
 * from algorithm/graph-tools.md
 */

function getPointInfo(
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


function enableNodeDrag(sigInst, options){

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



return enableNodeDrag;

} )();
