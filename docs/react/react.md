# react 


> A JAVASCRIPT LIBRARY FOR `BUILDING USER INTERFACES` <img src="./img/react_logo.svg" width="50"> 

## Resources

* Docs [ `171102`添加，react启用`.org`新域名 ]: <https://reactjs.org/docs/hello-world.html>
* Reactjs: <http://facebook.github.io/react/docs/getting-started.html>
* Github: <https://github.com/facebook/react>
* Flux: <https://facebook.github.io/flux/docs/overview.html>
* Introduce: <http://www.ruanyifeng.com/blog/2015/03/react.html>
* Changelogs: <https://github.com/facebook/react/blob/master/CHANGELOG.md>
        // React.PropTypes从16.0.0开始不再可用，需从prop-types import
        // React.createClass()从16.0.0开始不再可用，需从create-react-class import
* `React-like` Framework:
    * preact <https://preactjs.com> github: <https://github.com/developit/preact> <iframe src="http://258i.com/gbtn.html?user=developit&repo=preact&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
    * Inferno github: <https://github.com/infernojs/inferno> <iframe src="http://258i.com/gbtn.html?user=infernojs&repo=inferno&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
    * Nerv <https://github.com/NervJS/nerv> <iframe src="http://258i.com/gbtn.html?user=NervJS&repo=nerv&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>




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


## Features

### 设计理念

> Thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class of bugs.

> 思考UI该如何表现，而不是如何改变，能避免很多问题。

* Just the UI：`MVC`中的`V层`
* Virtual DOM：高`性能`，更`简单`的编程模型
* Data Flow：`单向`数据流

> `JSX`是React的一大创新亮点，js和html混写的方式极大提高编码效率，其很有可能参考`E4X` - ECMAScript for XML, ECMA-357


### Top-level APIs

重要的几个`API`：

* React.createClass()
* React.createElement()
* ReactDOM.render()






## Concepts

### Basic Concepts

* `Component`: `Class`
* Component Instance: `new Component`得到的
* `Element`: plain object，由Component Instance的`render()`方法返回，利于做高性能`Virtual DOM`的比较
* ReactDOM.render(): 将Element同步到DOM 
* `props`: 通常是`父组件`与`子组件`交互的`唯一`方式，若要更新子组件，只需用`新的props`来`re-render`子组件即可
* `ref`: 遇`HTML Element`，代表的是`DOM对象`；遇自定义组件，则代表的是`Component Instance`
* `Virtual DOM`: 按需更新DOM。


### Components

> `Components` let you split the UI into independent, reusable pieces, and think about each piece in isolation.
* UI拆分成`独立的`、`可重用`的部分
* 每个组件作为一个独立的整体来考虑
* 概念上与js的`function`类似，接收input（ `props` ），获得`React elements`，描述在屏幕上展示的内容
* 所以有`函数式`组件与`类`组件，前者处理纯粹的输入输出，后者能处理更复杂的交互逻辑
* 函数名或者组件类名可以作为jsx的tag使用

> All React components must act like `pure functions` with respect to their props.
* 组件的`纯粹函数`特性：不修改输入，对于同样的输入总会产生同样的输出
* 换句话说，props是`read-only`的


### JSX

jsx只是一个`句法糖`，目的是简化`React.createElement( component, props, ...children )`函数的编写。在使用jsx的时候，有一些特殊的地方。

1. jsx: `xml` + `{}`，最终会编译成js语法
2. jsx的标签名(type)可以包含点号`'.'`，比如`<MyComponents.DatePicker color="blue" />`
3. 运行时确定的jsx type，可将其先保存到大写开头的变量中，再在jsx中使用
4. 内建组件都以小写开头，`用户定义组件`必须以`大写`开头
5. `内联`样式的写法，使用`驼峰`键值的对象，就像设置`element.style.x`一样 
6. `if-else`不要在`属性`部分使用，因为key-value的`value`部分无法使用`if-else`语句。可用`三元操作符`代替。或者将if-else放在jsx代码块之外；或者定义一个闭包函数直接执行。
7. `false`作为`属性`部分和`内容`部分的区别：`属性`部分，输出字符串`"false"`；`内容`部分，输出为`空` 
8. 组件的`render()`只能返回一个节点，而不能是多个节点；如果有多个节点，必须要将这些节点包裹在一个父级节点内，该限制在`React 16`中已经移除
9. jsx不能使用`<!-- ... -->`进行注释
10. `this.props.children`的类型。如果存在多个孩子节点，则表现为Array类型；如果仅有一个孩子节点，则表现为仅有的孩子节点本身。
11. `this.props.children`在组件的`render()`方法中使用，用于将孩子节点渲染出来，通过它实现`组件嵌套`
12. `React`必须在上下文中，因为jsx会翻译成`React.createElement(...)`，以下代码看似能省的`import React from 'react';`实际上不能省：

		// import React from 'react';
		import ReactDOM from 'react-dom';
		import Hello from './components/Hello';

		ReactDOM.render(
			<Hello name="hudamin" />
			, document.getElementById( 'wrapper' )
		);

	原因是`<Hello name="hudamin" />`通过babel编译后，会生成`React.createElement(...)`的代码，直接引用了`React`。

13. `this`关键字:
	* 在`constructor`, `render`等预定义的方法中，可以直接使用`this`；其他`非预定义方法`，使用this关键字时，是一个`null`对象
	* `箭头`函数对this关键字的支持，直接使用`定义时`的上下文       




### State

#### 正确使用state

1. Do Not Modify State Directly
    * `constructor`是唯一一个可以对`this.state`赋值的地方
    * 其他地方，只能通过`this.setState( ... )`改变state的值
2. State Updates May Be Asynchronous ( by callback )

        this.setState( ( prevState, props ) => ( {
            counter: prevState.counter + props.increment
        } ) );

3. State Updates are Merged



#### 向下的数据流

* `top-down` or `unidirectional`，自上而下或单向的数据流
* 任何state只能由特定的组件所拥有，不能在组件外被观测到
* 如果把组件树当作是props的瀑布流，那么树上每个组件的状态就是额外的支流，与父组件下传的props汇聚，再通过子组件的props往下传递


#### 状态级别上提

<https://reactjs.org/docs/lifting-state-up.html>



### Events

1. dom元素的事件是`全小写`的，而jsx事件是`camel pattern`的
2. dom元素属性传递的是`字符串`，jsx传递的是`函数`
3. jsx不能像dom元素一样，通过`return false`来阻止默认行为，只能通过调用`preventDefault()`方法来实现
4. 使用`类方法`作为handler，传递的是类方法的引用，而不是直接执行，所以在执行时，类方法内部的`this`是`undefined`，而不是指向类实例。需要在`constructor`中做类方法的主动绑定。

        class Toggle extends React.Component {
          constructor(props) {
            super(props);
            this.state = {isToggleOn: true};

            // This binding is necessary to make `this` work in the callback
            this.handleClick = this.handleClick.bind(this);
          }
          ...
        }

    或者使用`类字段`（需要开启babel `stage-0` presets, 171114）：

        class Toggle extends React.Component {
            ...
            handleClick = ( e ) => {
                console.log( 'this is: ', this );
            }
            ...
        }

    还有一种方式，在jsx的handler字段中直接使用`箭头函数`：

        <button onClick={(e) => this.handleClick( e )}>
            Click Me
        </button>

    最后一种方式`不推荐`，因为其每次都进行`新的绑定`，并传递给子组件，导致子组件的`re-render`，不利于性能

5. 如果要`传递参数`给handler，反而需要上面的第三种方式：

        <button onClick={(e) => this.deleteRow( id, e )}>Delete Row</button>
        <button onClick={this.deleteRow.bind( this, id )}>Delete Row</button>

    上方两种写法等价。

6. SyntheticEvent: <https://reactjs.org/docs/events.html#mouse-events>




### Conditional Rendering

> 条件渲染

* 使用`if-else`语句按分支返回elements
* 使用`内部变量`保存中间elements
* `inline-if`方式：使用`&&`操作符，利用了false作为内容部分输出为空，作为属性部分输出为"false"的特性
* `inline-if-else`方式：使用`三元操作符`
* `render()`方法通过`return null`，阻止组件被渲染



### Lists and Keys

1. 渲染多个同类型组件，使用`.map()`

        function NumberList(props) {
          const numbers = props.numbers;
          const listItems = numbers.map((number) =>
            <li>{number}</li>
          );
          return (
            <ul>{listItems}</ul>
          );
        }

2. key用于帮助React定位哪些项目发生变化、被添加或者被移除，其目的仅在于为React`提供hint`，而不会传入Component，如果Component内部确实需要于key同样的值，需要使用另外的`prop name`传入
3. key仅在`外围数组`的上下文中才有意义，以下是`错误`的用法：

        function ListItem(props) {
          const value = props.value;
          return (
            // Wrong! There is no need to specify the key here:
            <li key={value.toString()}>
              {value}
            </li>
          );
        }

        function NumberList(props) {
          const numbers = props.numbers;
          const listItems = numbers.map((number) =>
            // Wrong! The key should have been specified here:
            <ListItem value={number} />
          );
          return (
            <ul>
              {listItems}
            </ul>
          );
        }

        const numbers = [1, 2, 3, 4, 5];
        ReactDOM.render(
          <NumberList numbers={numbers} />,
          document.getElementById('root')
        );

4. key在`兄弟节点`中必须唯一，但不必要全局唯一
5. jsx的`{}`结构可以包含任何expression，可以充分利用该特性，比如在里面直接使用`.map()`方法



### Forms

> `controlled components`: 受控组件；`uncontrolled components`: 非受控组件

1. 统一了`input`, `textarea`, `select`的使用风格，React内部在处理这些标签时，做了一些`特殊处理`
2. `textarea`放弃使用标签内部文本作为编辑内容，`select`放弃在option中使用selected，它们都统一使用`value`属性，与input一致，保持使用接口的`统一性`
3. `受控组件`：使用`onChange`获取新的value，通过`this.setState()`触发更新，使用`value={this.state.xxx}`设置对应DOM内的值，默认都是`受控`状态，也是推荐的方式
4. 对于`受控组件`来说，直接设置value属性为某个值（非null和undefined），将`锁定`input，而用户无法改变内容

        // locked
        ReactDOM.render( <input value="hi" />, mountNode );
        ReactDOM.render( <input value="" />, mountNode );

        // editable
        ReactDOM.render( <input value={null} />, mountNode );
        ReactDOM.render( <input value={undefined} />, mountNode );

        // grammar error
        ReactDOM.render( <input value={undefined} />, mountNode );

5. `非受控组件`，这种模式适用于从其他项目迁移到React的情况。与受控组件不同，非受控组件由DOM自身来控制组件显示的内容，它通过添加input DOM的ref引用，在代码中通过直接获取input DOM的值来组装表单的值

        ReactDOM.render( <input ref={(input) => this.input = input } />

6. `不设置`输入组件的`value`属性，输入组件也将进入非受控模式

        // editable
        ReactDOM.render( <input />, mountNode );

7. 非受控组件支持使用`defaultValue`属性接收`默认值`
8. `select`多选，可以给value传入数组值

        <select multiple={true} value={['B', 'C']}>
            ...
        </select>
9. 更多参考：<https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/>




### 组合与继承

> React has a powerful composition model, and we recommend `using composition instead of inheritance` to reuse code `between components`.

* `组件间`UI功能代码的复用，推荐使用`组合`而不是继承
* React为组件`组合`提供的机制：
    * `{props.children}`
    * `jsx`对象可以通过prop传递，因为Element本身是object
    组件通过在内部设置一些`hole`，来放置其他组件，以达到组合其他组件的目的
* 组件间需要复用`非UI功能`的代码，推荐将这部分代码`抽取`到独立实现的function、object或class，再由需要复用代码的组件`import`进来使用

一些例子：

    // 通过{props.children}接收子组件
    function Cont1( props ) {
        return ( 
            <div>
                {this.props.children}
            </div>
        );
    }

    // 挖两个坑，接收通过属性传入的Element
    function Cont2( props ) {
        return ( 
            <div>
                <header>{this.props.header}</header> 
                <div>{this.props.body}</div>
            </div>
        );
    }

    // 通过子元素方式传入子组件
    function Cont3( props ) {
        return (
            <Cont1>
                <div>
                    ....
                </div>
            </Cont1>
        );
    }

    // 通过属性传入子组件 
    function Cont4( props ) {
        return (
            <Cont2
                header={<Header />}
                body={
                    <Cont3 ... />
                }
                />
        );
    }



## Advanced Concepts

### PropTypes

1. `React.PropTypes`从`v15.5`开始，已经移到了单独的lib中进行维护：`prop-types`

        import PropTypes from 'prop-types';

2. 作为`类静态属性`设置，`Class.propTypes`、`Class.defaultProps`
3. Usage:

        // from react-v15.5
        import React from 'react';
        import PropTypes from 'prop-types';

        class MyComponent extends React.Component {
          render() {
            // ... do things with the props
          }
        }

        MyComponent.propTypes = {
          // You can declare that a prop is a specific JS primitive. By default, these
          // are all optional.
          optionalArray: PropTypes.array,
          optionalBool: PropTypes.bool,
          optionalFunc: PropTypes.func,
          optionalNumber: PropTypes.number,
          optionalObject: PropTypes.object,
          optionalString: PropTypes.string,
          optionalSymbol: PropTypes.symbol,

          // Anything that can be rendered: numbers, strings, elements or an array
          // (or fragment) containing these types.
          optionalNode: PropTypes.node,

          // A React element.
          optionalElement: PropTypes.element,

          // You can also declare that a prop is an instance of a class. This uses
          // JS's instanceof operator.
          optionalMessage: PropTypes.instanceOf(Message),

          // You can ensure that your prop is limited to specific values by treating
          // it as an enum.
          optionalEnum: PropTypes.oneOf(['News', 'Photos']),

          // An object that could be one of many types
          optionalUnion: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Message)
          ]),

          // An array of a certain type
          optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

          // An object with property values of a certain type
          optionalObjectOf: PropTypes.objectOf(PropTypes.number),

          // An object taking on a particular shape
          optionalObjectWithShape: PropTypes.shape({
            color: PropTypes.string,
            fontSize: PropTypes.number
          }),

          // You can chain any of the above with `isRequired` to make sure a warning
          // is shown if the prop isn't provided.
          requiredFunc: PropTypes.func.isRequired,

          // A value of any data type
          requiredAny: PropTypes.any.isRequired,

          // You can also specify a custom validator. It should return an Error
          // object if the validation fails. Don't `console.warn` or throw, as this
          // won't work inside `oneOfType`.
          customProp: function(props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
              return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
              );
            }
          },

          // You can also supply a custom validator to `arrayOf` and `objectOf`.
          // It should return an Error object if the validation fails. The validator
          // will be called for each key in the array or object. The first two
          // arguments of the validator are the array or object itself, and the
          // current item's key.
          customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
            if (!/matchme/.test(propValue[key])) {
              return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
              );
            }
          })
        };


### Code Splitting

* Code-Splitting: <https://reactjs.org/docs/code-splitting.html>，使用`dynamic import()`, `react-loadable`
* bundle-loader: <https://reacttraining.com/react-router/web/guides/code-splitting>，使用`bundle-loader`
* react-loadable: <https://github.com/thejameskyle/react-loadable> <iframe src="http://258i.com/gbtn.html?user=thejameskyle&repo=react-loader&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe> 




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

        ReactDOM.render(
            <input value="" />
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

简单、高性能的方式，针对组件只作为针对props的`纯粹函数`的情况。这种情形下，可以用函数`代替`Component类。


<div id="test_stateless_component" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){

        var s = fly.createShow('#test_stateless_component');
        var mountNode = $( '#test_stateless_component .test-react' )[ 0 ];

        var Simple = function( props ) {
                return ( <div>Hello, {props.name}</div> );     
            };
        s.show( 'testing Simple component ...' );
        ReactDOM.render( <Simple name="hudamin" />, mountNode );

    })();

</div>
<div class="test-react"></div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




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

查看这里<ref://./react-router.md.html>





## 组件APIs

* `component-specs`: <https://facebook.github.io/react/docs/component-specs.html>
* `react-component`: <https://facebook.github.io/react/docs/react-component.html>

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

当组件`即将`接收到新的属性（但旧属性`尚未改变`）时被调用。注：在初始渲染时不调用。

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

当组件`已经接收`到新的属性或新的状态（但属性或状态`仍未改变`）时被调用。注：在初始渲染时不调用。
提供时机为渲染做最后准备。

不能在此处调用`this.setState()`，如果需要，在 componentWillReceiveProps() 中调用。


#### componentDidUpdate()

`Updating`阶段。

    componentDidUpdate( prevProps, prevState )

当组件的变化已经更新到DOM上以后（属性或状态`已经发生变化`）调用。注：在初始渲染时不调用。

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

### Related Articles

* 201509 React 源码剖析系列 － 解密 setState <https://zhuanlan.zhihu.com/p/20328570>



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




## React vs SVG

<http://stackoverflow.com/questions/23402542/embedding-svg-into-reactjs>
