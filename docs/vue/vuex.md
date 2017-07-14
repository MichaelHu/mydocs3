# vuex

> Centralized State Management for Vue.js.

## Resources

* github: <https://github.com/vuejs/vuex>
* docs: <http://vuex.vuejs.org/en/>
* todomvc Example: <https://github.com/vuejs/vuex/tree/dev/examples/todomvc>


## Features

* 一种`中心化`状态管理模式( `pattern` )
* 服务于`Vue应用`的一个`library`
* 是一个自包含( `self-contained` )的app，包含以下部分：
    * state: shared state
    * view: big view ( components tree )
    * actions
    <img src="./img/vuex-flow.png" style="max-height:260px">
* 灵感来自 `Flux, Redux, The Elm Architecture`，比Redux简单易懂
* 适用于`大规模SPA`的应用架构，简单SPA可能用不上，反而感觉繁琐
* state是一个`global singleton`

 <img src="./img/vuex.png" style="max-height:560px;">


## Versions

* 1.0
* 2.x
    * latest ( 170413 ): `v2.3.0`

## Installation

    $ npm install --save vuex
    $ yarn add vuex


## Usage

    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use( Vuex );

## Store

创建store：

    // 在module system中，确保已经调用过`Vue.use( Vuex )`
    const store = new Vuex.Store( {
            state: {
                count: 0
            }
            , mutations: {
                increment( state ) {
                    state.count++;
                }
            }
        } );

触发状态变化：

    store.commit( 'increment' );

而不是直接操作`store.state.count`。

> `原则`：状态变化只通过commit特定`mutation`

* 显式体现用户意图，能在固定地方查看触发状态变化的行为，使代码易读
* 也方便插件化、中间件化扩展，比如logger等

> 使用`单独状态树`，有且仅有一棵

### Store APIs

    store
        // properties
        state
        getters
        mutations
        actions
        modules

        // methods
        dispatch()
        commit()

        // helpers
        mapState
        mapGetters
        mapActions


## 组件使用Store

不建议总是使用全局单例store，因为每次使用还需要import进来，而且测试组件时还需要mock该store。

Vuex扩展了Vue的`store` option，在创建Vue app （ `root instance` ）的时候传入，它将`自动注入`到每个组件中。

    const app = new Vue( {
            el: '#app'
            , store
            , components: { Counter }
            , template: `
                <div class="app">
                    <counter></counter>
                </div>
                `
        } );

子组件可以通过`this.$store`获取到store对象。

    const Counter = {
            template: `<div>{{ count }}</div>`
            , computed: {
                count() {
                    return this.$store.state.count
                }
            }
        };


### mapState Helper
Vuex提供的，用于简化`computed`属性映射，避免重复代码模式。

    import { mapState } from 'vuex';

    export default {
        // ...
        computed: mapState( {
            count: state => state.count

            // passing the string value 'count' is the same as `state => state.count`
            , countAlias: 'count'

            , countPlusLocalState( state ) {
                return state.count + this.localCount;
            }
        } )
        // ...
    };

> 使用`...`操作符使`mapState`的返回值与本地computed属性进行merge，但它是一个`ES stage-3`的proposal，需要安装对应的babel preset： `npm install --save babel-preset-stage-3`

    computed: {
        localComputed() {}
        , ...mapState( { ... } )
    }


### getters

* `getters`定义：

        const store = new Vuex.Store( {
            state: {
                todos: [
                ]
            }
            , getters: {
                doneTodos: state => {
                    return state.todos.filter( todo => todo.done );
                }
            }
        } );

* `store`可以通过`getters`字段定义常用的计算属性，这些计算属性就可以在各个componet中直接使用，而不需要每个component各自再定义一次计算属性，避免重复。
* `state`作为每个getter的`第一个参数`

* component可以通过`this.$store.getters.doneTodos`获取对应计算属性。

### mapGetters helper

使用`mapGetters`可以简化子组件使用`store`的通用计算属性：

    computed: {
        ...mapGetters( [
            'doneTodosCount'
            , 'anotherGetter'
        ] )

        , anotherProp() {
            ...
        }
    }

以上是传入store通用计算属性的`属性名列表`，还可以通过`传入Object`来自定义映射的计算属性名称：

    computed: {
        ...mapGetters( {
            doneCount: 'doneTodosCount'
        } )
    }



## Mutations

* 定位于`同步`修改`store.state`，所以默认参数就是`state`本身
* 有一个字符串类型的`type`字段以及`handler`，通过handler来处理`store.state`的更新
* 不能直接调用mutation的handler，只能通过commit对应的mutation的type，来出发mutation的handler的执行

        store.commit( 'increment' );

* `handler`的第一个参数为`state`，可以增加其他参数，这些参数可以在commit时带上 - `commit with payload`

        store.commit( 'incremnt', 10 );
        store.commit( 'incremnt', payloadObject );

* `对象风格`的commit
        
        store.commit( {
            type: 'increment'
            , amount: 10
        } );


        mutations: {
            increment( state, payload ) {
                state.count += palyload.amount;
            }
        }

* Mutations`必须`是`同步`的
* 异步操作，使用`Actions`


## Actions

* 不同于Mutation直接修改state，Action只是在合适的时机`提交mutation`
* 支持`异步`操作是区别于Mutation的重要特征，使用`dispatch`而不是commit来触发
* 简单action的定义，在内部适合时机调用`commit`：

        const store = new Vuex.Store( {
                state: {
                    count: 0
                }
                , mutations: {
                    increment( state ) {
                        state.count++;
                    }
                }
                , actions: { 
                    increment( context ) {
                        context.commit( 'increment' );
                    }
                }
            } );

* 接收`context`作为参数，该context暴露出store对象的接口和属性，可以通过`context.commit`来提交mutation，也可以通过`context.state`, `context.getters`获取对应数据。但context并不是store实例本身。

* 使用`store modules`情况下，每个module中传入给action的context对应的是该module的`本地state`。而根state则通过`context.rootState`引用。

* 通常情况下，`无返回值`，但支持返回Promise，可以支持`Action链式调用`

* 触发action：

        store.dispatch( 'increment' );

        // with payload
        store.dispatch( 'increment', payloadObject );

        // object-style dispatch
        store.dispatch( {
            type: 'increment'
            , payloadObject: { ... }
        } );

        // dispatch within components
        this.$store.dispatch( ... );

> 为什么不直接通过`store.commit`提交mutation，原因在于commit必须是同步，而`dispatch是支持异步操作的`。可以在异步操作的某个`合适时机`调用同步的`commit`

    
### mapActions helper

> 主要`简化`组件的`methods编写`，避免重复代码的产生。

    import { mapActions } from 'vuex';

    export default {
        // ...
        methods: {
            ...mapActions( [
                // map `this.increment()` to `this.$store.dispatch( 'increment' )`
                'increment'
                , 'incrementBy'
            ] )

            , ...mapActions( {
                // map `this.add()` to `this.$store.dispatch( ' increment' )`
                add: 'increment'
            } )
        }
    }


### 组合Actions

    actions: {
        actionA( { commit } ) {
            return new Promise( ( resolve, reject ) => {
                setTimeout( () => {
                    commit( 'someMutation' );
                    resolve();
                }, 1000 );
            } );
        }
    }


    store.dispatch( 'actionA' )
        .then( () => {
            // ...
        } );

还可以使用`async/await`组合:

    actions: {
        async actionA( { commit } ) {
            commit( 'gotData', await getData() );
        }
        , async actionB( { dispatch, commit } ) {
            await dispatch( 'actionA' );
            commit( 'gotOtherData', await getOtherData() );
        }
    }


## Modules

> `简化`状态树的`构建`，支持`命名空间`避免action/mutation/getter`冲突`，支持`多层级内嵌`，命名空间继承

* module就是一个`纯Object`对象，包含store的`五大`属性：`state, getters, mutations, actions, modules`
* 支持命名空间，使用`namespaced: true`

        const store = new Vuex.Store( {
                modules: {
                    account: {
                        namespaced: true
                        , state: { ... }
                        , getters: {
                            // getters[ 'account/isAdmin' ]
                            isAdmin() { ... }
                        }
                        , mutations: {
                            // commit( 'account/login' )
                            login() { ... }
                        }
                        , actions: {
                            // dispatch( 'account/login' )
                            login() { ... }
                        }
                        , modules: {
                            myPage: {
                                // inherits the namespace from parent module
                                state: { ... }
                                , getters: {
                                    // getters[ 'account/profile' ]
                                    profile() { ... }
                                }
                            }

                            , posts: {
                                // further nest the namespace
                                namespaced: true
                                , state: { ... }
                                , getters: {
                                    // getters[ 'account/posts/popular' ]
                                    popular() { ... }
                                }
                            }
                        }
                    }
                }
            } );

    

## Application组织结构

遵守`三个`规则：

1. `应用级别`的state集中于store来管理
2. 改变状态的`唯一途径`是通过commit mutation，需遵循mutation的`同步特性`
3. `异步逻辑`应该封装在actions中，多加利用其组合特性

推荐的项目文件组织：

    ├── index.html
    ├── main.js
    ├── api
    │   └── ... # abstractions for making API requests
    ├── components
    │   ├── App.vue
    │   └── ...
    └── store
        ├── index.js          # where we assemble modules and export the store
        ├── actions.js        # root actions
        ├── mutations.js      # root mutations
        └── modules
            ├── cart.js       # cart module
            └── products.js   # products module








