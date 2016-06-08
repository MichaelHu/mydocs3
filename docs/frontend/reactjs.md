# REACTJS 


> <img src="./img/react_logo.svg" width="60"> A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES


Reactjs: <http://facebook.github.io/react/docs/getting-started.html>

Github: <https://github.com/facebook/react>

Flux: <https://facebook.github.io/flux/docs/overview.html>

Introduce: <http://www.ruanyifeng.com/blog/2015/03/react.html>




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
<script src="http://258i.com/static/bower_components/react/react.js"></script>
<script src="http://258i.com/static/bower_components/react/react-dom.js"></script>
<script src="http://258i.com/static/build/babel/babel.min.js"></script>


## 一、初识


### 1.1 三大特点

1. Just the UI
    MVC - V

2. Virtual DOM

    高性能，更简单的编程模型

3. Data Flow


### top-level APIs





## 二、cbScriptBlock回调

以下代码针对`compile-react`代码块提供编辑后的处理逻辑，将react代码块进行编译输出。

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


## 三、简单例子

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

1. 内联样式，使用`驼峰`键值的对象，就像设置`element.style.x`一样 
1. `if-else`不要在`属性`部分使用，因为key-value的value部分无法使用if-else语句。可用三元操作符代替。或者将if-else放在jsx代码块之外；或者定义一个闭包函数直接执行。
1. `false`作为`属性`部分和`内容`部分的区别：属性部分，输出字符串`"false"`；内容部分，输出为空 
1. 组件的`render()`只能返回一个节点，而不能是多个节点；如果有多个节点，必须要将这些节点包裹在一个父级节点内
1. jsx不能使用`<!-- ... -->`进行注释
1. `this.props.children`的类型。如果存在多个孩子节点，则表现为Array类型；如果仅有一个孩子节点，则表现为仅有的孩子节点本身。



#### 演示一

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
            , height: 30 // rendered as 'height:10px'
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

可以作为jsx xml组件标签的，可以是`ReactClass`，也可以是一个`function`。如下所示的`GroceryList`。

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




### 实现Todo应用

`关键思想`：
1. 组件的嵌套
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


## 四、组件（Components）

TODO:

* 实例API
* 生命周期API，render必选，其他可选



## Thinking in React

> 伟大的思想能变成巨大的财富。 —— 塞内加

TODO:
* 与Rocket的比较，分治的思想是一致的，不过React更加深入



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






