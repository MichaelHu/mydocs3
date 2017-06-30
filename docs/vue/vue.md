# vue.js

> A `progressive` javascript framework


## Resources

* site: <http://vuejs.org> <img src="./img/vuejs-logo.png" height="30"> 
* github:  <https://github.com/vuejs/vue>
* docs: <http://vuejs.org/v2/guide/>
* Vue作者尤雨溪：Vue 2.0，渐进式前端解决方案 <http://dwz.cn/5ITKsD >


## Features

* lightweight `18kB`( minimized-gziped )
* versions: `0.11`, `0.12`, `1.0`, `2.x`



## References

* 一个国人产出的UI组件库：`iview` <https://github.com/iview/iview> <https://www.iviewui.com>
* 滴滴 webapp 5.0 Vue 2.0 重构经验分享: <https://github.com/DDFE/DDFE-blog/issues/13> 滴滴2017年1月份上线vue重构后的webapp
* [ 170111 ] Vue`单元测试`case写法 <http://marxjiao.com/2017/01/11/write-vue-unit-test-case/> 使用`karma + jasmine`


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.vue-container {
    border: 1px dotted #999;
    margin: 10px 0;
    padding: 5px;
}
</style>

<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/vue/dist/vue.js"></script>




## Get Started

### 代码引入

引入`vue.js`脚本：

    <script src="http://258i.com/static/bower_components/vue/dist/vue.js"></script>


### 声明式渲染

<div id="test_declarative_render_js" class="test">
<div class="test-container">

    @[data-script="html"]<div id="app_declarative_render" class="vue-container">
        {{ message }}
    </div>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


<div id="test_declarative_render" class="test">
<div class="test-container">

    @[data-script="javascript editable"]( function() {

        var app = window.appDeclarativeRender;
        if ( !app ) {
            app = new Vue({
                el: '#app_declarative_render',
                data: {
                    message: 'Hello Vue!'
                }
            });
            window.appDeclarativeRender = app;
        }
        else {
            app._mp_cnt = app._mp_cnt || 1;
            app._mp_cnt++;
            app.message += '-' + app._mp_cnt;
        }

    } )();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### 属性绑定

<div id="test_attributes_bind_js" class="test">
<div class="test-container">

    @[data-script="html"]<div id="app_attributes_bind" class="vue-container">
        <span v-bind:title="message">
        Hover your mouse over me for a few seconds to see my dynamically bound title!
        </span>
    </div>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


<div id="test_attributes_bind" class="test">
<div class="test-container">

    @[data-script="javascript editable"]( function() {

        var app = window.appAttributesBind;
        if ( !app ) {
            app = new Vue({
                el: '#app_attributes_bind',
                data: {
                    message: 'You loaded this page on ' + new Date()
                }
            });
            window.appAttributesBind = app;
        }
        else {
        }

    } )();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


## vue APIs

plugin system: <https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js#L6>
    Vue.use( plugin )

options

    el: '#id'
    , data: { ... }
    , computed: { ... }
    , methods: { ... }
    , watch: { ... }

* data, computed, methods, watch等对象内部的field都可以通过`vm.xxx`获得，vm为vue实例
    


## Lifecycle

> <http://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram>

 <img src="./img/lifecycle.png" style="max-height:1400px">



## Template

### Interpolation ( 插值， 插补 ）

    Text
        {{ message }}
        v-once
    Raw HTML
        v-html
    Attributes
        v-bind:id
        v-bind:disabled
    JS Expressions ( only one single expression )
        {{ number + 1 }}
        {{ ok ? 'YES' : 'NO' }}
        {{ message.split('').reverse().join('') }}
        <div v-bind:id="'list-' + id"></div>

### Directives
        v-if
    Arguments
        v-bind:href
            <a v-bind:href="url"></a>
        v-on:click
            <a v-on:click="doSomething"></a>
    Modifiers
        v-on:submit.prevent

### Filters

    {{ message | capitalize }}
    <div v-bind:id="rawId | formatId"></div>
    {{ message | filterA | filterB }}
    {{ message | filterA( 'arg1', arg2 ) }}

filters定义：
    new Vue( {
        // ...
        filters: {
            capitalize: function( value ) (
                if ( !value ) return '';
                value = value.toString();
                return value.charAt( 0 ).toUpperCase() + value.slice( 1 );
            )
        }
    } );
    
### Shorthands
    v-bind:href -> :href
    v-on:click -> @click






## 计算属性和监听器
> Computed Properties and Watchers

    



## Class and Style Bindings

### Class

    v-bind:class="{ active: isActive }"
    v-bind:class="{ active: isActive, 'text-danger': hasError }"
    <div class="static" v-bind:class="{ active: isActive }"></div>

    v-bind:class="classObject"
    v-bind:class="[ activeClass, errorClass ]"
    v-bind:class="[ isActive ? activeClass : '', errorClass ]"


### Inline Styles

    v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"
    v-bind:style="styleObject"

    v-bind:style="[ baseStyles, overridingStyles ]"
    v-bind:style="{ display: [ '-webkit-box', '-ms-flexbox', 'flex' ] }"


### Auto-prefixing

    v-bind:style="{ transform: ... }"



## Conditional Rendering

* 和`element`绑定，作为`directive`存在

### v-if

    <h1 v-if="ok">Yes</h1>

    <h1 v-if="ok">Yes</h1>
    <h1 v-else>No</h1>

    Groups:
    <template v-if="ok">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </template>


### v-else

> `v-else`所在元素必须紧跟`v-if`或`v-else-if`所在元素的后面

    <div v-if="Math.random() > 0.5">
        Now you see me
    </div>
    <div v-else>
        Now you don't
    </div>


### v-else-if






## List Rendering

v-for

    <ul id="example-1">
        <li v-for-"item in items">
            {{ item.message }}
        </li>
    </ul>


    <ul>
        <template v-for="item in items">
            <li>{{ item.msg }}</li>
            <li class="divider"></li>
        </template>
    </ul>


    <li v-for="todo in todos" v-if="!todo.isComplete">
        {{ todo }}
    </li>


## Vue Components

    is attribute

    注册全局组件

        Vue.component( tagName, options )

        // 实例化前
        Vue.component( 'my-component', {
            template: '<div>A cunstom component!</div>'
        } );



    局部组件

        var Child = {
                template: '<div> A cunstom component! </div>'
            };

        // 实例化时
        new Vue( {
            // ...
            components: {
                'my-component': Child
            }
        } );


    DOM模板的附加说明

        <table>
            <my-row>...</my-row>
        </table>

        DOM模板中，以上形式是不行的。

        DOM模板需要先经过浏览器解析并标准化，会不符合标准。它不同于字符串模板：
            <script type="text/x-template">
            js内联模板字符串
            .vue组件

        解决办法是is属性：
        <table>
            <tr is="my-row"></tr>
        </table>

    data字段必须是函数
        避免所有组件实例都共享同一份数据


    组合组件







