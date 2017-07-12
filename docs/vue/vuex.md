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

> `原则`：状态变化只通过commit特定action

* 显式体现用户意图，能在固定地方查看触发状态变化的行为，使代码易读
* 也方便插件化、中间件化扩展，比如logger等

> 使用`单独状态树`，有且仅有一棵



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











