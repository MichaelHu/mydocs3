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
        其他事件        on_click, on_mousedown, on_dragstart, ...
* `focus`状态，`mousedown`事件触发focus状态的变化，mousedown事件注册在`document`上，每个Box组件判断target是否为`dom子树`上的节点来决定focus状态的切换
* 边框拖动功能
    * hover阶段，展示可启动功能，通过鼠标cursor的类型来提示
    * `hover算法`：只针对处于focus状态的box，判断鼠标是否位于边框位置，hover也绑定在document上，确保能在边框之外小范围区域开启拖动
    * mousedown事件，启动拖动
* DOM坐标系：
        viewport坐标系      vx, vy
        content坐标系       cx, cy


### 171117

* `document`的`mousemove`事件需要处理`多种状态`下的移动响应

        State       Start               Moving                  End                 Action      
        ===============================================================================================
        drag        header mousedown    document mousemove      document mouseup    拖动        
        resize      border mousedown    document mousemove      document mouseup    缩放        
        hover       border near by      box mousemove           border far away     切换可执行缩放操作
        capture-    when not in drag    box mousemove           when turns into 
         hover      , hover or resize                           drag, hover or 
                                                                 resize

* `drag`状态由header的mousedown事件触发，由document的mouseup事件终结
* `drag`状态用于「`box整体拖动`」；`capture-hover`, `hover`, `resize`三个状态用于「`box边框拖动`」；两种拖动操作需`独立响应`mousemove事件
* `resize`状态由Focused的box边框附近的mousedown事件触发，由document的mouseup事件终结
* `capture-hover`状态下会判断鼠标是否移动到Focused的box边框附近，如果是的话，则进入hover状态。它是优先级最低的状态，只要不是drag, hover或resize状态，都处在capture-hover状态中，当drag,hover或resize的触发条件发生，即刻取消当前状态进入对应状态。
* `hover`状态下，根据鼠标与border的相对位置，鼠标`cursor`在以下状态间切换，处于下方列出状态下触发的`mousedown`，将会使状态进入`resize`状态：

        e-resize, s-resize, se-resize, w-resize, sw-resize

* `capture-hover`和`hover`状态都只局限于box之上的`mousemove`，而不是document的mousemove，使用后者的话，在计算鼠标样式以及后续点击操作的处理都会遇到困难。这种实现方案的缺憾为只能在`边框内边缘`显示resize鼠标样式。
* 如果鼠标悬停在header，且离border很近的地方，这时如果触发mousedown，则可能进入dragging也可能进入resize，程序需要避免这种`歧义性`。我们采用的办法是，header区域的border不参与hover状态判断。


### 171118

* `hover`状态下，box上的`mousedown`事件，需要`阻止冒泡`，避免触发document的mousedown，从而响应focus处理
* `resize`过程的状态流转：

                           ======================               
                                  disabled                      
                           ======================
                            |                 ^             
        enable hover        |                 |    disable hover            
                            v                 |             
                           ======================               
                                capture_hover                      
                           ======================
                            |         ^       ^              
        border near by      |         | border| far away    
                            v         |       |              
                           =============      |             
                               hover          |                    
                           =============      |             
                            |                 |             
        box mousedown       |                 |    
                            v                 |             
                           =============      |             
                               resize         |                     
                           =============      |             
                            |                 |             
        document mousemove  |                 | document mouseup
                            v                 |             
                           =====================                    
                                  resizing                              
                           =====================                    

* `todo`： `drag`、`focus`、`resize`这三种操作需要独立开，同时将它们之间需要一并考虑的地方理清楚。目前实现还有一些小bug




### 171121

* `focus`, `drag`, `resize`三种操作对应的事件处理函数，需要有`命名规则`：

        on_focus

        on_header_drag_start
        on_header_dragging
        on_header_drag_end

        on_capture_hover
        on_border_resize_start
        on_border_resizing
        on_border_resize_end



### 171122

* 两种布局模式，`平铺`与`层叠`
* box负责`下一级`子box的`尺寸仲裁`




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
            top: 26px;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba( 0, 0, 0, 0.8 );
            overflow: hidden;
        }
    </style>


### js

    @[data-script="babel"]/**
     * state                desc 
     * =================================
     * DISABLED             disabled
     * CAPTURE_HOVER        捕获hover
     * HOVER                进入响应区
     * RESIZABLE            可缩放状态   
     * RESIZING             正在缩放
     */
    const RESIZE_STATE_DISTABLED = 1;
    const RESIZE_STATE_CAPTURE_HOVER = 2;
    const RESIZE_STATE_HOVER = 3;
    const RESIZE_STATE_RESIZABLE = 4;
    const RESIZE_STATE_RESIZING = 5;

    class Box extends React.Component {

        constructor( props ) {
            super( props );

            this.isFocused = 0;
            this.isDragging = 0;
            this.resizeState = RESIZE_STATE_DISTABLED;
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
                , this.on_focus
                , false
            );
        }

        enableDraggable = () => {
            let log = this.props.log;
            let header = this.refs.header;

            header.addEventListener(
                'mousedown'
                , this.on_header_drag_start
                , false
            );
        }

        enableHover = () => {
            let box = this.refs.box;

            this.resizeState = RESIZE_STATE_CAPTURE_HOVER;

            document.addEventListener(
                'mousemove'
                , this.on_capture_hover
                , false
            );
        }

        enableResize = ( type ) => {
            let box = this.refs.box;
            console.log( 'enableResize ' + type );

            this.resizeState = RESIZE_STATE_HOVER;

            box.addEventListener(
                'mousedown'
                , this.on_border_resize_start
                , false
            );
        }

        disableResize = () => {
            let box = this.refs.box;
            console.log( 'disableResize' );

            this.resizeState = RESIZE_STATE_CAPTURE_HOVER;

            box.removeEventListener(
                'mousedown'
                , this.on_border_resize_start
                , false
            );
        }

        /***********************************************
         * handlers for focus
         */
        on_focus = ( e ) => {
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
            }
            else {
                $( box ).addClass( 'box_focus' );
                this.isFocused = 1;
            }
        }

        /***********************************************
         * handlers for drag
         */
        on_header_drag_start = ( e ) => {
            let log = this.props.log;
            let box = this.refs.box;
            let parentBox = box.parentNode;
            let header = this.refs.header;

            this.isDragging = 1;

            this._dragParams = {
                vx: e.clientX
                , vy: e.clientY
                , ox: parseFloat( box.style.left ) || 0
                , oy: parseFloat( box.style.top ) || 0
            };

            document.addEventListener(
                'mousemove'
                , this.on_header_dragging
                , false
            );

            document.addEventListener(
                'mouseup'
                , this.on_header_drag_end
                , false
            );
        }

        on_header_dragging  = ( e ) => {
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

        on_header_drag_end = ( e ) => {
            let log = this.props.log;
            let header = this.refs.header;
            let box = this.refs.box;
            let parentBox = box.parentNode;

            document.removeEventListener(
                'mousemove'
                , this.on_header_dragging
                , false
            );

            document.removeEventListener(
                'mouseup'
                , this.on_header_drag_end
                , false
            );

            this.isDragging = 0;
        }

        /***********************************************
         * handlers for resize
         */
        on_capture_hover = ( e ) => {
            let box = this.refs.box;

            if ( !this.isFocused || this.isDragging ) {
                _resetDefault();
                return;
            }

            let header = this.refs.header;
            let parentBox = box.parentNode;
            let headerRect = header.getBoundingClientRect();
            let boxRect = box.getBoundingClientRect();
            let vx = e.clientX;
            let vy = e.clientY;
            let cx = vx - boxRect.left;
            let cy = vy - boxRect.top;

            let threshold = 10;
            let xRightHit = Math.abs( cx - boxRect.width ) < threshold;
            // let xRightInnerHit = xRightHit && cx <= boxRect.width;
            // let xRightOuterHit = xRightHit && cx > boxRect.width;
            let xLeftHit = Math.abs( cx ) < threshold;
            // let xLeftInnerHit = xLeftHit && cx >= 0;
            // let xLeftOuterHit = xLeftHit && cx < 0;
            let yBottomHit = Math.abs( cy - boxRect.height ) < threshold;
            // let yBottomInnerHit = yBottomHit && cy <= boxRect.height;
            // let yBottomOuterHit = yBottomHit && cy > boxRect.height;
            let yTopHit = Math.abs( cy ) < threshold;
            // let yTopInnerHit = yTopHit && cy >= 0;
            // let yTopOuterHit = yTopHit && cy < 0;
            let onHeader = cy >= 0 && cy <= headerRect.height
                    && cx >=0 && cx <= boxRect.width;

            let resizeType;
            if ( !onHeader ) {
                if ( xRightHit && yBottomHit ){
                    resizeType = 'se-resize';
                }
                else if ( xRightHit ) {
                    resizeType = 'e-resize';
                } 
                else if ( yBottomHit ) {
                    resizeType = 's-resize';
                } 
                else if ( xLeftHit && yBottomHit ) {
                    resizeType = 'sw-resize';
                }
                else if ( xLeftHit ) {
                    resizeType = 'w-resize';
                }
                else {
                    resizeType = null;
                }
            }
            else {
                resizeType = null;
            }

            if ( !resizeType ) {
                _resetDefault();
                this.disableResize();
            }
            else {
                box.style.cursor = resizeType;
                this.enableResize( resizeType );
            }

            function _resetDefault() {
                box.style.cursor = 'default';
            }
        }

        on_border_resize_start = ( e ) => {
            this.resizeState = RESIZE_STATE_RESIZABLE; 

            document.addEventListener(
                'mousemove'
                , this.on_border_resizing
                , false
            );

            document.addEventListener(
                'mouseup'
                , this.on_border_resize_end
                , false
            );

            e.stopPropagation();
        }

        on_border_resizing = ( e ) => {
            this.resizeState = RESIZE_STATE_RESIZING;
            console.log( 'border resizing' );
        }

        on_border_resize_end = ( e ) => {

            // this.resizeState = RESIZE_STATE_CAPTURE_HOVER;
            this.disableResize();

            console.log( 'border stop resizing' );

            document.removeEventListener(
                'mousemove'
                , this.on_border_resizing
                , false
            );

            document.removeEventListener(
                'mouseup'
                , this.on_border_resize_end
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







