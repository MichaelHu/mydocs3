# react-router

> Keeps your `UI` in sync with the `URL`.

## Resources

* `github`： <https://github.com/ReactTraining/react-router> <iframe src="http://258i.com/gbtn.html?user=ReactTraining&repo=react-router&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `react-router-redux`: <https://github.com/reactjs/react-router-redux>
* history: <https://github.com/ReactTraining/history>
* ` Examples for 4.x` [ 写得不错，很有参考价值 ]: <https://reacttraining.com/react-router/web/example/basic>
* `4.x` docs: <https://reacttraining.com/react-router/>
* `3.x` docs: <https://github.com/ReactTraining/react-router/tree/v3/docs>
* `2.x` docs: <https://github.com/ReactTraining/react-router/tree/v2.8.1/docs>


## Versions

* changelog: <https://github.com/ReactTraining/react-router/blob/master/CHANGES.md>

### Changelogs

* `4.x`: 4.0.0 - 4.2.0 [ 170823 ]
        Include `react-router` in `react-router-dom`
        react-router-native
        StaticRouter
        <Switch location>, <Route location>
        分布式Route
        Switch
    
* `3.x`: 3.0.0 - 3.0.2 [ 170118 ]
        Add params, location, routes to props injected by withRouter
        Route: add `router` to props
        Link: add `to` prop

* `2.x`: 2.0.0 - 2.8.1 [ 160913 ]
        render
        browserHistory
        hashHistory
        createMemoryHistory
        onChange hook 

* `1.x`: 1.0.0 - 1.0.3 [ 151223 ]


### Tips

* `Migrating from v2/v3 to v4`: <https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/migrating.md>
* v4版本进行了`重新设计`，和旧版本存在很大差异，`安装、使用、渲染原理、路由嵌套`等都不一样
* `<Router routes> `属性在v4中`不再支持`，因为v4不再采用集中式路由配置
* `v4`采用了`分布式Route`，可以在任何需要渲染内容的地方使用Route，比如Route可以放在div标签内；而之前的版本，Route都是`顶级集中配置`。
* 续上一点，在`v3`中，Route不是一个真正的组件，只用于创建一个`路由配置对象`；`v4`开始，Route成为一个`实际组件`，在任何地方，需要渲染`基于location`的内容，都可以在该地方渲染一个Route组件
* `路由嵌套`，原理不同，写法也不同，如下：

        // v2, v3
        <Route path='parent' component={Parent}>
            <Route path='child' component={Child} />
            <Route path='other' component={Other} />
        </Route>


        // v4
        <Route path='parent' component={Parent} />

        const Parent = () => (
            <div>
                <Route path='child' component={Child} />
                <Route path='other' component={Other} />
            </div>
        )

     需要注意的是，v4版本的子路由path设置，`不会`和父路由的`path拼接`，需要写全。

* `onEnter, onUpdate, onLeave`在v4中不再支持，而是使用Route对应的component的生命周期方法代替。

        v2, v3          v4
        ============================================================
        onEnter         componentDidMount, componentWillMount
        onUpdate        componentDidUpdate, componentWillUpdate
        onLeave         componentWillUnmount

* `<Switch>`，v4新引入，渲染第一个匹配的子路由对应的组件树，两者的等价实现如下：

        // v3
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="contact" component={Contact} />
        </Route>;

        // v4
        const App = () => (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
            </Switch>
        );

* `<Redirect>`区别：

    `Redirect`: 
    
        // v3
        <Route path="/" component={App}>
            <IndexRedirect to="/welcome" />
        </Route>;

        // v4
        <Route exact path="/" render={() => <Redirect to="/welcome" component={App} />} />
        // or
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Redirect path="*" to="/" />
        </Switch>;

    `query string`:

        // v3
        <Redirect from="/" to="/welcome" />
        // /?source=google → /welcome?source=google

        // v4
        <Redirect from="/" to="/welcome" />
        // /?source=google → /welcome

        <Redirect from="/" to={{ ...location, pathname: "/welcome" }} />
        // /?source=google → /welcome?source=google


* `<Link to>`，v4必须提供`非null`的`to`属性
* 对于v4版本，`<Route>`有3种渲染方式，分别为：

        <Route component>
        <Route render>
        <Route children>

    每一种渲染方式都会收到三个路由属性：`match`, `location`, `history`。`不设置path`属性的Route总是会被渲染
    
* 关于`代码分割( code-splitting )`，v4建议使用webpack的`bundle-loader`，v4以下则主要使用`getComponent()`调用wepack的`require.ensure()`达到异步加载代码的目的，「 React-Router 4建议的代码分割方式 」：<https://reacttraining.com/react-router/web/guides/code-splitting>



## Installation

    # 1.x - 3.x
    $ npm install --save react-router

    # 4.x
    $ npm install --save react-router-dom



## Labels

> from `React-Router 4.x`

    StaticRouter
        // 用于服务端渲染

    BrowserRouter
        history: object
        children: node

    StaticRouter
        basename: string
        location: string | object
        context: object
        children: node

    Route
        key
        path: string
        exact: bool
        strict: bool // 可用于强制location.pathname不带末尾斜线
        location: object
        component: Component
            history
                length
                action
                location
                push( path, [state] )
                replace( path, [state] )
                go( n )
                goBack()
                goForward()
                block( prompt )
            location
                key // no with HashHistory
                pathname
                search
                hash
                state
            match
                url
                path
                params
                isExact
        render: Function
            history
                ...
            location
                ...
            match
                ...
        children
            history
                ...
            location
                ...
            match
                ...

    Link
        to
        style

    Redirect
        from
        to

    Switch
        // 渲染第一个匹配的子路由
        location
        <Switch>
            <Route path="/" exact component={Home}/>
            <Redirect from="/old-match" to="/will-match"/>
            <Route path="/will-match" component={WillMatch}/>
            <Route component={NoMatch}/>
        </Switch>

    // 用于对组件进行封装，使组件接收和<Route>一样的路由变化属性{ match, location, history }
    withRouter      // 高级组件




> 以下主要为`2.x / 3.x`版本文档，未特殊注明`4.x`，都属于2.x / 3.x相关的内容

<hr>



## 简单例子

先从一个简单例子开始，以下例子展示了`UI组件`与`URL`的`匹配`，匹配的过程由`ReactRouter`封装完成。

    import React from 'react'
    import { render } from 'react-dom'
    import { Router, Route, Link, browserHistory } from 'react-router'

    const App = React.createClass({
        render() {
            return (
                <div>
                    <h1>App</h1>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/inbox">Inbox</Link></li>
                    </ul>
                    {this.props.children}
                </div>
            )
        }
    })

    const About = React.createClass({
        render() {
            return <h3>About</h3>
        }
    })

    const Inbox = React.createClass({
        render() {
            return (
                <div>
                    <h2>Inbox</h2>
                    {this.props.children || "Welcome to your Inbox"}
                </div>
            )
        }
    })

    const Message = React.createClass({
        render() {
            return <h3>Message {this.props.params.id}</h3>
        }
    })

    render((
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="about" component={About} />
                <Route path="inbox" component={Inbox}>
                    <Route path="messages/:id" component={Message} />
                </Route>
            </Route>
        </Router>
    ), document.body)






## 基础部分

### 特征

* 父子路由的`包含`关系，父路由的component包含子路由的component
* 使用`{ this.props.children }`来关联父子组件
* `嵌套UI`的自动选择，`<App><About /></App>`
* `路由参数`自动解析，获取方式：`this.props.params.xxx`或者`this.props.location.query.xxx`
* 支持`默认路由`，`<IndexRoute component={Dashboard}>`
* `绝对`路径使用，在`简化`路径的同时能`保留`UI的嵌套信息，但`不能`在`动态加载`的路由配置中使用
* 支持`hooks`：`onLeave`和`onEnter`
* 从`v4.x.x`开始，`Route`并不限定于顶级组件，它可以出现在`DOM tree`中，开发者可在`DOM tree`中`挖坑`，而这些坑可以根据`路由选择`来`填充`


### 两种写法


#### jsx写法

    render((
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="about" component={About} />
                <Route path="inbox" component={Inbox} />
            </Route>
        </Router>
    ), document.body)


#### 配置项写法

    const routes = {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'about', component: About },
            { path: 'inbox', component: Inbox },
        ]
    }

    render(<Router history={history} routes={routes} />, document.body)


注意： Router的`history`属性不能缺少，必须提供。


### 绝对路径

`绝对`路径使用，在`简化`路径的同时能`保留`UI的`嵌套信息`。

    render((
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard} />
                <Route path="about" component={About} />
                <Route path="inbox" component={Inbox} />

                {/* Use /messages/:id instead of /inbox/messages/:id */}
                <Route component={Inbox}>
                    <Route path="messages/:id" component={Message} />
                </Route>
            </Route>
        </Router>
    ), document.body)


以上路由配置，访问`Message`使用路径`/messages/:id`，而不是`/inbox/messages/:id`。

`注意`：绝对路径`不能`在`动态加载`的路由配置中使用



### 保留URL

绝对路径部分，使用了`/messages/:id`，但是`/inbox/messages/:id`就无法使用了。`Redirect`重定向能使保留URL仍然work。`<Redirect from="messages/:id" to="/messages/:id" />`

    import { Redirect } from 'react-router'

    render((
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard} />
                <Route path="about" component={About} />

                <Route path="inbox" component={Inbox}>
                    {/* Redirect /inbox/messages/:id to /messages/:id */}
                    <Redirect from="messages/:id" to="/messages/:id" />
                </Route>

                <Route component={Inbox}>
                    <Route path="messages/:id" component={Message} />
                </Route>
            </Route>
        </Router>
    ), document.body)




### onLeave & onEnter

    onEnter( nextState, replace, callback? )
    onLeave( prevState )

路由变换过程中，先在`离开`的路由调用`onLeave`，再在`进入`的路由调用`onEnter`。

调用次序如下：

1. `leave`阶段：`onLeave`先在离开的`叶子路由`开始执行，然后在该叶子路由的`第一个祖先路由`执行
2. `enter`阶段：`onEnter`先在进入的叶子路由的`第一个祖先路由`执行，然后在`叶子路由`本身执行

举个例子，如果用户在`/messages/5`对应页面中点击了`/about`链接，那么hooks发生次序如下：

1. `/messages/:id`路由执行`onLeave`
2. `/inbox`路由执行`onLeave`
3. `/about`路由执行`onEnter`



### 配置对象

路由还可以使用路由配置对象，但有一点需要注意，配置对象中无对应`Redirect`的配置项，需要使用`onEnter` hooks来解决。

    const routes = {
        path: '/',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'about', component: About },
            {
                path: 'inbox',
                component: Inbox,
                childRoutes: [{
                    path: 'messages/:id',
                    onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
                }]
            },
            {
                component: Inbox,
                childRoutes: [{
                    path: 'messages/:id', component: Message
                }]
            }
        ]
    }

    render(<Router routes={routes} />, document.body)



### 路由匹配

三个属性决定路由匹配状况，`嵌套`、`路径`以及`优先级`


#### 树形结构

嵌套路由形成一个`树形`结构，查找路由匹配时，使用`深度优先`查找


#### 特殊符号

路径匹配按`文本方式`进行。同时也存在一些路径配置的`特殊`符号：

* `:paramName`：特定`参数`字段，参数能从`this.props.params.paramName`获取到
* `()`：包含`可选`部分
* `*`：匹配所有字符，`非贪婪`
* `**`：匹配所有字符，`贪婪`

如下：

    <Route path="/hello/:name">         // matches /hello/michael and /hello/ryan
    <Route path="/hello(/:name)">       // matches /hello, /hello/michael, and /hello/ryan
    <Route path="/files/*.*">           // matches /files/hello.jpg and /files/hello.html
    <Route path="/**/*.jpg">            // matches /files/hello.jpg and /files/path/to/file.jpg


#### 优先级

优先级按路由的`定义顺序`由上至下。






### history

Router内置了`history`机制。`三种`最常见的history类型：`browserHistory`, `hashHistory`, `createMemoryHistory`

在配置路由时作为Router的`history属性`。

    import { bowserHistory } from `react-router`
    
    render (
        <Router history={browserHistory} routes={routes} />,
        document.getElementById('app')
    );


#### browserHistory

`usage`: <https://github.com/ReactTraining/react-router/blob/master/modules/Link.js#L11>

`APIs`:
* creatHref
* go
* push( location )
* replace( location )
* transitionTo( location )

与`history`的原生接口不一致，做了高级封装。它来自<https://github.com/mjackson/history>项目。


最常见的是`browserHistory`，使用了HTML5的`History API`。使用这种方式的URL看起来比较清晰易懂。但这种方式对服务器端有一定要求，它需要服务端对各种链接（可能不可枚举）都能进行处理，返回整个APP逻辑。

`服务器方案`，以下列举三种：express, nginx, Apache：

* node express方案：

        const express = require('express')
        const path = require('path')
        const port = process.env.PORT || 8080
        const app = express()

        // serve static assets normally
        app.use(express.static(__dirname + '/public'))

        // handle every other route with index.html, which will contain
        // a script tag to your application's JavaScript file(s).
        app.get('*', function (request, response){
          response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
        })

        app.listen(port)
        console.log("server started on port " + port)


* nginx方案：

        server {
          ...
          location / {
            try_files $uri /index.html;
          }
        }

* Apache方案：

        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]


对于`IE8/IE9`等不支持History API的浏览器，路由变换会触发`全页面加载`，在损失体验的情况下，基本保持APP的功能正常。但`不会`自动降级成兼容性好的Hash方式，主要目的是避免Hash的`二意性`带来的混乱。





#### hashHistory

兼容性好，对于不支持History API的老式浏览器，也能做到部分刷新的体验。但是`无法`与服务器做到`服务端渲染`。

    http://test.irice.com:8080/#/repos?_k=6ngamn

参数上的一串key，目的是作为`地址状态`保存的键值。地址状态会保存在`session storage`中。



#### createMemoryHistory  

内存History不同于前两者之处在于，它与`地址栏`无关，不处理地址栏也不从地址栏读取。这正是我们实现服务端渲染的方式。对于`测试`或者`React Native渲染环境`也有用。

    const history = createMemoryHistory(location);













### 首页路由和链接

todo







## 高级特性

todo

### 动态路由

docs: <https://github.com/ReactTraining/react-router/blob/master/docs/guides/DynamicRouting.md>

> React Router does all of its path matching and component fetching `asynchronously`, which allows you to not only load up the components lazily, but also lazily load the route configuration. You really only need one route definition in your initial bundle, the router can resolve the rest on demand.

* 所有的`路径匹配`，以及`组件获取`都是`异步`进行的
* 所以，不仅组件可以`懒加载`，对应的`路由配置`也可以懒加载

#### 基础方法

* `getComponents`，components属性的`异步函数`版本

        <Route
            path="courses/:courseId"
            getComponents={(nextState, cb) => {
                // do asynchronous stuff to find the components
                ...
                // then trigger callback
                cb(null, { sidebar: CourseSidebar, content: Course });
            }}
        />;

    其中，cb的格式为：`cb( err, components )`

* `getComponent`，component属性的`异步函数`版本

        <Route
            path="courses/:courseId"
            getComponent={(nextState, cb) => {
                // do asynchronous stuff to find the components
                cb(null, Course);
            }}
        />;

    其中，cb的格式为：`cb( err, component )`

* `getChildRoutes`，childRoutes属性的`异步函数`版本
* `getIndexRoute`

#### huge app examples

<https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps>

某个子路由配置文件：

	module.exports = {
		path: 'profile',
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, require('./components/Profile'))
			})
		}
	}




### 组件生命周期

### 服务端渲染


## lessons

<g-emoji alias="raised_hands" 
fallback-src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji>

<https://github.com/reactjs/react-router-tutorial/>

    git clone https://github.com/reactjs/react-router-tutorial
    cd react-router-tutorial
    cd lessons/01-setting-up
    npm install
    npm start





## APIs

<https://github.com/reactjs/react-router/blob/master/docs/API.md>


### Components

    <Router>
    <Link>
    <IndexLink>
    withRouter
    <RouterContext>




### Configuration Components

    <Route>
    PlainRoute
    <Redirect>
    <IndexRoute>
    <IndexRedirect>

#### Route属性

    path
    component
    components
    getComponent(nextState, callback)
    getComponents(nextState, callback)
    children
    onEnter(nextState, replace, callback?)
    onChange(prevState, nextState, replace, callback?)
    onLeave()

`component` 和 `getComponent(nextState, callback)`的区别，后者是`异步的`，对于代码`切分`有用。

#### PlainRoute属性

    childRoutes
    getChildRoutes(partialNextState, callback)
    indexRoute
    getIndexRoute(partialNextState, callback)

#### ...



### Route Components


#### 注入属性

如果某个`Route`匹配`URL`，则对应的Route Component会被渲染出来。渲染的同时，一些`属性`会被`注入`：

* location
* params
* route
* routeParams
* children



#### Named Components

`命名`组件。若一个Route有一或多个命名组件，那么孩子元素可以通过`this.props.xxx`获取到。这种情况下，`this.props.children`为未定义。

    render((
        <Router>
            <Route path="/" component={App}>
                <Route path="groups" components={{main: Groups, sidebar: GroupsSidebar}} />
                <Route path="users" components={{main: Users, sidebar: UsersSidebar}}>
                    <Route path="users/:userId" component={Profile} />
                </Route>
            </Route>
        </Router>
    ), node)

    class App extends React.Component {
        render() {
            // the matched child route components become props in the parent
            return (
                <div>
                    <div className="Main">
                        {/* this will either be <Groups> or <Users> */}
                        {this.props.main}
                    </div>
                    <div className="Sidebar">
                        {/* this will either be <GroupsSidebar> or <UsersSidebar> */}
                        {this.props.sidebar}
                    </div>
                </div>
            )
        }
    }

    class Users extends React.Component {
        render() {
            return (
                <div>
                    {/* if at "/users/123" this will be <Profile> */}
                    {/* UsersSidebar will also get <Profile> as this.props.children.
                            You can pick where it renders */}
                    {this.props.children}
                </div>
            )
        }
    }





## react-router-redux

> Ruthlessly simple bindings to keep `react-router` and `redux` in sync.

`github`: <https://github.com/reactjs/react-router-redux>

确保`react-router`与`redux`的store保持同步。

    $ npm install --save react-router-redux

### 原理

history + store ( redux ) `->` react-router-redux `->` enhanced history `->` react-router


### Examples

    import React from 'react'
    import ReactDOM from 'react-dom'
    import { createStore, combineReducers } from 'redux'
    import { Provider } from 'react-redux'
    import { Router, Route, browserHistory } from 'react-router'
    import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

    import reducers from '<project-path>/reducers'

    // Add the reducer to your store on the `routing` key
    const store = createStore(
        combineReducers({
            ...reducers,
            routing: routerReducer
        })
    )

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(browserHistory, store)

    ReactDOM.render(
        <Provider store={store}>
            { /* Tell the Router to use our enhanced history */ }
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="foo" component={Foo}/>
                    <Route path="bar" component={Bar}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('mount')
    )

> Now any time you navigate, which can come from pressing browser buttons or navigating in your application code, the enhanced history will first pass the new location through the Redux store and then on to React Router to update the component tree. If you time travel, it will also pass the new state to React Router to update the component tree again.

`syncHistoryWithStore`：



