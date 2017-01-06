# immutable-js

> Immutable persistent data collections for Javascript which increase efficiency and simplicity.

github: <https://github.com/facebook/immutable-js>

> Immutable data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic. Persistent data presents a mutative API which does not update the data in-place, but instead always yields new updated data.

* facebook出品
* 一旦创建，不再改变 
* 逻辑简单，高性能
* 无防御性复制，高级内存管理
* 改变型API，不会原地更新数据，格式生成新的更新数据。（有点像写时拷贝 copy-on-write） 
* 多种持久不可变数据结构：`List`, `Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet`, `Record`. 



## install

    npm install --save immutable

## getting started

    var Immutable = require( 'immutable' );
    var map1 = Immutable.Map( { a:1, b:2, c:3 } );
    var map2 = map1.set( 'b', 50 );
    map1.get( 'b' ); // 2
    map2.get( 'b' ); // 50
