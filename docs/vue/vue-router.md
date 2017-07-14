# vue-router

## Resources
* github: <https://github.com/vuejs/vue-router>
* docs: <http://router.vuejs.org/en/>

## Features
* Nested route/view mapping
* Modular, component-based router configuration
* Route params, query, wildcards
* View transition effects powered by Vue.js' transition system
* Fine-grained navigation control
* Links with automatic active CSS classes
* HTML5 history mode or hash mode, with auto-fallback in IE9
* Customizable Scroll Behavior

## Versions

* `2.x`, lastest `v2.7.0` 170630
* `0.7.x`


## Installation

    npm install vue-router

## Usage

    import Vue from 'vue'
    import VueRouter from 'vue-router'

    Vue.use( VueRouter );

## Named Routes

用于`router-link`的`to`属性

    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

## Named Views

比如sidebar和maincontent

    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>

js代码：

    const router = new VueRouter({
      routes: [
        {
          path: '/',
          components: {
            default: Foo,
            a: Bar,
            b: Baz
          }
        }
      ]
    })

> 对比：`react-router`则使用`this.props.children`连接父子UI组件


## 组件中使用router

* 可以通过`$route`引用当前路由
* `建议`：不直接引用`$route`，而是使用`props`，让组件和$route`解耦`，提升组件的通用化程度

        const User = {
            props: [ 'id' ]
            , template: '<div>User {{ id }}</div>'
        };

        const router = new VueRouter( {
            routes: [
                { 
                    path: '/user/:id'
                    , component: User
                    , props: true 
                }
                , {
                    path: '/user/:id'
                    , components: {
                        default: User
                        , sidebar: Sidebar 
                    }
                    , props: {
                        default: true
                        , sidebar: false
                    }
                }
            ]
        } );

    当路由的`props`属性设置为`true`，则会自动将`route.params`作为组件的`props`
    ，props属性还可以是`对象`或者`函数`，前者适合`静态`属性，后者适合`动态生成属性`。


## Transitions

    <transition>
        <router-view></router-view>
    </transition>
