# redux workshop


> 学而时习之，不亦悦乎？ —— 孔子《论语・学而》

> 重复是学习之母。 —— 狄慈根



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/babel/babel.min.js"></script>
<script src="http://258i.com/static/bower_components/react/react.js"></script>
<script src="http://258i.com/static/bower_components/react/react-dom.js"></script>
<script src="http://258i.com/static/build/redux/redux.min.js"></script> 


## cbScriptBlock回调

以下代码针对`compile-react`代码块提供编辑后的处理逻辑，将`react`代码块进行编译后执行。

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




## Simple Reducer

<div id="test_10" class="test">
<div class="test-container">

    @[data-script="compile-react editable"](function(){

        let s = fly.createShow('#test_10')
            ;

        function counter(state = 0, action){
            switch(action.type){
                case 'INCREMENT':
                    return state + 1;
                case 'DECREMENT':
                    return state - 1;
                default:
                    return state;
            }
        }

        // Create a Redux store holding the state of your app.
        // Its API is { subscribe, dispatch, getState }.
        let store = Redux.createStore(counter);

        store.subscribe(() =>
            s.append_show(store.getState())
        );

        s.show('start to reducing ... \n');
        store.dispatch({ type: 'INCREMENT'});
        store.dispatch({ type: 'INCREMENT'});
        store.dispatch({ type: 'DECREMENT'});

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## React-Redux

* github: <https://github.com/reactjs/react-redux>
* cdnjs: <https://cdnjs.com/libraries/react-redux>

### 建立项目

    $ mkdir react-redux-demo
    $ cd react-redux-demo
    $ npm init
    $ npm install --save react react-dom redux react-redux
    $ npm install --save-dev babel-loader babel-core babel-preset-es2015 babel-preset-react

`global`安装的`webpack`使用`babel-preset`时存在如下路径问题：

    ERROR in (webpack)/~/node-libs-browser/~/process/browser.js
    Module build failed: Error: Couldn't find preset "react" relative to directory "/usr/local/lib/node_modules/webpack/node_modules/node-libs-browser/node_modules/process"

解决方案是将webpack安装在当前项目中：

    $ npm install --save-dev webpack

`babel-loader`: <https://github.com/babel/babel-loader>

自动生成html文件来引用bundle.js：

    $ npm install --save-dev html-webpack-plugin
    
需要在js文件中引用css：

    $ npm install --save-dev css-loader style-loader






