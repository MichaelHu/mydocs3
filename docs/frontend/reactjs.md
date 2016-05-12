# REACTJS 


> <img src="./img/react_logo.svg" width="60"> A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES


Reactjs: <http://facebook.github.io/react/docs/getting-started.html>

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


### 3.1 简单组件

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



### 3.2 带状态的组件

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




### 3.3 实现Todo应用

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



### 3.4 使用外部插件的组件


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



## 五、Thinking in React

> 伟大的思想能变成巨大的财富。 —— 塞内加

TODO:
* 与Rocket的比较，分治的思想是一致的，不过React更加深入











