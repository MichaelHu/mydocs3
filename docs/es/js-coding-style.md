# js coding style

> changelog: 170426, 160730, 160723


## var, let

### 单行

    var a = 1;

### 多行

    var b = 2
        , c = 3
        , d = 4
        , e, f
        ;

let同var，不再赘述。



## if-else

### 单分支

    if ( expr ) {
        ...
    }


### 两分支

    if ( expr ) {
        ...
    }
    else {
        ...
    }

### 多分支

    if ( expr ) {
        ...
    }
    else if ( expr2 ) {
        ...
    }
    else {
        ...
    }



## logical expression

> changelog: 170426

    if ( a >= b && a <= c ) {
        ...
    }

    if ( 

        a >= b && a <= c 
        || d % 5 == 0
        || e < 200
        
        ) {
        ...
    }

    if ( 

        (
            a >= b 
                && a <= c 
                && b > 25
            || d % 5 == 0
        )
        && e < 200

        ) {
        ...
    }



## for

    for ( var i = 0; i < len; i++ ) {
        ...
    }

    for ( var k in obj ) {
        console.log( obj[ k ] );
    }



## while

    while ( i < len ) {
        ...
    }

    do {
        ...
    } while ( ... );





## function

### 定义

    function foo( param1, param2 ) {
        ...
    }


### 调用

    foo( a );
    foo( a, b );
    foo( a, b, c );
    foo(
        a
        , {
            key1: 'value1'
            , key2: 'value2'
        }
        , c
    );


### 匿名函数

    $el.on( 'click', function() {
        ...
    } );


### 闭包

    ( function() {
        ...
    } )();

    ( function( params ) {
        ...
    } )( p );





## object

    var config = { key1: 'value1', key2: 'value2' };

    var config = {
            type: 1
            , key1: 'value1'
            , key2: 'value2'
        };

    var config1 = {
            type: 1
            , key1: 'value1'
            , key2: 'value2'
        }
        , config2 = {
            type: 2
            , key1: 'value1'
            , key2: 'value2'
        }
        ;


## array

### array literals

    var arr = [ 1, 2, 3 ];
    var arr1 = [ new A(), new B() ];
    var arr2 = [
            { type: 1, key1: 'value1' }
            , { type: 1, key1: 'value1' }
        ];


### array reference

    var a = arr[ 1 ]
        , b = arr1[ 0 ]
        , c = arr2[ 100 % 20 ]
        ;




## ternary expression 

### 单行

    expr ? a : b


### 多行

    expr
    ? a
    : b

### 复杂
    
    ( expr )
    ? ( a )
    : ( b )

    ( 
        expr 
    )
    ? ( 
        a 
    )
    : ( 
        b 
    )


