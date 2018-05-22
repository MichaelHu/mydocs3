# immutable-js

> Immutable persistent data collections for Javascript which increase efficiency and simplicity.

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
span.line-through {
    text-decoration: line-through;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/immutablejs/immutable.min.js"></script>


## Resources

* github: <https://github.com/facebook/immutable-js> <iframe src="http://258i.com/gbtn.html?user=facebook&repo=immutable-js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* docs: <http://facebook.github.io/immutable-js/docs/>



## Features

> Immutable data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic. Persistent data presents a mutative API which does not update the data in-place, but instead always yields new updated data.

* facebook出品
* 一旦创建，不再改变 
* 逻辑简单，高性能
* 无防御性复制，高级内存管理
* 改变型API，不会原地更新数据，而是生成新的更新数据。（有点像写时拷贝 copy-on-write） 
* 多种持久不可变数据结构：`List`, `Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet`, `Record`. 
* 原生支持嵌套
* <span class="line-through">`redux`的`mapStateToProps`得到的props是一个`嵌套的Map对象`，每个子元素都是一个Map，需要使用`map.get()`方式获取。</span> 实际上是Map的使用不正确导致，使用时需要注意区分`Map( json )`与`Map.fromJS( json )`的区别，一个浅转换，一个深转换






## install

### npm

    npm install --save immutable

### browser

`package`:

* github: <https://github.com/facebook/immutable-js/blob/master/dist/immutable.min.js>
* CDNJS: <https://cdnjs.com/libraries/immutable>
* jsDelivr: <http://www.jsdelivr.com/#!immutable.js>
* 258i: <http://258i.com/static/build/immutable-js/immutable.min.js>

`usage`:

    <script src="http://258i.com/static/build/immutable-js/immutable.min.js">

        var map1 = Immutable.Map( { a: 1, b: 2, c: 3 } );    
        ...

    </script>

    



## getting started

    var Immutable = require( 'immutable' );
    var map1 = Immutable.Map( { a:1, b:2, c:3 } );
    var map2 = map1.set( 'b', 50 );
    map1.get( 'b' ); // 2
    map2.get( 'b' ); // 50



## APIs

> <http://facebook.github.io/immutable-js/docs/>

### Common

#### fromJS()

`深度`转换。


### MAP

`Immutable.Map( {} )`：`只做浅转换`。


#### merge()

会做`深度`转换。


#### update()

#### mergeWith()
#### mergeDeep()
#### mergeDeepWith()
#### toJS(), toJSON()
#### toArray()
#### toObject()


## examples


### .merge()

<div id="test_merge" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_merge');
        var map1 = Immutable.Map( { a: 1, b: 2, c: { name: '123' } } );
        var map2 = map1.merge( { a: 3, c: { name: '456' } } );

        s.show( map2.get( 'a' ) );
        s.append_show( map2.get( 'c' ) );

        var map3 = Immutable.Map( { def: { data: null }, home: { data: null } } );
        var map4 = map3.merge( { def: { width: 30, height: 40, data: 123 } } );
        var map5 = map3.merge( null );

        s.append_show( map4.get( 'def' ) );
        s.append_show( map4.get( 'home' ) );
        s.append_show( map5.get( 'home' ) );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### nested


<div id="test_nested" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_nested');
        var map1 = Immutable.Map( { a: 1, b: { age: 18 }, c: { name: 'Even', m: { dd: 123} } } );
        var map2 = map1.merge( { a: 2, b: { age: 28 }, c: { name: 'Ellen', m: { dd: 122} } } );

        s.append_show( map1.get( 'a' ) );
        s.append_show( map1.get( 'b' ) );
        s.append_show( map1.get( 'c' ) );
        // 只是第一层转换成了MAP类型
        console.log( map1 );

        s.append_show( map2.get( 'a' ) );
        s.append_show( map2.get( 'b' ) );
        s.append_show( map2.get( 'c' ) );
        // 每层都转换成了MAP类型
        console.log( map2 );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





