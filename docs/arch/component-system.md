# component-system

> 组件系统设计


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 
<script src="http://258i.com/static/bower_components/react/react.min.js"></script>
<script src="http://258i.com/static/bower_components/react/react-dom.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Records

### 171103

> changelog: 171104

* 组件布局系统
        组件定位由布局模块统筹计算
        尺寸支持决定尺寸与相对尺寸
        布局方式支持层叠、平铺
* 每个组件都具有布局能力，布局能力作为所有组件的基本功能之一
* 在组件布局系统上构建应用层
* 应用组件的各个抽象层，同样作为基本应用功能来实现
* 先设计并实现组件布局系统
* `阶段一目标`：拖放增加／删除组件，移动组件，拖动边角调整尺寸，配置面板等
* 使用组件`组合`而不是`继承`来复用组件UI
* 复用非UI功能，可以将该功能封装到函数或对象，由其他组件`import`后使用；当然也可以封装到`非UI基类`中作为父类被继承；不推荐`组件类`的继承。


### 171114

* Box组件
* 既可以作为容器包含其他Box，自身同时也可以放到其他容器中
* 边框可拖动，以调整尺寸x或y方向的尺寸
* 边框交叉处可拖动，以同时调整x, y方向的尺寸
* 有标题栏，可点击标题栏拖动整个Box
* 同级Box之间的相对位置关系有两种模式，`平铺`和`层叠`。平铺时，Box不能重叠，也不能移出容器范围；层叠时，Box可以相互重叠，有图层关系，且可部分移出容器范围
* 支持`最小高度、宽度`设置；平铺模式下，一个Box的尺寸改变可影响其他相邻Box的尺寸改变，但不能超过设定的最小值，如果同时达到最小值，容器宽度还不够，则可以按最小值等比例缩小；


* 常用拖动功能实现
    * 两个对象：`handler`, `box`。handler为启动拖动的dom；box为接受拖动行为产生副作用的目标dom
    * 三个事件：`mousedown`, `mousemove`, `mouseup`

            Event       Target      Action
            ================================================================================
            mousedown   handler     初始化，包含注册mousemove, mouseup事件
                                    记录按下时鼠标位置( vx, vy )、容器位置( ox, oy )
            mousemove   document    鼠标移动处理函数，计算鼠标相对于( vx, vy )的变化量( dx, dy )
                                    再根据( ox, oy )计算新的容器位置( nx, ny )，并应用到容器DOM 
            mouseup     document    结束拖动，解绑mousemove, mouseup事件

    * `mousemove`注册到`document`上，避免鼠标快速移动使鼠标移出handler，从而不再响应mousemove事件；以及由此带来的其他不好的交互体验
    * `mouseup`注册到`document`，确保即使鼠标移出当前window，也能能捕获鼠标mouseup事件，及时解绑定事件函数，保持轮转状态一致性


### 171116

* 事件处理函数命名规则：
        React事件       onClick, onMouseDown, onDragStart, ...
        原生事件        on_click, on_mousedown, on_dragstart, ...
* `focus`状态，`mousedown`事件触发focus状态的变化，mousedown事件注册在`document`上，每个Box组件判断target是否为`dom子树`上的节点来决定focus状态的切换
* 边框拖动功能
    * hover阶段，展示可启动功能，通过鼠标cursor的类型来提示
    * `hover算法`：只针对处于focus状态的box，判断鼠标是否位于边框位置
    * mousedown事件，启动拖动
* DOM坐标系：
        viewport坐标系      vx, vy
        content坐标系       cx, cy


## Box

### css

    @[data-script="html"]<style type="text/css">
        .box-container {
            position: relative;
            height: 300px;
            overflow: hidden;
            background-color: #333;
        }
        .box {
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid #ccc;
        }
        .box_focus {
            box-shadow: 0px 0px 2px 1px #ff7f0e;
        }
        .box__header {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 26px;
            background-color: #ddd;
            border-color: #ccc;
            border-width: 0 0 2px 0;
            border-style: none none outset none;
            -webkit-user-select: none;
            user-select: none;
            cursor: pointer;
        }
        .box__content {
            position: absolute;
            top: 28px;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: hidden;
        }
    </style>


### js

    @[data-script="babel"]class Box extends React.Component {

        constructor( props ) {
            super( props );
            this.isFocused = 0;
        }

        render() {
            return (
                <div className="box" style={this.props.styles} ref="box">
                    <div className="box__header" ref="header">Title</div>
                    <div className="box__content">
                        { this.props.children }
                    </div>
                </div>
            );
        }

        componentDidMount() {
            this.enableDraggable();
            this.enableFocus();
            this.enableHover();
        }

        componentWillUnmount() {
        }

        enableFocus = () => {
            document.addEventListener(
                'mousedown'
                , this.on_document_mousedown
                , false
            );
        }

        enableHover = () => {
            let box = this.refs.box;
            box.addEventListener(
                'mousemove'
                , this.on_box_mousemove
                , false
            );
        }

        enableDraggable = () => {
            let log = this.props.log;
            let header = this.refs.header;

            header.addEventListener(
                'mousedown'
                , this.on_header_mousedown
                , false
            );
        }

        on_box_mousemove = ( e ) => {
            let box = this.refs.box;

            if ( !this.isFocused ) {
                _resetDefault();
                return;
            }

            let boundingRect = box.getBoundingClientRect();
            let vx = e.clientX;
            let vy = e.clientY;
            let cx = vx - boundingRect.left;
            let cy = vy - boundingRect.top;
            console.log( cx + ', ' + cy + '; ' + boundingRect.width + ', ' + boundingRect.height ); 

            let xRightHit = Math.abs( cx - boundingRect.width ) < 5;
            let xLeftHit = cx < 5;
            let yBottomHit = Math.abs( cy - boundingRect.height ) < 5;
            let yTopHit = cy < 5;

            if ( xRightHit && yBottomHit ) {
                box.style.cursor = 'se-resize';
            }
            else if ( xRightHit ) {
                box.style.cursor = 'e-resize';
            } 
            else if ( yBottomHit ) {
                box.style.cursor = 's-resize';
            } 
            else if ( xLeftHit && yBottomHit ) {
                box.style.cursor = 'sw-resize';
            }
            else if ( xLeftHit ) {
                box.style.cursor = 'w-resize';
            }
            else {
                _resetDefault();
            }

            function _resetDefault() {
                box.style.cursor = 'default';
            }
        }

        on_document_mousedown = ( e ) => {
            let target = e.target;
            let box = this.refs.box;
            let curElement = target;

            while( curElement
                && curElement.parentNode != box ) {
                curElement = curElement.parentNode;
            }

            if ( !curElement ) {
                $( box ).removeClass( 'box_focus' );
                this.isFocused = 0;
                console.log( 'unfocused' );
            }
            else {
                $( box ).addClass( 'box_focus' );
                this.isFocused = 1;
                console.log( 'focused' );
            }
        }

        on_header_mousedown = ( e ) => {
            let log = this.props.log;
            let box = this.refs.box;
            let parentBox = box.parentNode;
            let header = this.refs.header;

            this._dragParams = {
                vx: e.clientX
                , vy: e.clientY
                , ox: parseFloat( box.style.left ) || 0
                , oy: parseFloat( box.style.top ) || 0
            };

            document.addEventListener(
                'mousemove'
                , this.on_document_mousemove
                , false
            );

            document.addEventListener(
                'mouseup'
                , this.on_document_mouseup
                , false
            );

        }

        on_document_mousemove = ( e ) => {
            let log = this.props.log;
            let box = this.refs.box;
            let parentBox = box.parentNode;
            let header = this.refs.header;
            let _p = this._dragParams;
            let dx = e.clientX - _p.vx;
            let dy = e.clientY - _p.vy;
            let nx = _p.ox + dx;
            let ny = _p.oy + dy;

            let pComputedStyle = getComputedStyle( parentBox );
            let pw = parseFloat( pComputedStyle[ 'width' ] );
            let ph = parseFloat( pComputedStyle[ 'height' ] );
            let boxSizing = pComputedStyle[ 'box-sizing' ];
            let pBorderLeftWidth = parseFloat( pComputedStyle[ 'border-left-width' ] );
            let pBorderRightWidth = parseFloat( pComputedStyle[ 'border-right-width' ] );
            let pBorderTopWidth = parseFloat( pComputedStyle[ 'border-top-width' ] );
            let pBorderBottomWidth = parseFloat( pComputedStyle[ 'border-bottom-width' ] );
            let pPaddingLeft = parseFloat( pComputedStyle[ 'padding-left' ] );
            let pPaddingRight = parseFloat( pComputedStyle[ 'padding-right' ] );
            let pPaddingBottom = parseFloat( pComputedStyle[ 'padding-bottom' ] );
            let pPaddingTop = parseFloat( pComputedStyle[ 'padding-top' ] );
            let pContentWidth = boxSizing == 'content-box' 
                    ? pw 
                    : pw - pPaddingLeft - pPaddingRight - pBorderLeftWidth - pBorderRightWidth; 
            let pContentHeight = boxSizing == 'content-box' 
                    ? ph 
                    : ph - pPaddingTop - pPaddingBottom - pBorderTopWidth - pBorderBottomWidth; 
            
            if ( nx < 0 ) nx = 0;
            if ( ny < 0 ) ny = 0;
            if ( nx > pContentWidth - 10 ) nx = pContentWidth - 10;
            if ( ny > pContentHeight - 10 ) ny = pContentHeight - 10;

            box.style.left = nx + 'px';
            box.style.top = ny + 'px';
        }

        on_document_mouseup = ( e ) => {
            let log = this.props.log;
            let header = this.refs.header;
            let box = this.refs.box;
            let parentBox = box.parentNode;

            console.log( 'mouseup' );

            document.removeEventListener(
                'mousemove'
                , this.on_document_mousemove
                , false
            );

            document.removeEventListener(
                'mouseup'
                , this.on_document_mouseup
                , false
            );

        }

    }
    
    Box.defaultProps = {
        log: console.log
    };

    window.Box = Box;



### test

<div id="test_Box" class="test">
<div class="test-panel box-container"></div>
<div class="test-console"></div>
<div class="test-container">

    @[data-script="babel"](function(){

        var s = fly.createShow('#test_Box');
        s.show(1);
        s.append_show(2);

        ReactDOM.render( 
            <Box 
                styles={{ height: '260px', width: '400px' }}
                log={s.append_show}        
                >
                <Box 
                    styles={{ height: '120px', width: '220px' }}
                    log={s.append_show}        
                    />
                <Box 
                    styles={{ height: '160px', width: '200px' }}
                    log={s.append_show}        
                    />
            </Box>
            , document.querySelector( '#test_Box .test-panel' ) 
        );

    })();

</div>
</div>







