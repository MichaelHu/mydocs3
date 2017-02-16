# react 


> A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES <img src="./img/react_logo.svg" width="50"> 


* Reactjs: <http://facebook.github.io/react/docs/getting-started.html>
* Github: <https://github.com/facebook/react>
* Flux: <https://facebook.github.io/flux/docs/overview.html>
* Introduce: <http://www.ruanyifeng.com/blog/2015/03/react.html>




<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-react {
    padding: 10px;
    border: 1px dotted #bcbd22;
    color: #fff;
    border-radius: 4px;
    background-color: #bcbd22;
}
.test-react input,
.test-react textarea,
.test-react button {
    color: #000;
}
.test-react textarea {
    width: 100%;
    height: 100px;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/react/react.min.js"></script>
<script src="http://258i.com/static/bower_components/react/react-dom.min.js"></script>
<script src="http://258i.com/static/build/react-router/ReactRouter.min.js"></script>
<script src="http://258i.com/static/build/babel/babel.min.js"></script>


## 初识


### 三大特点

1. Just the UI：`MVC`中的`V层`
2. Virtual DOM：高`性能`，更`简单`的编程模型
3. Data Flow：`单向`数据流



### top-level APIs

重要的几个`API`：

* React.createClass()
* React.createElement()
* ReactDOM.render()


### 重要的概念

* `Component`: `Class`
* Component Instance: `new Component`得到的
* `Element`: plain object，由Component Instance的`render()`方法返回，利于做高性能`Virtual DOM`的比较
* ReactDOM.render(): 将Element同步到DOM 
* `props`: 通常是`父组件`与`子组件`交互的`唯一`方式，若要更新子组件，只需用`新的props`来`re-render`子组件即可
* `ref`: 遇`HTML Element`，代表的是`DOM对象`；遇自定义组件，则代表的是`Component Instance`
* `Virtual DOM`: 按需更新DOM。

> Thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class of bugs.

> 思考UI该如何表现，而不是如何改变，能避免很多问题。



## cbScriptBlock回调

以下代码针对`compile-react`代码块提供编辑后的处理逻辑，将`react`代码块进行编译输出。

    @[data-script="javascript"]function cbScriptBlock(block, scriptType) {
        var $block = $(block)
            , wrapperID = $block.closest('.test').attr('id')
            , s = fly.createShow('#' + wrapperID)
            ;
        
        if(scriptType.indexOf('compile-es2015') > -1
            || scriptType.indexOf('compile-react') > -1){
            try {
                var code = Babel.transform(
                        $block.text()
                        , {presets: ['es2015', 'react']}
                    ).code;
                s.show('compiled to es5: ');
                s.append_show('');
                s.append_show(code);

                $(
                    '<' + 'script>'
                    + code
                    + '</' + 'script>'
                )
                .insertBefore($block)
                ;

            }
            catch (e) {
                s.show(e);
            }
        } 
    }



## 属性

* `驼峰`方式引用，和`js API`兼容

### 常用属性

#### DOM属性


#### 事件属性

onClick





### 特殊属性

* `DOM`: `className`, `htmlFor`
* `非DOM`: `key`, `ref`, `dangerouslySetInnerHTML`


#### key属性

`sibling`之间，key必须唯一，但不需要全局唯一。


#### ref属性

可以是`字符串`，也可以是`回调函数`（实例作为参数传入）。可以指向`DOM`，也可以是`Component Instance`。

<div id="test_ref" class="test">
<div class="test-container">
<div id="test_ref_cont"></div>

    @[data-script="compile-es2015"](function(){

        var s = fly.createShow('#test_ref');
        var MyComponent = React.createClass({
          handleClick: function() {
            // Explicitly focus the text input using the raw DOM API.
            if (this.myTextInput !== null) {
              this.myTextInput.focus();
            }
          },
          render: function() {
            // The ref attribute is a callback that saves a reference to the
            // component to this.myTextInput when the component is mounted.
            return (
              <div>
                <input type="text" ref={(ref) => this.myTextInput = ref} />
                <input
                  type="button"
                  value="Focus the text input"
                  onClick={this.handleClick}
                />
              </div>
            );
          }
        });

        ReactDOM.render(
          <MyComponent />,
          document.getElementById('test_ref_cont')
        );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




## 简单例子

> 参考：<http://facebook.github.io/react/>


* XML语法与JS`语法混排时的注意事项`：

        // OK
        return <div>Hello {this.props.name}</div>;

        // OK
        return <div>
                Hello {this.props.name}
            </div>;

        // OK
        return <div>
                Hello {this.props.name}
                <h2>YES</h2>
            </div>;

        // Error
        return 
            <div>
                Hello {this.props.name}
            </div>;

        // OK，个人推荐此种写法
        return ( 
            <div>
                Hello {this.props.name}
            </div>
        );

    `个人推荐`此种写法，使用括号：

        return ( 
            <div>
                Hello {this.props.name}
            </div>
        );


* `jsx`编译成`js`后，会发现`最核心的三个方法`，分别是：

        React.createClass()
        React.createElement()
        ReactDOM.render()

    使用了`React`和`ReactDOM`两个对象。




### jsx注意事项

jsx只是一个`句法糖`，简化代码的编写。在使用jsx的时候，有一些特殊的地方。

1. `内联`样式的写法，使用`驼峰`键值的对象，就像设置`element.style.x`一样 
1. `if-else`不要在`属性`部分使用，因为key-value的`value`部分无法使用`if-else`语句。可用`三元操作符`代替。或者将if-else放在jsx代码块之外；或者定义一个闭包函数直接执行。
1. `false`作为`属性`部分和`内容`部分的区别：`属性`部分，输出字符串`"false"`；`内容`部分，输出为`空` 
1. 组件的`render()`只能返回一个节点，而不能是多个节点；如果有多个节点，必须要将这些节点包裹在一个父级节点内
1. jsx不能使用`<!-- ... -->`进行注释
1. `this.props.children`的类型。如果存在多个孩子节点，则表现为Array类型；如果仅有一个孩子节点，则表现为仅有的孩子节点本身。

2. `this.props.children`在组件的`render()`方法中使用，用于将孩子节点渲染出来。
3. 以下代码看似能省的`import React from 'react';`实际上不能省：

		// import React from 'react';
		import ReactDOM from 'react-dom';
		import Hello from './components/Hello';

		ReactDOM.render(
			<Hello name="hudamin" />
			, document.getElementById( 'wrapper' )
		);

	原因是`<Hello name="hudamin" />`通过babel编译后，会生成`React.createElement(...)`的代码，直接引用了`React`。

4. `this`关键字:
	* 在`constructor`, `render`等预定义的方法中，可以直接使用`this`；其他`非预定义方法`，使用this关键字时，是一个`null`对象
	* `箭头`函数对this关键字的支持        



#### 演示一

`style`属性的设置，接收的是一个`对象`：

    var divStyle = { color: 'red', height: 50 };
    return ( <div style={divStyle}></div> );

或者

    return ( <div style={{ color:'red', height: 50 }}></div> );

以下为例子：

<div id="test_5" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){
        var mountNodeFalse = $('#test_5 .test-react.false').get(0)
            , mountNodeIfElse = $('#test_5 .test-react.ifelse').get(0)
            , mountNodeStyle = $('#test_5 .test-react.style').get(0)
            ;

        // about `false`
        ReactDOM.render(<div id={false} />, mountNodeFalse);
        ReactDOM.render(<input value={false} />, mountNodeFalse);
        ReactDOM.render(<div>{false}</div>, mountNodeFalse);
        ReactDOM.render(<div>{5 > 1 && 'You have more than one item'}</div>, mountNodeFalse);

        // about `style`
        var divStyle = {
            color: 'red'
            , height: 30 // rendered as 'height:30px'
            , backgroundImage: 'url(...)'
            // Vendor prefixes other than `ms` should begin with a capital letter.
            , WebkitTransition: 'all'
            , msTransition: 'all'
        };        
        ReactDOM.render(
            <div style={divStyle}>Hello World!</div>
            , mountNodeStyle
        );

        // about `if-else`
        ReactDOM.render(
            <div id={ 5 > 1 ? 'yes' : 'no'}>use ternary expression instead of if-else</div>
            , mountNodeIfElse
        );
    })();

</div>
<div class="test-react false"></div>
<div class="test-react style"></div>
<div class="test-react ifelse"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


#### 演示二

关于`this.props.children`的类型，与children个数有关。

<div id="test_6" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){
        var s = fly.createShow('#test_6');
        var mountNodeOnlyOne = $('#test_6 .only-one').get(0)
            , mountNodeMoreThanOne = $('#test_6 .more-than-one').get(0)
            , GenericWrapper = React.createClass({
                componentDidMount: function(){
                    // s.append_show(Array.isArray(this.props.children)); 
                }
                , render: function(){
                    return (
                        <div>
                            {
                                '`this.props.children` '
                                + ( Array.isArray(this.props.children)
                                    ? 'is' : 'isn\'t' 
                                )
                                + ' an array'
                            }
                        </div>
                    );
                }
            })
            ;

        ReactDOM.render(
            <GenericWrapper>
                <span>child 1</span>
                <span>child 2</span>
                <span>child 3</span>
            </GenericWrapper>
            , mountNodeMoreThanOne
        );

        ReactDOM.render(
            <GenericWrapper>
            hello
            </GenericWrapper>
            , mountNodeOnlyOne
        );

    })();

</div>
<div class="test-react more-than-one"></div>
<div class="test-react only-one"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


#### 演示三：组件间通信

`父子`关系的组件间通信，可以通过`props`进行。

允许作为jsx xml组件标签的，可以是`ReactClass`，也可以是一个`function`。如下所示的`GroceryList`。

<div id="test_7" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){
        var s = fly.createShow('#test_7');
        var mountNode = $('#test_7 .test-react').get(0)
            , handleClick = function(i, props){
                s.show('You clicked: ' + props.items[i]);
                console.log(this);
            }
            ;

        /*
        function GroceryList(props){
            return (
                <div>
                    {props.items.map(function(item, i){
                        return (
                            <div onClick={handleClick.bind(this, i, props)} key={i}>
                            {item}
                            </div>
                        );
                    })}
                </div>
            );
        }
        */

        var GroceryList = React.createClass({
            render: function(){
                var me = this;
                return (
                    <div>
                        {this.props.items.map(function(item, i){
                            return (
                                <div onClick={handleClick.bind(this, i, me.props)} key={i}>
                                {item}
                                </div>
                            );
                        })}
                    </div>
                );
            }
        });

        ReactDOM.render(
            <GroceryList items={['Apple', 'Banana', 'Cranberry']}/>
            , mountNode
        );

    })();

</div>
<div class="test-react"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### 简单组件

<div id="test_10" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){
        var HelloMessage = React.createClass({
          render: function() {
            return <div>Hello {this.props.name}</div>;
          }
        });

        ReactDOM.render(<HelloMessage name="John" />, $('#test_10 .test-react').get(0));
    })();

</div>
<div class="test-react"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 带状态的组件

1. `关键组件方法`：

        getInitialState()
        setState()
        componentDidMount()
        componentWillUnmount()

2. 组件状态引用：`this.state.xxx`


<div id="test_20" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){

        var Timer = React.createClass({
                getInitialState: function() {
                    return {secondsElapsed: 0};
                },
                tick: function() {
                    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
                },
                componentDidMount: function() {
                    this.interval = setInterval(this.tick, 1000);
                },
                componentWillUnmount: function() {
                    clearInterval(this.interval);
                },
                render: function() {
                    return (
                        <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
                    );
                }
            })
            , mountNode = $('#test_20 .test-react')[0]
            ;

        ReactDOM.render(<Timer />, mountNode);

    })();

</div>
<div class="test-react"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### 无状态组件

简单、高性能的方式，针对组件只作为props的`纯粹`函数的情况。这种情形下，可以用函数代替Component类。




### 实现Todo应用

`关键思想`：
1. 组件的`嵌套`
2. 组件属性的引用： 

        this.props.xxx
        this.props.items.map(function(item){})


<div id="test_30" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){

        var TodoList = React.createClass({
                render: function() {
                    var createItem = function(item) {
                        return <li key={item.id}>{item.text}</li>;
                    };
                    return <ul>{this.props.items.map(createItem)}</ul>;
                }
            });

        var TodoApp = React.createClass({
                getInitialState: function() {
                    return {items: [], text: ''};
                },
                onChange: function(e) {
                    this.setState({text: e.target.value});
                },
                handleSubmit: function(e) {
                    e.preventDefault();
                    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
                    var nextText = '';
                    this.setState({items: nextItems, text: nextText});
                },
                render: function() {
                    return (
                        <div>
                            <h3>TODO</h3>
                            <TodoList items={this.state.items} />
                            <form onSubmit={this.handleSubmit}>
                                <input onChange={this.onChange} value={this.state.text} />
                                <button>{'Add #' + (this.state.items.length + 1)}</button>
                            </form>
                        </div>
                    );
                }
            });

        var mountNode = $('#test_30 .test-react')[0];

        ReactDOM.render(<TodoApp />, mountNode);

    })();

</div>
<div class="test-react"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 使用外部插件的组件


关键属性：
1. `dangerouslySetInnerHTML`属性，与`__html`属性对应
2. 组件实际DOM引用：`ref`属性与`this.refs`


<script src="http://258i.com/static/bower_components/marked/marked.min.js"></script>
<div id="test_40" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){

        var MarkdownEditor = React.createClass({
                getInitialState: function() {
                    return {value: 'Type some *markdown* here!'};
                },
                handleChange: function() {
                    this.setState({value: this.refs.textarea.value});
                },
                rawMarkup: function() {
                    return { __html: marked(this.state.value, {sanitize: true}) };
                },
                render: function() {
                    return (
                        <div className="MarkdownEditor">
                            <h3>Input</h3>
                            <textarea
                                onChange={this.handleChange}
                                ref="textarea"
                                defaultValue={this.state.value} 
                            />
                            <h3>Output</h3>
                            <div
                                className="content"
                                dangerouslySetInnerHTML={this.rawMarkup()}
                            />
                        </div>
                    );
                }
            })
            , mountNode = $('#test_40 .test-react')[0]
            ;

        ReactDOM.render(<MarkdownEditor />, mountNode);

    })();

</div>
<div class="test-react"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## react-router 

查看这里<a href="./react-router.md.preview.html">react-router</a>





## 组件APIs

<https://facebook.github.io/react/docs/component-specs.html>

组件定义过程，需要提供一个类描述对象，由对象提供一些接口方法和属性，包含以下内容：


### render()

`必需提供`render()方法的定义。返回`虚拟`DOM元素。

1. 该方法需要是`纯粹`的，多次调用能返回一致的结果；
    不使用`setTimeout`，不与浏览器`交互`（真要交互，可以在`componentMount()`中进行）
2. 如果不渲染任何内容，可以返回`null`或者`false`

需要注意`render()`方法与`ReactDOM.render()`的区别，后者返回的是Component的一个实例。 


### getInitialState()

组件装载前被调用一次。


### getDefaultProps()

组件实例创建前被调用一次。


### propTypes

通过设置该对象，以允许对传给组件的props进行验证。


### mixins

是一个`数组`，提供一种行为共享的方式。


### statics

是一个`对象`，允许你定义组件类的静态方法。


### displayName

主要用于`debug`时的显示。





### 生命周期方法

#### componentWillMount()

`Mounting`阶段。

调用`一次`，client和server都会调用，在`初始`渲染即将发生时调用。可以在里面调用`setState()`。


#### componentDidMount()

`Mounting`阶段。

调用`一次`，只在client端调用，调用时机为`初始`渲染刚刚完成时。这个时候，你已经可以操作DOM元素了。

另一个重要的点是，`子组件`的componentDidMount()总是在`父组件`的componentDidMount()`前`调用。

此处可以放心进行`setTimeout()`, `setInterval()`, `AJAX请求`等。



#### componentWillReceiveProps()

`Updating`阶段。

    componentWillReceiveProps( nextProps )

当组件接收到新的属性（但旧属性`尚未改变`）时被调用。注：在初始渲染时不调用。

该方法提供一个时机用于`更新state`，旧属性可以通过`this.props`获得，新属性通过`nextProps`传入，所以可以
计算好新state，并通过`this.setState()`设置新状态。
需要注意的是，这里面调用`this.setState()`不会单独触发一次`this.render()`。

容易发生误解的地方是，会误认为`this.props`已经发生改变。



#### shouldComponentUpdate()

`Updating`阶段。

    shouldComponentUpdate( nextProps, nextState )

当组件接收到新的属性（但旧属性尚未改变）时被调用。注：在`初始渲染`或使用`forceUpdate`时不调用。

该方法提供一个时机，通过`return false;`来阻止重新渲染，这样，在下次状态发生改变前，后续的`componentWillUpdate()`和`componentDidUpdate()`都不会调用。

`默认`情况下，该方法总是返回`true`，一般只在需要进行`性能优化`的时候才会重写该方法。

> Warning: IndexPage.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.



#### componentWillUpdate()

`Updating`阶段。

    componentWillUpdate( nextProps, nextState )

当组件接收到新的属性且属性已经发生改变时被调用。注：在初始渲染时不调用。
提供时机为渲染做最后准备。

不能在此处调用`this.setState()`，如果需要，在 componentWillReceiveProps() 中调用。


#### componentDidUpdate()

`Updating`阶段。

    componentDidUpdate( prevProps, prevState )

当组件的变化已经更新到DOM上以后调用。注：在初始渲染时不调用。

提供时机对DOM进行操作。



#### componentWillUnmount()

`Unmounting`阶段。

    componentWillUnmount()

当组件将要从DOM中清除时调用。提供时机用于必要的清理工作，比如清理计时器，清理DOM对象等。



#### 生命周期时序

`复合`组件生命周期方法调用`时序`：


    /**
     * ------------------ The Life-Cycle of a Composite Component ------------------
     *
     * - constructor: Initialization of state. The instance is now retained.
     *   - componentWillMount
     *   - render
     *   - [children's constructors]
     *     - [children's componentWillMount and render]
     *     - [children's componentDidMount]
     *     - componentDidMount
     *
     *       Update Phases:
     *       - componentWillReceiveProps (only called if parent updated)
     *       - shouldComponentUpdate
     *         - componentWillUpdate
     *           - render
     *           - [children's constructors or receive props phases]
     *         - componentDidUpdate
     *
     *     - componentWillUnmount
     *     - [children's componentWillUnmount]
     *   - [children destroyed]
     * - (destroyed): The instance is now blank, released by React and ready for GC.
     *
     * -----------------------------------------------------------------------------
     */






## Event System

SyntheticEvent

合成事件。事件池，事件对象是复用的。

nativeEvent获得原生事件对象。


### 支持的事件

* Clipboard Events

    事件： `onCopy onCut onPaste`

    属性：

        DOMDataTransfer
        clipboardData

* Composition Events
* Keyboard Events

    事件： `onKeyDown onKeyPress onKeyUp`

    属性：

        boolean altKey
        number charCode
        boolean ctrlKey
        boolean getModifierState(key)
        string key
        number keyCode
        string locale
        number location
        boolean metaKey
        boolean repeat
        boolean shiftKey
        number which 
    







## Thinking in React


> 伟大的思想能变成巨大的财富。 —— 塞内加

TODO:
* 与Rocket的比较，`分治`的思想是一致的，不过React更加深入
* 伟大之处在于`jsx`的引入
* 牛逼之处在于`生态`的建立



## 一些源码片段


`调用链条`：

    React.createElement
    ReactDOM.render
    ReactMount.render
    instantiateReactComponent

### ReactElement.js

React.createElement()

<https://github.com/facebook/react/blob/master/src/isomorphic/classic/element/ReactElement.js>


### ReactDOM.js

<https://github.com/facebook/react/blob/master/src/renderers/dom/ReactDOM.js>


### ReactMount.render()

<https://github.com/facebook/react/blob/master/src/renderers/dom/client/ReactMount.js#L530>


### instantiateReactComponent

<https://github.com/facebook/react/blob/master/src/renderers/shared/stack/reconciler/instantiateReactComponent.js#L84>




## Debugging

> New React Developer Tools

* site: <https://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html>
* github: <https://github.com/facebook/react-devtools>



## 性能优化

* React at 60fps: <https://hackernoon.com/react-at-60fps-4e36b8189a4c#.yon4m05et>
* `Profiling Components with Chrome Timeline`: <https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html#profiling-components-with-chrome-timeline>

	`?react_perf`开启性能监控: <http://localhost:3000/?react_perf>
