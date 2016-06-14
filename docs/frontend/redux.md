# Redux

> Redux is a predictable state container for JavaScript apps.

可预测的状态容器，针对js SPA的构建。

<img src="./img/redux-logo.png" height="60"> 
<http://redux.js.org/index.html>


## 安装

使用`npm`包管理器，如果不想用，可以从<https://npmcdn.com/redux/>直接下载代码文件。

    npm install --save redux
    


## 三条原则(The Gist)

1. 整个应用`只有`一棵状态树
2. 状态是`只读`的，唯一修改方法是`派发(dispatch)`actions
3. 改变总是通过`函数`（reducer）来完成，它们接收之前的状态和一个action，计算并返回新的状态



## Actions

`Actions`：是信息载体，Store的唯一消息来源，通过`store.dispatch()`来发送。它表示某个事件的发生。
Action是一个纯JS对象，`必须`有`type`字段，该字段通常被定义为字符串常量，app的规模较大的情况下，需要将常量放到单独的模块维护，以下从模块中引入常量：
    
    import { ADD_TODO, REMOVE_TODO } from '../actionTypes'

其他字段完全取决于你了。

`Action Creators`:

1. `必须`是`函数`，只返回新的Action
2. 函数中`必须不`直接进行`dispatch`，这不同于Flux

        function addTodo(text) {
          return {
            type: ADD_TODO,
            text
          }
        }
        // 函数外部进行dispatch
        dispatch(addTodo(text));

    Flux是这样的：

        function addTodo(text) {
          const action = {
            type: ADD_TODO,
            text
          };
          dispatch(action);
        }

    作为替代的，可以创建一个绑定的action creator：

        const boundAddTodo = (text) => dispatch(addTodo(text))

    这样，就可以直接调用了：

        boundAddTodo(text);



## Reducers

`Actions`描述了某个事件的发生，但是没有指出应用的状态该如何变化。这就是Reducer的工作了。
`Reducer`需要操作应用的状态，开始之前，最好好好思考一下`表示应用状态的最小集合是什么`？

Reducer处理action的过程为：

    (previousState, action) => newState

之所以叫做reducer，原因是它同

    Array.prototype.reduce(reducer, ?initialValue)

的reducer是同一类型的函数。

确保reducer只做`纯粹的`状态迁移工作，以下事情`不要`在reducer中做：

* 改变其参数
* 处理带副作用的操作，比如API调用，以及路由转化
* [`存疑???`]调用非纯粹函数，比如`Date.now()`或者`Math.random()`

`reducer的分拆与组合`是很重要的构建模式和思想，它通过`分治`的思想达到数据处理逻辑的`模块化分解`。

状态表示： 

    {
      visibilityFilter: 'SHOW_ALL',
      todos: [
        {
          text: 'Consider using Redux',
          completed: true,
        },
        {
          text: 'Keep all state in a single tree',
          completed: false
        }
      ]
    }

`未分拆`的情况如下，这个reducer会变得很大，很`冗长`： 

    function todoApp(state = initialState, action) {
      switch (action.type) {
        case SET_VISIBILITY_FILTER:
          return Object.assign({}, state, {
            visibilityFilter: action.filter
          })
        case ADD_TODO:
          return Object.assign({}, state, {
            todos: [
              ...state.todos,
              {
                text: action.text,
                completed: false
              }
            ]
          })
        case COMPLETE_TODO:
          return Object.assign({}, state, {
            todos: state.todos.map((todo, index) => {
              if(index === action.index) {
                return Object.assign({}, todo, {
                  completed: true
                })
              }
              return todo
            })
          })
        default:
          return state
      }
    }

`分拆后`的情况如下，按state的字段（分别为visibilityFilter与todos）进行分解，每个字段由单独一个reducer来处理：

    function todos(state = [], action) {
      switch (action.type) {
        case ADD_TODO:
          return [
            ...state,
            {
              text: action.text,
              completed: false
            }
          ]
        case COMPLETE_TODO:
          return state.map((todo, index) => {
            if (index === action.index) {
              return Object.assign({}, todo, {
                completed: true
              })
            }
            return todo
          })
        default:
          return state
      }
    }

    function visibilityFilter(state = SHOW_ALL, action) {
      switch (action.type) {
        case SET_VISIBILITY_FILTER:
          return action.filter
        default:
          return state
      }
    }

    function todoApp(state = {}, action) {
      return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
      }
    }


这样，不同字段的reducer就可以独立模块来处理，各个模块分而治之。但是对state的处理还是一个整体的过程，需要有一个合并逻辑，对于以上例子来说，就是以下这步：

    function todoApp(state = {}, action) {
      return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
      }
    }

Redux提供了一个`combineReducers`的方法，以上步骤可以写成：

    const todoApp = combineReducers({
        visibilityFilter,
        todos
    });

可将所有`一级reducer`分拆到`./reducers`目录下的单独模块（文件）中，然后通过以下代码进行合并：

    import { combineReducers } from 'redux';
    import * as reducers from './reducers';

    const todoApp = combineReducers(reducers);

这样就形成了`顶级reducer`。



## Store

目前为止，`Actions`表示发生了什么事情，`Reducers`根据发生的事情更新状态。
那么`Store`就是将Actions与Reducers联合起来的`桥梁`。

`Store`有以下的职责：

* 持有应用的状态
* 提供`getState()`获取状态
* 提供`dispatch(action)`更新状态
* 通过`subscribe(listener)`注册监听器
* 通过`subscribe(listener)`的`返回值`解注册监听器

有了`顶级Reducer`以后，创建Store就很简单了：

    import { createStore } from 'redux';
    import todoApp from './reducers';
    let store = createStore(todoApp);

`createStore`的第二个参数可选接收初始状态。比如：

    let store = createStore(todoApp, window.STATE_FROM_SERVER);

创建完Store以后，就可以在没有任何UI逻辑的情况下，联调应用逻辑更新了：

    import { createStore } from 'redux';
    import todoApp from './reducers';
    import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions'

    let store = createStore(todoApp);

    // Log the initial state
    console.log(store.getState())

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    )

    // Dispatch some actions
    store.dispatch(addTodo('Learn about actions'))
    store.dispatch(addTodo('Learn about reducers'))
    store.dispatch(addTodo('Learn about store'))
    store.dispatch(completeTodo(0))
    store.dispatch(completeTodo(1))
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

    // Stop listening to state updates
    unsubscribe()




## Data Flow

> `Strict Unidirectional Data Flow`，严格的`单向`数据流

1. 发生一个action
2. `store.dispatch(action)`
3. `store`调用`reducer`执行，从`顶级reducer`开始，`逐级`往下调用
4. 最终顶级reducer会将多个下级reducer的结果`整合`成`一棵`状态树
5. store保存新的状态树，这时`监听器`将被执行，监听器可能会调用`store.getState()`获取当前状态，UI也可能更新以匹配新的状态，如果绑定了`React`的`组件`，那么可能会有调用：`component.setState(newState)`

<img src="./img/redux-data-flow.png" width="600">




## containers & components


### 两者区别

`container`是Redux与React的`桥梁`，通过`container`将`store`传递给React的`component`。

`container`本身也是一个React Component，你也可以自己实现，但它作为桥梁，有很多`细节上`的`复杂实现`，通常用Redux`自动生成`，使用`connect()`方法来完成。

`container`与`components`的区别：

1. `components`: `表现型`组件，`目的`是处理`长成啥样`（标签、样式等），对Redux`无感知`，从props获取数据；`手工`编写

2. `containers`: `容器型`组件，目的是处理`如何运转`（数据获取、状态更新），对Redux`有感知`，订阅Redux的状态并通过props传给components；Redux`自动`生成



### 创建container

使用`connect()`，需要定义`两个`特殊函数：

* `mapStateToProps()`：提供如何将redux store的状态转化成将要传递给表现型components的props的方式
* `mapDispatchToProps()`：提供如何将dispatch封装到回调函数中，并通过prop注入到表现型components的props中


### Store的传递

前面说过`container`作为`桥梁`将store传递给components，那么container又是`如何自动`获取到store的呢？

`Store`的`传递`：所有的container都需要使用store，这样它们才能订阅它。

这是通过`<Provider>`来完成的，通过为Provider设置`store`属性，可以让所有的container都能使用store。

    import React from 'react'
    import { render } from 'react-dom'
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
    import todoApp from './reducers'
    import App from './components/App'

    let store = createStore(todoApp)

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )

`底层机制`就是React的`context`机制。<https://facebook.github.io/react/docs/context.html>




## Redux架构思想

* 规则：数据流规则
* 模型：概念化，深度描述清楚
* 分治





## Test

Mocha推荐

### npm istall:

    npm install --save-dev mocha 
    npm install --save-dev babel-register

### .babelrc:

    {
        "presets": ["es2015"]
    }


### package.json:

    {
      ...
      "scripts": {
        ...
        "test": "mocha --compilers js:babel-register --recursive",
        "test:watch": "npm test -- --watch",
      },
      ...
    }

and `run npm test` to run it once, or `npm run test:watch` to test on every file change.


