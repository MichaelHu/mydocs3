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



## Box

    @[data-script="babel"]class Box extends React.Component {
        render() {
            return <div>Hello, world</div>
        }
    }

    window.Box = Box;


<div id="test_PH" class="test">
<div class="test-panel"></div>
<div class="test-container">

    @[data-script="babel"](function(){

        var s = fly.createShow('#test_PH');
        s.show(1);
        s.append_show(2);

        ReactDOM.render( <Box />, document.querySelector( '#test_PH .test-panel' ) );

    })();

</div>
<div class="test-console"></div>
</div>







