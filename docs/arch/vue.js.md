# vue.js

* <http://vuejs.org> <img src="./img/vuejs-logo.png" height="30"> 
* github:  <https://github.com/vuejs/vue>



## features

* lightweight
* 一个国人产出的UI组件库：`iview` <https://github.com/iview/iview> <https://www.iviewui.com>
* 滴滴2017年1月份上线vue重构后的webapp
* 滴滴 webapp 5.0 Vue 2.0 重构经验分享: <https://github.com/DDFE/DDFE-blog/issues/13>
* 170111 Vue单元测试case写法 <http://marxjiao.com/2017/01/11/write-vue-unit-test-case/> 使用karma + jasmine





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
